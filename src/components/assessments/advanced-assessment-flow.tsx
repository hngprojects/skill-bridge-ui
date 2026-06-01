"use client";

import { useCallback, useState, useEffect, useMemo } from "react";

import { AssessmentStartBlocked } from "@/components/assessments/assessment-start-blocked";
import { QuestionnaireFlow } from "@/components/assessments/questionnaire-flow";
import ViolationDetector from "@/components/assessments/violation-detector";
import {
  useResolveAdvancedAssessmentSession,
  useSubmitAdvancedAssessment,
} from "@/hooks/api";
import {
  useFlagAssessmentEvent,
  useSubmitAdvancedAssessmentLt2,
} from "@/hooks/api/use-assessment";
import {
  mapAdvancedQuestions,
  toAdvancedSubmitAnswers,
} from "@/lib/assessment-questions";
import {
  ASSESSMENT_START_FAILED_MESSAGE,
  ASSESSMENT_START_TIMEOUT_MESSAGE,
  isAssessmentStartTimeoutError,
  withAssessmentStartTimeout,
} from "@/lib/assessment-start";
import { ApiError, isServiceUnavailableError } from "@/lib/api";
import type { AdvancedAssessmentApiQuestion } from "@/types/api";
import type { Question } from "@/types/questionnaire";

type AdvancedStartState =
  | "loading"
  | "ready"
  | "unavailable"
  | "retake-locked"
  | "failed";

const ADVANCED_PREVIEW_PATH = "/t/assessments/advanced";

function formatRetakeDate(iso: string | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function readRetakeLockedDate(error: unknown): string | undefined {
  if (!(error instanceof ApiError) || error.status !== 403) return undefined;
  const data = error.data as
    | { error?: string; probation_ends_at?: string }
    | undefined;
  if (data?.error !== "ADVANCED_RETAKE_LOCKED") return undefined;
  return typeof data.probation_ends_at === "string"
    ? data.probation_ends_at
    : undefined;
}

function isSessionExpiredError(error: unknown): boolean {
  if (!(error instanceof ApiError) || error.status !== 422) return false;
  const data = error.data as { error?: string } | undefined;
  return data?.error === "SESSION_EXPIRED";
}

export function AdvancedAssessmentFlow() {
  const [sessionId, setSessionId] = useState("");
  const [apiQuestions, setApiQuestions] = useState<
    AdvancedAssessmentApiQuestion[]
  >([]);
  const [remainingSeconds, setRemainingSeconds] = useState<number | undefined>(
    undefined,
  );
  const [startState, setStartState] = useState<AdvancedStartState>("loading");
  const [retakeUnlocksAt, setRetakeUnlocksAt] = useState<string | undefined>(
    undefined,
  );
  const [failedMessage, setFailedMessage] = useState(
    ASSESSMENT_START_FAILED_MESSAGE,
  );
  const [startAttempt, setStartAttempt] = useState(0);

  const { mutateAsync: resolveSession } = useResolveAdvancedAssessmentSession();
  const { mutateAsync: submitAssessment, isPending: isSubmitting } =
    useSubmitAdvancedAssessment();
  const { mutateAsync: submitLt2, isPending: isSubmittingLt2 } =
    useSubmitAdvancedAssessmentLt2(sessionId);
  const flagViolation = useFlagAssessmentEvent("advanced", sessionId);

  const handleRetry = useCallback(() => {
    setFailedMessage(ASSESSMENT_START_FAILED_MESSAGE);
    setStartState("loading");
    setStartAttempt((n) => n + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    withAssessmentStartTimeout(resolveSession())
      .then((data) => {
        if (cancelled) return;
        setSessionId(data.session_id);
        setApiQuestions(data.questions ?? []);
        setRemainingSeconds(data.remaining_seconds);
        setStartState("ready");
      })
      .catch((e) => {
        if (cancelled) return;

        if (isServiceUnavailableError(e)) {
          setStartState("unavailable");
          return;
        }
        const retakeDate = readRetakeLockedDate(e);
        if (retakeDate !== undefined) {
          setRetakeUnlocksAt(retakeDate);
          setStartState("retake-locked");
          return;
        }
        setFailedMessage(
          isAssessmentStartTimeoutError(e)
            ? ASSESSMENT_START_TIMEOUT_MESSAGE
            : ASSESSMENT_START_FAILED_MESSAGE,
        );
        setStartState("failed");
      });

    return () => {
      cancelled = true;
    };
  }, [resolveSession, startAttempt]);

  const questions = useMemo(
    () => mapAdvancedQuestions(apiQuestions),
    [apiQuestions],
  );

  const lastLt2QuestionId = useMemo(() => {
    const lt2s = apiQuestions.filter(
      (q) => q.block === "long_text" && q.slot_type === "work_task",
    );
    return lt2s[lt2s.length - 1]?.question_id;
  }, [apiQuestions]);

  const lt3Generated = useMemo(() => {
    if (!lastLt2QuestionId) return false;
    const lt2 = apiQuestions.find((q) => q.question_id === lastLt2QuestionId);
    if (!lt2) return false;
    return apiQuestions.some((q) => q.question_number > lt2.question_number);
  }, [apiQuestions, lastLt2QuestionId]);

  if (startState === "unavailable") {
    return (
      <AssessmentStartBlocked
        title="Assessment temporarily unavailable"
        message="Our assessment service is temporarily unavailable. Please check back later."
        backHref={ADVANCED_PREVIEW_PATH}
      />
    );
  }

  if (startState === "retake-locked") {
    const dateLabel = formatRetakeDate(retakeUnlocksAt);
    return (
      <AssessmentStartBlocked
        title="Retake locked"
        message={
          dateLabel
            ? `You can retake the advanced assessment on ${dateLabel}.`
            : "You're currently in the 14-day retake cooldown period."
        }
        backHref={ADVANCED_PREVIEW_PATH}
      />
    );
  }

  if (startState === "failed") {
    return (
      <AssessmentStartBlocked
        title="Couldn't start assessment"
        message={failedMessage}
        backHref={ADVANCED_PREVIEW_PATH}
        onRetry={handleRetry}
      />
    );
  }

  const submit = (
    answersByKey: Record<string, string | string[]>,
    timeSpentByKey?: Record<string, number>,
  ) =>
    submitAssessment({
      sessionId,
      answers: toAdvancedSubmitAnswers(questions, answersByKey, timeSpentByKey),
    }).then(() => {});

  const onLastQuestionAdvance = async (
    finalQuestion: Question,
    answersByKey: Record<string, string | string[]>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _timeSpentByKey: Record<string, number>,
  ): Promise<boolean> => {
    if (lt3Generated) return false;
    if (!lastLt2QuestionId) return false;
    if (finalQuestion.id !== lastLt2QuestionId) return false;

    const rawAnswer = answersByKey[finalQuestion.key];
    const lt2Answer = typeof rawAnswer === "string" ? rawAnswer : "";

    try {
      const lt3 = await submitLt2({
        questionId: lastLt2QuestionId,
        answer: lt2Answer,
      });

      const lt3Question: AdvancedAssessmentApiQuestion = {
        question_id: lt3.question_id,
        question_number: lt3.question_number,
        block: "long_text",
        question_type: "required_text",
        question_text: lt3.question_text,
        options: null,
        slot_type: null,
        metadata: null,
        correct_answer: null,
        min_length: null,
        max_length: null,
      };

      setApiQuestions((prev) => [...prev, lt3Question]);
      setRemainingSeconds(lt3.max_seconds_remaining);
      return true;
    } catch (e) {
      if (isSessionExpiredError(e)) return false;
      throw e;
    }
  };

  const recordViolation = (count: number) => {
    if (count >= 3 && !flagViolation.isPending && !flagViolation.isSuccess)
      flagViolation.mutate({ eventType: "tab_switch" });
  };

  return (
    <ViolationDetector
      enabled={startState === "ready"}
      onViolation={recordViolation}
      submissionConfirmed={flagViolation.isSuccess}
    >
      <QuestionnaireFlow
        questions={questions}
        isLoading={startState === "loading"}
        isSubmitting={isSubmitting || isSubmittingLt2}
        initialSeconds={remainingSeconds}
        totalQuestions={apiQuestions.length + (lt3Generated ? 0 : 1)}
        onSubmit={submit}
        onLastQuestionAdvance={onLastQuestionAdvance}
      />
    </ViolationDetector>
  );
}

"use client";

import { useState, useEffect, useMemo, useRef } from "react";

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
  ApiError,
  authFailureMessage,
  isServiceUnavailableError,
} from "@/lib/api";
import { appToast } from "@/lib/toast";
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
  const startRequestedRef = useRef(false);

  const { mutateAsync: resolveSession } = useResolveAdvancedAssessmentSession();
  const { mutateAsync: submitAssessment, isPending: isSubmitting } =
    useSubmitAdvancedAssessment();
  const { mutateAsync: submitLt2, isPending: isSubmittingLt2 } =
    useSubmitAdvancedAssessmentLt2(sessionId);
  const flagViolation = useFlagAssessmentEvent("advanced", sessionId);

  useEffect(() => {
    if (startRequestedRef.current) return;
    startRequestedRef.current = true;

    resolveSession()
      .then((data) => {
        setSessionId(data.session_id);
        setApiQuestions(data.questions ?? []);
        setRemainingSeconds(data.remaining_seconds);
        setStartState("ready");
      })
      .catch((e) => {
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
        setStartState("failed");
        appToast.error(authFailureMessage(e));
      });
  }, [resolveSession]);

  const questions = useMemo(
    () => mapAdvancedQuestions(apiQuestions),
    [apiQuestions],
  );

  // LT-2 is the last work_task long_text question in the original session.
  // Finishing it triggers the server-side LT-3 synthesis.
  const lastLt2QuestionId = useMemo(() => {
    const lt2s = apiQuestions.filter(
      (q) => q.block === "long_text" && q.slot_type === "work_task",
    );
    return lt2s[lt2s.length - 1]?.question_id;
  }, [apiQuestions]);

  // LT-3 has been appended once any question's question_number exceeds LT-2's.
  // Handles both the freshly-generated case and the resume-mid-LT-3 case where
  // the session already contains the reflection question.
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
        message="Something went wrong while starting your assessment. Please try again later."
        backHref={ADVANCED_PREVIEW_PATH}
      />
    );
  }

  const submit = (
    answersByKey: Record<string, string | string[]>,
    timeSpentByKey?: Record<string, number>,
  ) =>
    submitAssessment({
      session_id: sessionId,
      answers: toAdvancedSubmitAnswers(questions, answersByKey, timeSpentByKey),
    }).then(() => {});

  /**
   * Intercepts the Next click on the LT-2 question, submits it on its own
   * endpoint, appends the returned LT-3 to the questions list, and re-syncs
   * the timer from the server's authoritative `max_seconds_remaining`.
   * Returns `true` so QuestionnaireFlow advances to LT-3 instead of finalising.
   */
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
        question_id: lastLt2QuestionId,
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
      // Per spec: 422 SESSION_EXPIRED on /lt2-submit means the timer ran
      // out — fall through to the final submit with whatever answers we
      // have so the candidate isn't stuck on LT-2 with a dead timer.
      if (isSessionExpiredError(e)) return false;
      throw e;
    }
  };

  const recordViolation = (count: number) => {
    if (count >= 3 && !flagViolation.isPending && !flagViolation.isSuccess)
      flagViolation.mutate({ event_type: "tab_switch" });
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

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { getSkillAssessmentSession } from "@/actions/assessment";
import { AssessmentStartBlocked } from "@/components/assessments/assessment-start-blocked";
import { QuestionnaireFlow } from "@/components/assessments/questionnaire-flow";
import ViolationDetector from "@/components/assessments/violation-detector";
import {
  useMe,
  useStartSkillAssessment,
  useSubmitSkillAssessment,
} from "@/hooks/api";
import { useFlagAssessmentEvent } from "@/hooks/api/use-assessment";
import {
  mapSkillQuestions,
  toSkillSubmitAnswers,
} from "@/lib/assessment-questions";
import { authFailureMessage, isServiceUnavailableError } from "@/lib/api";
import {
  existingSessionIdFromError,
  loadSkillSessionWithQuestions,
} from "@/lib/skill-assessment-session";
import { appToast } from "@/lib/toast";
import { useAssessmentSummaryStore } from "@/stores/assessment-summary-store";
import type {
  SkillAssessmentApiQuestion,
  SkillAssessmentStartResponseData,
} from "@/types/api";

type SkillStartState = "loading" | "ready" | "unavailable" | "failed";

const SKILL_PREVIEW_PATH = "/t/assessments/skill";

export function SkillAssessmentFlow() {
  const [sessionId, setSessionId] = useState("");
  const [apiQuestions, setApiQuestions] = useState<
    SkillAssessmentApiQuestion[]
  >([]);
  const [claimedLevel, setClaimedLevel] = useState<string | null>(null);
  const [startState, setStartState] = useState<SkillStartState>("loading");
  const startRequestedRef = useRef(false);

  const { data: user } = useMe({ enabled: true });
  const setSkillClaimedLevel = useAssessmentSummaryStore(
    (state) => state.setSkillClaimedLevel,
  );
  const { mutateAsync: startSession } = useStartSkillAssessment();
  const { mutateAsync: submitAssessment, isPending: isSubmitting } =
    useSubmitSkillAssessment();
  const flagViolation = useFlagAssessmentEvent("skill", sessionId);

  useEffect(() => {
    if (startRequestedRef.current) return;
    startRequestedRef.current = true;
    let cancelled = false;

    const applySession = (data: SkillAssessmentStartResponseData) => {
      if (cancelled) return;
      setSessionId(data.session_id);
      setApiQuestions(data.questions ?? []);
      setClaimedLevel(data.verified_level);
      setStartState("ready");
    };

    (async () => {
      try {
        applySession(await loadSkillSessionWithQuestions(await startSession()));
      } catch (e) {
        const existingId = existingSessionIdFromError(e);
        if (existingId) {
          try {
            applySession(
              await loadSkillSessionWithQuestions(
                await getSkillAssessmentSession(existingId),
              ),
            );
          } catch (resumeError) {
            if (isServiceUnavailableError(resumeError)) {
              setStartState("unavailable");
              return;
            }
            setStartState("failed");
            appToast.error(authFailureMessage(resumeError));
          }
          return;
        }

        if (isServiceUnavailableError(e)) {
          setStartState("unavailable");
        } else {
          setStartState("failed");
          appToast.error(authFailureMessage(e));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [startSession]);

  useEffect(() => {
    if (!user?.id || !claimedLevel) return;
    setSkillClaimedLevel(user.id, claimedLevel);
  }, [claimedLevel, setSkillClaimedLevel, user?.id]);

  const questions = useMemo(
    () => mapSkillQuestions(apiQuestions),
    [apiQuestions],
  );

  if (startState === "unavailable") {
    return (
      <AssessmentStartBlocked
        title="Assessment temporarily unavailable"
        message="Our assessment service is temporarily unavailable. Please check back later."
        backHref={SKILL_PREVIEW_PATH}
      />
    );
  }

  if (startState === "failed") {
    return (
      <AssessmentStartBlocked
        title="Couldn't start assessment"
        message="Something went wrong while starting your assessment. Please try again later."
        backHref={SKILL_PREVIEW_PATH}
      />
    );
  }

  const submit = (answersByKey: Record<string, string | string[]>) =>
    submitAssessment({
      attempt_id: sessionId,
      answers: toSkillSubmitAnswers(questions, answersByKey),
    });

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
        isSubmitting={isSubmitting}
        onSubmit={submit}
      />
    </ViolationDetector>
  );
}

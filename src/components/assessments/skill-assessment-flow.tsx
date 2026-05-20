"use client";

import { useState, useEffect, useMemo, useRef } from "react";

import { AssessmentStartBlocked } from "@/components/assessments/assessment-start-blocked";
import { QuestionnaireFlow } from "@/components/assessments/questionnaire-flow";
import { useStartSkillAssessment, useSubmitSkillAssessment } from "@/hooks/api";
import {
  normalizePersonalQuestions,
  toSubmitAnswers,
} from "@/lib/assessment-questions";
import { authFailureMessage, isServiceUnavailableError } from "@/lib/api";
import { appToast } from "@/lib/toast";
import type { SkillAssessmentSession } from "@/types/api";

type SkillStartState = "loading" | "ready" | "unavailable" | "failed";

const SKILL_PREVIEW_PATH = "/t/assessments/skill";

export function SkillAssessmentFlow() {
  const [session, setSession] = useState<SkillAssessmentSession | null>(null);
  const [startState, setStartState] = useState<SkillStartState>("loading");
  const startRequestedRef = useRef(false);

  const { mutateAsync: startSession, isPending: isStarting } =
    useStartSkillAssessment();
  const { mutateAsync: submitAssessment, isPending: isSubmitting } =
    useSubmitSkillAssessment();

  useEffect(() => {
    if (startRequestedRef.current) return;
    startRequestedRef.current = true;

    startSession()
      .then((data) => {
        setSession(data.session);
        setStartState("ready");
      })
      .catch((e) => {
        if (isServiceUnavailableError(e)) {
          setStartState("unavailable");
          return;
        }
        setStartState("failed");
        appToast.error(authFailureMessage(e));
      });
  }, [startSession]);

  const questions = useMemo(
    () => normalizePersonalQuestions(session?.questions ?? []),
    [session],
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

  return (
    <QuestionnaireFlow
      questions={questions}
      isLoading={startState === "loading" || isStarting}
      isSubmitting={isSubmitting}
      onSubmit={(answersByKey) =>
        submitAssessment({
          sessionId: session?.sessionId ?? "",
          answers: toSubmitAnswers(questions, answersByKey),
        }).then(() => {})
      }
    />
  );
}

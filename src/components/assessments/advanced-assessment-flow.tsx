"use client";

import { useState, useEffect, useMemo, useRef } from "react";

import { AssessmentStartBlocked } from "@/components/assessments/assessment-start-blocked";
import { QuestionnaireFlow } from "@/components/assessments/questionnaire-flow";
import ViolationDetector from "@/components/assessments/violation-detector";
import {
  useStartAdvancedAssessment,
  useSubmitAdvancedAssessment,
} from "@/hooks/api";
import { useFlagAssessmentEvent } from "@/hooks/api/use-assessment";
import {
  mapAdvancedQuestions,
  toAdvancedSubmitAnswers,
} from "@/lib/assessment-questions";
import { authFailureMessage, isServiceUnavailableError } from "@/lib/api";
import { appToast } from "@/lib/toast";
import type { AdvancedAssessmentApiQuestion } from "@/types/api";

type AdvancedStartState = "loading" | "ready" | "unavailable" | "failed";

const ADVANCED_PREVIEW_PATH = "/t/assessments/advanced";

export function AdvancedAssessmentFlow() {
  const [sessionId, setSessionId] = useState("");
  const [apiQuestions, setApiQuestions] = useState<
    AdvancedAssessmentApiQuestion[]
  >([]);
  const [remainingSeconds, setRemainingSeconds] = useState<number | undefined>(
    undefined,
  );
  const [startState, setStartState] = useState<AdvancedStartState>("loading");
  const startRequestedRef = useRef(false);

  const { mutateAsync: startSession } = useStartAdvancedAssessment();
  const { mutateAsync: submitAssessment, isPending: isSubmitting } =
    useSubmitAdvancedAssessment();
  const flagViolation = useFlagAssessmentEvent("advanced", sessionId);

  useEffect(() => {
    if (startRequestedRef.current) return;
    startRequestedRef.current = true;

    startSession()
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
        setStartState("failed");
        appToast.error(authFailureMessage(e));
      });
  }, [startSession]);

  const questions = useMemo(
    () => mapAdvancedQuestions(apiQuestions),
    [apiQuestions],
  );

  if (startState === "unavailable") {
    return (
      <AssessmentStartBlocked
        title="Assessment temporarily unavailable"
        message="Our assessment service is temporarily unavailable. Please check back later."
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

  const submit = (answersByKey: Record<string, string | string[]>) =>
    submitAssessment({
      session_id: sessionId,
      answers: toAdvancedSubmitAnswers(questions, answersByKey),
    }).then(() => {});

  const recordViolation = (count: number) => {
    if (count === 3) flagViolation.mutate({ event_type: "tab_switch" });
  };

  return (
    <ViolationDetector
      enabled={startState === "ready"}
      onViolation={recordViolation}
    >
      <QuestionnaireFlow
        questions={questions}
        isLoading={startState === "loading"}
        isSubmitting={isSubmitting}
        initialSeconds={remainingSeconds}
        onSubmit={submit}
      />
    </ViolationDetector>
  );
}

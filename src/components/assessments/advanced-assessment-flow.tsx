"use client";

import { useState, useEffect, useMemo } from "react";

import { QuestionnaireFlow } from "@/components/assessments/questionnaire-flow";
import {
  useAssessmentSession,
  useStartAdvancedAssessment,
  useSubmitAdvancedAssessment,
} from "@/hooks/api";
import {
  mapAdvancedQuestions,
  toSubmitAnswers,
} from "@/lib/assessment-questions";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";

export function AdvancedAssessmentFlow() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const { mutateAsync: startSession, isPending: isStarting } =
    useStartAdvancedAssessment();
  const { data: sessionData, status: sessionStatus } = useAssessmentSession(
    sessionId ?? "",
    { enabled: !!sessionId },
  );
  const { mutateAsync: submitAssessment, isPending: isSubmitting } =
    useSubmitAdvancedAssessment();

  useEffect(() => {
    startSession()
      .then((data) => setSessionId(data.session.sessionId))
      .catch((e) => appToast.error(authFailureMessage(e)));
  }, [startSession]);

  const activeSession = sessionData?.session;
  const questions = useMemo(
    () => mapAdvancedQuestions(activeSession?.questions ?? []),
    [activeSession],
  );

  return (
    <QuestionnaireFlow
      questions={questions}
      isLoading={isStarting || (!!sessionId && sessionStatus === "pending")}
      isSubmitting={isSubmitting}
      initialSeconds={activeSession?.remainingSeconds}
      onSubmit={(answersByKey) =>
        submitAssessment({
          sessionId: sessionId ?? "",
          answers: toSubmitAnswers(questions, answersByKey),
        }).then(() => {})
      }
    />
  );
}

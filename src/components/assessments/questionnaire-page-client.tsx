"use client";

import { useState, useEffect, useMemo } from "react";

import { QuestionnaireFlow } from "@/components/assessments/questionnaire-flow";
import {
  usePersonalAssessmentSession,
  useStartPersonalAssessment,
  useSubmitPersonalAssessment,
} from "@/hooks/api";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import type { PersonalAssessmentSession } from "@/types/api";
import type { Question } from "@/types/questionnaire";

// ─── Personal ─────────────────────────────────────────────────────────────────

function PersonalAssessmentFlow() {
  const [startedSession, setStartedSession] =
    useState<PersonalAssessmentSession | null>(null);

  const { data: resumeData, status: resumeStatus } =
    usePersonalAssessmentSession({ enabled: true });
  const { mutateAsync: startSession, isPending: isStarting } =
    useStartPersonalAssessment();
  const { mutateAsync: submitAssessment, isPending: isSubmitting } =
    useSubmitPersonalAssessment();

  useEffect(() => {
    if (resumeStatus !== "error") return;
    startSession()
      .then((data) => setStartedSession(data.session))
      .catch((e) => appToast.error(authFailureMessage(e)));
  }, [resumeStatus, startSession]);

  const activeSession = resumeData?.session ?? startedSession;
  const questions = useMemo(
    () => (activeSession?.questions as Question[]) ?? [],
    [activeSession],
  );

  const prefillAnswers = useMemo<Record<string, string | string[]>>(() => {
    if (
      !resumeData?.answers ||
      typeof resumeData.answers !== "object" ||
      Array.isArray(resumeData.answers)
    )
      return {};
    const result: Record<string, string | string[]> = {};
    for (const q of questions) {
      const value = resumeData.answers[q.key];
      if (value !== undefined) result[q.id] = value;
    }
    return result;
  }, [resumeData, questions]);

  return (
    <QuestionnaireFlow
      questions={questions}
      isLoading={resumeStatus === "pending" || isStarting}
      isSubmitting={isSubmitting}
      prefillAnswers={prefillAnswers}
      onSubmit={(answers) => submitAssessment({ answers }).then(() => {})}
    />
  );
}

export function QuestionnairePageClient() {
  return <PersonalAssessmentFlow />;
}

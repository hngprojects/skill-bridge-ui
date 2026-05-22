"use client";

import { useState, useEffect, useMemo, useRef } from "react";

import { QuestionnaireFlow } from "@/components/assessments/questionnaire-flow";
import {
  usePersonalAssessmentSession,
  useStartPersonalAssessment,
  useSubmitPersonalAssessment,
} from "@/hooks/api";
import { buildPersonalPrefillAnswers } from "@/lib/assessment-questions";
import { ApiError, authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import type { PersonalAssessmentSession } from "@/types/api";
import type { Question } from "@/types/questionnaire";

export function PersonalAssessmentFlow() {
  const [startedSession, setStartedSession] =
    useState<PersonalAssessmentSession | null>(null);

  const {
    data: resumeData,
    error: resumeError,
    status: resumeStatus,
  } = usePersonalAssessmentSession({ enabled: true });
  const { mutateAsync: startSession, isPending: isStarting } =
    useStartPersonalAssessment();
  const { mutateAsync: submitAssessment, isPending: isSubmitting } =
    useSubmitPersonalAssessment();
  const startRequestedRef = useRef(false);

  useEffect(() => {
    if (resumeStatus === "pending" || isStarting) return;
    if (resumeData?.session || startedSession) return;
    if (startRequestedRef.current) return;

    const noSessionToResume =
      resumeStatus === "success" &&
      resumeData != null &&
      resumeData.session == null;
    const notFound =
      resumeStatus === "error" &&
      resumeError instanceof ApiError &&
      resumeError.status === 404;

    if (!noSessionToResume && !notFound) {
      if (resumeStatus === "error") {
        appToast.error(authFailureMessage(resumeError));
      }
      return;
    }

    startRequestedRef.current = true;
    startSession()
      .then((data) => setStartedSession(data.session))
      .catch((e) => {
        startRequestedRef.current = false;
        appToast.error(authFailureMessage(e));
      });
  }, [
    resumeStatus,
    resumeData,
    resumeError,
    startedSession,
    isStarting,
    startSession,
  ]);

  const activeSession = resumeData?.session ?? startedSession;
  const questions = useMemo(
    () => (activeSession?.questions as Question[]) ?? [],
    [activeSession],
  );

  const prefillAnswers = useMemo(
    () => buildPersonalPrefillAnswers(questions, resumeData?.answers),
    [resumeData, questions],
  );

  return (
    <QuestionnaireFlow
      questions={questions}
      isLoading={
        resumeStatus === "pending" ||
        isStarting ||
        (resumeStatus === "success" && !resumeData?.session && !startedSession)
      }
      isSubmitting={isSubmitting}
      prefillAnswers={prefillAnswers}
      onSubmit={(answers) => submitAssessment({ answers })}
    />
  );
}

"use client";

import { useCallback, useState, useEffect, useMemo, useRef } from "react";

import { AssessmentStartBlocked } from "@/components/assessments/assessment-start-blocked";
import { QuestionnaireFlow } from "@/components/assessments/questionnaire-flow";
import {
  usePersonalAssessmentSession,
  useStartPersonalAssessment,
  useSubmitPersonalAssessment,
} from "@/hooks/api";
import { buildPersonalPrefillAnswers } from "@/lib/assessment-questions";
import {
  ASSESSMENT_START_FAILED_MESSAGE,
  ASSESSMENT_START_TIMEOUT_MESSAGE,
  isAssessmentStartTimeoutError,
  withAssessmentStartTimeout,
} from "@/lib/assessment-start";
import { ApiError, isServiceUnavailableError } from "@/lib/api";
import type { PersonalAssessmentSession } from "@/types/api";
import type { Question } from "@/types/questionnaire";

type PersonalBlockState = "unavailable" | "failed";

const PERSONAL_PREVIEW_PATH = "/t/assessments/personal";

function deriveResumeBlockState(
  resumeStatus: string,
  resumeError: unknown,
): PersonalBlockState | null {
  if (resumeStatus !== "error") return null;
  if (resumeError instanceof ApiError && resumeError.status === 404)
    return null;
  if (isServiceUnavailableError(resumeError)) return "unavailable";
  return "failed";
}

export function PersonalAssessmentFlow() {
  const [startedSession, setStartedSession] =
    useState<PersonalAssessmentSession | null>(null);
  const [startBlockState, setStartBlockState] =
    useState<PersonalBlockState | null>(null);
  const [startFailedMessage, setStartFailedMessage] = useState(
    ASSESSMENT_START_FAILED_MESSAGE,
  );
  const [startAttempt, setStartAttempt] = useState(0);
  const [isStarting, setIsStarting] = useState(false);
  const startInFlightRef = useRef(false);

  const {
    data: resumeData,
    error: resumeError,
    status: resumeStatus,
    refetch: refetchResume,
  } = usePersonalAssessmentSession({ enabled: true });
  const { mutateAsync: startSession } = useStartPersonalAssessment();
  const { mutateAsync: submitAssessment, isPending: isSubmitting } =
    useSubmitPersonalAssessment();

  const resumeBlockState = deriveResumeBlockState(resumeStatus, resumeError);
  const blockState = startBlockState ?? resumeBlockState;
  const failedMessage =
    startBlockState === "failed"
      ? startFailedMessage
      : ASSESSMENT_START_FAILED_MESSAGE;

  const handleRetry = useCallback(() => {
    setStartFailedMessage(ASSESSMENT_START_FAILED_MESSAGE);
    setStartedSession(null);
    setStartBlockState(null);
    startInFlightRef.current = false;
    setIsStarting(false);
    setStartAttempt((n) => n + 1);
    void refetchResume();
  }, [refetchResume]);

  const activeSession = resumeData?.session ?? startedSession;
  const questions = useMemo(
    () => (activeSession?.questions as Question[]) ?? [],
    [activeSession],
  );

  const prefillAnswers = useMemo(
    () => buildPersonalPrefillAnswers(questions, resumeData?.answers),
    [resumeData, questions],
  );

  const isLoading =
    blockState === null &&
    !activeSession &&
    (resumeStatus === "pending" || isStarting);

  const shouldStartNewSession =
    blockState === null &&
    !activeSession &&
    resumeStatus !== "pending" &&
    ((resumeStatus === "success" &&
      resumeData != null &&
      resumeData.session == null) ||
      (resumeStatus === "error" &&
        resumeError instanceof ApiError &&
        resumeError.status === 404));

  useEffect(() => {
    if (!shouldStartNewSession || startInFlightRef.current) return;

    startInFlightRef.current = true;
    setIsStarting(true);
    let cancelled = false;

    withAssessmentStartTimeout(startSession())
      .then((data) => {
        if (cancelled) return;
        startInFlightRef.current = false;
        setIsStarting(false);
        setStartedSession(data.session);
      })
      .catch((e) => {
        if (cancelled) return;
        startInFlightRef.current = false;
        setIsStarting(false);
        if (isServiceUnavailableError(e)) {
          setStartBlockState("unavailable");
          return;
        }
        setStartFailedMessage(
          isAssessmentStartTimeoutError(e)
            ? ASSESSMENT_START_TIMEOUT_MESSAGE
            : ASSESSMENT_START_FAILED_MESSAGE,
        );
        setStartBlockState("failed");
      });

    return () => {
      cancelled = true;
    };
  }, [shouldStartNewSession, startSession, startAttempt]);

  if (blockState === "unavailable") {
    return (
      <AssessmentStartBlocked
        title="Assessment temporarily unavailable"
        message="Our assessment service is temporarily unavailable. Please check back later."
        backHref={PERSONAL_PREVIEW_PATH}
        onRetry={resumeBlockState === "unavailable" ? undefined : handleRetry}
      />
    );
  }

  if (blockState === "failed") {
    return (
      <AssessmentStartBlocked
        title="Couldn't start assessment"
        message={failedMessage}
        backHref={PERSONAL_PREVIEW_PATH}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <QuestionnaireFlow
      questions={questions}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      prefillAnswers={prefillAnswers}
      onSubmit={(answers) => submitAssessment({ answers })}
    />
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

import { QuestionnaireFlow } from "@/components/assessments/questionnaire-flow";
import {
  usePersonalAssessmentSession,
  useStartPersonalAssessment,
  useSubmitPersonalAssessment,
  useStartSkillAssessment,
  useSubmitSkillAssessment,
  useStartAdvancedAssessment,
  useAssessmentSession,
  useSubmitAdvancedAssessment,
} from "@/hooks/api";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import type {
  AdvancedAssessmentSession,
  PersonalAssessmentSession,
} from "@/types/api";
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

// ─── Skill ────────────────────────────────────────────────────────────────────

function SkillAssessmentFlow() {
  const [session, setSession] = useState<{
    sessionId: string;
    questions: unknown[];
  } | null>(null);

  const { mutateAsync: startSession, isPending: isStarting } =
    useStartSkillAssessment();
  const { mutateAsync: submitAssessment, isPending: isSubmitting } =
    useSubmitSkillAssessment();

  useEffect(() => {
    startSession()
      .then((data) => setSession(data.session))
      .catch((e) => appToast.error(authFailureMessage(e)));
  }, [startSession]);

  const questions = useMemo(
    () => (session?.questions as Question[]) ?? [],
    [session],
  );

  return (
    <QuestionnaireFlow
      questions={questions}
      isLoading={isStarting || !session}
      isSubmitting={isSubmitting}
      onSubmit={() =>
        submitAssessment({
          sessionId: session?.sessionId ?? "",
          answers: [],
        }).then(() => {})
      }
    />
  );
}

// ─── Advanced ─────────────────────────────────────────────────────────────────

function AdvancedAssessmentFlow() {
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

  const activeSession: AdvancedAssessmentSession | undefined =
    sessionData?.session;
  const questions = useMemo(
    () => (activeSession?.questions as unknown as Question[]) ?? [],
    [activeSession],
  );

  return (
    <QuestionnaireFlow
      questions={questions}
      isLoading={isStarting || (!!sessionId && sessionStatus === "pending")}
      isSubmitting={isSubmitting}
      showTimer
      initialSeconds={activeSession?.remainingSeconds}
      onSubmit={() =>
        submitAssessment({ sessionId: sessionId ?? "", answers: [] }).then(
          () => {},
        )
      }
    />
  );
}

// ─── Switcher ─────────────────────────────────────────────────────────────────

export function QuestionnairePageClient() {
  const { name } = useParams<{ name: string }>();
  if (name === "skill") return <SkillAssessmentFlow />;
  if (name === "advanced") return <AdvancedAssessmentFlow />;
  return <PersonalAssessmentFlow />;
}

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import { AlertCircle } from "lucide-react";

import { QuestionnaireFlow } from "@/components/assessments/questionnaire-flow";
import { Button } from "@/components/ui/button";
import {
  useAssessmentSession,
  usePersonalAssessmentSession,
  useStartAdvancedAssessment,
  useStartPersonalAssessment,
  useStartSkillAssessment,
  useSubmitAdvancedAssessment,
  useSubmitPersonalAssessment,
  useSubmitSkillAssessment,
} from "@/hooks/api";
import {
  mapAdvancedQuestions,
  normalizePersonalQuestions,
  toSubmitAnswers,
} from "@/lib/assessment-questions";
import {
  ApiError,
  authFailureMessage,
  isServiceUnavailableError,
} from "@/lib/api";
import { appToast } from "@/lib/toast";
import type {
  PersonalAssessmentSession,
  SkillAssessmentSession,
} from "@/types/api";
import type { Question } from "@/types/questionnaire";

type SkillStartState = "loading" | "ready" | "unavailable" | "failed";

function AssessmentStartBlocked({
  title,
  message,
  backHref,
}: {
  title: string;
  message: string;
  backHref: string;
}) {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4 px-4 text-center">
      <div
        className="flex size-12 items-center justify-center rounded-full bg-muted"
        aria-hidden
      >
        <AlertCircle className="size-6 text-muted-foreground" />
      </div>
      <div className="flex max-w-md flex-col gap-2">
        <p className="font-sans text-base font-semibold text-foreground">
          {title}
        </p>
        <p className="font-sans text-sm text-muted-foreground">{message}</p>
      </div>
      <Button variant="outline" asChild>
        <Link href={backHref}>Back to assessment</Link>
      </Button>
    </div>
  );
}

// ─── Personal ─────────────────────────────────────────────────────────────────

function PersonalAssessmentFlow() {
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
      isLoading={
        resumeStatus === "pending" ||
        isStarting ||
        (resumeStatus === "success" && !resumeData?.session && !startedSession)
      }
      isSubmitting={isSubmitting}
      prefillAnswers={prefillAnswers}
      onSubmit={(answers) => submitAssessment({ answers }).then(() => {})}
    />
  );
}

// ─── Skill ────────────────────────────────────────────────────────────────────

function SkillAssessmentFlow() {
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
        backHref="/t/assessments/skill"
      />
    );
  }

  if (startState === "failed") {
    return (
      <AssessmentStartBlocked
        title="Couldn't start assessment"
        message="Something went wrong while starting your assessment. Please try again later."
        backHref="/t/assessments/skill"
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

export function QuestionnairePageClient() {
  const { name } = useParams<{ name: string }>();

  if (name === "skill") return <SkillAssessmentFlow />;
  if (name === "advanced") return <AdvancedAssessmentFlow />;
  return <PersonalAssessmentFlow />;
}

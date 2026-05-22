"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { AlertCircle } from "lucide-react";

import { AssessmentStartBlocked } from "@/components/assessments/assessment-start-blocked";
import { QuestionnaireFlow } from "@/components/assessments/questionnaire-flow";
import ViolationDetector from "@/components/assessments/violation-detector";
import { Button } from "@/components/ui/button";
import type { AssessmentSlug } from "@/constants/assessment-previews";
import {
  buildPersonalPrefillAnswers,
  toAdvancedSubmitAnswers,
  toSkillSubmitAnswers,
} from "@/lib/assessment-questions";
import { appToast } from "@/lib/toast";

import { useAssessmentDemoStore } from "../demo-store";
import type { DemoAssessmentPhase } from "../question-slices";
import {
  mockStartAdvancedAssessment,
  mockSubmitAdvancedAssessment,
} from "../services/advanced";
import {
  mockGetPersonalAssessmentSession,
  mockStartPersonalAssessment,
  mockSubmitPersonalAssessment,
} from "../services/personal";
import {
  mockStartSkillAssessment,
  mockSubmitSkillAssessment,
} from "../services/skill";

function DemoPhaseLocked({ slug }: { slug: AssessmentSlug }) {
  const router = useRouter();

  useEffect(() => {
    appToast.error("Complete the previous assessment to unlock this step.");
    router.replace(`/t/assessments/${slug}`);
  }, [router, slug]);

  return (
    <div className="flex min-h-96 items-center justify-center">
      <p className="font-sans text-sm text-muted-foreground">Redirecting…</p>
    </div>
  );
}

function DemoPersonalAssessmentFlow() {
  const [ready, setReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeData, setResumeData] = useState<Awaited<
    ReturnType<typeof mockGetPersonalAssessmentSession>
  > | null>(null);
  const phase = useAssessmentDemoStore((s) => s.phases.personal);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const resume = await mockGetPersonalAssessmentSession();
        if (cancelled) return;

        if (resume.session) {
          setResumeData(resume);
          setReady(true);
          return;
        }

        const start = await mockStartPersonalAssessment();
        if (cancelled) return;

        setResumeData({
          status: "success",
          session: start.session,
          answers: {},
        });
        setReady(true);
      } catch (e) {
        if (!cancelled) {
          appToast.error(e instanceof Error ? e.message : "Failed to start");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const questions = useMemo(() => {
    const activeSession =
      resumeData?.session ??
      (phase.questions.length > 0
        ? {
            sessionId: phase.sessionId ?? "demo",
            generatedAt: new Date().toISOString(),
            source: "demo",
            track: "Software Engineering",
            claimedLevel: "Mid",
            questionCount: phase.questions.length,
            questions: phase.questions,
          }
        : null);

    return activeSession?.questions ?? [];
  }, [resumeData?.session, phase.sessionId, phase.questions]);

  const prefillAnswers = useMemo(
    () => buildPersonalPrefillAnswers(questions, resumeData?.answers),
    [resumeData, questions],
  );

  return (
    <QuestionnaireFlow
      questions={questions}
      isLoading={!ready}
      isSubmitting={isSubmitting}
      prefillAnswers={prefillAnswers}
      onSubmit={async (answers) => {
        setIsSubmitting(true);
        try {
          await mockSubmitPersonalAssessment(answers);
        } finally {
          setIsSubmitting(false);
        }
      }}
    />
  );
}

function DemoSkillAssessmentFlow() {
  const [startFailed, setStartFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phase = useAssessmentDemoStore((s) => s.phases.skill);
  const hasQuestions = phase.questions.length > 0;

  useEffect(() => {
    if (hasQuestions) return;

    let cancelled = false;

    void mockStartSkillAssessment().catch(() => {
      if (!cancelled) setStartFailed(true);
    });

    return () => {
      cancelled = true;
    };
  }, [hasQuestions]);

  const questions = useMemo(() => phase.questions, [phase.questions]);

  const submit = async (answersByKey: Record<string, string | string[]>) => {
    setIsSubmitting(true);
    try {
      await mockSubmitSkillAssessment({
        attempt_id: phase.sessionId ?? "",
        answers: toSkillSubmitAnswers(questions, answersByKey),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (startFailed) {
    return (
      <AssessmentStartBlocked
        title="Couldn't start assessment"
        message="Something went wrong while starting your demo assessment."
        backHref="/t/assessments/skill"
      />
    );
  }

  return (
    <ViolationDetector
      enabled={hasQuestions}
      onViolation={() => {
        window.alert("Violation api triggered");
      }}
    >
      <QuestionnaireFlow
        questions={questions}
        isLoading={!hasQuestions}
        isSubmitting={isSubmitting}
        onSubmit={submit}
      />
    </ViolationDetector>
  );
}

function DemoAdvancedAssessmentFlow() {
  const [startFailed, setStartFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phase = useAssessmentDemoStore((s) => s.phases.advanced);
  const hasQuestions = phase.questions.length > 0;

  useEffect(() => {
    if (hasQuestions) return;

    let cancelled = false;

    void mockStartAdvancedAssessment().catch(() => {
      if (!cancelled) setStartFailed(true);
    });

    return () => {
      cancelled = true;
    };
  }, [hasQuestions]);

  const questions = useMemo(() => phase.questions, [phase.questions]);

  const submit = async (answersByKey: Record<string, string | string[]>) => {
    setIsSubmitting(true);
    try {
      await mockSubmitAdvancedAssessment({
        session_id: phase.sessionId ?? "",
        answers: toAdvancedSubmitAnswers(questions, answersByKey),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (startFailed) {
    return (
      <AssessmentStartBlocked
        title="Couldn't start assessment"
        message="Something went wrong while starting your demo assessment."
        backHref="/t/assessments/advanced"
      />
    );
  }

  return (
    <ViolationDetector
      enabled={hasQuestions}
      onViolation={() => {
        window.alert("Violation api triggered advanced");
      }}
    >
      <QuestionnaireFlow
        questions={questions}
        isLoading={!hasQuestions}
        isSubmitting={isSubmitting}
        initialSeconds={phase.remainingSeconds}
        onSubmit={submit}
      />
    </ViolationDetector>
  );
}

function phaseFromName(name: string): DemoAssessmentPhase | null {
  if (name === "personal" || name === "skill" || name === "advanced") {
    return name;
  }
  return null;
}

export function DemoQuestionnairePageClient() {
  const { name } = useParams<{ name: string }>();
  const phase = phaseFromName(name);
  const status = useAssessmentDemoStore((s) =>
    phase ? s.phases[phase].status : "locked",
  );

  if (!phase) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center gap-4 px-4 text-center">
        <AlertCircle className="size-10 text-muted-foreground" aria-hidden />
        <p className="font-sans text-sm text-muted-foreground">
          Unknown assessment type.
        </p>
        <Button variant="outline" asChild>
          <Link href="/t/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    );
  }

  if (status === "locked") {
    return <DemoPhaseLocked slug={phase} />;
  }

  if (phase === "skill") return <DemoSkillAssessmentFlow />;
  if (phase === "advanced") return <DemoAdvancedAssessmentFlow />;
  return <DemoPersonalAssessmentFlow />;
}

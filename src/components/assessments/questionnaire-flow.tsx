"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

import { QuestionnaireQuestionCard } from "@/components/assessments/questionnaire-question-card";
import {
  QuestionnaireSidebar,
  type QuestionnaireSidebarSection,
} from "@/components/assessments/questionnaire-sidebar";
import { QuestionnaireToolbar } from "@/components/assessments/questionnaire-toolbar";
import { authFailureMessage } from "@/lib/api";
import { buildAnswers, isAnswerValid } from "@/lib/questionnaire";
import { appToast } from "@/lib/toast";
import type { Question } from "@/types/questionnaire";

export type QuestionnaireFlowProps = {
  questions: Question[];
  isLoading: boolean;
  isSubmitting: boolean;
  showTimer?: boolean;
  initialSeconds?: number;
  prefillAnswers?: Record<string, string | string[]>;
  onSubmit: (answers: Record<string, string | string[]>) => Promise<void>;
};

export function QuestionnaireFlow({
  questions,
  isLoading,
  isSubmitting,
  showTimer = false,
  initialSeconds,
  prefillAnswers,
  onSubmit,
}: QuestionnaireFlowProps) {
  const router = useRouter();
  const { name } = useParams<{ name: string }>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    Record<string, string | string[]>
  >({});
  const [otherAnswers, setOtherAnswers] = useState<Record<string, string>>({});

  const answers = { ...prefillAnswers, ...userAnswers };

  const sections = useMemo<QuestionnaireSidebarSection[]>(() => {
    const seen = new Map<number, string>();
    for (const q of questions) {
      if (
        q.sourceSection !== undefined &&
        q.sourceSectionTitle &&
        !seen.has(q.sourceSection)
      ) {
        seen.set(q.sourceSection, q.sourceSectionTitle);
      }
    }
    return Array.from(seen.entries())
      .sort(([a], [b]) => a - b)
      .map(([, title], index) => ({ number: index + 1, title }));
  }, [questions]);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const currentValue = question ? answers[question.id] : undefined;
  const canProceed = question ? isAnswerValid(question, currentValue) : false;

  const activeSectionNumber = useMemo(() => {
    if (!question?.sourceSectionTitle) return 1;
    const idx = sections.findIndex(
      (s) => s.title === question.sourceSectionTitle,
    );
    return idx === -1 ? 1 : idx + 1;
  }, [question, sections]);

  const handleChange = (next: string | string[]) => {
    if (!question) return;
    setUserAnswers((prev) => ({ ...prev, [question.id]: next }));
  };

  const handleOtherChange = (next: string) => {
    if (!question) return;
    setOtherAnswers((prev) => ({ ...prev, [question.id]: next }));
  };

  const handleBack = () => setCurrentIndex((i) => Math.max(0, i - 1));

  const handleNext = async () => {
    if (!question || !canProceed || isSubmitting) return;
    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      return;
    }
    try {
      await onSubmit(buildAnswers(questions, answers, otherAnswers));
      router.push(`/t/assessments/${name}/summary`);
    } catch (e) {
      appToast.error(authFailureMessage(e));
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="font-sans text-sm text-muted-foreground">
          Loading assessment...
        </p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="font-sans text-sm text-muted-foreground">
          No questions available.
        </p>
      </div>
    );
  }

  return (
    <div>
      <QuestionnaireToolbar
        showTimer={showTimer}
        initialSeconds={initialSeconds}
      />
      <div className="mx-auto flex max-w-300 flex-col gap-6 pb-10 lg:flex-row lg:items-start lg:gap-10">
        <QuestionnaireSidebar
          sections={sections}
          activeSectionNumber={activeSectionNumber}
        />
        <QuestionnaireQuestionCard
          question={question}
          value={currentValue}
          otherValue={otherAnswers[question.id] ?? ""}
          onChange={handleChange}
          onOtherChange={handleOtherChange}
          onNext={handleNext}
          onBack={handleBack}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          isLast={isLast}
          showBack={currentIndex > 0}
          nextDisabled={!canProceed}
          nextLoading={isSubmitting}
        />
      </div>
    </div>
  );
}

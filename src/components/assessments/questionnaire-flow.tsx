"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionnaireMobileActions } from "@/components/assessments/questionnaire-mobile-actions";
import { QuestionnaireMobileHeader } from "@/components/assessments/questionnaire-mobile-header";
import { hasOtherReveal } from "@/components/assessments/questionnaire-question-field-body";
import { QuestionnaireQuestionCard } from "@/components/assessments/questionnaire-question-card";
import { QuestionnaireSidebar } from "@/components/assessments/questionnaire-sidebar";
import {
  QuestionnaireEmptyState,
  QuestionnaireLoadingState,
} from "@/components/assessments/questionnaire-states";
import { QuestionnaireToolbar } from "@/components/assessments/questionnaire-toolbar";
import { isAssessmentSlug } from "@/constants/assessment-previews";
import { ASSESSMENT_DEFAULT_DURATION_SECONDS } from "@/constants/question-bank";
import { authFailureMessage } from "@/lib/api";
import { buildAnswers, isAnswerValid } from "@/lib/questionnaire";
import { appToast } from "@/lib/toast";
import { useMe } from "@/hooks/api";
import { useCountdown } from "@/hooks/use-countdown";
import { useQuestionTimer } from "@/hooks/use-question-timer";
import { useQuestionnaireSections } from "@/hooks/use-questionnaire-sections";
import { useAssessmentSummaryStore } from "@/stores/assessment-summary-store";
import type { Question } from "@/types/questionnaire";

/**
 * Minimum character count for the free-text "Other" follow-up. A single
 * character isn't a meaningful answer ("X") and tends to mean the user
 * tapped Next by accident — bump the floor so the form pushes back.
 */
const OTHER_MIN_LENGTH = 2;

export type QuestionnaireFlowProps = {
  questions: Question[];
  isLoading: boolean;
  isSubmitting: boolean;
  initialSeconds?: number;
  prefillAnswers?: Record<string, string | string[]>;
  totalQuestions?: number;
  onSubmit: (
    answers: Record<string, string | string[]>,
    timeSpentByKey?: Record<string, number>,
  ) => Promise<unknown>;
  onLastQuestionAdvance?: (
    question: Question,
    answers: Record<string, string | string[]>,
    timeSpentByKey: Record<string, number>,
  ) => Promise<boolean>;
};

export function QuestionnaireFlow({
  questions,
  isLoading,
  isSubmitting,
  initialSeconds,
  prefillAnswers,
  totalQuestions,
  onSubmit,
  onLastQuestionAdvance,
}: QuestionnaireFlowProps) {
  const router = useRouter();
  const { name } = useParams<{ name: string }>();
  const { data: user } = useMe({ enabled: true });
  const setSummaryResult = useAssessmentSummaryStore(
    (state) => state.setResult,
  );
  const clearSummaryResult = useAssessmentSummaryStore(
    (state) => state.clearResult,
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    Record<string, string | string[]>
  >({});
  const [otherAnswers, setOtherAnswers] = useState<Record<string, string>>({});

  const showTimer = name !== "personal";
  const tickingSeconds = useCountdown(
    initialSeconds ?? ASSESSMENT_DEFAULT_DURATION_SECONDS,
    showTimer && !isLoading,
  );
  const secondsLeft = showTimer ? tickingSeconds : undefined;

  const answers = { ...prefillAnswers, ...userAnswers };

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const displayedTotal = totalQuestions ?? questions.length;
  const displayedIsLast = currentIndex === displayedTotal - 1;

  // Tracks per-question elapsed time + captures the "ready" start moment.
  const timer = useQuestionTimer(question, !isLoading);

  // Sidebar section list + the "which section is active right now" index.
  const { sections, activeSectionNumber } = useQuestionnaireSections(
    questions,
    name,
    question,
  );

  const currentValue = question ? answers[question.id] : undefined;
  const currentOther = question ? (otherAnswers[question.id] ?? "") : "";

  const otherSatisfied =
    !question ||
    !hasOtherReveal(question, currentValue) ||
    currentOther.trim().length >= OTHER_MIN_LENGTH;
  const canProceed = question
    ? isAnswerValid(question, currentValue) && otherSatisfied
    : false;

  const handleChange = (next: string | string[]) => {
    if (!question) return;
    setUserAnswers((prev) => ({ ...prev, [question.id]: next }));
  };

  const handleOtherChange = (next: string) => {
    if (!question) return;
    setOtherAnswers((prev) => ({ ...prev, [question.id]: next }));
  };

  const handleBack = () => {
    timer.accumulate();
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = async () => {
    if (!question || !canProceed || isSubmitting) return;

    timer.accumulate();

    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      return;
    }

    const builtAnswers = buildAnswers(questions, answers, otherAnswers);
    const builtTimeByKey = timer.buildByKey(questions);

    try {
      if (onLastQuestionAdvance) {
        const intercepted = await onLastQuestionAdvance(
          question,
          builtAnswers,
          builtTimeByKey,
        );
        if (intercepted) {
          timer.resetStart();
          setCurrentIndex((i) => i + 1);
          return;
        }
      }
      const result = await onSubmit(builtAnswers, builtTimeByKey);
      if (isAssessmentSlug(name) && name !== "advanced" && user?.id) {
        if (result != null) {
          setSummaryResult(user.id, name, result);
        } else {
          clearSummaryResult(user.id, name);
        }
      }
      router.push(`/t/assessments/${name}/summary`);
    } catch (e) {
      appToast.error(authFailureMessage(e));
    }
  };

  if (isLoading) return <QuestionnaireLoadingState />;
  if (!question) return <QuestionnaireEmptyState />;

  const overallProgress =
    displayedTotal > 0 ? (currentIndex + 1) / displayedTotal : 0;
  const mobileSectionTitle =
    sections[activeSectionNumber - 1]?.title ?? "Assessment";

  return (
    <div className="pb-32 lg:pb-0">
      <QuestionnaireMobileHeader
        sectionTitle={mobileSectionTitle}
        progress={overallProgress}
        secondsLeft={secondsLeft}
        className="lg:hidden"
      />
      <div className="hidden lg:block">
        <QuestionnaireToolbar secondsLeft={secondsLeft} />
      </div>
      <div className="mx-auto flex max-w-300 flex-col gap-6 pb-10 lg:flex-row lg:items-start lg:gap-10">
        <div className="hidden lg:block">
          <QuestionnaireSidebar
            sections={sections}
            activeSectionNumber={activeSectionNumber}
          />
        </div>
        <QuestionnaireQuestionCard
          question={question}
          value={currentValue}
          otherValue={otherAnswers[question.id] ?? ""}
          onChange={handleChange}
          onOtherChange={handleOtherChange}
          onNext={handleNext}
          onBack={handleBack}
          questionNumber={currentIndex + 1}
          totalQuestions={displayedTotal}
          isLast={displayedIsLast}
          showBack={currentIndex > 0}
          nextDisabled={!canProceed}
          nextLoading={isSubmitting}
        />
      </div>
      <QuestionnaireMobileActions
        questionNumber={currentIndex + 1}
        totalQuestions={displayedTotal}
        onBack={handleBack}
        onNext={handleNext}
        isLast={displayedIsLast}
        showBack={currentIndex > 0}
        nextDisabled={!canProceed}
        nextLoading={isSubmitting}
        className="lg:hidden"
      />
    </div>
  );
}

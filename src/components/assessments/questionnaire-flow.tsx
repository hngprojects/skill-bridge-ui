"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { FileEmpty01Icon, Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { QuestionnaireMobileActions } from "@/components/assessments/questionnaire-mobile-actions";
import { QuestionnaireMobileHeader } from "@/components/assessments/questionnaire-mobile-header";
import { hasOtherReveal } from "@/components/assessments/questionnaire-question-field-body";
import { QuestionnaireQuestionCard } from "@/components/assessments/questionnaire-question-card";
import {
  QuestionnaireSidebar,
  type QuestionnaireSidebarSection,
} from "@/components/assessments/questionnaire-sidebar";
import { QuestionnaireToolbar } from "@/components/assessments/questionnaire-toolbar";
import {
  ASSESSMENT_FALLBACK_SECTION_TITLES,
  isAssessmentSlug,
} from "@/constants/assessment-previews";
import { ASSESSMENT_DEFAULT_DURATION_SECONDS } from "@/constants/question-bank";
import { authFailureMessage } from "@/lib/api";
import { buildAnswers, isAnswerValid } from "@/lib/questionnaire";
import { appToast } from "@/lib/toast";
import { useMe } from "@/hooks/api";
import { useCountdown } from "@/hooks/use-countdown";
import { useAssessmentSummaryStore } from "@/stores/assessment-summary-store";
import type { Question } from "@/types/questionnaire";

export type QuestionnaireFlowProps = {
  questions: Question[];
  isLoading: boolean;
  isSubmitting: boolean;
  initialSeconds?: number;
  prefillAnswers?: Record<string, string | string[]>;
  /**
   * Called on the final question's Next click. `timeSpentByKey` mirrors
   * `answers` (keyed by `question.key`) and carries the seconds the user
   * actively spent on each question — accumulated as they move through and
   * sent to the backend so the AI grader can flag low-integrity rushes.
   */
  onSubmit: (
    answers: Record<string, string | string[]>,
    timeSpentByKey?: Record<string, number>,
  ) => Promise<unknown>;
  /**
   * Optional hook for flows that need to do server work mid-questionnaire
   * (e.g. the advanced assessment's LT-2 → LT-3 synthesis). When the user
   * clicks Next on what the flow currently thinks is the last question, this
   * is awaited first. If it returns `true`, the parent is expected to have
   * appended new questions to the `questions` prop — the flow then advances
   * to the next index instead of calling `onSubmit` / navigating away.
   *
   * Errors thrown here surface as the same toast `onSubmit` errors do, and
   * the user stays on the current question to retry.
   */
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

  // Per-question elapsed time. Both the accumulated seconds map and the
  // "current question started at" timestamp live in refs so updates don't
  // churn renders and Date.now() never runs during render (which would trip
  // react-hooks/purity). The start ref stays `null` while the questionnaire
  // is loading and is captured by the effect below the first time it's
  // ready — so the first question's bucket doesn't include loading time.
  const timeSpentRef = useRef<Record<string, number>>({});
  const questionStartRef = useRef<number | null>(null);

  // Single source of truth for the questionnaire timer — desktop toolbar and
  // mobile header both read this value, so only one interval ticks. Disabled
  // while loading so the user doesn't lose seconds before the first question
  // even renders; the hook re-syncs once `initialSeconds` arrives.
  const showTimer = name !== "personal";
  const tickingSeconds = useCountdown(
    initialSeconds ?? ASSESSMENT_DEFAULT_DURATION_SECONDS,
    showTimer && !isLoading,
  );
  const secondsLeft = showTimer ? tickingSeconds : undefined;

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
    const built = Array.from(seen.entries())
      .sort(([a], [b]) => a - b)
      .map(([, title], index) => ({ number: index + 1, title }));

    if (built.length === 0) {
      const fallback = isAssessmentSlug(name)
        ? ASSESSMENT_FALLBACK_SECTION_TITLES[name]
        : "Assessment";
      return [{ number: 1, title: fallback }];
    }
    return built;
  }, [questions, name]);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  // Capture the moment the questionnaire first becomes interactive (loading
  // finished + a question is mounted) so the first question's elapsed time
  // doesn't include the loading screen. Ref mutation + Date.now() inside an
  // effect is compiler-clean (unlike the same combo during render).
  useEffect(() => {
    if (!isLoading && question && questionStartRef.current === null) {
      questionStartRef.current = Date.now();
    }
  }, [isLoading, question]);

  const currentValue = question ? answers[question.id] : undefined;
  const currentOther = question ? (otherAnswers[question.id] ?? "") : "";
  // When the question's "other" path is triggered, the revealed textarea
  // must also have non-empty content before Next is enabled.
  const otherSatisfied =
    !question ||
    !hasOtherReveal(question, currentValue) ||
    currentOther.trim().length > 0;
  const canProceed = question
    ? isAnswerValid(question, currentValue) && otherSatisfied
    : false;

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

  const accumulateTimeForCurrentQuestion = () => {
    if (!question) return;
    // Effect hasn't captured a start yet (questionnaire still loading).
    if (questionStartRef.current === null) return;
    const now = Date.now();
    const elapsed = Math.floor((now - questionStartRef.current) / 1000);
    if (elapsed > 0) {
      timeSpentRef.current = {
        ...timeSpentRef.current,
        [question.id]: (timeSpentRef.current[question.id] ?? 0) + elapsed,
      };
    }
    questionStartRef.current = now;
  };

  const buildTimeSpentByKey = (): Record<string, number> => {
    const result: Record<string, number> = {};
    for (const q of questions) {
      const t = timeSpentRef.current[q.id];
      if (t != null) result[q.key] = t;
    }
    return result;
  };

  const handleBack = () => {
    accumulateTimeForCurrentQuestion();
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = async () => {
    if (!question || !canProceed || isSubmitting) return;

    accumulateTimeForCurrentQuestion();

    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      return;
    }

    const builtAnswers = buildAnswers(questions, answers, otherAnswers);
    const builtTimeByKey = buildTimeSpentByKey();

    try {
      if (onLastQuestionAdvance) {
        const intercepted = await onLastQuestionAdvance(
          question,
          builtAnswers,
          builtTimeByKey,
        );
        if (intercepted) {
          // Parent appended new question(s) to `questions`. Reset the
          // start clock so the LLM round-trip doesn't get charged to the
          // freshly-appended question's time bucket.
          questionStartRef.current = Date.now();
          setCurrentIndex((i) => i + 1);
          return;
        }
      }
      const result = await onSubmit(builtAnswers, builtTimeByKey);
      if (isAssessmentSlug(name) && user?.id) {
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

  if (isLoading) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center gap-4">
        <HugeiconsIcon
          icon={Loading03Icon}
          size={40}
          strokeWidth={1.5}
          className="animate-spin text-muted-foreground/50"
          aria-hidden
        />
        <p className="font-sans text-sm text-muted-foreground">
          Preparing your assessment…
        </p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center gap-4">
        <HugeiconsIcon
          icon={FileEmpty01Icon}
          size={40}
          strokeWidth={1.5}
          className="text-muted-foreground/40"
          aria-hidden
        />
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-sans text-sm font-medium text-foreground">
            No questions available
          </p>
          <p className="font-sans text-xs text-muted-foreground">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const overallProgress =
    questions.length > 0 ? (currentIndex + 1) / questions.length : 0;
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
          totalQuestions={questions.length}
          isLast={isLast}
          showBack={currentIndex > 0}
          nextDisabled={!canProceed}
          nextLoading={isSubmitting}
        />
      </div>
      <QuestionnaireMobileActions
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        onBack={handleBack}
        onNext={handleNext}
        isLast={isLast}
        showBack={currentIndex > 0}
        nextDisabled={!canProceed}
        nextLoading={isSubmitting}
        className="lg:hidden"
      />
    </div>
  );
}

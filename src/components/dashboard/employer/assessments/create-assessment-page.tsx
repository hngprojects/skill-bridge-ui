"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { QuestionnaireMobileActions } from "@/components/assessments/questionnaire-mobile-actions";
import {
  CREATE_ASSESSMENT_STEP_META,
  CREATE_ASSESSMENT_STEPS,
  DEFAULT_SELECTED_QUESTION_IDS,
  DEFAULT_WELCOME_MESSAGE_HTML,
  type AssessmentGuidelineId,
  type AssessmentQuestionOptionId,
  type CreateAssessmentStepId,
} from "@/constants/create-assessment-wizard";
import { buildAssessmentHeaderSubtitle } from "@/lib/create-assessment-utils";

import { CreateAssessmentDetailsStep } from "./create-assessment-details-step";
import { CreateAssessmentQuestionsStep } from "./create-assessment-questions-step";
import { CreateAssessmentHeader } from "./create-assessment-header";
import { CreateAssessmentMobileProgress } from "./create-assessment-mobile-progress";
import { CreateAssessmentSidebar } from "./create-assessment-sidebar";
import { CreateAssessmentStepCard } from "./create-assessment-step-card";

type AssessmentWizardState = {
  welcomeMessageHtml: string;
  guidelines: Record<AssessmentGuidelineId, boolean>;
  selectedQuestionIds: AssessmentQuestionOptionId[];
};

const INITIAL_GUIDELINES: Record<AssessmentGuidelineId, boolean> = {
  attempts: true,
  timeout: true,
  captcha: true,
};

const INITIAL_STATE: AssessmentWizardState = {
  welcomeMessageHtml: DEFAULT_WELCOME_MESSAGE_HTML,
  guidelines: INITIAL_GUIDELINES,
  selectedQuestionIds: DEFAULT_SELECTED_QUESTION_IDS,
};

export function CreateAssessmentPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const title = searchParams.get("title") ?? "New assessment";
  const category = searchParams.get("category") ?? "";
  const deadlineParam = searchParams.get("deadline");

  const [currentStepId, setCurrentStepId] =
    useState<CreateAssessmentStepId>("details");
  const [wizardState, setWizardState] =
    useState<AssessmentWizardState>(INITIAL_STATE);

  const selectedQuestionIds =
    wizardState.selectedQuestionIds ?? DEFAULT_SELECTED_QUESTION_IDS;

  const currentStepIndex = CREATE_ASSESSMENT_STEPS.findIndex(
    (step) => step.id === currentStepId,
  );
  const isLastStep = currentStepIndex === CREATE_ASSESSMENT_STEPS.length - 1;
  const meta = CREATE_ASSESSMENT_STEP_META[currentStepId];
  const nextDisabled =
    currentStepId === "questions" && selectedQuestionIds.length === 0;

  const headerSubtitle = useMemo(() => {
    const deadline = deadlineParam ? new Date(deadlineParam) : undefined;
    return buildAssessmentHeaderSubtitle(category, deadline);
  }, [category, deadlineParam]);

  const handleGuidelineChange = (
    guidelineId: AssessmentGuidelineId,
    checked: boolean,
  ) => {
    setWizardState((state) => ({
      ...state,
      guidelines: { ...state.guidelines, [guidelineId]: checked },
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      toast("Assessment publishing is coming soon.");
      router.push("/e/assessments");
      return;
    }

    setCurrentStepId(CREATE_ASSESSMENT_STEPS[currentStepIndex + 1].id);
  };

  const handleBack = () => {
    if (currentStepIndex === 0) return;
    setCurrentStepId(CREATE_ASSESSMENT_STEPS[currentStepIndex - 1].id);
  };

  const stepContent = (() => {
    if (currentStepId === "details") {
      return (
        <CreateAssessmentDetailsStep
          welcomeMessageHtml={wizardState.welcomeMessageHtml}
          onWelcomeMessageChange={(welcomeMessageHtml) =>
            setWizardState((state) => ({ ...state, welcomeMessageHtml }))
          }
          guidelines={wizardState.guidelines}
          onGuidelineChange={handleGuidelineChange}
        />
      );
    }

    if (currentStepId === "questions") {
      return (
        <CreateAssessmentQuestionsStep
          selectedQuestionIds={selectedQuestionIds}
          onSelectionChange={(nextSelectedQuestionIds) =>
            setWizardState((state) => ({
              ...state,
              selectedQuestionIds: nextSelectedQuestionIds,
            }))
          }
        />
      );
    }

    return (
      <p className="font-sans text-sm text-[#667085]">
        Preview for assessment {id} is coming soon.
      </p>
    );
  })();

  return (
    <div className="pb-32 lg:pb-10">
      <div className="hidden lg:block">
        <CreateAssessmentHeader title={title} subtitle={headerSubtitle} />
      </div>

      <CreateAssessmentMobileProgress currentStepIndex={currentStepIndex} />

      <div className="mx-auto flex max-w-300 flex-col gap-6 pb-10 lg:flex-row lg:items-start lg:gap-10">
        <div className="hidden lg:block">
          <CreateAssessmentSidebar currentStepIndex={currentStepIndex} />
        </div>

        <CreateAssessmentStepCard
          title={meta.title}
          description={meta.description}
          currentStepIndex={currentStepIndex}
          isLastStep={isLastStep}
          showBack={currentStepIndex > 0}
          onBack={handleBack}
          onNext={handleNext}
          nextDisabled={nextDisabled}
        >
          {stepContent}
        </CreateAssessmentStepCard>
      </div>

      <QuestionnaireMobileActions
        questionNumber={currentStepIndex + 1}
        totalQuestions={CREATE_ASSESSMENT_STEPS.length}
        onBack={currentStepIndex > 0 ? handleBack : undefined}
        onNext={handleNext}
        isLast={isLastStep}
        showBack={currentStepIndex > 0}
        nextDisabled={nextDisabled}
        className="lg:hidden"
      />
    </div>
  );
}

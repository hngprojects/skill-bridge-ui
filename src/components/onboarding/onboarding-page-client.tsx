"use client";

import * as React from "react";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import CompleteProfileStep from "@/components/onboarding/steps/complete-profile-step";
import { GenerateRoadmapStep } from "@/components/onboarding/steps/generating-step";
import { SetGoalStep } from "@/components/onboarding/steps/set-goal-step";
import { SelectTrackStep } from "@/components/onboarding/steps/select-track-step";
import {
  ONBOARDING_STEPS,
  type OnboardingStepId,
} from "@/constants/talent-onboarding";
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";

function stepIndex(id: OnboardingStepId): number {
  return ONBOARDING_STEPS.findIndex((s) => s.id === id);
}

function OnboardingPageClient() {
  const { fullName: userName, isLoading: isSessionLoading } =
    useSessionUserProfile();
  const [currentStepId, setCurrentStepId] =
    React.useState<OnboardingStepId>("set-goal");
  const [canGoNext, setCanGoNext] = React.useState(false);

  const i = stepIndex(currentStepId);
  const isFirst = i <= 0;
  const isLast = i >= ONBOARDING_STEPS.length - 1;

  const goNext = () => {
    if (isLast || !canGoNext) return;
    setCanGoNext(false);
    setCurrentStepId(ONBOARDING_STEPS[i + 1].id as OnboardingStepId);
  };

  const goBack = () => {
    if (isFirst) return;
    setCanGoNext(false);
    setCurrentStepId(ONBOARDING_STEPS[i - 1].id as OnboardingStepId);
  };

  let title: React.ReactNode | undefined;
  let description: React.ReactNode | undefined;
  let content: React.ReactNode;

  switch (currentStepId) {
    case "set-goal":
      title =
        !isSessionLoading && userName ? `Hello, ${userName}! 👋` : "Hello! 👋";
      description =
        "Help us personalize your experience using our app. Get started by telling us your goal.";
      content = (
        <SetGoalStep onSelectionChange={(id) => setCanGoNext(Boolean(id))} />
      );
      break;
    case "select-track":
      description =
        "Choose the path that best matches how you want to use SkillBridge.";
      content = (
        <SelectTrackStep
          onSelectionChange={(ids) => setCanGoNext(ids.length > 0)}
        />
      );
      break;
    case "complete-profile":
      title = "Great choice! Tell us about yourself";
      description =
        "Please provide your details below to help us verify your identity and customize your learning journey.";
      content = <CompleteProfileStep onReadyChange={setCanGoNext} />;
      break;
    case "generate-roadmap":
      title = "Generating assessments...";
      description =
        "We will build a personalized roadmap based on your goal and track.";
      content = <GenerateRoadmapStep />;
      break;
    default:
      title = undefined;
      description = undefined;
      content = null;
  }

  return (
    <OnboardingShell
      currentStepId={currentStepId}
      title={title}
      description={description}
      onNext={goNext}
      onBack={goBack}
      showBack={!isFirst}
      showNext={!isLast}
      nextDisabled={!canGoNext}
    >
      {content}
    </OnboardingShell>
  );
}

export { OnboardingPageClient };

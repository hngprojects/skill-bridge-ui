"use client";

import * as React from "react";
// import { useSession } from "next-auth/react";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import CompleteProfileStep from "@/components/onboarding/steps/complete-profile-step";
import { GenerateRoadmapStep } from "@/components/onboarding/steps/generating-step";
import { SetGoalStep } from "@/components/onboarding/steps/set-goal-step";
import { SelectTrackStep } from "@/components/onboarding/steps/select-track-step";
import {
  ONBOARDING_STEPS,
  type OnboardingStepId,
  // type GoalOptionId,
  // type TrackOptionId,
} from "@/constants/talent-onboarding";

function stepIndex(id: OnboardingStepId): number {
  return ONBOARDING_STEPS.findIndex((s) => s.id === id);
}

function OnboardingPageClient() {
  // const { data: session } = useSession();

  const [currentStepId, setCurrentStepId] =
    React.useState<OnboardingStepId>("set-goal");

  // const [selectedGoalId, setSelectedGoalId] =
  //   React.useState<GoalOptionId | "">("");
  // const [selectedTrackIds, setSelectedTrackIds] =
  //   React.useState<TrackOptionId[]>([]);

  const i = stepIndex(currentStepId);
  const isFirst = i <= 0;
  const isLast = i >= ONBOARDING_STEPS.length - 1;

  const goNext = () => {
    if (isLast) return;
    setCurrentStepId(ONBOARDING_STEPS[i + 1].id as OnboardingStepId);
  };

  const goBack = () => {
    if (isFirst) return;
    setCurrentStepId(ONBOARDING_STEPS[i - 1].id as OnboardingStepId);
  };

  let title: React.ReactNode | undefined;
  let description: React.ReactNode | undefined;
  let content: React.ReactNode;

  switch (currentStepId) {
    case "set-goal":
      title = `Hello, Alex Smith! 👋`;
      description =
        "Help us personalize your experience using our app. Get started by telling us your goal.";
      content = <SetGoalStep />;
      break;
    case "select-track":
      description =
        "Choose the path that best matches how you want to use SkillBridge.";
      content = <SelectTrackStep />;
      break;
    case "complete-profile":
      title = "Great choice! Tell us about yourself";
      description =
        "Please provide your details below to help us verify your identity and customize your learning journey.";
      content = <CompleteProfileStep />;
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
      nextDisabled={false}
    >
      {content}
    </OnboardingShell>
  );
}

export { OnboardingPageClient };

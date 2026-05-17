"use client";

import * as React from "react";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import CompleteProfileStep from "@/components/onboarding/steps/complete-profile-step";
import { GenerateRoadmapStep } from "@/components/onboarding/steps/generating-step";
import { SetGoalStep } from "@/components/onboarding/steps/set-goal-step";
import { SelectTrackStep } from "@/components/onboarding/steps/select-track-step";
import {
  goalIdToApiGoal,
  ONBOARDING_STEPS,
  trackIdsToApiRoleTracks,
  type GoalOptionId,
  type OnboardingStepId,
  type TrackOptionId,
} from "@/constants/talent-onboarding";
import {
  useSaveTalentOnboardingGoal,
  useSaveTalentOnboardingTrack,
  useUpdateTalentOnboardingGoal,
  useUpdateTalentOnboardingTracks,
} from "@/hooks/api";
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";

function stepIndex(id: OnboardingStepId): number {
  return ONBOARDING_STEPS.findIndex((s) => s.id === id);
}

function OnboardingPageClient() {
  const { fullName: userName, isLoading: isSessionLoading } =
    useSessionUserProfile();

  const [currentStepId, setCurrentStepId] =
    React.useState<OnboardingStepId>("set-goal");
  const [canGoNext, setCanGoNext] = React.useState(false);
  const [selectedGoalId, setSelectedGoalId] = React.useState<
    GoalOptionId | undefined
  >();
  const [selectedTrackIds, setSelectedTrackIds] = React.useState<
    TrackOptionId[]
  >([]);
  const [goalSaved, setGoalSaved] = React.useState(false);
  const [tracksSaved, setTracksSaved] = React.useState(false);

  const { mutateAsync: saveGoal, isPending: isSavingGoal } =
    useSaveTalentOnboardingGoal();
  const { mutateAsync: updateGoal, isPending: isUpdatingGoal } =
    useUpdateTalentOnboardingGoal();
  const { mutateAsync: saveTrack, isPending: isSavingTrack } =
    useSaveTalentOnboardingTrack();
  const { mutateAsync: updateTracks, isPending: isUpdatingTracks } =
    useUpdateTalentOnboardingTracks();

  const isSaving =
    isSavingGoal || isUpdatingGoal || isSavingTrack || isUpdatingTracks;

  const i = stepIndex(currentStepId);
  const isFirst = i <= 0;
  const isLast = i >= ONBOARDING_STEPS.length - 1;

  const advanceStep = () => {
    setCanGoNext(false);
    setCurrentStepId(ONBOARDING_STEPS[i + 1].id as OnboardingStepId);
  };

  const goNext = async () => {
    if (isLast || !canGoNext || isSaving) return;

    try {
      if (currentStepId === "set-goal" && selectedGoalId) {
        const body = { goal: goalIdToApiGoal(selectedGoalId) };
        if (goalSaved) {
          await updateGoal(body);
        } else {
          await saveGoal(body);
          setGoalSaved(true);
        }
        advanceStep();
        return;
      }

      if (currentStepId === "select-track" && selectedTrackIds.length > 0) {
        const apiTracks = trackIdsToApiRoleTracks(selectedTrackIds);
        if (tracksSaved) {
          await updateTracks({ roleTracks: apiTracks });
        } else {
          for (const track of apiTracks) {
            await saveTrack({ track });
          }
          setTracksSaved(true);
        }
        advanceStep();
        return;
      }

      advanceStep();
    } catch (error) {
      appToast.error(authFailureMessage(error));
    }
  };

  const goBack = () => {
    if (isFirst || isSaving) return;

    const prevStepId = ONBOARDING_STEPS[i - 1].id as OnboardingStepId;
    setCurrentStepId(prevStepId);

    if (prevStepId === "set-goal") {
      setCanGoNext(Boolean(selectedGoalId));
    } else if (prevStepId === "select-track") {
      setCanGoNext(selectedTrackIds.length > 0);
    } else {
      setCanGoNext(false);
    }
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
        <SetGoalStep
          value={selectedGoalId}
          onValueChange={(id) => {
            setSelectedGoalId(id);
            setCanGoNext(Boolean(id));
          }}
        />
      );
      break;
    case "select-track":
      description =
        "Choose the path that best matches how you want to use SkillBridge.";
      content = (
        <SelectTrackStep
          value={selectedTrackIds}
          onValueChange={(ids) => {
            setSelectedTrackIds(ids);
            setCanGoNext(ids.length > 0);
          }}
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
      nextLoading={isSaving}
    >
      {content}
    </OnboardingShell>
  );
}

export { OnboardingPageClient };

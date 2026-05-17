"use client";

import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { Spinner } from "@/components/ui/spinner";
import CompleteProfileStep from "@/components/onboarding/steps/complete-profile-step";
import { GenerateRoadmapStep } from "@/components/onboarding/steps/generating-step";
import { SetGoalStep } from "@/components/onboarding/steps/set-goal-step";
import { SelectTrackStep } from "@/components/onboarding/steps/select-track-step";
import {
  goalIdToApiGoal,
  ONBOARDING_STEPS,
  resumeOnboardingStepFromSelections,
  trackIdsToApiRoleTracks,
  type OnboardingStepId,
} from "@/constants/talent-onboarding";
import {
  useSaveTalentOnboardingGoal,
  useSaveTalentOnboardingTrack,
  useTalentOnboardingState,
  useUpdateTalentOnboardingGoal,
  useUpdateTalentOnboardingTracks,
} from "@/hooks/api";
import { talentOnboardingKeys } from "@/hooks/api/keys";
import { useTalentOnboardingStoreHydrated } from "@/hooks/use-talent-onboarding-store-hydrated";
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import { useTalentOnboardingStore } from "@/stores/talent-onboarding-store";

function stepIndex(id: OnboardingStepId): number {
  return ONBOARDING_STEPS.findIndex((s) => s.id === id);
}

function hasPersistedGoal(
  state: { goal?: string | null } | undefined,
): boolean {
  return Boolean(state?.goal);
}

function hasPersistedTracks(
  state: { roleTracks?: string[] | null } | undefined,
): boolean {
  return (state?.roleTracks?.length ?? 0) > 0;
}

function OnboardingPageClient() {
  const { fullName: userName, isLoading: isSessionLoading } =
    useSessionUserProfile();
  const queryClient = useQueryClient();
  const storeHydrated = useTalentOnboardingStoreHydrated();
  const {
    selectedGoalId,
    selectedTrackIds,
    currentStepId,
    setSelectedGoalId,
    setSelectedTrackIds,
    setCurrentStepId,
    mergeFromServer,
  } = useTalentOnboardingStore();

  const {
    data: onboardingState,
    isPending: isOnboardingStateLoading,
    isFetched: isOnboardingStateFetched,
  } = useTalentOnboardingState();

  const [profileStepReady, setProfileStepReady] = React.useState(false);

  React.useEffect(() => {
    if (!isOnboardingStateFetched || onboardingState === undefined) return;
    mergeFromServer(onboardingState);
  }, [isOnboardingStateFetched, onboardingState, mergeFromServer]);

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
  const isResolvingPersistedState = isOnboardingStateLoading;

  const activeStepId: OnboardingStepId =
    currentStepId ??
    resumeOnboardingStepFromSelections(
      selectedGoalId ?? undefined,
      selectedTrackIds,
    );

  const effectiveGoalId = selectedGoalId ?? undefined;
  const effectiveTrackIds = selectedTrackIds;

  const canGoNext = React.useMemo(() => {
    switch (activeStepId) {
      case "set-goal":
        return Boolean(effectiveGoalId);
      case "select-track":
        return effectiveTrackIds.length > 0;
      case "complete-profile":
        return profileStepReady;
      default:
        return false;
    }
  }, [
    activeStepId,
    effectiveGoalId,
    effectiveTrackIds.length,
    profileStepReady,
  ]);

  const i = stepIndex(activeStepId);
  const isFirst = i <= 0;
  const isLast = i >= ONBOARDING_STEPS.length - 1;

  const advanceStep = () => {
    setCurrentStepId(ONBOARDING_STEPS[i + 1].id as OnboardingStepId);
  };

  const goNext = async () => {
    if (isLast || !canGoNext || isSaving || isResolvingPersistedState) return;

    try {
      if (activeStepId === "set-goal" && effectiveGoalId) {
        const body = { goal: goalIdToApiGoal(effectiveGoalId) };
        if (hasPersistedGoal(onboardingState)) {
          await updateGoal(body);
        } else {
          await saveGoal(body);
        }
        await queryClient.refetchQueries({
          queryKey: talentOnboardingKeys.state(),
        });
        advanceStep();
        return;
      }

      if (activeStepId === "select-track" && effectiveTrackIds.length > 0) {
        const apiTracks = trackIdsToApiRoleTracks(effectiveTrackIds);
        if (hasPersistedTracks(onboardingState)) {
          await updateTracks({ roleTracks: apiTracks });
        } else {
          for (const track of apiTracks) {
            await saveTrack({ track });
          }
        }
        await queryClient.refetchQueries({
          queryKey: talentOnboardingKeys.state(),
        });
        advanceStep();
        return;
      }

      advanceStep();
    } catch (error) {
      appToast.error(authFailureMessage(error));
    }
  };

  const goBack = () => {
    if (isFirst || isSaving || isResolvingPersistedState) return;
    setCurrentStepId(ONBOARDING_STEPS[i - 1].id as OnboardingStepId);
  };

  let title: React.ReactNode | undefined;
  let description: React.ReactNode | undefined;
  let content: React.ReactNode;

  switch (activeStepId) {
    case "set-goal":
      title =
        !isSessionLoading && userName ? `Hello, ${userName}! 👋` : "Hello! 👋";
      description =
        "Help us personalize your experience using our app. Get started by telling us your goal.";
      content = (
        <SetGoalStep
          value={effectiveGoalId}
          onValueChange={setSelectedGoalId}
        />
      );
      break;
    case "select-track":
      description =
        "Choose the path that best matches how you want to use SkillBridge.";
      content = (
        <SelectTrackStep
          value={effectiveTrackIds}
          onValueChange={setSelectedTrackIds}
        />
      );
      break;
    case "complete-profile":
      title = "Great choice! Tell us about yourself";
      description =
        "Please provide your details below to help us verify your identity and customize your learning journey.";
      content = <CompleteProfileStep onReadyChange={setProfileStepReady} />;
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

  if (!storeHydrated) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-white">
        <Spinner className="size-8 text-primary" />
      </div>
    );
  }

  return (
    <OnboardingShell
      currentStepId={activeStepId}
      title={title}
      description={description}
      onNext={goNext}
      onBack={goBack}
      showBack={!isFirst}
      showNext={!isLast}
      nextDisabled={!canGoNext || isResolvingPersistedState}
      nextLoading={isSaving}
    >
      {content}
    </OnboardingShell>
  );
}

export { OnboardingPageClient };

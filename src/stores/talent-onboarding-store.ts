import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TalentOnboardingState } from "@/types/onboarding";

function initialOnboardingState(ownerUserId: string | null = null) {
  return {
    ownerUserId,
    currentStepId: "set-goal" as const,
    selectedGoalId: null,
    selectedTrackIds: [],
    goalSaved: false,
    tracksSaved: false,
    profileRegion: "",
    profileEducation: "",
    profileLinkedin: "",
    profileSaved: false,
  };
}

export const useTalentOnboardingStore = create<TalentOnboardingState>()(
  persist(
    (set) => ({
      ...initialOnboardingState(),
      resetForUser: (userId) => set(initialOnboardingState(userId)),
      reset: () => set(initialOnboardingState()),
      setCurrentStepId: (id) => set({ currentStepId: id }),
      setSelectedGoalId: (id) => set({ selectedGoalId: id ?? null }),
      setSelectedTrackIds: (ids) => set({ selectedTrackIds: ids }),
      setGoalSaved: (saved) => set({ goalSaved: saved }),
      setTracksSaved: (saved) => set({ tracksSaved: saved }),
      setProfileRegion: (region) => set({ profileRegion: region }),
      setProfileEducation: (education) => set({ profileEducation: education }),
      setProfileLinkedin: (linkedin) => set({ profileLinkedin: linkedin }),
      setProfileSaved: (saved) => set({ profileSaved: saved }),
    }),
    {
      name: "skillbridge-talent-onboarding",
      partialize: (state) => ({
        ownerUserId: state.ownerUserId,
        currentStepId: state.currentStepId,
        selectedGoalId: state.selectedGoalId,
        selectedTrackIds: state.selectedTrackIds,
        goalSaved: state.goalSaved,
        tracksSaved: state.tracksSaved,
        profileRegion: state.profileRegion,
        profileEducation: state.profileEducation,
        profileLinkedin: state.profileLinkedin,
        profileSaved: state.profileSaved,
      }),
    },
  ),
);

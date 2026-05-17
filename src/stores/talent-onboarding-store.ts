import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TalentOnboardingState } from "@/types/onboarding";

export const useTalentOnboardingStore = create<TalentOnboardingState>()(
  persist(
    (set) => ({
      currentStepId: "set-goal",
      selectedGoalId: null,
      selectedTrackIds: [],
      goalSaved: false,
      tracksSaved: false,
      setCurrentStepId: (id) => set({ currentStepId: id }),
      setSelectedGoalId: (id) => set({ selectedGoalId: id ?? null }),
      setSelectedTrackIds: (ids) => set({ selectedTrackIds: ids }),
      setGoalSaved: (saved) => set({ goalSaved: saved }),
      setTracksSaved: (saved) => set({ tracksSaved: saved }),
    }),
    {
      name: "skillbridge-talent-onboarding",
      partialize: (state) => ({
        currentStepId: state.currentStepId,
        selectedGoalId: state.selectedGoalId,
        selectedTrackIds: state.selectedTrackIds,
        goalSaved: state.goalSaved,
        tracksSaved: state.tracksSaved,
      }),
    },
  ),
);

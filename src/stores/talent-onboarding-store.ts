import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  apiGoalToGoalId,
  apiRoleTracksToTrackIds,
  resumeOnboardingStep,
  resumeOnboardingStepFromSelections,
  type GoalOptionId,
  type OnboardingStepId,
  type TrackOptionId,
} from "@/constants/talent-onboarding";
import { normalizeTalentOnboardingState } from "@/lib/talent-onboarding-state";
function stepRank(step: OnboardingStepId): number {
  const order: OnboardingStepId[] = [
    "set-goal",
    "select-track",
    "complete-profile",
    "generate-roadmap",
  ];
  return order.indexOf(step);
}

function furthestStep(
  ...steps: (OnboardingStepId | null | undefined)[]
): OnboardingStepId {
  let best: OnboardingStepId = "set-goal";
  let bestRank = -1;
  for (const step of steps) {
    if (!step) continue;
    const rank = stepRank(step);
    if (rank > bestRank) {
      best = step;
      bestRank = rank;
    }
  }
  return best;
}

type TalentOnboardingStore = {
  selectedGoalId: GoalOptionId | null;
  selectedTrackIds: TrackOptionId[];
  currentStepId: OnboardingStepId | null;
  setSelectedGoalId: (id: GoalOptionId | undefined) => void;
  setSelectedTrackIds: (ids: TrackOptionId[]) => void;
  setCurrentStepId: (id: OnboardingStepId) => void;
  mergeFromServer: (raw: unknown) => void;
  clear: () => void;
};

export const useTalentOnboardingStore = create<TalentOnboardingStore>()(
  persist(
    (set, get) => ({
      selectedGoalId: null,
      selectedTrackIds: [],
      currentStepId: null,
      setSelectedGoalId: (id) => set({ selectedGoalId: id ?? null }),
      setSelectedTrackIds: (ids) => set({ selectedTrackIds: ids }),
      setCurrentStepId: (id) => set({ currentStepId: id }),
      mergeFromServer: (raw) => {
        const normalized = normalizeTalentOnboardingState(raw);
        const serverGoalId = normalized.goal
          ? apiGoalToGoalId(normalized.goal)
          : null;
        const serverTrackIds = normalized.roleTracks?.length
          ? apiRoleTracksToTrackIds(normalized.roleTracks)
          : [];

        const state = get();
        const mergedGoalId = serverGoalId ?? state.selectedGoalId;
        const mergedTrackIds =
          serverTrackIds.length > 0 ? serverTrackIds : state.selectedTrackIds;

        const mergedStep = furthestStep(
          state.currentStepId,
          resumeOnboardingStep(normalized),
          resumeOnboardingStepFromSelections(mergedGoalId, mergedTrackIds),
        );

        set({
          selectedGoalId: mergedGoalId,
          selectedTrackIds: mergedTrackIds,
          currentStepId: mergedStep,
        });
      },
      clear: () =>
        set({
          selectedGoalId: null,
          selectedTrackIds: [],
          currentStepId: null,
        }),
    }),
    {
      name: "skillbridge-talent-onboarding",
      partialize: (state) => ({
        selectedGoalId: state.selectedGoalId,
        selectedTrackIds: state.selectedTrackIds,
        currentStepId: state.currentStepId,
      }),
    },
  ),
);

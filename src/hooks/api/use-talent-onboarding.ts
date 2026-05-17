"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getTalentOnboardingState,
  saveTalentOnboardingGoal,
  saveTalentOnboardingTrack,
  updateTalentOnboardingGoal,
  updateTalentOnboardingTracks,
} from "@/actions/talent-onboarding";
import type {
  TalentOnboardingGoalInput,
  TalentOnboardingTrackCreateInput,
  TalentOnboardingTracksUpdateInput,
} from "@/types/api";

import { talentOnboardingKeys } from "./keys";

export function useTalentOnboardingState() {
  return useQuery({
    queryKey: talentOnboardingKeys.state(),
    queryFn: () => getTalentOnboardingState(),
  });
}

export function useSaveTalentOnboardingGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: TalentOnboardingGoalInput) =>
      saveTalentOnboardingGoal(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: talentOnboardingKeys.state(),
      });
    },
  });
}

export function useUpdateTalentOnboardingGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: TalentOnboardingGoalInput) =>
      updateTalentOnboardingGoal(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: talentOnboardingKeys.state(),
      });
    },
  });
}

export function useSaveTalentOnboardingTrack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: TalentOnboardingTrackCreateInput) =>
      saveTalentOnboardingTrack(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: talentOnboardingKeys.state(),
      });
    },
  });
}

export function useUpdateTalentOnboardingTracks() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: TalentOnboardingTracksUpdateInput) =>
      updateTalentOnboardingTracks(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: talentOnboardingKeys.state(),
      });
    },
  });
}

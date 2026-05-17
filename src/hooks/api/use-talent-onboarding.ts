"use client";

import { useMutation } from "@tanstack/react-query";

import {
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

export function useSaveTalentOnboardingGoal() {
  return useMutation({
    mutationFn: (body: TalentOnboardingGoalInput) =>
      saveTalentOnboardingGoal(body),
  });
}

export function useUpdateTalentOnboardingGoal() {
  return useMutation({
    mutationFn: (body: TalentOnboardingGoalInput) =>
      updateTalentOnboardingGoal(body),
  });
}

export function useSaveTalentOnboardingTrack() {
  return useMutation({
    mutationFn: (body: TalentOnboardingTrackCreateInput) =>
      saveTalentOnboardingTrack(body),
  });
}

export function useUpdateTalentOnboardingTracks() {
  return useMutation({
    mutationFn: (body: TalentOnboardingTracksUpdateInput) =>
      updateTalentOnboardingTracks(body),
  });
}

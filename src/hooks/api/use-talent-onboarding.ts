"use client";

import { useMutation } from "@tanstack/react-query";

import {
  saveTalentOnboardingGoal,
  saveTalentOnboardingTracks,
  updateTalentOnboardingGoal,
  updateTalentOnboardingTracks,
} from "@/actions/talent-onboarding";
import type {
  TalentOnboardingGoalInput,
  TalentOnboardingTracksInput,
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

export function useSaveTalentOnboardingTracks() {
  return useMutation({
    mutationFn: (body: TalentOnboardingTracksInput) =>
      saveTalentOnboardingTracks(body),
  });
}

export function useUpdateTalentOnboardingTracks() {
  return useMutation({
    mutationFn: (body: TalentOnboardingTracksInput) =>
      updateTalentOnboardingTracks(body),
  });
}

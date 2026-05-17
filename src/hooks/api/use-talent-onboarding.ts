"use client";

import { useMutation } from "@tanstack/react-query";

import {
  saveTalentOnboardingGoal,
  saveTalentOnboardingTrack,
  updateTalentOnboardingGoal,
  updateTalentOnboardingTracks,
  saveTalentOnboardingProfile,
  personaliseTalentDashboard,
} from "@/actions/talent-onboarding";
import type {
  TalentOnboardingGoalInput,
  TalentOnboardingTrackCreateInput,
  TalentOnboardingTracksUpdateInput,
  TalentOnboardingProfileInput,
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

export function useSaveTalentOnboardingProfile() {
  return useMutation({
    mutationFn: (body: TalentOnboardingProfileInput) =>
      saveTalentOnboardingProfile(body),
  });
}

export function usePersonaliseTalentDashboard() {
  return useMutation({
    mutationFn: () => personaliseTalentDashboard(),
  });
}

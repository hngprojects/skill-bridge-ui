"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  flagAssessmentEvent,
  getAssessmentSession,
  getPersonalAssessmentSession,
  startAdvancedAssessment,
  startPersonalAssessment,
  startSkillAssessment,
  submitAdvancedAssessment,
  submitPersonalAssessment,
  submitSkillAssessment,
} from "@/actions/assessment";
import type {
  AdvancedAssessmentSubmitInput,
  AssessmentFlagInput,
  PersonalAssessmentSubmitInput,
  SkillAssessmentSubmitInput,
} from "@/types/api";

import { assessmentKeys, dashboardKeys } from "./keys";

export function useStartPersonalAssessment() {
  return useMutation({
    mutationFn: () => startPersonalAssessment(),
  });
}

export function usePersonalAssessmentSession(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: assessmentKeys.personalSession(),
    queryFn: () => getPersonalAssessmentSession(),
    enabled: options?.enabled ?? false,
  });
}

export function useSubmitPersonalAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PersonalAssessmentSubmitInput) =>
      submitPersonalAssessment(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardKeys.home() });
    },
  });
}

// ─── Skill Assessment ─────────────────────────────────────────────────────────

export function useStartSkillAssessment() {
  return useMutation({
    mutationFn: () => startSkillAssessment(),
  });
}

export function useSubmitSkillAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: SkillAssessmentSubmitInput) =>
      submitSkillAssessment(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardKeys.home() });
    },
  });
}

// ─── Advanced Assessment ──────────────────────────────────────────────────────

export function useStartAdvancedAssessment() {
  return useMutation({
    mutationFn: () => startAdvancedAssessment(),
  });
}

/** Pass `enabled: true` only when you have a valid session id. */
export function useAssessmentSession(
  id: string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: assessmentKeys.session(id),
    queryFn: () => getAssessmentSession(id),
    enabled: options?.enabled ?? false,
  });
}

export function useSubmitAdvancedAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AdvancedAssessmentSubmitInput) =>
      submitAdvancedAssessment(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardKeys.home() });
    },
  });
}

export function useFlagAssessmentEvent(
  type: "advanced" | "skill",
  sessionId: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AssessmentFlagInput) =>
      flagAssessmentEvent(type, sessionId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardKeys.home() });
    },
  });
}

"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  startPersonalAssessment,
  getPersonalAssessmentSession,
  submitPersonalAssessment,
  startSkillAssessment,
  submitSkillAssessment,
  startAdvancedAssessment,
  getAssessmentSession,
  submitAdvancedAssessment,
  flagAssessmentEvent,
} from "@/actions/assessment";
import type {
  PersonalAssessmentSubmitInput,
  SkillAssessmentSubmitInput,
  AdvancedAssessmentSubmitInput,
  AssessmentFlagInput,
} from "@/types/api";

import { assessmentKeys } from "./keys";

// ─── Personal Assessment ──────────────────────────────────────────────────────

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
  return useMutation({
    mutationFn: (body: PersonalAssessmentSubmitInput) =>
      submitPersonalAssessment(body),
  });
}

// ─── Skill Assessment ─────────────────────────────────────────────────────────

export function useStartSkillAssessment() {
  return useMutation({
    mutationFn: () => startSkillAssessment(),
  });
}

export function useSubmitSkillAssessment() {
  return useMutation({
    mutationFn: (body: SkillAssessmentSubmitInput) =>
      submitSkillAssessment(body),
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
  return useMutation({
    mutationFn: (body: AdvancedAssessmentSubmitInput) =>
      submitAdvancedAssessment(body),
  });
}

export function useFlagAssessmentEvent(sessionId: string) {
  return useMutation({
    mutationFn: (body: AssessmentFlagInput) =>
      flagAssessmentEvent(sessionId, body),
  });
}

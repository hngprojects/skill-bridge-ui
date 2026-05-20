"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  startPersonalAssessment,
  getPersonalAssessmentSession,
  submitPersonalAssessment,
} from "@/actions/assessment";
import type { PersonalAssessmentSubmitInput } from "@/types/api";

import { assessmentKeys } from "./keys";

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

"use client";

import { useMutation } from "@tanstack/react-query";

import { completeCandidateOnboarding } from "@/actions/candidate";
import type { CandidateOnboardingInput } from "@/types/api";

export function useCandidateOnboarding() {
  return useMutation({
    mutationFn: (body: CandidateOnboardingInput) =>
      completeCandidateOnboarding(body),
  });
}

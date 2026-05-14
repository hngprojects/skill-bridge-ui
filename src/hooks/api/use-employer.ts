"use client";

import { useMutation } from "@tanstack/react-query";

import { completeEmployerOnboarding } from "@/actions/employer";
import type { EmployerOnboardingInput } from "@/types/api";

export function useEmployerOnboarding() {
  return useMutation({
    mutationFn: (body: EmployerOnboardingInput) =>
      completeEmployerOnboarding(body),
  });
}

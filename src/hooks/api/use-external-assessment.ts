"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  validateAssessmentToken,
  registerExternalApplicant,
  submitExternalAssessment,
} from "@/actions/external-assessment";

export function useExternalAssessment(token: string) {
  return useQuery({
    queryKey: ["externalAssessment", token],
    queryFn: () => validateAssessmentToken(token),
    enabled: !!token,
  });
}

export function useRegisterExternalApplicant() {
  return useMutation({
    mutationFn: registerExternalApplicant,
  });
}

export function useSubmitExternalAssessment() {
  return useMutation({
    mutationFn: submitExternalAssessment,
  });
}

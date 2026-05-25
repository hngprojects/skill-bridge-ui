"use client";

import { useAssessmentSummaryStore } from "@/stores/assessment-summary-store";
import { useSignupFlowStore } from "@/stores/signup-flow-store";
import { useTalentOnboardingStore } from "@/stores/talent-onboarding-store";

export function clearPersistedSessionState() {
  useSignupFlowStore.getState().reset();
  useTalentOnboardingStore.getState().reset();
  useAssessmentSummaryStore.getState().reset();
}

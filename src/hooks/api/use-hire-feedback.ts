"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getPendingHireFeedback,
  getTalentTrackRecord,
  submitHireFeedback,
} from "@/actions/hire-feedback";
import type { SubmitHireFeedbackInput } from "@/types/api/hire-feedback";

import { employerOffersKeys, hireFeedbackKeys } from "./keys";

export function usePendingHireFeedback(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: hireFeedbackKeys.pending(),
    queryFn: () => getPendingHireFeedback(),
    enabled: options?.enabled ?? true,
  });
}

/** Submit a hire-outcome rating. Invalidates both the pending-feedback list
 *  (clears the dashboard prompt/row badge) and the offers list (clears the
 *  per-row "Rate this hire" action). */
export function useSubmitHireFeedback() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SubmitHireFeedbackInput) => submitHireFeedback(input),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: hireFeedbackKeys.pending() });
      void qc.invalidateQueries({ queryKey: employerOffersKeys.lists() });
    },
  });
}

export function useTalentTrackRecord(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: hireFeedbackKeys.talentTrackRecord(),
    queryFn: () => getTalentTrackRecord(),
    enabled: options?.enabled ?? true,
  });
}

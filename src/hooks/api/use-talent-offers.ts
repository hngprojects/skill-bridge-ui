"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getTalentOffer,
  getTalentOffers,
  respondToTalentOffer,
} from "@/actions/talent-offers";
import type {
  RespondTalentOfferInput,
  TalentOffersListParams,
} from "@/types/api/talent-offers";

import { talentOffersKeys } from "./keys";

export function useTalentOffers(
  params?: TalentOffersListParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: talentOffersKeys.list(params),
    queryFn: () => getTalentOffers(params),
    enabled: options?.enabled ?? true,
  });
}

export function useTalentOffer(
  offerId: string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: talentOffersKeys.detail(offerId),
    queryFn: () => getTalentOffer(offerId),
    enabled: (options?.enabled ?? true) && Boolean(offerId),
  });
}

/** Accept or decline an offer. Invalidates the list + the specific detail
 *  so both surfaces reflect the new status without a manual refetch. */
export function useRespondToTalentOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: RespondTalentOfferInput) => respondToTalentOffer(input),
    onSuccess: (_, variables) => {
      void qc.invalidateQueries({ queryKey: talentOffersKeys.lists() });
      void qc.invalidateQueries({
        queryKey: talentOffersKeys.detail(variables.offerId),
      });
    },
  });
}

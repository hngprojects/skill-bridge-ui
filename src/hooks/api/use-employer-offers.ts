"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getEmployerOffers,
  type EmployerOffersListParams,
} from "@/actions/employer-offers";

import { employerOffersKeys } from "./keys";

export function useEmployerOffers(
  params?: EmployerOffersListParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: employerOffersKeys.list(params),
    queryFn: () => getEmployerOffers(params),
    enabled: options?.enabled ?? true,
  });
}

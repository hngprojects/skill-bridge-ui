"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getSavedCandidates,
  removeCandidate,
  saveCandidate,
} from "@/actions/employer-discovery";
import type {
  EmployerSavedCandidatesListData,
  EmployerSavedCandidatesListParams,
} from "@/types/api/employer-discovery";

import { employerDiscoveryKeys } from "./keys";

export function useSavedCandidates(
  params?: EmployerSavedCandidatesListParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: employerDiscoveryKeys.savedList(params),
    queryFn: () => getSavedCandidates(params),
    enabled: options?.enabled ?? true,
  });
}

/**
 * Save a candidate to the employer's shortlist.
 */
export function useSaveCandidate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => saveCandidate(userId),
    onSettled: () => {
      void qc.invalidateQueries({
        queryKey: employerDiscoveryKeys.savedLists(),
      });
    },
  });
}

/**
 * Remove a candidate from the shortlist. Optimistically filters them out of
 * every cached saved-list page (we know which `userId` to drop), then
 * invalidates on settle to reconcile pagination totals with the server.
 */
export function useRemoveCandidate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => removeCandidate(userId),
    onMutate: async (userId: string) => {
      await qc.cancelQueries({
        queryKey: employerDiscoveryKeys.savedLists(),
      });

      // Snapshot every cached saved-list page so a failed call can roll back.
      const previousSnapshots =
        qc.getQueriesData<EmployerSavedCandidatesListData>({
          queryKey: employerDiscoveryKeys.savedLists(),
        });

      qc.setQueriesData<EmployerSavedCandidatesListData>(
        { queryKey: employerDiscoveryKeys.savedLists() },
        (old) => {
          if (!old) return old;
          // `total` is the global count, duplicated on every paginated
          // response. Decrement it on every cached page — not just the one
          // that contained the removed candidate — so the count stays
          // consistent across pages until the invalidation refetches.
          return {
            ...old,
            candidates: old.candidates.filter((c) => c.userId !== userId),
            total: Math.max(0, old.total - 1),
          };
        },
      );

      return { previousSnapshots };
    },
    onError: (_err, _userId, context) => {
      if (context?.previousSnapshots) {
        for (const [key, data] of context.previousSnapshots) {
          qc.setQueryData(key, data);
        }
      }
    },
    onSettled: () => {
      void qc.invalidateQueries({
        queryKey: employerDiscoveryKeys.savedLists(),
      });
    },
  });
}

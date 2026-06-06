"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createRole, getAssessmentCatalogue } from "@/actions/employer-roles";
import type { CreateRoleInput } from "@/types/api/employer-roles";

import { employerRolesKeys } from "./keys";

export function useAssessmentCatalogue(params?: {
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: employerRolesKeys.catalogue(params),
    queryFn: () => getAssessmentCatalogue(params),
  });
}

export function useCreateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateRoleInput) => createRole(input),
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: employerRolesKeys.lists() });
    },
  });
}

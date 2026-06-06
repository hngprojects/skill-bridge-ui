"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  closeRole,
  createRole,
  getAssessmentCatalogue,
  getRoles,
  reopenRole,
} from "@/actions/employer-roles";
import type {
  CreateRoleInput,
  EmployerRoleStatus,
} from "@/types/api/employer-roles";

import { employerRolesKeys } from "./keys";

export function useEmployerRoles(params?: { status?: EmployerRoleStatus }) {
  return useQuery({
    queryKey: employerRolesKeys.lists(),
    queryFn: () => getRoles(params),
  });
}

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

export function useCloseRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (roleId: string) => closeRole(roleId),
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: employerRolesKeys.lists() });
    },
  });
}

export function useReopenRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (roleId: string) => reopenRole(roleId),
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: employerRolesKeys.lists() });
    },
  });
}

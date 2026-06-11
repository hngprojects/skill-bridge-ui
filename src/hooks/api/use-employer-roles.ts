"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  closeRole,
  createRole,
  getAssessmentCatalogue,
  getEmployerRole,
  getRoles,
  reopenRole,
  updateRole,
} from "@/actions/employer-roles";
import type {
  CreateRoleInput,
  EmployerRoleStatus,
  UpdateRoleInput,
} from "@/types/api/employer-roles";

import { employerRolesKeys } from "./keys";

export function useEmployerRoles(params?: { status?: EmployerRoleStatus }) {
  return useQuery({
    queryKey: employerRolesKeys.lists(),
    queryFn: () => getRoles(params),
  });
}

export function useEmployerRole(
  roleId: string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: employerRolesKeys.detail(roleId),
    queryFn: () => getEmployerRole(roleId),
    enabled: (options?.enabled ?? true) && Boolean(roleId),
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

/** PATCH /employer/roles/{roleId}. Invalidates the role detail and the list
 *  so /e/roles and the role-detail page both reflect the new state. */
export function useUpdateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { roleId: string; patch: UpdateRoleInput }) =>
      updateRole(input.roleId, input.patch),
    onSuccess: (_, variables) => {
      void qc.invalidateQueries({ queryKey: employerRolesKeys.lists() });
      void qc.invalidateQueries({
        queryKey: employerRolesKeys.detail(variables.roleId),
      });
    },
  });
}

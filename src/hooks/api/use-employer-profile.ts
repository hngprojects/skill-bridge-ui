"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  changeEmployerPassword,
  deleteEmployerAccount,
  getEmployerProfile,
  getEmployerVerificationStatus,
  updateEmployerProfile,
} from "@/actions/employer-profile";
import type {
  ChangePasswordInput,
  DeleteAccountInput,
  UpdateEmployerProfileInput,
} from "@/types/api";

import { employerProfileKeys } from "./keys";

export function useEmployerProfile(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: employerProfileKeys.detail(),
    queryFn: () => getEmployerProfile(),
    enabled: options?.enabled ?? true,
  });
}

export function useUpdateEmployerProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateEmployerProfileInput) =>
      updateEmployerProfile(body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: employerProfileKeys.detail() });
      void qc.invalidateQueries({
        queryKey: employerProfileKeys.verificationStatus(),
      });
    },
  });
}

export function useEmployerVerificationStatus(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: employerProfileKeys.verificationStatus(),
    queryFn: () => getEmployerVerificationStatus(),
    enabled: options?.enabled ?? true,
  });
}

export function useChangeEmployerPassword() {
  return useMutation({
    mutationFn: (body: ChangePasswordInput) => changeEmployerPassword(body),
  });
}

export function useDeleteEmployerAccount() {
  return useMutation({
    mutationFn: (body: DeleteAccountInput) => deleteEmployerAccount(body),
  });
}

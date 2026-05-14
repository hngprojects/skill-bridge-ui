"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
} from "@/actions/users";
import type {
  AdminCreateUserInput,
  AdminUpdateUserInput,
  UsersListParams,
} from "@/types/api";

import { usersKeys } from "./keys";

export function useUsersList(
  params?: UsersListParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: usersKeys.list(params),
    queryFn: () => listUsers(params),
    enabled: options?.enabled ?? true,
  });
}

export function useUser(
  id: string | undefined,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: usersKeys.detail(id ?? ""),
    queryFn: () => getUserById(id!),
    enabled: Boolean(id) && (options?.enabled ?? true),
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: AdminCreateUserInput) => createUser(body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: AdminUpdateUserInput }) =>
      updateUser(id, body),
    onSuccess: (_data, { id }) => {
      void qc.invalidateQueries({ queryKey: usersKeys.lists() });
      void qc.invalidateQueries({ queryKey: usersKeys.detail(id) });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}

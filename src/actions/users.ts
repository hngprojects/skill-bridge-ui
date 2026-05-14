import { authApi } from "@/lib/api";
import type {
  AdminCreateUserInput,
  AdminCreateUserResponseData,
  AdminUpdateUserInput,
  ApiEnvelope,
  AuthUser,
  UsersListParams,
  UsersListResponseData,
} from "@/types/api";

import { unwrapData } from "./utils";

export async function createUser(
  body: AdminCreateUserInput,
): Promise<AdminCreateUserResponseData> {
  const res = await authApi.post<ApiEnvelope<AdminCreateUserResponseData>>(
    "/users",
    body,
  );
  return unwrapData(res);
}

export async function listUsers(
  params?: UsersListParams,
): Promise<UsersListResponseData> {
  const res = await authApi.get<ApiEnvelope<UsersListResponseData>>("/users", {
    params,
  });
  return unwrapData(res);
}

export async function getUserById(id: string): Promise<{ user: AuthUser }> {
  const res = await authApi.get<ApiEnvelope<{ user: AuthUser }>>(
    `/users/${encodeURIComponent(id)}`,
  );
  return unwrapData(res);
}

export async function updateUser(
  id: string,
  body: AdminUpdateUserInput,
): Promise<{ user: AuthUser }> {
  const res = await authApi.patch<ApiEnvelope<{ user: AuthUser }>>(
    `/users/${encodeURIComponent(id)}`,
    body,
  );
  return unwrapData(res);
}

export async function deleteUser(id: string): Promise<void> {
  await authApi.delete(`/users/${encodeURIComponent(id)}`);
}

"use client";

import { signIn, type SignInResponse } from "next-auth/react";

import type { AuthUser } from "@/types/api";
import type {
  CredentialSignInFromAuthResponse,
  CredentialSignInParams,
} from "@/types/auth-client";

function authUserDisplayName(user: AuthUser): string {
  return (
    user.fullname ||
    [user.firstName ?? user.first_name, user.lastName ?? user.last_name]
      .filter(Boolean)
      .join(" ") ||
    user.email
  );
}

function isAuthResponsePayload(
  params: CredentialSignInParams | CredentialSignInFromAuthResponse,
): params is CredentialSignInFromAuthResponse {
  return "user" in params;
}

function toCredentialSignInParams(
  params: CredentialSignInParams | CredentialSignInFromAuthResponse,
): CredentialSignInParams {
  if (!isAuthResponsePayload(params)) {
    return params;
  }
  const { user, tokens } = params;
  return {
    email: user.email,
    accessToken: tokens?.access_token,
    userId: user.id,
    name: authUserDisplayName(user),
    image: user.profile_pic_url ?? user.avatar_url ?? undefined,
  };
}

export async function signInWithCredentials(
  params: CredentialSignInParams | CredentialSignInFromAuthResponse,
): Promise<SignInResponse | undefined> {
  const p = toCredentialSignInParams(params);
  return signIn("credentials", {
    email: p.email,
    accessToken: p.accessToken ?? undefined,
    userId: p.userId,
    name: p.name,
    image: p.image ?? undefined,
    redirect: false,
  });
}

export async function signInWithGoogle(callbackUrl = "/dashboard") {
  await signIn("google", { callbackUrl });
}

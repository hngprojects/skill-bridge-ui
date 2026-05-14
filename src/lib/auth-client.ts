"use client";

import { signIn, type SignInResponse } from "next-auth/react";

import type { CredentialSignInParams } from "@/types/auth-client";

export async function signInWithCredentials(
  params: CredentialSignInParams,
): Promise<SignInResponse | undefined> {
  return signIn("credentials", {
    email: params.email,
    accessToken: params.accessToken ?? undefined,
    userId: params.userId,
    name: params.name,
    image: params.image ?? undefined,
    redirect: false,
  });
}

export async function signInWithGoogle(callbackUrl = "/dashboard") {
  await signIn("google", { callbackUrl });
}

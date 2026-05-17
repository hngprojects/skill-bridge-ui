"use client";

import { signIn, type SignInResponse } from "next-auth/react";

import { getMe } from "@/actions/auth";
import { requestGoogleAuthCode } from "@/lib/google-auth";
import type { AuthUser } from "@/types/api";
import type {
  CredentialSignInFromAuthResponse,
  CredentialSignInParams,
  GoogleSignInResult,
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

function isOnboardingComplete(user: AuthUser): boolean | undefined {
  return user.onboardingComplete ?? user.onboarding_complete;
}

export function dashboardPathForRole(role: AuthUser["role"]): string {
  if (role === "talent") return "/t/dashboard";
  return "/dashboard";
}

export function postAuthRedirectForUser(user: AuthUser): string {
  if (isOnboardingComplete(user) === false) {
    if (user.role === "talent") return "/talent/onboarding";
    if (user.role === "employer") return "/employer/onboarding";
  }
  return dashboardPathForRole(user.role);
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
    role: user.role,
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
    role: p.role,
    redirect: false,
  });
}

export async function signInWithPassword(params: {
  email: string;
  password: string;
}): Promise<SignInResponse | undefined> {
  return signIn("credentials", {
    email: params.email,
    password: params.password,
    redirect: false,
  });
}

export async function signInWithEmailVerification(params: {
  email: string;
  otp: string;
}): Promise<SignInResponse | undefined> {
  return signIn("credentials", {
    verificationEmail: params.email,
    otp: params.otp,
    redirect: false,
  });
}

export async function signInWithVerifiedUser(
  user: AuthUser,
): Promise<SignInResponse | undefined> {
  return signIn("credentials", {
    sessionUser: "true",
    userId: user.id,
    email: user.email,
    name: authUserDisplayName(user),
    image: user.profile_pic_url ?? user.avatar_url ?? undefined,
    role: user.role,
    redirect: false,
  });
}

export async function signInWithGoogle(): Promise<GoogleSignInResult> {
  const code = await requestGoogleAuthCode();

  const result = await signIn("credentials", {
    googleCode: code,
    redirectUri: "postmessage",
    role: "talent",
    redirect: false,
  });

  if (result?.error) {
    return {
      result,
      redirectTo: "/t/dashboard",
    };
  }

  const user = await getMe();
  return { result, user, redirectTo: postAuthRedirectForUser(user) };
}

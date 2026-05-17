"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  forgotPassword,
  getMe,
  login,
  logout,
  refreshTokens,
  register,
  resendVerification,
  resetPassword,
  verifyEmail,
  verifyPasswordResetOtp,
} from "@/actions/auth";
import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResendVerificationInput,
  ResetPasswordInput,
  VerifyEmailInput,
  VerifyPasswordResetOtpInput,
} from "@/types/api";

import { authKeys } from "./keys";

export function useRegister() {
  return useMutation({
    mutationFn: (body: RegisterInput) => register(body),
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (body: VerifyEmailInput) => verifyEmail(body),
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: (body: ResendVerificationInput) => resendVerification(body),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (body: LoginInput) => login(body),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (body: ForgotPasswordInput) => forgotPassword(body),
  });
}

export function useVerifyPasswordResetOtp() {
  return useMutation({
    mutationFn: (body: VerifyPasswordResetOtpInput) =>
      verifyPasswordResetOtp(body),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (body: ResetPasswordInput) => resetPassword(body),
  });
}

export function useRefreshTokens() {
  return useMutation({
    mutationFn: () => refreshTokens(),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
  });
}

/** Pass `enabled: true` when the user is authenticated (avoids 401 on public routes). */
export function useMe(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => getMe(),
    enabled: options?.enabled ?? false,
  });
}

import { publicApi, authApi } from "@/lib/api";
import type {
  ApiEnvelope,
  AccountDataExportResponseData,
  DeleteAccountInput,
  EmptyData,
  ForgotPasswordInput,
  GoogleVerifyCodeInput,
  GoogleVerifyCodeResponseData,
  LoginInput,
  LoginResponseData,
  MeResponseData,
  RefreshResponseData,
  RegisterInput,
  RegisterResponseData,
  ResendVerificationInput,
  ResetPasswordInput,
  VerifyEmailInput,
  VerifyEmailResponseData,
  VerifyPasswordResetOtpInput,
} from "@/types/api";

import { unwrapData } from "./utils";

const apiRoot = () =>
  (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

/** Browser redirect URL — same path the API exposes for OAuth start. */
export function getGoogleOAuthUrl(): string {
  return `${apiRoot()}/auth/google`;
}

export function getLinkedInOAuthUrl(): string {
  return `${apiRoot()}/auth/linkedin`;
}

export function employerRegisterBody(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): RegisterInput {
  return {
    email: input.email.trim(),
    password: input.password,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    role: "employer",
  };
}

export function talentRegisterBody(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): RegisterInput {
  return {
    email: input.email.trim(),
    password: input.password,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    role: "talent",
  };
}

export async function register(
  body: RegisterInput,
): Promise<RegisterResponseData> {
  const res = await publicApi.post<ApiEnvelope<RegisterResponseData>>(
    "/auth/register",
    body,
  );
  return unwrapData(res);
}

export async function verifyEmail(
  body: VerifyEmailInput,
): Promise<VerifyEmailResponseData> {
  const res = await publicApi.post<ApiEnvelope<VerifyEmailResponseData>>(
    "/auth/verify-email",
    body,
  );
  return unwrapData(res);
}

export async function resendVerification(
  body: ResendVerificationInput,
): Promise<EmptyData> {
  const res = await publicApi.post<ApiEnvelope<EmptyData>>(
    "/auth/resend-verification",
    body,
  );
  return unwrapData(res);
}

export async function login(body: LoginInput): Promise<LoginResponseData> {
  const res = await publicApi.post<ApiEnvelope<LoginResponseData>>(
    "/auth/login",
    body,
  );
  return unwrapData(res);
}

export async function verifyGoogleCode(
  body: GoogleVerifyCodeInput,
): Promise<GoogleVerifyCodeResponseData> {
  const res = await publicApi.post<ApiEnvelope<GoogleVerifyCodeResponseData>>(
    "/auth/google/verify-code",
    body,
  );
  return unwrapData(res);
}

export async function forgotPassword(
  body: ForgotPasswordInput,
): Promise<EmptyData> {
  const res = await publicApi.post<ApiEnvelope<EmptyData>>(
    "/auth/forgot-password",
    body,
  );
  return unwrapData(res);
}

export async function verifyPasswordResetOtp(
  body: VerifyPasswordResetOtpInput,
): Promise<EmptyData> {
  const res = await publicApi.post<ApiEnvelope<EmptyData>>(
    "/auth/verify-reset-otp",
    body,
  );
  return unwrapData(res);
}

export async function resetPassword(
  body: ResetPasswordInput,
): Promise<EmptyData> {
  const res = await publicApi.post<ApiEnvelope<EmptyData>>(
    "/auth/reset-password",
    body,
  );
  return unwrapData(res);
}

/** Uses refresh token cookie; does not attach Bearer. */
export async function refreshTokens(): Promise<RefreshResponseData> {
  const res =
    await publicApi.post<ApiEnvelope<RefreshResponseData>>("/auth/refresh");
  return unwrapData(res);
}

/** Uses refresh token cookie. */
export async function logout(): Promise<EmptyData> {
  const res = await publicApi.post<ApiEnvelope<EmptyData>>("/auth/logout");
  return unwrapData(res);
}

export async function getMe(): Promise<MeResponseData> {
  const res = await authApi.get<ApiEnvelope<MeResponseData>>("/auth/me");
  return unwrapData(res);
}

export async function exportAccountData(): Promise<AccountDataExportResponseData> {
  const res = await authApi.post<ApiEnvelope<AccountDataExportResponseData>>(
    "/auth/account/data-export",
  );
  return unwrapData(res);
}

export async function deleteAccount(
  body: DeleteAccountInput,
): Promise<EmptyData> {
  const res = await authApi.delete<ApiEnvelope<EmptyData>>("/auth/account", {
    data: body,
  });
  return unwrapData(res);
}

export type UserRole = "talent" | "employer" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  fullname?: string;
  role: UserRole;
  track?: string | null;
  country?: string;
  emailVerified?: boolean;
  is_verified?: boolean;
  onboardingComplete?: boolean;
  onboarding_complete?: boolean;
  profile_pic_url?: string | null;
  avatar_url?: string | null;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type RegisterRole = "talent" | "employer";

export type RegisterInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: RegisterRole;
};

export type RegisterResponseData = {
  user: AuthUser;
};

export type VerifyEmailInput = {
  email: string;
  otp: string;
};

export type VerifyEmailResponseData = {
  user: AuthUser;
  tokens?: AuthTokens;
};

export type ResendVerificationInput = {
  email: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  user: AuthUser;
  tokens?: AuthTokens;
};

export type GoogleVerifyCodeInput = {
  code: string;
  redirectUri: "postmessage";
  role: "talent";
};

export type GoogleVerifyCodeResponseData = {
  user: AuthUser;
  tokens?: AuthTokens;
};

export type ForgotPasswordInput = {
  email: string;
};

export type VerifyPasswordResetOtpInput = {
  email: string;
  otp: string;
};

export type ResetPasswordInput = {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type RefreshResponseData = {
  tokens?: AuthTokens;
};

export type MeResponseData = AuthUser;

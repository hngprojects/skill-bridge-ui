/** HNG-style API envelope */
export type ApiEnvelope<T> = {
  status_code: number;
  message: string | null;
  data: T;
  meta?: unknown;
};

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

export type ResetPasswordInput = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type RefreshResponseData = {
  tokens?: AuthTokens;
};

export type MeResponseData = AuthUser;

export type CandidateOnboardingInput = {
  roleTrack: string;
  bio: string;
};

export type CandidateProfile = {
  id: string;
  userId: string;
  roleTrack: string;
  bio: string;
  isPublished: boolean;
  readinessScore: number;
};

export type CandidateOnboardingResponseData = {
  user: AuthUser;
  profile: CandidateProfile;
  tokens: AuthTokens;
};

export type EmployerOnboardingInput = {
  companyName: string;
  companySize: string;
  industry: string;
  websiteUrl: string;
  companyDescription: string;
  hiringRegion: string;
};

export type EmployerProfile = {
  id: string;
  userId: string;
  companyName: string;
  companySize: string;
  industry: string;
  websiteUrl: string;
  companyDescription: string;
  hiringRegion: string;
};

export type EmployerOnboardingResponseData = {
  user: AuthUser;
  profile: EmployerProfile;
  tokens: AuthTokens;
};

export type AdminCreateUserInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  role: UserRole;
  profile_pic_url?: string | null;
};

export type AdminCreateUserResponseData = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
};

export type UsersListParams = {
  page?: number;
  limit?: number;
};

export type UsersListItem = Pick<
  AuthUser,
  "id" | "email" | "firstName" | "lastName" | "role"
>;

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
};

export type UsersListResponseData = {
  users: UsersListItem[];
  meta: PaginationMeta;
};

export type AdminUpdateUserInput = Partial<{
  firstName: string;
  lastName: string;
  country: string;
}>;

export type WaitlistInput = {
  email: string;
};

export type ContactUsInput = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export type HealthResponse = {
  status: string;
};

export type EmptyData = Record<string, never>;

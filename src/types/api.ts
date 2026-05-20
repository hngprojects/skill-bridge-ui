import type {
  EmployerHiringCountRange,
  EmployerJoiningRoleId,
  EmployerRegion,
} from "@/constants/employer-onboarding";

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

export type RefreshResponseData = {
  tokens?: AuthTokens;
};

export type MeResponseData = AuthUser;

export type TalentOnboardingGoalInput = {
  goal: string;
};

export type TalentOnboardingTrackCreateInput = {
  track: string;
};

export type TalentOnboardingTracksUpdateInput = {
  roleTracks: string[];
};

export type TalentOnboardingGoalResponseData = {
  goal: string;
};

export type TalentOnboardingTrackCreateResponseData = {
  track: string;
};

export type TalentOnboardingTracksUpdateResponseData = {
  roleTracks: string[];
};

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
  joiningAs: EmployerJoiningRoleId;
  desiredRoles: string[];
  region: EmployerRegion;
  hiringCountRange: EmployerHiringCountRange;
  companyWebsite: string;
};

export type EmployerProfile = {
  id: string;
  userId: string;
  joiningAs: EmployerJoiningRoleId;
  desiredRoles: string[];
  region: EmployerRegion;
  hiringCountRange: EmployerHiringCountRange;
  companyWebsite: string;
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
export type TalentOnboardingProfileInput = {
  region: string;
  educationLevel: string;
  linkedinUrl?: string;
};

export type TalentOnboardingProfileResponseData = {
  region: string;
  education_level: string;
  onboarding_step: number;
  onboardingComplete: boolean;
};
export type TalentOnboardingPersonaliseResponseData = {
  message: string;
  status: string;
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

export type DashboardJourneyStatus = "available" | "completed" | "locked";

export type DashboardJourneyKey =
  | "onboarding"
  | "personal"
  | "skill"
  | "advanced";

export type DashboardJourneyOverviewItem = {
  key: DashboardJourneyKey | string;
  title: string;
  status: DashboardJourneyStatus;
};

export type DashboardHomeResponseData = {
  firstName: string;
  profileCompletionPercentage: number;
  journeyOverview: DashboardJourneyOverviewItem[];
};

// ─── Personal Assessment ──────────────────────────────────────────────────────

export type PersonalAssessmentSession = {
  sessionId: string;
  generatedAt: string;
  source: string;
  track: string;
  claimedLevel: string | null;
  questionCount: number;
  questions: import("./questionnaire").Question[];
};

export type PersonalAssessmentStartResponseData = {
  status: string;
  session: PersonalAssessmentSession;
};

export type PersonalAssessmentSubmitInput = {
  answers: Record<string, string | string[]>;
};

export type PersonalAssessmentSubmitResponseData = {
  message?: string;
  completedAt?: string;
};

export type PersonalAssessmentSessionResponseData = {
  status: string;
  session: PersonalAssessmentSession | null;
  answers?: Record<string, string | string[]> | null;
};

// ─── Skill Assessment ─────────────────────────────────────────────────────────

export type SkillAssessmentSession = {
  sessionId: string;
  questions: import("./questionnaire").Question[];
  [key: string]: unknown;
};

export type SkillAssessmentStartResponseData = {
  status: string;
  session: SkillAssessmentSession;
};

export type SkillAssessmentAnswer = {
  questionId: string;
  value: string | string[];
};

export type SkillAssessmentSubmitInput = {
  sessionId: string;
  answers: SkillAssessmentAnswer[];
};

export type SkillAssessmentSubmitResponseData = {
  score: number;
  passed: boolean;
  validatedLevel?: string;
  guidanceReport?: string;
  retryAvailableAt?: string;
};

// ─── Advanced Assessment ──────────────────────────────────────────────────────

export type AdvancedAssessmentQuestionType = "mcq" | "short_text" | "long_text";

export type AdvancedAssessmentQuestion = {
  id: string;
  type: AdvancedAssessmentQuestionType;
  prompt: string;
  options?: string[];
};

export type AdvancedAssessmentSession = {
  sessionId: string;
  remainingSeconds: number;
  questions: AdvancedAssessmentQuestion[];
};

export type AdvancedAssessmentStartResponseData = {
  status: string;
  session: AdvancedAssessmentSession;
};

export type AssessmentSessionResponseData = {
  status: string;
  session: AdvancedAssessmentSession;
};

export type AdvancedAssessmentAnswer = {
  questionId: string;
  value: string | string[];
};

export type AdvancedAssessmentSubmitInput = {
  sessionId: string;
  answers: AdvancedAssessmentAnswer[];
};

export type AssessmentTier = "job_ready" | "emerging" | "not_ready";

export type AdvancedAssessmentSubmitResponseData = {
  tier: AssessmentTier;
  score: number;
  guidanceReport?: string;
  retryAvailableAt?: string;
};

export type AssessmentFlagEventType = "tab_switch" | "copy_paste";

export type AssessmentFlagInput = {
  eventType: AssessmentFlagEventType;
};

export type AssessmentFlagResponseData = {
  message?: string;
  sessionVoided?: boolean;
};

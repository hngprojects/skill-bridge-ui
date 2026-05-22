import type {
  EmployerHiringCountRange,
  EmployerJoiningRoleId,
  EmployerRegion,
} from "@/constants/employer-onboarding";

import type { AuthTokens, AuthUser } from "./auth";

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

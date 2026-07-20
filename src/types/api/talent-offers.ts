import type { EmployerOfferStatus } from "./employer-offers";

/** Employer block embedded in each offer the talent receives. The
 *  `fullname` (sic — single word in the backend response) is the prefab
 *  display name; we keep both that and the parts so the UI can format
 *  however reads best. */
export type RawTalentOfferEmployer = {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  fullname: string | null;
  avatar_url: string | null;
  country: string | null;
  is_verified: boolean;
  onboarding_complete: boolean;
  role: string;
  signup_reason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TalentOfferEmployer = {
  id: string;
  fullName: string;
  email: string | null;
  avatarUrl: string | null;
  country: string | null;
  isVerified: boolean;
};

export type RawTalentOffer = {
  id: string;
  employer_user_id: string;
  employer: RawTalentOfferEmployer;
  candidate_user_id: string;
  employer_pool_profile_id?: string | null;
  role_id: string | null;
  role_title: string;
  message: string;
  role_description: string | null;
  compensation: string;
  employment_type: string;
  work_arrangement: string;
  interview_link: string | null;
  application_deadline: string | null;
  status: EmployerOfferStatus;
  expires_at: string;
  responded_at: string | null;
  assessment_unlocked_at: string | null;
  assessment_deadline: string | null;
  expiry_warning_sent_at?: string | null;
  extension_used: boolean;
  created_at: string;
  updated_at: string;
  /** Duplicate of `employer.is_verified`. FE reads from `employer.is_verified`
   *  since the rest of the employer info is nested. */
  is_employer_verified?: boolean;
};

export type TalentOffer = {
  id: string;
  employer: TalentOfferEmployer;
  roleId: string | null;
  roleTitle: string;
  roleDescription: string | null;
  message: string;
  compensation: string;
  employmentType: string;
  workArrangement: string;
  interviewLink: string | null;
  applicationDeadline: string | null;
  status: EmployerOfferStatus;
  expiresAt: string;
  respondedAt: string | null;
  assessmentUnlockedAt: string | null;
  assessmentDeadline: string | null;
  extensionUsed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RawTalentOffersListResponse = {
  offers: RawTalentOffer[];
  total: number;
  page: number;
  limit: number;
  /** Backend uses snake_case here (asymmetric with the employer list, which
   *  uses `totalPages`). Mapper falls back to either. */
  total_pages?: number;
  totalPages?: number;
};

export type TalentOffersListData = {
  offers: TalentOffer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TalentOffersListParams = {
  page?: number;
  limit?: number;
};

export type TalentOfferResponseAction = "accept" | "decline";

export type RespondTalentOfferInput = {
  offerId: string;
  action: TalentOfferResponseAction;
};

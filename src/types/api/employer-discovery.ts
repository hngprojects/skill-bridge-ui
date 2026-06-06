import type { AssessmentTier } from "./assessment";

/**
 * Saved / shortlisted candidate as the UI consumes it. Mapped from the
 * snake_case backend response. Fields we don't display on the shortlist
 * table today (e.g. `aboutTags`, `topSkills`) are kept on the type so the
 * candidate detail view can render them without another mapper update.
 */
export type EmployerSavedCandidate = {
  userId: string;
  candidateId: string;
  firstName: string;
  lastNameInitial: string;
  fullName: string;
  avatarUrl: string | null;
  role: string;
  roleTrack: string;
  seniorityBadge: string;
  validatedLevel: string;
  tier: AssessmentTier;
  score: number;
  compositeScore: number;
  skills: string[];
  topSkills: string[];
  aboutTags: string[];
  availability: string;
  availabilityStatus: string;
  availabilityLabel: string;
  verifiedAt: string;
  strongCompetencies: string[];
  shareToken: string;
  region: string;
  dateAdded: string;
  isSaved: boolean;
  offerSent: boolean;
  offerStatus: string | null;
};

export type EmployerSavedCandidatesListData = {
  candidates: EmployerSavedCandidate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  emptyStateMessage: string | null;
};

export type EmployerSavedCandidatesListParams = {
  page?: number;
  limit?: number;
};

// ─── Raw response (snake_case from the API) ──────────────────────────────────

type RawEmployerSavedCandidate = {
  user_id: string;
  candidate_id?: string;
  first_name?: string;
  last_name_initial?: string;
  full_name: string;
  avatar_url?: string | null;
  role?: string;
  role_track: string;
  seniority_badge?: string;
  validated_level?: string;
  tier: AssessmentTier;
  score: number;
  composite_score?: number;
  skills?: string[];
  top_skills?: string[];
  about_tags?: string[];
  availability: string;
  availability_status?: string;
  availability_label?: string;
  verified_at: string;
  strong_competencies: string[];
  share_token: string;
  region?: string;
  date_added?: string;
  is_saved: boolean;
  offer_sent: boolean;
  offer_status: string | null;
};

export type RawEmployerSavedCandidatesListResponse = {
  candidates: RawEmployerSavedCandidate[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  empty_state_message: string | null;
};

export type { RawEmployerSavedCandidate };

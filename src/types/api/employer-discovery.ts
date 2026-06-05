import type { AssessmentTier } from "./assessment";

/**
 * Provisional shape for a saved / shortlisted candidate. The backend confirms
 * these fields today; mark this type as liable to change as the discovery /
 * shortlist UI firms up.
 */
export type EmployerSavedCandidate = {
  userId: string;
  fullName: string;
  /** Role track key, e.g. "frontend_developer". */
  roleTrack: string;
  tier: AssessmentTier;
  /** e.g. "employed_flexible". Stays as a string until the union firms up. */
  availability: string;
  verifiedAt: string;
  score: number;
  strongCompetencies: string[];
  shareToken: string;
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
  full_name: string;
  role_track: string;
  tier: AssessmentTier;
  availability: string;
  verified_at: string;
  score: number;
  strong_competencies: string[];
  share_token: string;
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

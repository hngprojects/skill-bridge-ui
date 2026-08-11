/**
 * Outcome feedback loop: after an employer marks an offer "hired", the
 * backend eventually decides feedback is due (e.g. 30 days later) and this
 * resource tracks that request through to submission. Endpoints don't exist
 * yet — shapes mirror the `talent-offers` / `employer-offers` convention so
 * only an action + hook need to change once the backend ships them.
 */

export type HireFeedbackStatus = "pending" | "submitted" | "dismissed";

export type HireFeedbackRequest = {
  id: string;
  offerId: string;
  candidateUserId: string;
  candidateName: string;
  candidateAvatarUrl: string | null;
  roleTitle: string;
  status: HireFeedbackStatus;
  requestedAt: string;
  submittedAt: string | null;
};

export type HireFeedbackListData = {
  requests: HireFeedbackRequest[];
};

export type SubmitHireFeedbackInput = {
  offerId: string;
  overallRating: number;
  wouldHireAgain: boolean;
  comment?: string;
};

/** A talent's rolled-up hire feedback. Only meaningful once `ratingCount`
 *  clears the display threshold — see `lib/track-record.ts`. */
export type TalentTrackRecord = {
  averageRating: number | null;
  ratingCount: number;
  wouldHireAgainRate: number | null;
};

// ─── Raw response (snake_case) ────────────────────────────────────────────────

export type RawHireFeedbackRequest = {
  id: string;
  offer_id: string;
  candidate_user_id: string;
  candidate_name: string;
  candidate_avatar_url?: string | null;
  role_title: string;
  status: HireFeedbackStatus;
  requested_at: string;
  submitted_at: string | null;
};

export type RawHireFeedbackListResponse = {
  requests: RawHireFeedbackRequest[];
};

export type RawTalentTrackRecord = {
  average_rating: number | null;
  rating_count: number;
  would_hire_again_rate: number | null;
};

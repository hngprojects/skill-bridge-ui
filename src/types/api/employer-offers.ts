/**
 * Offer types — shape confirmed by the backend even though the endpoints
 * aren't fully wired yet. The shortlist page mocks `EmployerOfferListItem`
 * until the list endpoint lands; when it does, only an action mapper + a
 * hook need to land.
 */

export type EmployerOfferStatus =
  | "pending"
  | "assessment_unlocked"
  | "assessment_completed"
  | "passed"
  | "failed"
  | "accepted"
  | "declined"
  | "expired"
  | "hired"
  | "withdrawn";

/**
 * Bare offer entity (the full `Offer` row). Not what the list endpoint
 * returns; kept here for the future detail / send-offer endpoints.
 */
export type EmployerOffer = {
  id: string;
  employerUserId: string;
  candidateUserId: string;
  roleId: string | null;
  roleTitle: string;
  roleDescription: string | null;
  message: string;
  compensation: string;
  employmentType: string;
  workArrangement: string;
  status: EmployerOfferStatus;
  expiresAt: string;
  assessmentUnlockedAt: string | null;
  assessmentDeadline: string | null;
  extensionUsed: boolean;
  respondedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Slim row returned by the offers list endpoint. The avatar URL + score
 * aren't on the wire yet — they're typed as nullable so the UI renders
 * placeholders today and just lights up once backend ships them.
 */
export type EmployerOfferListItem = {
  offerId: string;
  candidateUserId: string;
  candidateName: string;
  candidateAvatarUrl: string | null;
  candidateScore: number | null;
  roleTrack: string | null;
  jobTitle: string;
  /** ISO date-time. */
  dateSent: string;
  status: EmployerOfferStatus;
};

export type EmployerOffersListData = {
  offers: EmployerOfferListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  emptyStateMessage: string | null;
};

// ─── Raw response (snake_case) ────────────────────────────────────────────────

export type RawEmployerOfferListItem = {
  offer_id: string;
  candidate_user_id: string;
  candidate_name: string;
  candidate_avatar_url?: string | null;
  candidate_score?: number | null;
  role_track: string | null;
  job_title: string;
  date_sent: string;
  status: EmployerOfferStatus;
};

export type RawEmployerOffersListResponse = {
  offers: RawEmployerOfferListItem[];
  total: number;
  page: number;
  limit: number;
  /** Backend's spec uses camelCase here; accept snake too in case it
   *  switches to match the rest of their responses. */
  totalPages?: number;
  total_pages?: number;
  emptyStateMessage?: string | null;
  empty_state_message?: string | null;
};

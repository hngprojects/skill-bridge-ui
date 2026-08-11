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
  | "withdrawn"
  | "interview_invited"
  | "interview_accepted"
  | "interview_declined";

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
  schedulingLink: string | null;
  status: EmployerOfferStatus;
  expiresAt: string;
  assessmentUnlockedAt: string | null;
  assessmentDeadline: string | null;
  extensionUsed: boolean;
  respondedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/** POST /employer/offers — bulk-send request body. Accepts an array of
 *  candidate IDs to support batch sends; today's UI only ever sends one
 *  at a time. */
export type SendOfferInput = {
  candidateIds: string[];
  roleId: string;
  schedulingLink?: string;
  message?: string;
};

/** Backend leaves the `warnings` shape unspecified; surface as opaque
 *  records so we can render them but not pretend to understand them. */
export type SendOfferWarning = Record<string, unknown>;

export type SendOfferResult = {
  sentCount: number;
  offers: EmployerOffer[];
  warnings: SendOfferWarning[];
};

export type RawEmployerOffer = {
  id: string;
  employer_user_id: string;
  candidate_user_id: string;
  employer_pool_profile_id?: string | null;
  role_id: string | null;
  role_title: string;
  role_description: string | null;
  message: string;
  compensation: string;
  employment_type: string;
  work_arrangement: string;
  scheduling_link: string | null;
  application_deadline?: string | null;
  status: EmployerOfferStatus;
  expires_at: string;
  assessment_unlocked_at: string | null;
  assessment_deadline: string | null;
  expiry_warning_sent_at?: string | null;
  extension_used: boolean;
  responded_at: string | null;
  created_at: string;
  updated_at: string;
};

export type RawSendOfferResponse = {
  sent_count: number;
  offers: RawEmployerOffer[];
  warnings: SendOfferWarning[];
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
  /** True once the backend has an outcome-feedback request open for this
   *  hire — drives the "Rate this hire" row action. Not on the wire yet. */
  pendingHireFeedback: boolean;
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
  pending_hire_feedback?: boolean;
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

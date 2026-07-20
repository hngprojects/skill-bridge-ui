import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api/common";
import type {
  EmployerOffer,
  EmployerOfferListItem,
  EmployerOffersListData,
  RawEmployerOffer,
  RawEmployerOfferListItem,
  RawEmployerOffersListResponse,
  RawSendOfferResponse,
  SendOfferInput,
  SendOfferResult,
} from "@/types/api/employer-offers";

import { unwrapData } from "./utils";

function mapOfferListItem(
  raw: RawEmployerOfferListItem,
): EmployerOfferListItem {
  return {
    offerId: raw.offer_id,
    candidateUserId: raw.candidate_user_id,
    candidateName: raw.candidate_name,
    candidateAvatarUrl: raw.candidate_avatar_url ?? null,
    candidateScore: raw.candidate_score ?? null,
    roleTrack: raw.role_track,
    jobTitle: raw.job_title,
    dateSent: raw.date_sent,
    status: raw.status,
  };
}

export type EmployerOffersListParams = {
  page?: number;
  limit?: number;
  status?: string;
};

export async function getEmployerOffers(
  params?: EmployerOffersListParams,
): Promise<EmployerOffersListData> {
  const res = await authApi.get<ApiEnvelope<RawEmployerOffersListResponse>>(
    "/employer/candidates/offers",
    { params },
  );
  const raw = unwrapData(res);
  return {
    offers: (raw.offers ?? []).map(mapOfferListItem),
    total: raw.total ?? 0,
    page: raw.page ?? 1,
    limit: raw.limit ?? params?.limit ?? DEFAULT_PAGE_SIZE,
    totalPages: raw.totalPages ?? raw.total_pages ?? 1,
    emptyStateMessage: raw.emptyStateMessage ?? raw.empty_state_message ?? null,
  };
}

function mapOffer(raw: RawEmployerOffer): EmployerOffer {
  return {
    id: raw.id,
    employerUserId: raw.employer_user_id,
    candidateUserId: raw.candidate_user_id,
    roleId: raw.role_id,
    roleTitle: raw.role_title,
    roleDescription: raw.role_description,
    message: raw.message,
    compensation: raw.compensation,
    employmentType: raw.employment_type,
    workArrangement: raw.work_arrangement,
    schedulingLink: raw.scheduling_link ?? null,
    status: raw.status,
    expiresAt: raw.expires_at,
    assessmentUnlockedAt: raw.assessment_unlocked_at,
    assessmentDeadline: raw.assessment_deadline,
    extensionUsed: raw.extension_used,
    respondedAt: raw.responded_at,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export async function sendOffer(
  input: SendOfferInput,
): Promise<SendOfferResult> {
  const res = await authApi.post<ApiEnvelope<RawSendOfferResponse>>(
    "/employer/offers",
    {
      candidate_ids: input.candidateIds,
      role_id: input.roleId,
      scheduling_link: input.schedulingLink,
      message: input.message,
    },
  );
  const raw = unwrapData(res);
  return {
    sentCount: raw.sent_count,
    offers: (raw.offers ?? []).map(mapOffer),
    warnings: raw.warnings ?? [],
  };
}

/** Mark an accepted offer as hire complete. */
export async function markOfferHireComplete(
  offerId: string,
): Promise<EmployerOffer> {
  const res = await authApi.patch<ApiEnvelope<RawEmployerOffer>>(
    `/employer/offers/${offerId}/hire-complete`,
  );
  return mapOffer(unwrapData(res));
}

/** Alias of `markOfferHireComplete`. */
export async function markOfferHired(offerId: string): Promise<EmployerOffer> {
  const res = await authApi.patch<ApiEnvelope<RawEmployerOffer>>(
    `/employer/offers/${offerId}/mark-hired`,
  );
  return mapOffer(unwrapData(res));
}

/** Withdraw a pending offer. */
export async function withdrawOffer(offerId: string): Promise<EmployerOffer> {
  const res = await authApi.patch<ApiEnvelope<RawEmployerOffer>>(
    `/employer/offers/${offerId}/withdraw`,
  );
  return mapOffer(unwrapData(res));
}

/** Add an interview link to an accepted offer. */
export async function addInterviewLink(
  offerId: string,
  link: string,
): Promise<EmployerOffer> {
  const res = await authApi.patch<ApiEnvelope<RawEmployerOffer>>(
    `/employer/offers/${offerId}/interview-link`,
    { interview_link: link },
  );
  return mapOffer(unwrapData(res));
}

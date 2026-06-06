import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api/common";
import type {
  EmployerOfferListItem,
  EmployerOffersListData,
  RawEmployerOfferListItem,
  RawEmployerOffersListResponse,
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
    limit: raw.limit ?? params?.limit ?? 20,
    totalPages: raw.totalPages ?? raw.total_pages ?? 1,
    emptyStateMessage: raw.emptyStateMessage ?? raw.empty_state_message ?? null,
  };
}

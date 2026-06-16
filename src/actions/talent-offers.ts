import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api/common";
import type {
  RawTalentOffer,
  RawTalentOfferEmployer,
  RawTalentOffersListResponse,
  RespondTalentOfferInput,
  TalentOffer,
  TalentOfferEmployer,
  TalentOffersListData,
  TalentOffersListParams,
} from "@/types/api/talent-offers";

import { unwrapData } from "./utils";

/** Tolerates a missing or partial employer block. The PATCH `/respond`
 *  endpoint returns the updated offer without the joined employer, so we
 *  fall back to a placeholder; the subsequent invalidation refetches the
 *  full detail with the real employer block. */
function mapEmployer(
  raw: RawTalentOfferEmployer | null | undefined,
  fallbackId?: string,
): TalentOfferEmployer {
  if (!raw) {
    return {
      id: fallbackId ?? "",
      fullName: "Employer",
      email: null,
      avatarUrl: null,
      country: null,
      isVerified: false,
    };
  }

  const name =
    raw.fullname?.trim() ||
    [raw.first_name, raw.last_name].filter(Boolean).join(" ").trim() ||
    raw.email ||
    "Employer";

  return {
    id: raw.id,
    fullName: name,
    email: raw.email,
    avatarUrl: raw.avatar_url,
    country: raw.country,
    isVerified: raw.is_verified,
  };
}

function mapOffer(raw: RawTalentOffer): TalentOffer {
  return {
    id: raw.id,
    employer: mapEmployer(raw.employer, raw.employer_user_id),
    roleId: raw.role_id,
    roleTitle: raw.role_title,
    roleDescription: raw.role_description,
    message: raw.message,
    compensation: raw.compensation,
    employmentType: raw.employment_type,
    workArrangement: raw.work_arrangement,
    applicationDeadline: raw.application_deadline,
    status: raw.status,
    expiresAt: raw.expires_at,
    respondedAt: raw.responded_at,
    assessmentUnlockedAt: raw.assessment_unlocked_at,
    assessmentDeadline: raw.assessment_deadline,
    extensionUsed: raw.extension_used,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export async function getTalentOffers(
  params?: TalentOffersListParams,
): Promise<TalentOffersListData> {
  const res = await authApi.get<ApiEnvelope<RawTalentOffersListResponse>>(
    "/talent/offers",
    { params },
  );
  const raw = unwrapData(res);
  return {
    offers: (raw.offers ?? []).map(mapOffer),
    total: raw.total ?? 0,
    page: raw.page ?? 1,
    limit: raw.limit ?? params?.limit ?? 20,
    totalPages: raw.total_pages ?? raw.totalPages ?? 1,
  };
}

export async function getTalentOffer(offerId: string): Promise<TalentOffer> {
  const res = await authApi.get<ApiEnvelope<RawTalentOffer>>(
    `/talent/offers/${offerId}`,
  );
  return mapOffer(unwrapData(res));
}

export async function respondToTalentOffer({
  offerId,
  action,
}: RespondTalentOfferInput): Promise<TalentOffer> {
  const res = await authApi.patch<ApiEnvelope<RawTalentOffer>>(
    `/talent/offers/${offerId}/respond`,
    { action },
  );
  return mapOffer(unwrapData(res));
}

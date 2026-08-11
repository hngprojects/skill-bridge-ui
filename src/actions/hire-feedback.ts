import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api/common";
import type {
  HireFeedbackListData,
  RawHireFeedbackListResponse,
  RawHireFeedbackRequest,
  RawTalentTrackRecord,
  SubmitHireFeedbackInput,
  TalentTrackRecord,
} from "@/types/api/hire-feedback";

import { unwrapData } from "./utils";

function mapHireFeedbackRequest(raw: RawHireFeedbackRequest) {
  return {
    id: raw.id,
    offerId: raw.offer_id,
    candidateUserId: raw.candidate_user_id,
    candidateName: raw.candidate_name,
    candidateAvatarUrl: raw.candidate_avatar_url ?? null,
    roleTitle: raw.role_title,
    status: raw.status,
    requestedAt: raw.requested_at,
    submittedAt: raw.submitted_at,
  };
}

function mapTrackRecord(raw: RawTalentTrackRecord): TalentTrackRecord {
  return {
    averageRating: raw.average_rating,
    ratingCount: raw.rating_count ?? 0,
    wouldHireAgainRate: raw.would_hire_again_rate,
  };
}

export async function getPendingHireFeedback(): Promise<HireFeedbackListData> {
  const res = await authApi.get<ApiEnvelope<RawHireFeedbackListResponse>>(
    "/employer/hire-feedback",
    { params: { status: "pending" } },
  );
  const raw = unwrapData(res);
  return { requests: (raw.requests ?? []).map(mapHireFeedbackRequest) };
}

export async function submitHireFeedback(
  input: SubmitHireFeedbackInput,
): Promise<void> {
  await authApi.post(`/employer/hire-feedback/${input.offerId}`, {
    overall_rating: input.overallRating,
    would_hire_again: input.wouldHireAgain,
    comment: input.comment,
  });
}

export async function getTalentTrackRecord(): Promise<TalentTrackRecord> {
  const res = await authApi.get<ApiEnvelope<RawTalentTrackRecord>>(
    "/talent/track-record",
  );
  return mapTrackRecord(unwrapData(res));
}

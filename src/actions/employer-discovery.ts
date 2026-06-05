import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api/common";
import type {
  EmployerSavedCandidate,
  EmployerSavedCandidatesListData,
  EmployerSavedCandidatesListParams,
  RawEmployerSavedCandidate,
  RawEmployerSavedCandidatesListResponse,
} from "@/types/api/employer-discovery";

import { unwrapData } from "./utils";

function mapSavedCandidate(
  raw: RawEmployerSavedCandidate,
): EmployerSavedCandidate {
  return {
    userId: raw.user_id,
    fullName: raw.full_name,
    roleTrack: raw.role_track,
    tier: raw.tier,
    availability: raw.availability,
    verifiedAt: raw.verified_at,
    score: raw.score,
    strongCompetencies: raw.strong_competencies ?? [],
    shareToken: raw.share_token,
    isSaved: raw.is_saved,
    offerSent: raw.offer_sent,
    offerStatus: raw.offer_status,
  };
}

export async function getSavedCandidates(
  params?: EmployerSavedCandidatesListParams,
): Promise<EmployerSavedCandidatesListData> {
  const res = await authApi.get<
    ApiEnvelope<RawEmployerSavedCandidatesListResponse>
  >("/employer/discovery/saved", { params });
  const raw = unwrapData(res);
  return {
    candidates: (raw.candidates ?? []).map(mapSavedCandidate),
    total: raw.total ?? 0,
    page: raw.page ?? 1,
    limit: raw.limit ?? params?.limit ?? 20,
    totalPages: raw.total_pages ?? 1,
    emptyStateMessage: raw.empty_state_message,
  };
}

export async function saveCandidate(userId: string): Promise<void> {
  await authApi.post(
    `/employer/discovery/candidates/${encodeURIComponent(userId)}/save`,
  );
}

export async function removeCandidate(userId: string): Promise<void> {
  await authApi.delete(
    `/employer/discovery/candidates/${encodeURIComponent(userId)}/save`,
  );
}

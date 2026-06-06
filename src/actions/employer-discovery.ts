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
    candidateId: raw.candidate_id ?? raw.user_id,
    firstName: raw.first_name ?? "",
    lastNameInitial: raw.last_name_initial ?? "",
    fullName: raw.full_name,
    avatarUrl: raw.avatar_url ?? null,
    role: raw.role ?? "",
    roleTrack: raw.role_track,
    seniorityBadge: raw.seniority_badge ?? raw.validated_level ?? "",
    validatedLevel: raw.validated_level ?? "",
    tier: raw.tier,
    score: raw.score,
    compositeScore: raw.composite_score ?? raw.score,
    skills: raw.skills ?? [],
    topSkills: raw.top_skills ?? [],
    aboutTags: raw.about_tags ?? [],
    availability: raw.availability,
    availabilityStatus: raw.availability_status ?? raw.availability,
    availabilityLabel: raw.availability_label ?? "",
    verifiedAt: raw.verified_at,
    strongCompetencies: raw.strong_competencies ?? [],
    shareToken: raw.share_token,
    region: raw.region ?? "",
    dateAdded: raw.date_added ?? raw.verified_at,
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

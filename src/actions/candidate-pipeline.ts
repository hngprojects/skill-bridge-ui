import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api/common";
import type {
  CandidatePipelineListData,
  PipelineCandidate,
  RawCandidatePipelineListResponse,
  RawPipelineCandidate,
} from "@/types/api/candidate-pipeline";
import { unwrapData } from "./utils";

function mapPipelineCandidate(raw: RawPipelineCandidate): PipelineCandidate {
  return {
    candidateId: raw.candidate_id,
    fullName: raw.full_name,
    avatarUrl: raw.avatar_url,
    role: raw.role,
    roleTrack: raw.role_track,
    seniorityBadge: raw.seniority_badge,
    matchScore: raw.match_score,
    isInterested: raw.is_interested,
    interestedAt: raw.interested_at,
    pipelineStatus: raw.pipeline_status,
    assessmentStatus: raw.assessment_status,
    assessmentResult: raw.assessment_result,
    offerStatus: raw.offer_status,
    interviewLink: raw.interview_link,
    updatedAt: raw.updated_at,
  };
}

export type CandidatePipelineParams = {
  tab?: "best_match" | "other" | "interested" | "all";
  page?: number;
  limit?: number;
  search?: string;
};

export async function getCandidatePipeline(
  roleId: string,
  params?: CandidatePipelineParams,
): Promise<CandidatePipelineListData> {
  const res = await authApi.get<ApiEnvelope<RawCandidatePipelineListResponse>>(
    `/employer/roles/${roleId}/candidates`,
    { params },
  );
  const data = unwrapData(res);
  return {
    role: {
      id: data.role.id,
      title: data.role.title,
      isFull: data.role.is_full,
    },
    candidates: (data.candidates ?? []).map(mapPipelineCandidate),
    counts: {
      bestMatch: data.counts.best_match,
      other: data.counts.other,
      interested: data.counts.interested,
      total: data.counts.total,
    },
    total: data.total ?? 0,
    page: data.page ?? 1,
    limit: data.limit ?? 20,
    totalPages: data.total_pages ?? 1,
  };
}

export async function sendAssessmentToCandidate(
  roleId: string,
  candidateId: string,
  assessmentId: string,
): Promise<void> {
  await authApi.post(
    `/employer/roles/${roleId}/candidates/${candidateId}/send-assessment`,
    { assessment_id: assessmentId },
  );
}

import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api";
import type {
  CreateEmployerAssessmentInput,
  EmployerAssessmentItem,
  ListEmployerAssessmentsResponse,
  ListEmployerAssessmentResultsResponse,
  RawEmployerAssessment,
} from "@/types/api/employer-assessments";
import { unwrapData } from "./utils";

function normalizeAssessment(
  raw: RawEmployerAssessment,
): EmployerAssessmentItem {
  return {
    id: raw.id,
    title: raw.title,
    roleTrack: raw.role_track,
    experienceLevel: raw.experience_level,
    timeLimitMinutes: raw.time_limit_minutes,
    passingThreshold: raw.passing_threshold,
    status: raw.status,
    type: raw.type ?? "internal",
    token: raw.token ?? null,
    questionsCount: raw.questions?.length ?? 0,
    submissionsCount: raw.submissions_count ?? 0,
    createdAt: raw.created_at,
  };
}

export async function createEmployerAssessment(
  input: CreateEmployerAssessmentInput,
): Promise<EmployerAssessmentItem> {
  const body: Record<string, unknown> = {
    title: input.title,
    roleTrack: input.roleTrack,
    experienceLevel: input.experienceLevel,
    timeLimitMinutes: input.timeLimitMinutes,
    passingThreshold: input.passingThreshold,
    questionSource: input.questionSource,
    shareViaLink: input.shareViaLink,
    sendToCandidates: input.sendToCandidates,
    type: input.type,
  };

  if (input.questions && input.questions.length) {
    body.questions = input.questions;
  }

  const res = await authApi.post<ApiEnvelope<RawEmployerAssessment>>(
    "/employer/assessments",
    body,
  );
  return normalizeAssessment(unwrapData(res));
}

export async function getEmployerAssessments(params?: {
  page?: number;
  limit?: number;
}): Promise<{ assessments: EmployerAssessmentItem[]; total: number }> {
  const res = await authApi.get<ApiEnvelope<ListEmployerAssessmentsResponse>>(
    "/employer/assessments",
    { params },
  );
  const data = unwrapData(res);
  return {
    assessments: (data.assessments ?? []).map(normalizeAssessment),
    total: data.total ?? 0,
  };
}

export async function getEmployerAssessment(
  assessmentId: string,
): Promise<EmployerAssessmentItem> {
  const res = await authApi.get<ApiEnvelope<RawEmployerAssessment>>(
    `/employer/assessments/${assessmentId}`,
  );
  return normalizeAssessment(unwrapData(res));
}

export async function deactivateEmployerAssessment(
  assessmentId: string,
): Promise<void> {
  await authApi.patch(`/employer/assessments/${assessmentId}/deactivate`);
}

export async function getEmployerAssessmentResults(
  assessmentId: string,
  params?: { page?: number; limit?: number },
): Promise<ListEmployerAssessmentResultsResponse> {
  const res = await authApi.get<
    ApiEnvelope<ListEmployerAssessmentResultsResponse>
  >(`/employer/assessments/${assessmentId}/results`, { params });
  return unwrapData(res);
}

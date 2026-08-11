import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api";
import type {
  CreateEmployerAssessmentInput,
  EmployerAssessmentItem,
  ListEmployerAssessmentsResponse,
  ListEmployerAssessmentResultsResponse,
  RawEmployerAssessment,
  InviteToAssessmentInput,
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
    status: raw.is_active ? "active" : "inactive",
    token: raw.share_token ?? null,
    questionsCount: raw.questions?.length ?? 0,
    submissionsCount: raw.submissions_count ?? null,
    talentsCount: raw.talents_count ?? null,
    passRate: raw.pass_rate ?? null,
    closesAt: raw.closes_at ?? null,
    lastActivityAt: raw.last_activity_at ?? null,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
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
  const assessments = (data.assessments ?? []).map(normalizeAssessment);
  return {
    assessments,
    // The backend doesn't send `total` — fall back to the page's own
    // count so "is this account empty" never depends on a field that
    // isn't actually on the wire.
    total: data.total ?? assessments.length,
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

export async function getAssessmentToken(
  assessmentId: string,
): Promise<{ token: string }> {
  const res = await authApi.get<ApiEnvelope<{ token: string }>>(
    `/employer/assessments/${assessmentId}/token`,
  );
  return unwrapData(res);
}

export async function inviteToAssessment(
  input: InviteToAssessmentInput,
): Promise<void> {
  const { assessmentId, talentIds, emails } = input;
  const body: Record<string, unknown> = {};
  if (talentIds && talentIds.length > 0) body.talent_ids = talentIds;
  if (emails && emails.length > 0) body.emails = emails;

  await authApi.post(`/employer/assessments/${assessmentId}/invite`, body);
}

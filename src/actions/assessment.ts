import { authApi } from "@/lib/api";
import type {
  AdvancedAssessmentStartResponseData,
  AdvancedAssessmentSubmitInput,
  AdvancedAssessmentSubmitResponseData,
  ApiEnvelope,
  AssessmentFlagInput,
  AssessmentFlagResponseData,
  AssessmentSessionResponseData,
  PersonalAssessmentStartResponseData,
  PersonalAssessmentSessionResponseData,
  PersonalAssessmentSubmitInput,
  PersonalAssessmentSubmitResponseData,
  SkillAssessmentStartResponseData,
  SkillAssessmentSubmitInput,
  SkillAssessmentSubmitResponseData,
} from "@/types/api";

import { unwrapData } from "./utils";

export async function startPersonalAssessment(): Promise<PersonalAssessmentStartResponseData> {
  const res = await authApi.post<
    ApiEnvelope<PersonalAssessmentStartResponseData>
  >("/talent/assessment/personal/start");
  return unwrapData(res);
}

export async function getPersonalAssessmentSession(): Promise<PersonalAssessmentSessionResponseData> {
  const res = await authApi.get<
    ApiEnvelope<PersonalAssessmentSessionResponseData>
  >("/talent/assessment/personal/session");
  return unwrapData(res);
}

export async function submitPersonalAssessment(
  body: PersonalAssessmentSubmitInput,
): Promise<PersonalAssessmentSubmitResponseData> {
  const res = await authApi.post<
    ApiEnvelope<PersonalAssessmentSubmitResponseData>
  >("/talent/assessment/personal/submit", body);
  return unwrapData(res);
}

// ─── Skill Assessment ─────────────────────────────────────────────────────────

export async function startSkillAssessment(): Promise<SkillAssessmentStartResponseData> {
  const res = await authApi.post<ApiEnvelope<SkillAssessmentStartResponseData>>(
    "/talent/assessment/skill/start",
  );
  return unwrapData(res);
}

export async function submitSkillAssessment(
  body: SkillAssessmentSubmitInput,
): Promise<SkillAssessmentSubmitResponseData> {
  const res = await authApi.post<
    ApiEnvelope<SkillAssessmentSubmitResponseData>
  >("/talent/assessment/skill/submit", body, {
    // AI grading runs on submit and can take several minutes — override the
    // default 3-min timeout.
    timeout: 360_000,
  });
  return unwrapData(res);
}

/** Resume an existing skill session — same response shape as start. */
export async function getSkillAssessmentSession(
  sessionId: string,
): Promise<SkillAssessmentStartResponseData> {
  const res = await authApi.get<ApiEnvelope<SkillAssessmentStartResponseData>>(
    `/talent/assessment/skill/session/${sessionId}`,
  );
  return unwrapData(res);
}

// ─── Advanced Assessment ──────────────────────────────────────────────────────

export async function startAdvancedAssessment(): Promise<AdvancedAssessmentStartResponseData> {
  const res = await authApi.post<
    ApiEnvelope<AdvancedAssessmentStartResponseData>
  >("/talent/assessment/advanced/start");
  return unwrapData(res);
}

export async function getAssessmentSession(
  id: string,
): Promise<AssessmentSessionResponseData> {
  const res = await authApi.get<ApiEnvelope<AssessmentSessionResponseData>>(
    `/talent/assessment/session/${id}`,
  );
  return unwrapData(res);
}

export async function submitAdvancedAssessment(
  body: AdvancedAssessmentSubmitInput,
): Promise<AdvancedAssessmentSubmitResponseData> {
  const res = await authApi.post<
    ApiEnvelope<AdvancedAssessmentSubmitResponseData>
  >("/talent/assessment/advanced/submit", body, {
    // Advanced AI grading is heavier than skill — override the default
    // 3-min timeout with a generous ceiling.
    timeout: 600_000,
  });
  return unwrapData(res);
}

export async function flagAssessmentEvent(
  type: "advanced" | "skill",
  sessionId: string,
  body: AssessmentFlagInput,
): Promise<AssessmentFlagResponseData> {
  const url =
    type === "advanced"
      ? `/talent/assessment/session/${sessionId}/flag`
      : `/talent/assessment/skill/session/${sessionId}/flag`;
  const res = await authApi.post<ApiEnvelope<AssessmentFlagResponseData>>(
    url,
    body,
  );
  return unwrapData(res);
}

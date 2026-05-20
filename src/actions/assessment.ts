import { authApi } from "@/lib/api";
import type {
  ApiEnvelope,
  PersonalAssessmentStartResponseData,
  PersonalAssessmentSessionResponseData,
  PersonalAssessmentSubmitInput,
  PersonalAssessmentSubmitResponseData,
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

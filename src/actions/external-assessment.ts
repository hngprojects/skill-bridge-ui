import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api";
import type {
  ExternalApplicant,
  ExternalAssessmentSubmission,
} from "@/types/api/external-applicant";
import { unwrapData } from "./utils";

export async function validateAssessmentToken(token: string) {
  const res = await authApi.get<ApiEnvelope<unknown>>(
    `/assessments/external/${token}`,
  );
  return unwrapData(res);
}

export async function registerExternalApplicant(input: {
  token: string;
  email: string;
  consentedMarketing: boolean;
}) {
  const { token, email, consentedMarketing } = input;
  const res = await authApi.post<
    ApiEnvelope<{ sessionToken: string; applicant: ExternalApplicant }>
  >(`/assessments/external/${token}/register`, { email, consentedMarketing });
  return unwrapData(res);
}

export async function submitExternalAssessment(input: {
  token: string;
  externalApplicantId: string;
  responses: Record<string, unknown>[];
}) {
  const { token, externalApplicantId, responses } = input;
  const res = await authApi.post<ApiEnvelope<ExternalAssessmentSubmission>>(
    `/assessments/external/${token}/submit`,
    { externalApplicantId, responses },
  );
  return unwrapData(res);
}

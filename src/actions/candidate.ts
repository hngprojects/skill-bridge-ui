import { authApi } from "@/lib/api";
import type {
  ApiEnvelope,
  CandidateOnboardingInput,
  CandidateOnboardingResponseData,
} from "@/types/api";

import { unwrapData } from "./utils";

export async function completeCandidateOnboarding(
  body: CandidateOnboardingInput,
): Promise<CandidateOnboardingResponseData> {
  const res = await authApi.post<ApiEnvelope<CandidateOnboardingResponseData>>(
    "/candidate/onboarding",
    body,
  );
  return unwrapData(res);
}

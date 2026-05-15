import { authApi } from "@/lib/api";
import type {
  ApiEnvelope,
  EmployerOnboardingInput,
  EmployerOnboardingResponseData,
} from "@/types/api";

import { unwrapData } from "./utils";

export async function completeEmployerOnboarding(
  body: EmployerOnboardingInput,
): Promise<EmployerOnboardingResponseData> {
  const res = await authApi.post<ApiEnvelope<EmployerOnboardingResponseData>>(
    "/employer/onboarding",
    body,
  );
  return unwrapData(res);
}

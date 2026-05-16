import { authApi } from "@/lib/api";
import type {
  ApiEnvelope,
  TalentOnboardingGoalInput,
  TalentOnboardingGoalResponseData,
  TalentOnboardingTracksInput,
  TalentOnboardingTracksResponseData,
} from "@/types/api";

import { unwrapData } from "./utils";

export async function saveTalentOnboardingGoal(
  body: TalentOnboardingGoalInput,
): Promise<TalentOnboardingGoalResponseData> {
  const res = await authApi.post<ApiEnvelope<TalentOnboardingGoalResponseData>>(
    "/talent/onboarding/goal",
    body,
  );
  return unwrapData(res);
}

export async function updateTalentOnboardingGoal(
  body: TalentOnboardingGoalInput,
): Promise<TalentOnboardingGoalResponseData> {
  const res = await authApi.patch<
    ApiEnvelope<TalentOnboardingGoalResponseData>
  >("/talent/onboarding/goal", body);
  return unwrapData(res);
}

export async function saveTalentOnboardingTracks(
  body: TalentOnboardingTracksInput,
): Promise<TalentOnboardingTracksResponseData> {
  const res = await authApi.post<
    ApiEnvelope<TalentOnboardingTracksResponseData>
  >("/talent/onboarding/tracks", body);
  return unwrapData(res);
}

export async function updateTalentOnboardingTracks(
  body: TalentOnboardingTracksInput,
): Promise<TalentOnboardingTracksResponseData> {
  const res = await authApi.patch<
    ApiEnvelope<TalentOnboardingTracksResponseData>
  >("/talent/onboarding/tracks", body);
  return unwrapData(res);
}

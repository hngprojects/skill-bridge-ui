import { authApi } from "@/lib/api";
import type {
  ApiEnvelope,
  TalentOnboardingGoalInput,
  TalentOnboardingGoalResponseData,
  TalentOnboardingTrackCreateInput,
  TalentOnboardingTrackCreateResponseData,
  TalentOnboardingTracksUpdateInput,
  TalentOnboardingTracksUpdateResponseData,
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

export async function saveTalentOnboardingTrack(
  body: TalentOnboardingTrackCreateInput,
): Promise<TalentOnboardingTrackCreateResponseData> {
  const res = await authApi.post<
    ApiEnvelope<TalentOnboardingTrackCreateResponseData>
  >("/talent/onboarding/track", body);
  return unwrapData(res);
}

export async function updateTalentOnboardingTracks(
  body: TalentOnboardingTracksUpdateInput,
): Promise<TalentOnboardingTracksUpdateResponseData> {
  const res = await authApi.patch<
    ApiEnvelope<TalentOnboardingTracksUpdateResponseData>
  >("/talent/onboarding/tracks", body);
  return unwrapData(res);
}

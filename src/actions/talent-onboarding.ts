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

/** POST create uses singular path + `track`; PATCH update uses plural path + `roleTracks`. */
const TALENT_ONBOARDING_TRACK_CREATE_PATH = "/talent/onboarding/track";
const TALENT_ONBOARDING_TRACK_UPDATE_PATH = "/talent/onboarding/tracks";

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
  >(TALENT_ONBOARDING_TRACK_CREATE_PATH, body);
  return unwrapData(res);
}

export async function updateTalentOnboardingTracks(
  body: TalentOnboardingTracksUpdateInput,
): Promise<TalentOnboardingTracksUpdateResponseData> {
  const res = await authApi.patch<
    ApiEnvelope<TalentOnboardingTracksUpdateResponseData>
  >(TALENT_ONBOARDING_TRACK_UPDATE_PATH, body);
  return unwrapData(res);
}

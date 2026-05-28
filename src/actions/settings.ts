import { authApi } from "@/lib/api";
import type {
  ApiEnvelope,
  TalentSettingsResponseData,
  UpdateTalentSettingsProfileInput,
} from "@/types/api";

import { unwrapData } from "./utils";

export async function getTalentSettings(): Promise<TalentSettingsResponseData> {
  const res =
    await authApi.get<ApiEnvelope<TalentSettingsResponseData>>(
      "/talent/settings",
    );
  return unwrapData(res);
}

export async function updateTalentSettingsProfile(
  body: UpdateTalentSettingsProfileInput,
): Promise<TalentSettingsResponseData> {
  const res = await authApi.patch<ApiEnvelope<TalentSettingsResponseData>>(
    "/talent/settings/profile",
    body,
  );
  return unwrapData(res);
}

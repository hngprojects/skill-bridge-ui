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

export async function uploadTalentResume(
  file: File,
): Promise<{ resume_url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await authApi.post<ApiEnvelope<{ resume_url: string }>>(
    "/talent/settings/resume",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return unwrapData(res);
}

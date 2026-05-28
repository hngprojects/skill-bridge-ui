import { authApi } from "@/lib/api";
import type {
  AccountDataExportResponseData,
  ApiEnvelope,
  DeleteAccountInput,
  EmptyData,
  TalentSettingsResponseData,
  UpdateTalentAvailabilityInput,
  UpdateTalentAvailabilityResponseData,
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

export async function updateTalentAvailability(
  body: UpdateTalentAvailabilityInput,
): Promise<UpdateTalentAvailabilityResponseData> {
  const res = await authApi.patch<
    ApiEnvelope<UpdateTalentAvailabilityResponseData>
  >("/talent/settings/availability", body);
  return unwrapData(res);
}

export async function exportAccountData(): Promise<AccountDataExportResponseData> {
  const res = await authApi.post<ApiEnvelope<AccountDataExportResponseData>>(
    "/auth/account/data-export",
  );
  return unwrapData(res);
}

export async function deleteAccount(
  body: DeleteAccountInput,
): Promise<EmptyData> {
  const res = await authApi.delete<ApiEnvelope<EmptyData>>("/auth/account", {
    data: body,
  });
  return unwrapData(res);
}

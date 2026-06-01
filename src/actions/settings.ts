import { authApi } from "@/lib/api";
import type {
  AccountDataExportResponseData,
  ApiEnvelope,
  DeleteAccountInput,
  EmptyData,
  RawTalentSettingsNotificationPrefs,
  TalentSettingsResponseData,
  TalentSettingsCommunicationPreferences,
  TalentSettingsCommunicationPreferencesResponseData,
  UpdateTalentAvailabilityInput,
  UpdateTalentAvailabilityResponseData,
  UpdateTalentSettingsProfileInput,
} from "@/types/api";

import { unwrapData } from "./utils";

const DEFAULT_COMMUNICATION_GROUP = {
  newOffers: true,
  assessmentReminders: true,
  retakeWindowOpen: true,
};

type RawTalentSettingsResponseData = Omit<
  TalentSettingsResponseData,
  "communication_preferences"
> & {
  communication_preferences: TalentSettingsCommunicationPreferencesResponseData["communication_preferences"];
};

function normalizeNotificationPrefs(
  preferences?: RawTalentSettingsNotificationPrefs,
) {
  return {
    newOffers:
      preferences?.newOffers ??
      preferences?.new_offers ??
      DEFAULT_COMMUNICATION_GROUP.newOffers,
    assessmentReminders:
      preferences?.assessmentReminders ??
      preferences?.assessment_reminders ??
      DEFAULT_COMMUNICATION_GROUP.assessmentReminders,
    retakeWindowOpen:
      preferences?.retakeWindowOpen ??
      preferences?.retake_window_open ??
      DEFAULT_COMMUNICATION_GROUP.retakeWindowOpen,
  };
}

function normalizeCommunicationPreferences(
  data: TalentSettingsCommunicationPreferencesResponseData,
): TalentSettingsCommunicationPreferences {
  const preferences = data.communication_preferences;

  return {
    email: normalizeNotificationPrefs(preferences.email),
    inApp: normalizeNotificationPrefs(preferences.inApp ?? preferences.in_app),
  };
}

export async function getTalentSettings(): Promise<TalentSettingsResponseData> {
  const res =
    await authApi.get<ApiEnvelope<RawTalentSettingsResponseData>>(
      "/talent/settings",
    );
  const settings = unwrapData(res);

  return {
    ...settings,
    communication_preferences: normalizeCommunicationPreferences({
      communication_preferences: settings.communication_preferences,
    }),
  };
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

export async function deleteTalentResume(): Promise<EmptyData> {
  const res = await authApi.delete<ApiEnvelope<EmptyData>>(
    "/talent/settings/resume",
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

export async function updateTalentCommunicationPreferences(
  body: TalentSettingsCommunicationPreferences,
): Promise<TalentSettingsCommunicationPreferences> {
  const res = await authApi.patch<
    ApiEnvelope<TalentSettingsCommunicationPreferencesResponseData>
  >("/talent/settings/communication-preferences", body);
  return normalizeCommunicationPreferences(unwrapData(res));
}

export async function unsubscribeTalentEmailNotifications(): Promise<TalentSettingsCommunicationPreferences> {
  const res = await authApi.patch<
    ApiEnvelope<TalentSettingsCommunicationPreferencesResponseData>
  >("/talent/settings/communication-preferences/email/unsubscribe");
  return normalizeCommunicationPreferences(unwrapData(res));
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

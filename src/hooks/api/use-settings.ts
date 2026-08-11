"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTalentSettings,
  unsubscribeTalentEmailNotifications,
  updateTalentCommunicationPreferences,
  updateTalentAvailability,
  updateTalentSettingsProfile,
  uploadTalentResume,
  deleteTalentResume,
} from "@/actions/settings";
import type {
  TalentSettingsCommunicationPreferences,
  UpdateTalentAvailabilityInput,
  UpdateTalentSettingsProfileInput,
} from "@/types/api";
import { dashboardKeys, talentSettingsKeys } from "./keys";

export function useTalentSettings(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: talentSettingsKeys.detail(),
    queryFn: () => getTalentSettings(),
    enabled: options?.enabled ?? true,
  });
}

export function useUpdateTalentSettingsProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateTalentSettingsProfileInput) =>
      updateTalentSettingsProfile(body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: talentSettingsKeys.detail() });
      void qc.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}

export function useUploadTalentResume() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadTalentResume(file),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: talentSettingsKeys.detail() });
      void qc.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}

export function useDeleteTalentResume() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTalentResume(),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: talentSettingsKeys.detail() });
      void qc.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}

export function useUpdateTalentAvailability() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateTalentAvailabilityInput) =>
      updateTalentAvailability(body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: talentSettingsKeys.detail() });
      void qc.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}

export function useUpdateTalentCommunicationPreferences() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: TalentSettingsCommunicationPreferences) =>
      updateTalentCommunicationPreferences(body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: talentSettingsKeys.detail() });
    },
  });
}

export function useUnsubscribeTalentEmailNotifications() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => unsubscribeTalentEmailNotifications(),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: talentSettingsKeys.detail() });
    },
  });
}

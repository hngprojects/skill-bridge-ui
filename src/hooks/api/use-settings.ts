"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTalentSettings,
  updateTalentSettingsProfile,
  uploadTalentResume,
} from "@/actions/settings";
import type { UpdateTalentSettingsProfileInput } from "@/types/api";
import { talentSettingsKeys } from "./keys";

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
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: talentSettingsKeys.detail() }),
  });
}

export function useUploadTalentResume() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadTalentResume(file),
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: talentSettingsKeys.detail() }),
  });
}

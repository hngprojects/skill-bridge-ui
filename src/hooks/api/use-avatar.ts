"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadAvatar } from "@/actions/talent-onboarding";

import { authKeys, dashboardKeys, talentSettingsKeys } from "./keys";

export function useUploadAvatar() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: authKeys.me() });
      void qc.invalidateQueries({ queryKey: dashboardKeys.home() });
      void qc.invalidateQueries({ queryKey: talentSettingsKeys.detail() });
    },
  });
}

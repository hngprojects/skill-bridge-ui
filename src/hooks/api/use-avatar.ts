"use client";

import { useMutation } from "@tanstack/react-query";

import { uploadAvatar } from "@/actions/talent-onboarding";

export function useUploadAvatar() {
  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
  });
}

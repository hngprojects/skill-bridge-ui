"use client";

import { useQuery } from "@tanstack/react-query";

import { getPublicVerifiedProfile } from "@/actions/public-verified-profile";

import { publicVerifiedProfileKeys } from "./keys";

export function usePublicVerifiedProfile(shareToken: string) {
  return useQuery({
    queryKey: publicVerifiedProfileKeys.detail(shareToken),
    queryFn: () => getPublicVerifiedProfile(shareToken),
    enabled: Boolean(shareToken),
    retry: false,
  });
}

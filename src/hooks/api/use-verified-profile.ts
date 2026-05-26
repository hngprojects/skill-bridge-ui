"use client";

import { useQuery } from "@tanstack/react-query";

import { getVerifiedProfile } from "@/actions/verified-profile";

import { verifiedProfileKeys } from "./keys";

export function useVerifiedProfile() {
  return useQuery({
    queryKey: verifiedProfileKeys.talent(),
    queryFn: () => getVerifiedProfile(),
  });
}

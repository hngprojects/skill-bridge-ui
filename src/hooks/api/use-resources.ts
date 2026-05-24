"use client";

import { useQuery } from "@tanstack/react-query";

import { getTalentResources } from "@/actions/resources";

import { resourcesKeys } from "./keys";

export function useTalentResources() {
  return useQuery({
    queryKey: resourcesKeys.talent(),
    queryFn: () => getTalentResources(),
  });
}

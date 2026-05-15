"use client";

import { useQuery } from "@tanstack/react-query";

import { getHealth } from "@/actions/health";

import { healthKeys } from "./keys";

export function useHealthCheck(options?: {
  enabled?: boolean;
  refetchInterval?: number | false;
}) {
  return useQuery({
    queryKey: healthKeys.check(),
    queryFn: () => getHealth(),
    enabled: options?.enabled ?? true,
    refetchInterval: options?.refetchInterval,
  });
}

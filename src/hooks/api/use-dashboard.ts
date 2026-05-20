"use client";

import { useQuery } from "@tanstack/react-query";

import { getDashboardHome } from "@/actions/dashboard";

import { dashboardKeys } from "./keys";

export function useDashboardHome() {
  return useQuery({
    queryKey: dashboardKeys.home(),
    queryFn: () => getDashboardHome(),
  });
}

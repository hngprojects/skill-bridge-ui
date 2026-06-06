"use client";

import { useQuery } from "@tanstack/react-query";

import { getEmployerDashboardHome } from "@/actions/employer-dashboard";

import { employerDashboardKeys } from "./keys";

export function useEmployerDashboardHome() {
  return useQuery({
    queryKey: employerDashboardKeys.home(),
    queryFn: () => getEmployerDashboardHome(),
  });
}

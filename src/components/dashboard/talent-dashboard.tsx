"use client";

import { Overview } from "@/components/assessments/overview";
import { useDashboardHome } from "@/hooks/api/use-dashboard";

import { pickDashboardVariant } from "./dashboard-variant";
import { EmergingUserDashboard } from "./emerging-user/emerging-user-dashboard";
import { JobReadyDashboard } from "./job-ready/job-ready-dashboard";

export function TalentDashboard() {
  const { data: dashboardHome } = useDashboardHome();
  const variant = pickDashboardVariant(dashboardHome);

  if (variant === "job-ready") return <JobReadyDashboard />;
  if (variant === "emerging-user") return <EmergingUserDashboard />;
  return <Overview />;
}

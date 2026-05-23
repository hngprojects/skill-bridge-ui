"use client";

import { Overview } from "@/components/assessments/overview";
import { useDashboardHome } from "@/hooks/api/use-dashboard";

import { pickDashboardVariant } from "./dashboard-variant";
import { EmergingUserDashboard } from "./emerging-user/emerging-user-dashboard";
import { JobReadyDashboard } from "./job-ready/job-ready-dashboard";

export function TalentDashboard() {
  const { data: dashboardHome } = useDashboardHome();
  const variant = pickDashboardVariant(dashboardHome);

  if (variant === "job-ready" && dashboardHome) {
    return <JobReadyDashboard dashboardHome={dashboardHome} />;
  }
  if (variant === "emerging-user" && dashboardHome) {
    return <EmergingUserDashboard dashboardHome={dashboardHome} />;
  }
  return <Overview />;
}

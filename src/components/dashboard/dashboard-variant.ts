import type { DashboardHomeResponseData } from "@/types/api";

export type DashboardVariant = "overview" | "emerging-user" | "job-ready";

export function pickDashboardVariant(
  dashboardHome: DashboardHomeResponseData | undefined,
): DashboardVariant {
  const skill = dashboardHome?.performance?.skill;
  const advanced = dashboardHome?.performance?.advanced;
  if (!skill?.completedAt || !advanced?.completedAt) return "overview";
  return advanced.tier === "job_ready" ? "job-ready" : "emerging-user";
}

"use client";

import { EmployerDashboardHeader } from "@/components/dashboard/employer/dashboard/employer-dashboard-header";
import { EmployerRecentActivity } from "@/components/dashboard/employer/dashboard/employer-recent-activity";
import { EmployerStatCards } from "@/components/dashboard/employer/dashboard/employer-stat-cards";
import type { EmployerRecentActivityItem } from "@/types/api/employer-dashboard";

type EmployerDashboardOverviewProps = {
  counts: Record<string, number>;
  recentActivity: EmployerRecentActivityItem[];
};

export function EmployerDashboardOverview({
  counts,
  recentActivity,
}: EmployerDashboardOverviewProps) {
  return (
    <div className="mx-auto max-w-274 space-y-6 py-8 px-4 sm:px-6">
      <EmployerDashboardHeader />
      <EmployerStatCards counts={counts} />
      <EmployerRecentActivity items={recentActivity} />
    </div>
  );
}

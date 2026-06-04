"use client";

import { EmployerDashboardHeader } from "@/components/dashboard/employer/dashboard/employer-dashboard-header";
import { EmployerStatCards } from "@/components/dashboard/employer/dashboard/employer-stat-cards";
import { EmployerRecentActivity } from "@/components/dashboard/employer/dashboard/employer-recent-activity";

export function EmployerDashboardOverview() {
  return (
    <div className="mx-auto max-w-274 space-y-6 py-8 px-4 sm:px-6">
      <EmployerDashboardHeader />
      <EmployerStatCards />
      <EmployerRecentActivity />
    </div>
  );
}

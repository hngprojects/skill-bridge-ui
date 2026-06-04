"use client";

import { EmployerDashboardHeader } from "@/components/dashboard/employer/employer-dashboard-header";
import { EmployerStatCards } from "@/components/dashboard/employer/employer-stat-cards";
import { EmployerRecentActivity } from "@/components/dashboard/employer/employer-recent-activity";

export function EmployerDashboardOverview() {
  return (
    <div className="mx-auto max-w-[1096px] space-y-6 py-8">
      <EmployerDashboardHeader />
      <EmployerStatCards />
      <EmployerRecentActivity />
    </div>
  );
}

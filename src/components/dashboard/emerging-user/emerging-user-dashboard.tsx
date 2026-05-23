import { DashboardRecommended } from "@/components/dashboard/dashboard-recommended";
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome";
import type { DashboardHomeResponseData } from "@/types/api";

import { DashboardJobRoadmap } from "./emerging-user-job-roadmap";
import { DashboardSkillBreakdown } from "./emerging-user-skill-breakdown";
import { DashboardStatusCard } from "./emerging-user-status-card";

type EmergingUserDashboardProps = {
  dashboardHome: DashboardHomeResponseData;
};

export function EmergingUserDashboard({
  dashboardHome,
}: EmergingUserDashboardProps) {
  const advanced = dashboardHome.performance?.advanced;

  return (
    <div className="py-8 space-y-6 max-w-5xl mx-auto">
      <DashboardWelcome
        firstName={dashboardHome.firstName}
        profileCompletion={dashboardHome.profileCompletionPercentage}
      />
      <DashboardStatusCard
        tier={advanced?.tierLabel}
        score={advanced?.percentage}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DashboardSkillBreakdown activePercentage={advanced?.percentage} />
        <DashboardJobRoadmap journeyOverview={dashboardHome.journeyOverview} />
      </div>
      <DashboardRecommended />
    </div>
  );
}

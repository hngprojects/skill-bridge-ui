import { DashboardRecommended } from "@/components/dashboard/dashboard-recommended";
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome";

import { DashboardJobRoadmap } from "./emerging-user-job-roadmap";
import { DashboardSkillBreakdown } from "./emerging-user-skill-breakdown";
import { DashboardStatusCard } from "./emerging-user-status-card";

export function EmergingUserDashboard() {
  return (
    <div className="py-8 space-y-6 max-w-5xl mx-auto">
      <DashboardWelcome />
      <DashboardStatusCard />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DashboardSkillBreakdown />
        <DashboardJobRoadmap />
      </div>
      <DashboardRecommended />
    </div>
  );
}

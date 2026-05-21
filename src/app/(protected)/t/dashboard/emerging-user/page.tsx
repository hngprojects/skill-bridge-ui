import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome";
import { DashboardStatusCard } from "@/components/dashboard/emerging-user/emerging-user-status-card";
import { DashboardSkillBreakdown } from "@/components/dashboard/emerging-user/emerging-user-skill-breakdown";
import { DashboardJobRoadmap } from "@/components/dashboard/emerging-user/emerging-user-job-roadmap";
import { DashboardRecommended } from "@/components/dashboard/dashboard-recommended";

export default function TalentDashboard() {
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

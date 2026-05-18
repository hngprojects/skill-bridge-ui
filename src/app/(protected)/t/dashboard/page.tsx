import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome";
import { DashboardStatusCard } from "@/components/dashboard/dashboard-status-card";
import { DashboardSkillBreakdown } from "@/components/dashboard/dashboard-skill-breakdown";

export default function TalentDashboard() {
  return (
    <div className="py-8 space-y-6 max-w-5xl mx-auto">
      <DashboardWelcome />
      <DashboardStatusCard />
      <DashboardSkillBreakdown />
    </div>
  );
}

import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome";
import { JobReadyStatusCard } from "@/components/dashboard/job-ready/job-ready-status-card";
import { JobReadySkillBreakdown } from "@/components/dashboard/job-ready/job-ready-skill-breakdown";
import { JobReadyVerifiedProfile } from "@/components/dashboard/job-ready/job-ready-verified-profile";
import { DashboardRecommended } from "@/components/dashboard/dashboard-recommended";

export default function TalentDashboard() {
  return (
    <div className="py-8 space-y-6 max-w-5xl mx-auto">
      <DashboardWelcome />
      <JobReadyStatusCard />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <JobReadySkillBreakdown />
        <JobReadyVerifiedProfile />
      </div>
      <DashboardRecommended />
    </div>
  );
}

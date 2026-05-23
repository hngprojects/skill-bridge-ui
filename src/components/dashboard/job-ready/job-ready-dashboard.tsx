import { DashboardRecommended } from "@/components/dashboard/dashboard-recommended";
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome";

import { JobReadySkillBreakdown } from "./job-ready-skill-breakdown";
import { JobReadyStatusCard } from "./job-ready-status-card";
import { JobReadyVerifiedProfile } from "./job-ready-verified-profile";

export function JobReadyDashboard() {
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

import { DashboardRecommended } from "@/components/dashboard/dashboard-recommended";
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome";
import type { DashboardHomeResponseData } from "@/types/api";

import { JobReadySkillBreakdown } from "./job-ready-skill-breakdown";
import { JobReadyStatusCard } from "./job-ready-status-card";
import { JobReadyVerifiedProfile } from "./job-ready-verified-profile";

type JobReadyDashboardProps = {
  dashboardHome: DashboardHomeResponseData;
};

export function JobReadyDashboard({ dashboardHome }: JobReadyDashboardProps) {
  const advanced = dashboardHome.performance?.advanced;

  return (
    <div className="py-8 space-y-6 max-w-5xl mx-auto">
      <DashboardWelcome
        firstName={dashboardHome.firstName}
        profileCompletion={dashboardHome.profileCompletionPercentage}
      />
      <JobReadyStatusCard
        tier={advanced?.tierLabel}
        score={advanced?.percentage}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <JobReadySkillBreakdown activePercentage={advanced?.percentage} />
        <JobReadyVerifiedProfile
          firstName={dashboardHome.firstName}
          verifiedAt={advanced?.completedAt}
        />
      </div>
      <DashboardRecommended />
    </div>
  );
}

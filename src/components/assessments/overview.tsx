"use client";

import { useMemo } from "react";

import {
  ASSESSMENT_EXPECTATIONS,
  ASSESSMENT_PROFILE_COMPLETION,
  ASSESSMENT_ROADMAP_STEPS,
} from "@/constants/assessment-roadmap";
import { useDashboardHome } from "@/hooks/api/use-dashboard";

import { applyDashboardHomeToRoadmapSteps } from "./dashboard-home-state";
import { ExpectationsPanel } from "./expectations-panel";
import { OverviewHeader } from "./overview-header";
import { RoadmapSection } from "./roadmap-section";

export function Overview() {
  const { data: dashboardHome } = useDashboardHome();
  const roadmapSteps = useMemo(
    () =>
      applyDashboardHomeToRoadmapSteps(ASSESSMENT_ROADMAP_STEPS, dashboardHome),
    [dashboardHome],
  );
  const profileCompletion =
    dashboardHome?.profileCompletionPercentage ?? ASSESSMENT_PROFILE_COMPLETION;

  return (
    <div className="mx-auto max-w-260.5 animate-in fade-in slide-in-from-bottom-1 px-1 pb-10 duration-500 sm:px-0">
      <OverviewHeader profileCompletion={profileCompletion} />
      <ExpectationsPanel items={ASSESSMENT_EXPECTATIONS} />
      <RoadmapSection steps={roadmapSteps} />
    </div>
  );
}

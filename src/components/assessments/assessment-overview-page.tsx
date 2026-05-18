"use client";

import {
  ASSESSMENT_EXPECTATIONS,
  ASSESSMENT_PROFILE_COMPLETION,
  ASSESSMENT_ROADMAP_STEPS,
} from "@/constants/assessment-roadmap";

import { ExpectationsPanel } from "./expectations-panel";
import { OverviewHeader } from "./overview-header";
import { RoadmapSection } from "./roadmap-section";

export function AssessmentOverviewPage() {
  return (
    <div className="mx-auto max-w-[1042px] px-1 pb-10 sm:px-0">
      <OverviewHeader profileCompletion={ASSESSMENT_PROFILE_COMPLETION} />
      <ExpectationsPanel items={ASSESSMENT_EXPECTATIONS} />
      <RoadmapSection steps={ASSESSMENT_ROADMAP_STEPS} />
    </div>
  );
}

"use client";

import {
  ASSESSMENT_EXPECTATIONS,
  ASSESSMENT_PROFILE_COMPLETION,
  ASSESSMENT_ROADMAP_STEPS,
} from "@/constants/assessment-roadmap";

import { ExpectationsPanel } from "./expectations-panel";
import { OverviewHeader } from "./overview-header";
import { RoadmapSection } from "./roadmap-section";

export function Overview() {
  return (
    <div className="mx-auto max-w-[1042px] animate-in fade-in slide-in-from-bottom-1 px-1 pb-10 duration-500 sm:px-0">
      <OverviewHeader profileCompletion={ASSESSMENT_PROFILE_COMPLETION} />
      <ExpectationsPanel items={ASSESSMENT_EXPECTATIONS} />
      <RoadmapSection steps={ASSESSMENT_ROADMAP_STEPS} />
    </div>
  );
}

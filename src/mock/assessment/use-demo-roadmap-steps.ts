"use client";

import { useAssessmentDemoStore } from "./demo-store";
import {
  deriveDemoCatalogSteps,
  deriveDemoRoadmapSteps,
} from "./derive-roadmap-steps";

function useDemoPhaseStatuses() {
  return useAssessmentDemoStore(
    (s) =>
      `${s.phases.personal.status}:${s.phases.skill.status}:${s.phases.advanced.status}`,
  );
}

/** Re-renders when any job-assessment phase status changes. */
export function useDemoRoadmapSteps() {
  useDemoPhaseStatuses();
  return deriveDemoRoadmapSteps();
}

export function useDemoCatalogSteps() {
  useDemoPhaseStatuses();
  return deriveDemoCatalogSteps();
}

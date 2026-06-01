import {
  ASSESSMENT_CATALOG_STEPS,
  ASSESSMENT_ROADMAP_STEPS,
  type AssessmentCatalogStep,
  type AssessmentRoadmapStep,
  type AssessmentRoadmapStepStatus,
} from "@/constants/assessment-roadmap";

import { useAssessmentDemoStore } from "./demo-store";
import type { DemoAssessmentPhase } from "./question-slices";

const CATALOG_ID_TO_PHASE: Record<string, DemoAssessmentPhase> = {
  "personal-assessment": "personal",
  "skill-career-assessment": "skill",
  "advanced-assessment": "advanced",
};

const ROADMAP_SLUG_TO_PHASE: Record<string, DemoAssessmentPhase> = {
  personal: "personal",
  skill: "skill",
  advanced: "advanced",
};

function toRoadmapState(
  phaseStatus: ReturnType<
    typeof useAssessmentDemoStore.getState
  >["phases"][DemoAssessmentPhase]["status"],
): AssessmentRoadmapStepStatus {
  if (phaseStatus === "completed") return "completed";
  if (phaseStatus === "locked") return "locked";
  return "available";
}

export type DemoCatalogStep = AssessmentCatalogStep & {
  href?: string;
};

export function deriveDemoRoadmapSteps(): AssessmentRoadmapStep[] {
  const phases = useAssessmentDemoStore.getState().phases;

  return ASSESSMENT_ROADMAP_STEPS.map((step) => {
    const phase = ROADMAP_SLUG_TO_PHASE[step.slug];
    if (!phase) return step;

    const status = phases[phase].status;
    return {
      ...step,
      state: toRoadmapState(status),
      ctaLabel:
        status === "completed"
          ? "Completed"
          : status === "locked"
            ? step.ctaLabel
            : status === "in_progress"
              ? "Continue"
              : "Start",
    };
  });
}

export function deriveDemoCatalogSteps(): DemoCatalogStep[] {
  const phases = useAssessmentDemoStore.getState().phases;

  return ASSESSMENT_CATALOG_STEPS.map((step) => {
    const phase = CATALOG_ID_TO_PHASE[step.id];
    if (!phase) return step;

    const status = phases[phase].status;
    const state =
      status === "completed"
        ? "completed"
        : status === "locked"
          ? "locked"
          : "available";

    const href =
      state === "available" || status === "in_progress"
        ? `/t/assessments/${phase}`
        : undefined;

    return {
      ...step,
      state,
      ctaLabel:
        state === "completed"
          ? "Completed"
          : state === "locked"
            ? step.ctaLabel
            : status === "in_progress"
              ? "Continue"
              : "Start",
      href,
    };
  });
}

import type {
  AssessmentCatalogStep,
  AssessmentRoadmapStep,
  AssessmentRoadmapStepStatus,
  AssessmentRoadmapTab,
} from "@/constants/assessment-roadmap";
import type {
  DashboardHomeResponseData,
  DashboardJourneyOverviewItem,
} from "@/types/api";

const DASHBOARD_KEY_BY_STEP_ID: Record<string, string> = {
  "personal-assessment": "personal",
  "skill-career-assessment": "skill",
  "advanced-assessment": "advanced",
};

function getStatusByJourneyKey(
  journeyOverview: DashboardJourneyOverviewItem[],
) {
  return new Map(journeyOverview.map((item) => [item.key, item.status]));
}

function getStepStatus(
  stepId: string,
  statusByJourneyKey: Map<string, AssessmentRoadmapStepStatus>,
) {
  const journeyKey = DASHBOARD_KEY_BY_STEP_ID[stepId];
  return journeyKey ? statusByJourneyKey.get(journeyKey) : undefined;
}

function ctaLabelForStatus(status: AssessmentRoadmapStepStatus) {
  return status === "completed" ? "Completed" : "Start";
}

function tabForStatus(
  status: AssessmentRoadmapStepStatus,
): AssessmentRoadmapTab {
  return status === "completed" ? "completed" : "in-progress";
}

export function applyDashboardHomeToRoadmapSteps(
  steps: AssessmentRoadmapStep[],
  dashboardHome: DashboardHomeResponseData | undefined,
) {
  if (!dashboardHome) return steps;

  const statusByJourneyKey = getStatusByJourneyKey(
    dashboardHome.journeyOverview,
  );

  // When the user has used all skill attempts they're effectively done with
  // skill — surface it as "completed" on the roadmap even though the journey
  // status comes back as "locked".
  const skillAttemptsExhausted =
    dashboardHome.performance?.skill?.attemptsRemaining === 0;

  return steps.map((step) => {
    const status = getStepStatus(step.id, statusByJourneyKey);
    if (!status) return step;

    const effectiveStatus: AssessmentRoadmapStepStatus =
      step.id === "skill-career-assessment" && skillAttemptsExhausted
        ? "completed"
        : status;

    return {
      ...step,
      state: effectiveStatus,
      tab: tabForStatus(effectiveStatus),
      ctaLabel: ctaLabelForStatus(effectiveStatus),
    };
  });
}

export function applyDashboardHomeToCatalogSteps(
  steps: AssessmentCatalogStep[],
  dashboardHome: DashboardHomeResponseData | undefined,
) {
  if (!dashboardHome) return steps;

  const statusByJourneyKey = getStatusByJourneyKey(
    dashboardHome.journeyOverview,
  );

  // Mirror the roadmap: when all skill attempts are used the user is done
  // with skill, so the catalog should render it as completed too even
  // though the journey status comes back as "locked".
  const skillAttemptsExhausted =
    dashboardHome.performance?.skill?.attemptsRemaining === 0;

  return steps.map((step) => {
    const status = getStepStatus(step.id, statusByJourneyKey);
    if (!status) return step;

    const effectiveStatus: AssessmentRoadmapStepStatus =
      step.id === "skill-career-assessment" && skillAttemptsExhausted
        ? "completed"
        : status;

    return {
      ...step,
      state: effectiveStatus,
      ctaLabel: ctaLabelForStatus(effectiveStatus),
    };
  });
}

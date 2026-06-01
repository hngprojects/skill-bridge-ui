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

/**
 * Skill step gets a "Retake" label once the user has attempted it at least
 * once but still has attempts remaining. Completed and exhausted states are
 * already collapsed to "completed" upstream, so this branch only fires for
 * the in-progress state where the user has a failed (or partial) attempt
 * on the record.
 */
function ctaLabelForSkillStep(
  status: AssessmentRoadmapStepStatus,
  skillAttemptsUsed: number,
) {
  if (status === "completed") return "Completed";
  if (skillAttemptsUsed > 0) return "Retake";
  return "Start";
}

function getSkillAttemptsUsed(
  dashboardHome: DashboardHomeResponseData | undefined,
): number {
  return (
    dashboardHome?.performance?.skill?.attemptsUsed ??
    dashboardHome?.skillAttemptsUsed ??
    0
  );
}

function tabForStatus(
  status: AssessmentRoadmapStepStatus,
): AssessmentRoadmapTab {
  return status === "completed" ? "completed" : "in-progress";
}

/**
 * Single source of truth for "has the user used up all their skill attempts?"
 * Honors all three possible API shapes:
 *   1. `performance.skill.attemptsRemaining` (preferred)
 *   2. `performance.skill.attemptsUsed` vs `skillMaxAttempts`
 *   3. top-level `skillAttemptsUsed` vs `skillMaxAttempts`
 * Returns false when the data is partial enough that we can't decide — never
 * lock the user out on insufficient evidence.
 */
export function isSkillExhausted(
  dashboardHome: DashboardHomeResponseData | undefined,
): boolean {
  if (!dashboardHome) return false;
  const skill = dashboardHome.performance?.skill;
  if (skill?.attemptsRemaining != null) return skill.attemptsRemaining === 0;
  const used = skill?.attemptsUsed ?? dashboardHome.skillAttemptsUsed;
  const max = dashboardHome.skillMaxAttempts;
  return used != null && max != null && used >= max;
}

function formatSkillAttemptsCooldownLabel(
  dashboardHome: DashboardHomeResponseData,
): string | undefined {
  const skill = dashboardHome.performance?.skill;
  const used = skill?.attemptsUsed ?? dashboardHome.skillAttemptsUsed;
  const max = dashboardHome.skillMaxAttempts;
  if (max == null) return undefined;

  const remaining =
    skill?.attemptsRemaining ??
    (used != null ? Math.max(0, max - used) : undefined);

  if (remaining == null) return `${max} attempts`;
  if (remaining === 0) return "No attempts remaining";
  if (remaining === 1 && max === 1) return "1 attempt remaining";
  return `${remaining} of ${max} attempts remaining`;
}

function formatAdvancedRetakeCooldownLabel(
  dashboardHome: DashboardHomeResponseData,
): string | undefined {
  const retake =
    dashboardHome.performance?.advanced?.retake ?? dashboardHome.advancedRetake;
  const daysRemaining = retake?.daysRemaining;
  if (daysRemaining == null) return undefined;
  if (daysRemaining <= 0) return "Retake available now";
  if (daysRemaining === 1) return "Retake in 1 day";
  return `Retake in ${daysRemaining} days`;
}

export function applyDashboardHomeToRoadmapSteps(
  steps: AssessmentRoadmapStep[],
  dashboardHome: DashboardHomeResponseData | undefined,
) {
  if (!dashboardHome) return steps;

  const statusByJourneyKey = getStatusByJourneyKey(
    dashboardHome.journeyOverview,
  );

  const skillAttemptsExhausted = isSkillExhausted(dashboardHome);
  const skillAttemptsUsed = getSkillAttemptsUsed(dashboardHome);

  return steps.map((step) => {
    const status = getStepStatus(step.id, statusByJourneyKey);
    if (!status) return step;

    const isSkillStep = step.id === "skill-career-assessment";
    const effectiveStatus: AssessmentRoadmapStepStatus =
      isSkillStep && skillAttemptsExhausted ? "completed" : status;

    return {
      ...step,
      state: effectiveStatus,
      tab: tabForStatus(effectiveStatus),
      ctaLabel: isSkillStep
        ? ctaLabelForSkillStep(effectiveStatus, skillAttemptsUsed)
        : ctaLabelForStatus(effectiveStatus),
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
  const skillAttemptsExhausted = isSkillExhausted(dashboardHome);
  const skillAttemptsUsed = getSkillAttemptsUsed(dashboardHome);

  return steps.map((step) => {
    const status = getStepStatus(step.id, statusByJourneyKey);
    if (!status) return step;

    const isSkillStep = step.id === "skill-career-assessment";
    const isAdvancedStep = step.id === "advanced-assessment";
    const effectiveStatus: AssessmentRoadmapStepStatus =
      isSkillStep && skillAttemptsExhausted ? "completed" : status;

    const skillAttemptsLabel = isSkillStep
      ? formatSkillAttemptsCooldownLabel(dashboardHome)
      : undefined;
    const advancedRetakeLabel = isAdvancedStep
      ? formatAdvancedRetakeCooldownLabel(dashboardHome)
      : undefined;

    return {
      ...step,
      state: effectiveStatus,
      ctaLabel: isSkillStep
        ? ctaLabelForSkillStep(effectiveStatus, skillAttemptsUsed)
        : ctaLabelForStatus(effectiveStatus),
      ...(skillAttemptsLabel != null
        ? { cooldownLabel: skillAttemptsLabel }
        : {}),
      ...(advancedRetakeLabel != null
        ? { cooldownLabel: advancedRetakeLabel }
        : {}),
    };
  });
}

"use client";

import { AssessmentPreviewCard } from "@/components/assessments/assessment-preview-card";
import { isSkillExhausted } from "@/components/assessments/dashboard-home-state";
import {
  getAssessmentPreview,
  type AssessmentPreview,
  type AssessmentSlug,
} from "@/constants/assessment-previews";
import { useDashboardHome } from "@/hooks/api/use-dashboard";

type AssessmentPreviewPageProps = {
  assessmentName: AssessmentSlug;
};

/**
 * For the skill assessment, swap the static "3 attempts" copy for a live
 * "X of Y attempts remaining" line driven by `/dashboard/home`. Personal and
 * advanced previews keep their static copy.
 */
function withDynamicSkillAttempts(
  base: AssessmentPreview,
  slug: AssessmentSlug,
  dashboardHome: ReturnType<typeof useDashboardHome>["data"],
): AssessmentPreview {
  if (slug !== "skill" || !dashboardHome) return base;
  const used =
    dashboardHome.performance?.skill?.attemptsUsed ??
    dashboardHome.skillAttemptsUsed;
  const max = dashboardHome.skillMaxAttempts;
  if (used == null || max == null) return base;
  const remaining = Math.max(0, max - used);
  const attempts =
    remaining === 0
      ? `No attempts remaining (${used} of ${max} used)`
      : `${remaining} of ${max} attempts remaining`;
  return { ...base, attempts };
}

function AssessmentPreviewPage({ assessmentName }: AssessmentPreviewPageProps) {
  const base = getAssessmentPreview(assessmentName);
  const { data: dashboardHome } = useDashboardHome();
  const assessment = withDynamicSkillAttempts(
    base,
    assessmentName,
    dashboardHome,
  );

  // When skill attempts are exhausted, the Start CTA can't open the skill
  // questionnaire — redirect the user to the next step in their journey
  // (advanced) instead. Other previews keep their default Start → /q route.
  const skillExhausted =
    assessmentName === "skill" && isSkillExhausted(dashboardHome);
  // Once the user has attempted skill at least once but still has attempts
  // left, label the CTA "Retake" so it's clear they're not starting fresh.
  const skillAttemptsUsed =
    assessmentName === "skill"
      ? (dashboardHome?.performance?.skill?.attemptsUsed ??
        dashboardHome?.skillAttemptsUsed ??
        0)
      : 0;
  const skillIsRetake =
    assessmentName === "skill" && !skillExhausted && skillAttemptsUsed > 0;
  const startHref = skillExhausted ? "/t/assessments/advanced" : undefined;
  const startLabel = skillExhausted
    ? "Continue to advanced"
    : skillIsRetake
      ? "Retake"
      : undefined;

  return (
    <div className="flex min-h-[calc(100dvh-72px)] items-start justify-center px-4 pt-11 pb-14 sm:pt-14 lg:pt-16 2xl:pt-20">
      <div className="mx-auto w-full max-w-200 xl:max-w-217.5 2xl:max-w-238">
        <AssessmentPreviewCard
          assessment={assessment}
          startHref={startHref}
          startLabel={startLabel}
        />
      </div>
    </div>
  );
}

export { AssessmentPreviewPage };
export type { AssessmentPreviewPageProps };

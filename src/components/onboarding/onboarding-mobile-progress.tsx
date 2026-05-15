"use client";

import type { OnboardingStepId } from "@/constants/talent-onboarding";

import { getOnboardingStepProgress } from "@/lib/utils";

type OnboardingMobileProgressProps = {
  currentStepId: OnboardingStepId;
};

function OnboardingMobileProgress({
  currentStepId,
}: OnboardingMobileProgressProps) {
  const { stepMeta, stepIndex, progressPercent, totalSteps } =
    getOnboardingStepProgress(currentStepId);

  return (
    <div className="w-full lg:hidden">
      <p className="mb-2 text-sm font-semibold text-foreground">
        {stepMeta?.title}
      </p>
      <div
        role="progressbar"
        aria-valuenow={Math.round(progressPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Onboarding step ${stepIndex + 1} of ${totalSteps}`}
        className="h-1 w-full overflow-hidden rounded-full bg-[#E2E8F0]"
      >
        <div
          className="h-full rounded-full bg-[#ea580c] transition-[width] duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export { OnboardingMobileProgress };

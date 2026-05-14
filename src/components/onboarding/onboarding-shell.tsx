"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { OnboardingIntroHeader } from "@/components/onboarding/onboarding-intro-header";
import { OnboardingMobileProgress } from "@/components/onboarding/onboarding-mobile-progress";
import { OnboardingShellFooter } from "@/components/onboarding/onboarding-shell-footer";
import { getOnboardingStepProgress } from "@/lib/utils";
import { OnboardingSidebar } from "@/components/onboarding/onboarding-sidebar";
import type { OnboardingStepId } from "@/constants/talent-onboarding";

export type { OnboardingStepId } from "@/constants/talent-onboarding";
export { ONBOARDING_STEPS } from "@/constants/talent-onboarding";

type OnboardingShellProps = {
  currentStepId: OnboardingStepId;
  onNext: () => void;
  onBack: () => void;
  showBack?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

function OnboardingShell({
  currentStepId,
  onNext,
  onBack,
  showBack = true,
  showNext = true,
  nextDisabled = false,
  title,
  description,
  children,
  className,
}: OnboardingShellProps) {
  const { stepMeta } = getOnboardingStepProgress(currentStepId);
  const resolvedTitle = title ?? stepMeta?.title;
  const hasIntro = resolvedTitle != null || description != null;
  const fallbackTitle = stepMeta?.title ?? "Onboarding";
  const isGenerateRoadmap = currentStepId === "generate-roadmap";

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-10 lg:flex-row lg:gap-12 xl:gap-16",
        className,
      )}
    >
      <OnboardingSidebar
        currentStepId={currentStepId}
        className={cn("hidden lg:block", isGenerateRoadmap && "lg:hidden")}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-10">
        <section
          className="flex min-w-0 flex-1 flex-col gap-10 lg:gap-16"
          aria-labelledby="onboarding-step-heading"
        >
          <OnboardingMobileProgress currentStepId={currentStepId} />
          <OnboardingIntroHeader
            resolvedTitle={resolvedTitle}
            description={description}
            fallbackTitle={fallbackTitle}
            hasIntro={hasIntro}
            centered={isGenerateRoadmap}
          />
          <div className="min-w-0">{children}</div>
        </section>

        {!isGenerateRoadmap && (
          <OnboardingShellFooter
            showBack={showBack}
            showNext={showNext}
            nextDisabled={nextDisabled}
            onBack={onBack}
            onNext={onNext}
          />
        )}
      </div>
    </div>
  );
}

export { OnboardingShell };

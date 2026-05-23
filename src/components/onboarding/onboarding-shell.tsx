"use client";

import { cn } from "@/lib/utils";
import { OnboardingIntroHeader } from "@/components/onboarding/onboarding-intro-header";
import { OnboardingMobileProgress } from "@/components/onboarding/onboarding-mobile-progress";
import { OnboardingShellFooter } from "@/components/onboarding/onboarding-shell-footer";
import { getOnboardingStepProgress } from "@/lib/utils";
import { OnboardingSidebar } from "@/components/onboarding/onboarding-sidebar";
import type { OnboardingShellProps } from "@/types/onboarding";

export type { OnboardingStepId } from "@/constants/talent-onboarding";
export { ONBOARDING_STEPS } from "@/constants/talent-onboarding";

function OnboardingShell({
  currentStepId,
  onNext,
  onBack,
  showBack = true,
  showNext = true,
  nextDisabled = false,
  nextLoading = false,
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

  if (isGenerateRoadmap) {
    return (
      <div className="flex w-full min-h-[calc(100vh-72px)] flex-col items-center justify-center gap-8 bg-white px-4 pb-30">
        <style>{`footer { display: none !important; }`}</style>
        {children}
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-360 flex-1 flex-col bg-white px-5 pb-20 pt-8 sm:px-6 sm:pt-10 md:px-16 lg:px-16">
      <div className={cn("flex flex-col lg:flex-row lg:gap-x-24", className)}>
        <aside className="hidden shrink-0 lg:block lg:w-64">
          <OnboardingSidebar currentStepId={currentStepId} />
        </aside>

        <main className="min-w-0 flex-1">
          <div className="flex w-full flex-col gap-8 sm:gap-10 lg:max-w-150 lg:gap-8">
            <div className="lg:hidden">
              <OnboardingMobileProgress currentStepId={currentStepId} />
            </div>

            <section className="flex flex-col gap-8 lg:gap-8">
              <OnboardingIntroHeader
                resolvedTitle={resolvedTitle}
                description={description}
                fallbackTitle={fallbackTitle}
                hasIntro={hasIntro}
                centered={false}
              />

              <div className="w-full">{children}</div>
            </section>

            <div className="pb-20">
              <OnboardingShellFooter
                showBack={showBack}
                showNext={showNext}
                nextDisabled={nextDisabled}
                nextLoading={nextLoading}
                onBack={onBack}
                onNext={onNext}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export { OnboardingShell };

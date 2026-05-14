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

  if (isGenerateRoadmap) {
    return (
      <div className="flex w-full min-h-[calc(100vh-72px)] flex-col items-center justify-center gap-8 bg-white px-4 pb-40">
        <style>{`footer { display: none !important; }`}</style>
        <OnboardingIntroHeader
          resolvedTitle={resolvedTitle}
          description={description}
          fallbackTitle={fallbackTitle}
          hasIntro={hasIntro}
          centered={true}
        />
        {children}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col bg-white pb-20">
      <div className="container mx-auto max-w-360 flex-1 px-6 lg:px-16 pt-10">
        <div className={cn("flex flex-col lg:flex-row lg:gap-x-24", className)}>
          <aside className="hidden lg:block lg:w-64 shrink-0">
            <OnboardingSidebar currentStepId={currentStepId} />
          </aside>

          <main className="flex-1">
            <div className="w-full lg:max-w-150">
              <div className="lg:hidden">
                <OnboardingMobileProgress currentStepId={currentStepId} />
              </div>

              <section className="flex flex-col gap-6 lg:gap-8">
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
                  onBack={onBack}
                  onNext={onNext}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export { OnboardingShell };

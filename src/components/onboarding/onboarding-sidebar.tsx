"use client";

import type { OnboardingStepId } from "@/constants/talent-onboarding";
import { ONBOARDING_STEPS } from "@/constants/talent-onboarding";
import { cn } from "@/lib/utils";

type OnboardingSidebarProps = {
  currentStepId: OnboardingStepId;
  className?: string;
};

function OnboardingSidebar({
  currentStepId,
  className,
}: OnboardingSidebarProps) {
  return (
    <nav
      aria-label="Onboarding progress"
      className={cn("w-full shrink-0 sm:w-52 lg:w-56", className)}
    >
      <ol className="flex flex-col gap-0">
        {ONBOARDING_STEPS.filter((step) => step.id !== "generate-roadmap").map(
          (step) => {
            const active = step.id === currentStepId;
            return (
              <li key={step.id} className="py-3 pl-4">
                <div
                  className={cn(
                    "border-l-4 pl-3 py-1 text-sm font-medium transition-colors",
                    active
                      ? "border-l-[#ff7854] font-bold text-foreground"
                      : "border-l-transparent text-muted-foreground",
                  )}
                >
                  {step.title}
                </div>
              </li>
            );
          },
        )}
      </ol>
    </nav>
  );
}

export { OnboardingSidebar };

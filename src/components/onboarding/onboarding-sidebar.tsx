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
      className={cn("w-full shrink-0", className)}
    >
      <ol className="flex flex-col gap-4">
        {ONBOARDING_STEPS.filter((step) => step.id !== "generate-roadmap").map(
          (step) => {
            const active = step.id === currentStepId;
            return (
              <li key={step.id}>
                <div
                  className={cn(
                    "border-l-4 py-1.5 pl-4 text-base transition-all duration-200",
                    active
                      ? "border-l-[#FF7854] font-bold text-[#151515]"
                      : "border-l-transparent font-normal text-[#757575]",
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

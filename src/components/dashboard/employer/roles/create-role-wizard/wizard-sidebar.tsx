"use client";

import { Check } from "lucide-react";

import {
  CREATE_ROLE_STEPS,
  type CreateRoleStepId,
} from "@/constants/create-role-wizard";
import { cn } from "@/lib/utils";

type WizardSidebarProps = {
  currentStepId: CreateRoleStepId;
};

export function WizardSidebar({ currentStepId }: WizardSidebarProps) {
  const currentIndex = CREATE_ROLE_STEPS.findIndex(
    (s) => s.id === currentStepId,
  );

  return (
    <nav aria-label="Role creation steps">
      <ol className="flex flex-col gap-5">
        {CREATE_ROLE_STEPS.map((step, index) => {
          const isDone = index <= currentIndex;

          return (
            <li key={step.id} className="flex items-center gap-3">
              <div
                aria-hidden
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  isDone
                    ? "bg-[#079455] text-white"
                    : "border border-[#D0D5DD] text-[#667085]",
                )}
              >
                {isDone ? (
                  <Check className="size-3.5 stroke-[2.5]" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "text-sm leading-5 transition-colors",
                  isDone
                    ? "font-semibold text-[#101828]"
                    : "font-normal text-[#667085]",
                )}
              >
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

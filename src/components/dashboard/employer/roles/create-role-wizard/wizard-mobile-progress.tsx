"use client";

import { Check } from "lucide-react";

import { CREATE_ROLE_STEPS } from "@/constants/create-role-wizard";

type WizardMobileProgressProps = {
  currentIndex: number;
};

export function WizardMobileProgress({
  currentIndex,
}: WizardMobileProgressProps) {
  const width = `${((currentIndex + 1) / CREATE_ROLE_STEPS.length) * 100}%`;

  return (
    <div className="lg:hidden">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex size-5 items-center justify-center rounded-full bg-[#079455] text-white">
          <Check className="size-3 stroke-[2.5]" />
        </div>
        <p className="text-sm font-semibold text-[#101828]">
          Step {currentIndex + 1} of {CREATE_ROLE_STEPS.length} ·{" "}
          {CREATE_ROLE_STEPS[currentIndex].title}
        </p>
      </div>
      <div
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={CREATE_ROLE_STEPS.length}
        className="h-1 w-full overflow-hidden rounded-full bg-[#E5E7EB]"
      >
        <div
          className="h-full rounded-full bg-[#EF4444] transition-[width] duration-300"
          style={{ width }}
        />
      </div>
    </div>
  );
}

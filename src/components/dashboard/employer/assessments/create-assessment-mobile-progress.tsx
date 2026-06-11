"use client";

import { Check } from "lucide-react";

import { CREATE_ASSESSMENT_STEPS } from "@/constants/create-assessment-wizard";

type CreateAssessmentMobileProgressProps = {
  currentStepIndex: number;
};

export function CreateAssessmentMobileProgress({
  currentStepIndex,
}: CreateAssessmentMobileProgressProps) {
  const width = `${((currentStepIndex + 1) / CREATE_ASSESSMENT_STEPS.length) * 100}%`;

  return (
    <div className="lg:hidden">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex size-5 items-center justify-center rounded-full bg-google-green text-white">
          <Check className="size-3 stroke-[2.5]" />
        </div>
        <p className="font-sans text-sm font-semibold text-[#101828]">
          Step {currentStepIndex + 1} of {CREATE_ASSESSMENT_STEPS.length} ·{" "}
          {CREATE_ASSESSMENT_STEPS[currentStepIndex].title}
        </p>
      </div>
      <div
        role="progressbar"
        aria-valuenow={currentStepIndex + 1}
        aria-valuemin={1}
        aria-valuemax={CREATE_ASSESSMENT_STEPS.length}
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

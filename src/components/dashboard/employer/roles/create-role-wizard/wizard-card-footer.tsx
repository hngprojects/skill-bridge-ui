"use client";

import { CREATE_ROLE_STEPS } from "@/constants/create-role-wizard";
import { Button } from "@/components/ui/button";

type WizardCardFooterProps = {
  currentIndex: number;
  isLastStep: boolean;
  isPending: boolean;
  nextDisabled: boolean;
  tip: string;
  onBack: () => void;
  onNext: () => void;
};

export function WizardCardFooter({
  currentIndex,
  isLastStep,
  isPending,
  nextDisabled,
  tip,
  onBack,
  onNext,
}: WizardCardFooterProps) {
  const width = `${((currentIndex + 1) / CREATE_ROLE_STEPS.length) * 100}%`;

  return (
    <>
      <div className="h-1 w-full overflow-hidden bg-[#F2F4F7]">
        <div
          className="h-full bg-[#EF4444] transition-[width] duration-300 ease-out"
          style={{ width }}
        />
      </div>

      <div className="flex items-center justify-between px-8 py-5">
        {currentIndex === 0 ? (
          <p className="text-sm text-[#98A2B3]">{tip}</p>
        ) : (
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={isPending}
            className="h-9 rounded-xl border border-[#E5E7EB] px-5 text-sm text-[#667085] hover:bg-[#F9FAFB]"
          >
            Back
          </Button>
        )}
        <Button
          type="button"
          disabled={nextDisabled}
          onClick={onNext}
          className="h-9 min-w-24 rounded-xl bg-[#111827] px-5 text-sm font-semibold text-white hover:bg-[#111827]/90 disabled:opacity-40"
        >
          {isLastStep && isPending
            ? "Creating..."
            : isLastStep
              ? "Create Role"
              : "Next"}
        </Button>
      </div>
    </>
  );
}

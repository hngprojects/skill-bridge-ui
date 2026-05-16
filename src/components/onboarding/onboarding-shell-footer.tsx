"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navBtnShape = "rounded-lg px-4 h-11 min-w-48";

const nextDisabledStyles =
  "disabled:opacity-100 disabled:rounded-[8px] disabled:border-[0.6px] disabled:border-[#CBD5E1] disabled:bg-[#F1F5F9] disabled:text-slate-600";

type OnboardingShellFooterProps = {
  showBack: boolean;
  showNext: boolean;
  nextDisabled: boolean;
  nextLoading?: boolean;
  onBack: () => void;
  onNext: () => void;
};

function OnboardingShellFooter({
  showBack,
  showNext,
  nextDisabled,
  nextLoading = false,
  onBack,
  onNext,
}: OnboardingShellFooterProps) {
  const nextBlocked = nextDisabled || nextLoading;
  if (!showBack && !showNext) return null;

  return (
    <>
      <div className="flex w-full flex-col gap-3 sm:hidden">
        {showNext ? (
          <Button
            type="button"
            size="lg"
            className={cn(navBtnShape, "w-full", nextDisabledStyles)}
            disabled={nextBlocked}
            onClick={onNext}
          >
            {nextLoading ? "Saving…" : "Next"}
          </Button>
        ) : null}
        {showBack ? (
          <Button
            type="button"
            size="lg"
            variant="ghost"
            className={cn(
              navBtnShape,
              "w-full border-0 bg-[#CBD5E1] text-[#94A3B8] shadow-none",
              "hover:bg-[#BCC9D9] hover:text-[#94A3B8]",
              "focus-visible:ring-[#94A3B8]/30",
            )}
            disabled={nextLoading}
            onClick={onBack}
          >
            Back
          </Button>
        ) : null}
      </div>

      <div className="hidden w-full items-center pt-2 sm:flex">
        <div className="flex min-w-0 flex-1 justify-start">
          {showBack ? (
            <Button
              type="button"
              size="lg"
              variant="ghost"
              className={cn(
                navBtnShape,
                "min-w-32 border-0 bg-[#CBD5E1] text-[#94A3B8] shadow-none",
                "hover:bg-[#BCC9D9] hover:text-[#94A3B8]",
                "focus-visible:ring-[#94A3B8]/30",
              )}
              disabled={nextLoading}
              onClick={onBack}
            >
              Back
            </Button>
          ) : null}
        </div>
        <div className="flex shrink-0 justify-end">
          {showNext ? (
            <Button
              type="button"
              size="lg"
              className={cn(
                navBtnShape,
                "min-w-32 md:w-60 lg:min-w-60 lg:max-w-60",
                nextDisabledStyles,
              )}
              disabled={nextBlocked}
              onClick={onNext}
            >
              {nextLoading ? "Saving…" : "Next"}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export { OnboardingShellFooter };

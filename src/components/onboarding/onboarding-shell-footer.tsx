"use client";

import { Button } from "@/components/ui/button";
import {
  ONBOARDING_BACK_BTN_CLASSNAME,
  ONBOARDING_NEXT_BTN_CLASSNAME,
} from "@/constants/talent-onboarding";

type OnboardingShellFooterProps = {
  showBack: boolean;
  showNext: boolean;
  nextDisabled: boolean;
  onBack: () => void;
  onNext: () => void;
};

function OnboardingShellFooter({
  showBack,
  showNext,
  nextDisabled,
  onBack,
  onNext,
}: OnboardingShellFooterProps) {
  if (!showBack && !showNext) return null;

  return (
    <>
      <div className="flex w-full flex-col gap-3 sm:hidden">
        {showNext ? (
          <Button
            type="button"
            size="lg"
            className={ONBOARDING_NEXT_BTN_CLASSNAME}
            disabled={nextDisabled}
            onClick={onNext}
          >
            Next
          </Button>
        ) : null}
        {showBack ? (
          <Button
            type="button"
            size="lg"
            variant="ghost"
            className={ONBOARDING_BACK_BTN_CLASSNAME}
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
              className={ONBOARDING_BACK_BTN_CLASSNAME}
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
              className={ONBOARDING_NEXT_BTN_CLASSNAME}
              disabled={nextDisabled}
              onClick={onNext}
            >
              Next
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export { OnboardingShellFooter };

"use client";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuestionnaireMobileActionsProps = {
  questionNumber: number;
  totalQuestions: number;
  onBack?: () => void;
  onNext: () => void;
  isLast: boolean;
  showBack?: boolean;
  nextDisabled?: boolean;
  nextLoading?: boolean;
  className?: string;
};

/**
 * Sticky bottom action bar for the mobile questionnaire layout. Hidden on
 * `lg+` (callers pass `className="lg:hidden"`); on desktop the equivalent
 * controls live inside the question card's footer.
 */
export function QuestionnaireMobileActions({
  questionNumber,
  totalQuestions,
  onBack,
  onNext,
  isLast,
  showBack = false,
  nextDisabled = false,
  nextLoading = false,
  className,
}: QuestionnaireMobileActionsProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex flex-col gap-3 border-t border-border/60 bg-white px-4 pt-3 pb-[max(env(safe-area-inset-bottom),1rem)]",
        className,
      )}
    >
      <p className="font-sans text-xs font-medium text-muted-foreground">
        Question {questionNumber}/{totalQuestions}
      </p>
      <div className="flex items-center gap-3">
        {showBack ? (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-12 flex-1 rounded-lg border-border/60 text-base"
          >
            <ChevronLeft className="size-5" aria-hidden />
            Back
          </Button>
        ) : null}
        <Button
          type="button"
          onClick={onNext}
          disabled={nextDisabled || nextLoading}
          className="h-12 flex-1 rounded-lg text-base disabled:bg-muted-foreground/25 disabled:text-foreground disabled:opacity-100"
        >
          {nextLoading ? "Submitting..." : isLast ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}

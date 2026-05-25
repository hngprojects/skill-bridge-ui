import { FileEmpty01Icon, Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function QuestionnaireLoadingState() {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4">
      <HugeiconsIcon
        icon={Loading03Icon}
        size={40}
        strokeWidth={1.5}
        className="animate-spin text-muted-foreground/50"
        aria-hidden
      />
      <p className="font-sans text-sm text-muted-foreground">
        Preparing your assessment…
      </p>
    </div>
  );
}

export function QuestionnaireEmptyState() {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4">
      <HugeiconsIcon
        icon={FileEmpty01Icon}
        size={40}
        strokeWidth={1.5}
        className="text-muted-foreground/40"
        aria-hidden
      />
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="font-sans text-sm font-medium text-foreground">
          No questions available
        </p>
        <p className="font-sans text-xs text-muted-foreground">
          Please try refreshing the page.
        </p>
      </div>
    </div>
  );
}

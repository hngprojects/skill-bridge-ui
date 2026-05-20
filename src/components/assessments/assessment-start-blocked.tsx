import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

type AssessmentStartBlockedProps = {
  title: string;
  message: string;
  backHref: string;
  backLabel?: string;
};

export function AssessmentStartBlocked({
  title,
  message,
  backHref,
  backLabel = "Back to assessment",
}: AssessmentStartBlockedProps) {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4 px-4 text-center">
      <div
        className="flex size-12 items-center justify-center rounded-full bg-muted"
        aria-hidden
      >
        <AlertCircle className="size-6 text-muted-foreground" />
      </div>
      <div className="flex max-w-md flex-col gap-2">
        <p className="font-sans text-base font-semibold text-foreground">
          {title}
        </p>
        <p className="font-sans text-sm text-muted-foreground">{message}</p>
      </div>
      <Button variant="outline" asChild>
        <Link href={backHref}>{backLabel}</Link>
      </Button>
    </div>
  );
}

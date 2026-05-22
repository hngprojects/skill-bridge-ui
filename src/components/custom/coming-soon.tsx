import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { SparklesIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

type ComingSoonProps = {
  /** Heading text. Defaults to "Coming Soon". */
  title?: string;
  /** Short blurb under the heading. */
  description?: string;
  /** When provided, renders a primary CTA linking here. */
  backHref?: string;
  /** Label for the CTA. Defaults to "Back to dashboard". */
  backLabel?: string;
  /** Extra classes on the outer section. */
  className?: string;
};

/**
 * Page-level placeholder for routes that aren't ready yet. Built on the
 * shadcn `Empty` primitives so it matches every other empty/placeholder
 * surface in the app.
 *
 * @example
 * ```tsx
 * export default function Page() {
 *   return <ComingSoon backHref="/t/dashboard" />;
 * }
 * ```
 */
function ComingSoon({
  title = "Coming Soon",
  description = "This page is still being put together. Check back shortly — we're polishing it for you.",
  backHref,
  backLabel = "Back to dashboard",
  className,
}: ComingSoonProps) {
  return (
    <section
      aria-labelledby="coming-soon-title"
      className={cn(
        "mx-auto flex min-h-[60vh] w-full max-w-2xl items-center justify-center px-4 py-12 animate-in fade-in slide-in-from-bottom-2 duration-500",
        className,
      )}
    >
      <Empty className="border border-dashed border-muted-foreground/20 bg-card/50">
        <EmptyHeader>
          <EmptyMedia className="size-20 rounded-full bg-primary/10 text-primary">
            <HugeiconsIcon
              icon={SparklesIcon}
              size={40}
              strokeWidth={1.5}
              aria-hidden
            />
          </EmptyMedia>
          <EmptyTitle id="coming-soon-title" className="text-2xl sm:text-3xl">
            {title}
          </EmptyTitle>
          <EmptyDescription className="text-base sm:max-w-md">
            {description}
          </EmptyDescription>
        </EmptyHeader>
        {backHref ? (
          <EmptyContent>
            <Button asChild className="rounded-full px-6">
              <Link href={backHref}>{backLabel}</Link>
            </Button>
          </EmptyContent>
        ) : null}
      </Empty>
    </section>
  );
}

export { ComingSoon };

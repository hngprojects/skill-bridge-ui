import Link from "next/link";
import { Button } from "@/components/ui/button";

type AssessmentPreviewFooterProps = {
  assessmentSlug: string;
  /** Where the CTA should navigate. Defaults to `/t/assessments/${slug}/q`. */
  startHref?: string;
  /** CTA label. Defaults to "Start". */
  startLabel?: string;
};

function AssessmentPreviewFooter({
  assessmentSlug,
  startHref,
  startLabel = "Start",
}: AssessmentPreviewFooterProps) {
  const href = startHref ?? `/t/assessments/${assessmentSlug}/q`;

  return (
    <div className="mt-6 flex flex-col gap-4 border-t border-[#D9D9D9] pt-4 sm:flex-row sm:items-end sm:justify-between 2xl:mt-8 2xl:pt-6">
      <p className="max-w-105 font-sans text-[10px] leading-3.5 text-muted-foreground 2xl:max-w-150 2xl:text-sm 2xl:leading-5">
        Before you begin, please note that by clicking Start, you agree to{" "}
        <Link
          href="/terms-of-use"
          className="font-semibold text-foreground underline underline-offset-2"
        >
          Skillbridge&apos;s assessment terms and guidelines
        </Link>
        . If you need any assistance, you can{" "}
        <Link
          href="/contact"
          className="font-semibold text-foreground underline underline-offset-2"
        >
          contact us
        </Link>{" "}
        for support.
      </p>

      <Button
        asChild
        className="h-8 min-w-43 rounded-md bg-primary text-xs font-semibold text-white hover:bg-[#322B2D]/90 2xl:h-11 2xl:min-w-60 2xl:text-base"
      >
        <Link href={href}>{startLabel}</Link>
      </Button>
    </div>
  );
}

export { AssessmentPreviewFooter };
export type { AssessmentPreviewFooterProps };

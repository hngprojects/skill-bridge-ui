import Link from "next/link";
import { Button } from "@/components/ui/button";

type AssessmentPreviewFooterProps = {
  assessmentSlug: string;
};

function AssessmentPreviewFooter({
  assessmentSlug,
}: AssessmentPreviewFooterProps) {
  return (
    <div className="mt-6 flex flex-col gap-4 border-t border-[#D9D9D9] pt-4 sm:flex-row sm:items-end sm:justify-between">
      <p className="max-w-[420px] font-sans text-[10px] leading-3.5 text-muted-foreground">
        Before you begin, please note that by clicking Start, you agree to{" "}
        <Link
          href="/terms-of-use"
          className="font-semibold text-foreground underline underline-offset-2"
        >
          Skillbridge&apos;s assessment terms and guidelines
        </Link>
        . If you need any assistance, you can visit the{" "}
        <Link
          href="/contact"
          className="font-semibold text-foreground underline underline-offset-2"
        >
          Help Center
        </Link>{" "}
        for support.
      </p>

      <Button
        asChild
        className="h-8 min-w-[172px] rounded-md bg-[#322B2D] text-xs font-semibold text-white hover:bg-[#322B2D]/90"
      >
        <Link href={`/t/assessments/${assessmentSlug}/q`}>Start</Link>
      </Button>
    </div>
  );
}

export { AssessmentPreviewFooter };
export type { AssessmentPreviewFooterProps };

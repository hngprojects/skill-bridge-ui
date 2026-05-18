import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  List,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ASSESSMENT_EXPECTATIONS,
  type AssessmentPreview,
} from "@/constants/assessment-previews";

type AssessmentPreviewCardProps = {
  assessment: AssessmentPreview;
};

function AssessmentPreviewCard({ assessment }: AssessmentPreviewCardProps) {
  const assessmentFacts = [
    {
      icon: List,
      label: assessment.questionCount,
    },
    {
      icon: Clock3,
      label: assessment.duration,
      strong: true,
    },
    {
      icon: ClipboardCheck,
      label: assessment.attempts,
    },
  ];

  return (
    <Card className="w-full rounded-xl border border-[#D9D9D9] bg-white py-0 shadow-none">
      <CardContent className="px-4 py-4 sm:px-5 lg:px-6">
        <div className="flex items-start justify-between gap-4">
          <Image
            src={assessment.iconSrc}
            alt=""
            width={40}
            height={40}
            aria-hidden
          />

          <div className="inline-flex h-5 items-center gap-1 rounded-md border border-[#F79009] bg-[#FFFAEB] px-1.5 text-[10px] font-medium text-[#181D27]">
            <AlertTriangle className="size-3" aria-hidden />
            <span>{assessment.retakeText}</span>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="font-sans text-xl font-bold tracking-normal text-foreground">
            {assessment.title}
          </h1>
          <p className="mt-0.5 max-w-2xl font-sans text-xs leading-4 text-muted-foreground">
            {assessment.description}
          </p>
        </div>

        <dl className="mt-4 flex flex-col gap-3">
          {assessmentFacts.map((fact) => {
            const Icon = fact.icon;

            return (
              <div
                key={fact.label}
                className="flex items-center gap-3 font-sans text-xs text-muted-foreground"
              >
                <Icon className="size-4 text-muted-foreground" aria-hidden />
                <dt className="sr-only">{fact.label}</dt>
                <dd
                  className={fact.strong ? "font-semibold text-foreground" : ""}
                >
                  {fact.label}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-5 border-t border-[#D9D9D9] pt-6">
          <h2 className="font-sans text-base font-bold text-foreground">
            What to Expect
          </h2>

          <ul className="mt-4 flex flex-col gap-2.5 font-sans text-xs leading-4 text-muted-foreground">
            {ASSESSMENT_EXPECTATIONS.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-foreground" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {assessment.warning ? (
          <div className="mt-5 rounded-md border border-[#FDA29B] bg-[#FFFBFA] px-3 py-2 font-sans text-[10px] leading-3.5 text-[#B42318]">
            <div className="flex gap-1.5">
              <AlertTriangle className="mt-px size-3 shrink-0" aria-hidden />
              <p>
                <span className="font-semibold">
                  {assessment.warning.title}
                </span>
                <br />
                <span>{assessment.warning.description}</span>
              </p>
            </div>
          </div>
        ) : null}

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
            <Link href={`/t/assessments/${assessment.slug}/q`}>
              <ClipboardList className="size-3.5" aria-hidden />
              Start
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { AssessmentPreviewCard };
export type { AssessmentPreviewCardProps };

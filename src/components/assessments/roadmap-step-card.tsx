"use client";

import Link from "next/link";
import { LockKeyhole, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AssessmentRoadmapStep } from "@/constants/assessment-roadmap";
import { cn } from "@/lib/utils";

type RoadmapStepCardProps = {
  step: AssessmentRoadmapStep;
};

export function RoadmapStepCard({ step }: RoadmapStepCardProps) {
  const PanelIcon = step.panelIcon;
  const isLocked = step.state === "locked";
  const isCompleted = step.state === "completed";
  const lockBadge = (
    <Badge
      variant="outline"
      className="w-full justify-center rounded-lg border-[#D9D9D9] bg-[#EBEBEB] px-2 py-1 text-[12px] leading-4 font-normal tracking-[0.016em] text-[#151515] sm:w-auto"
    >
      Unlock Assessment
      <LockKeyhole className="size-3.5" />
    </Badge>
  );

  return (
    <article className="animate-in fade-in slide-in-from-bottom-1 overflow-hidden rounded-2xl border border-[#DBDBDB] bg-white duration-300 transition-all hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex flex-col lg:flex-row">
        <div
          className={cn(
            "flex min-h-[170px] w-full flex-col justify-between px-4 py-4 lg:w-[217px] lg:px-5",
            step.panelClassName,
          )}
        >
          <p className="text-base leading-6 font-semibold tracking-[0.017em]">
            {step.panelTitle}
          </p>
          <PanelIcon
            className={cn("size-16 shrink-0", step.panelIconClassName)}
            strokeWidth={1.8}
          />
        </div>

        <div className="flex flex-1 flex-col gap-5 px-4 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="flex size-6 items-center justify-center rounded-full border border-[#D9D9D9] text-sm font-extrabold tracking-[0.016em] text-[#151515]">
                  {step.order}
                </span>
                <h3 className="text-base leading-6 font-semibold tracking-[0.017em] text-[#151515]">
                  {step.title}
                </h3>
              </div>

              <p className="max-w-[560px] text-sm leading-6 tracking-[0.016em] text-[#151515]/80 sm:text-base sm:tracking-[0.017em]">
                {step.description}
              </p>
            </div>

            {isLocked ? (
              <div className="hidden sm:block">{lockBadge}</div>
            ) : (
              <button
                type="button"
                aria-label={`More actions for ${step.title}`}
                className="rounded-md p-1 text-[#151515] transition-colors hover:bg-[#F5F5F5]"
              >
                <MoreHorizontal className="size-5" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            {isLocked ? <div className="sm:hidden">{lockBadge}</div> : null}

            {isLocked ? (
              <Button
                size="lg"
                disabled
                className="h-10 w-full rounded-lg bg-[#757575] text-base font-semibold tracking-[0.016em] text-white hover:bg-[#757575] disabled:bg-[#757575] disabled:text-white sm:w-[170px]"
              >
                {step.ctaLabel}
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className={cn(
                  "h-10 w-full rounded-lg text-base font-semibold tracking-[0.016em] sm:w-[170px]",
                  isCompleted
                    ? "bg-[#0F766E] text-white hover:bg-[#0F766E]"
                    : "bg-[#322B2B] text-white hover:bg-[#322B2B]/95",
                )}
              >
                <Link href={`/t/assessments/${step.slug}`}>
                  {step.ctaLabel}
                </Link>
              </Button>
            )}

            <p className="text-center text-sm leading-6 tracking-[0.016em] text-[#757575] sm:text-left">
              Estimated time: {step.estimatedTime}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

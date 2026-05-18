"use client";

import { LockKeyhole, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  COMPLETED_ASSESSMENT_ICON,
  type AssessmentCatalogStep,
} from "@/constants/assessment-roadmap";
import { cn } from "@/lib/utils";

type AssessmentCatalogCardProps = {
  step: AssessmentCatalogStep;
};

export function AssessmentCatalogCard({ step }: AssessmentCatalogCardProps) {
  const PanelIcon = step.panelIcon;
  const CompletedIcon = COMPLETED_ASSESSMENT_ICON;
  const isCompleted = step.state === "completed";
  const isLocked = step.state === "locked";

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
                <h2 className="text-base leading-6 font-semibold tracking-[0.017em] text-[#151515]">
                  {step.title}
                </h2>
              </div>

              <p className="max-w-[560px] text-sm leading-6 tracking-[0.016em] text-[#151515]/80 sm:text-base sm:tracking-[0.017em]">
                {step.description}
              </p>
            </div>

            {isLocked ? (
              <Badge
                variant="outline"
                className="hidden rounded-lg border-[#D9D9D9] bg-[#EBEBEB] px-2 py-1 text-[12px] leading-4 font-normal tracking-[0.016em] text-[#151515] sm:inline-flex"
              >
                {step.lockLabel ?? "Unlock Assessment"}
                <LockKeyhole className="size-3.5" />
              </Badge>
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
            {isLocked ? (
              <Badge
                variant="outline"
                className="w-full justify-center rounded-lg border-[#D9D9D9] bg-[#EBEBEB] px-2 py-1 text-[12px] leading-4 font-normal tracking-[0.016em] text-[#151515] sm:hidden"
              >
                {step.lockLabel ?? "Unlock Assessment"}
                <LockKeyhole className="size-3.5" />
              </Badge>
            ) : null}

            {isCompleted ? (
              <Button
                size="lg"
                disabled
                className="h-10 w-full rounded-lg bg-[#CCCCCC] text-base font-semibold tracking-[0.016em] text-[#151515] hover:bg-[#CCCCCC] disabled:bg-[#CCCCCC] disabled:text-[#151515] sm:w-[170px]"
              >
                {step.ctaLabel}
                <CompletedIcon className="size-4.5 text-[#34A853]" />
              </Button>
            ) : (
              <Button
                size="lg"
                disabled={isLocked}
                className="h-10 w-full rounded-lg bg-[#757575] text-base font-semibold tracking-[0.016em] text-white hover:bg-[#757575] disabled:bg-[#757575] disabled:text-white sm:w-[170px]"
              >
                {step.ctaLabel}
              </Button>
            )}

            {step.cooldownLabel ? (
              <p className="text-center text-sm leading-6 tracking-[0.016em] text-[#757575] sm:text-left">
                {step.cooldownLabel}
              </p>
            ) : null}

            {!step.cooldownLabel && step.estimatedTime ? (
              <p className="text-center text-sm leading-6 tracking-[0.016em] text-[#757575] sm:text-left">
                Estimated time: {step.estimatedTime}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

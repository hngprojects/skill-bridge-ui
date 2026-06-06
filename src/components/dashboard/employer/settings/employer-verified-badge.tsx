"use client";

import { BadgeCheck, Check, ShieldAlert, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEmployerVerificationStatus } from "@/hooks/api";
import { cn } from "@/lib/utils";
import type { EmployerVerificationCriterion } from "@/types/api";

const CRITERION_LABELS: Record<EmployerVerificationCriterion, string> = {
  email_verified: "Work email verified",
  website_resolvable: "Company website resolves",
  linkedin_provided: "LinkedIn company page added",
};

export function EmployerVerifiedBadge() {
  const { data: status, isLoading } = useEmployerVerificationStatus();

  if (isLoading || !status) return null;

  const verified = status.verified;
  const entries = (
    Object.keys(CRITERION_LABELS) as EmployerVerificationCriterion[]
  ).map((key) => ({
    key,
    label: CRITERION_LABELS[key],
    met: status.criteria[key] === true,
  }));

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              "inline-flex h-auto cursor-default items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium",
              verified
                ? "border-[#EBEBEB] bg-[#EBEBEB] text-foreground"
                : "border-amber-200 bg-amber-50 text-amber-900",
            )}
          >
            {verified ? (
              <BadgeCheck className="size-3.5" aria-hidden />
            ) : (
              <ShieldAlert className="size-3.5" aria-hidden />
            )}
            {verified ? "Verified employer" : "Not yet verified"}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs p-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold">
              {verified
                ? "Verification status"
                : "Complete these to get verified"}
            </p>
            <ul className="flex flex-col gap-1.5">
              {entries.map((entry) => (
                <li key={entry.key} className="flex items-center gap-2 text-xs">
                  {entry.met ? (
                    <Check className="size-3 text-emerald-300" aria-hidden />
                  ) : (
                    <X className="size-3 text-amber-300" aria-hidden />
                  )}
                  <span>{entry.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

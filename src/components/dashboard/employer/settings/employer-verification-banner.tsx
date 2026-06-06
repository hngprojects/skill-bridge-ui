"use client";

import { ShieldAlert } from "lucide-react";

import { useEmployerVerificationStatus } from "@/hooks/api";
import type { EmployerVerificationCriterion } from "@/types/api";

const MISSING_LABELS: Record<EmployerVerificationCriterion, string> = {
  email_verified: "Verify your work email",
  website_resolvable: "Add a website we can resolve",
  linkedin_provided: "Add your LinkedIn company page",
};

export function EmployerVerificationBanner() {
  const { data: status } = useEmployerVerificationStatus();

  if (!status || !status.bannerVisible || status.verified) return null;

  const missing = (
    Object.keys(MISSING_LABELS) as EmployerVerificationCriterion[]
  ).filter((key) => !status.criteria[key]);

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <ShieldAlert
        className="mt-0.5 size-5 shrink-0 text-amber-700"
        aria-hidden
      />
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-semibold text-amber-900">
          Verify your account to send offers and share assessments
        </p>
        {missing.length > 0 ? (
          <ul className="list-disc pl-4 text-xs text-amber-900/90">
            {missing.map((key) => (
              <li key={key}>{MISSING_LABELS[key]}</li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-amber-900/90">
            You&apos;ve met every requirement — verification will refresh
            shortly.
          </p>
        )}
      </div>
    </div>
  );
}

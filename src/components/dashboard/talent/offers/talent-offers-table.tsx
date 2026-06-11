"use client";

import Link from "next/link";
import { BadgeCheck, ChevronRight } from "lucide-react";

import { CandidateAvatar } from "@/components/dashboard/employer/shared/candidate-avatar";
import { OfferStatusBadge } from "@/components/dashboard/employer/shortlist/offer-status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRelativeTime } from "@/lib/format-date";
import type { TalentOffer } from "@/types/api/talent-offers";
import { cn } from "@/lib/utils";

type TalentOffersTableProps = {
  offers: TalentOffer[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  /** Copy shown when the list is empty (state-aware per tab). */
  emptyTitle: string;
  emptyDescription: string;
};

function offerExpiryLabel(offer: TalentOffer): string | null {
  if (offer.status !== "pending" && offer.status !== "assessment_unlocked") {
    return null;
  }
  const date = new Date(offer.expiresAt);
  if (Number.isNaN(date.getTime())) return null;
  const now = Date.now();
  if (date.getTime() <= now) return "Expired";
  const days = Math.ceil((date.getTime() - now) / (1000 * 60 * 60 * 24));
  if (days <= 1) return "Expires today";
  return `Expires in ${days} days`;
}

export function TalentOffersTable({
  offers,
  isLoading,
  isError,
  errorMessage,
  emptyTitle,
  emptyDescription,
}: TalentOffersTableProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-70 flex-col items-center justify-center gap-2 px-4 py-12 text-center">
        <p className="text-base font-semibold text-[#151515]">
          Couldn&apos;t load your offers
        </p>
        <p className="text-sm text-[#757575]">
          {errorMessage ?? "Please try again."}
        </p>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="flex min-h-70 flex-col items-center justify-center gap-2 px-4 py-12 text-center">
        <p className="text-base font-semibold text-[#151515]">{emptyTitle}</p>
        <p className="text-sm text-[#757575]">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3 p-4">
      {offers.map((offer) => {
        const expiry = offerExpiryLabel(offer);
        return (
          <li key={offer.id}>
            <Link
              href={`/t/offers/${offer.id}`}
              className={cn(
                "flex items-center justify-between gap-4 rounded-xl border border-[#E4E7EC] bg-white p-4",
                "transition-colors hover:border-[#D0D5DD] hover:bg-[#FAFAFA]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05060F]",
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative shrink-0">
                  <CandidateAvatar
                    avatarUrl={offer.employer.avatarUrl}
                    fullName={offer.employer.fullName}
                    className="size-10"
                  />
                  {offer.employer.isVerified ? (
                    <BadgeCheck
                      className="absolute -right-1 -bottom-1 size-4 text-[#34A853]"
                      fill="white"
                      aria-label="Verified employer"
                    />
                  ) : null}
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-sm font-semibold text-[#101828]">
                    {offer.roleTitle}
                  </p>
                  <p className="truncate text-sm text-[#475467]">
                    {offer.employer.fullName} · {offer.compensation}
                  </p>
                  <p className="text-xs text-[#98A2B3]">
                    Received {formatRelativeTime(offer.createdAt)}
                    {expiry ? ` · ${expiry}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <OfferStatusBadge status={offer.status} />
                <ChevronRight className="size-4 text-[#98A2B3]" aria-hidden />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

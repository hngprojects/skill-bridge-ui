"use client";

import { notFound, useRouter } from "next/navigation";
import { BadgeCheck, ChevronLeft, FlaskConical, Package } from "lucide-react";
import { useState } from "react";

import { CandidateAvatar } from "@/components/dashboard/employer/shared/candidate-avatar";
import { OfferStatusBadge } from "@/components/dashboard/employer/shortlist/offer-status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRespondToTalentOffer, useTalentOffer } from "@/hooks/api";
import { authFailureMessage } from "@/lib/api";
import { formatAbsoluteDate, formatRelativeTime } from "@/lib/format-date";
import { appToast } from "@/lib/toast";
import type {
  TalentOffer,
  TalentOfferResponseAction,
} from "@/types/api/talent-offers";

import { TalentOfferActionBar } from "./talent-offer-action-bar";
import { TalentOfferContactPanel } from "./talent-offer-contact-panel";
import { TalentOfferRespondDialog } from "./talent-offer-respond-dialog";

/** Statuses where contact is unlocked — anything from accept onward, since
 *  by that point both parties have committed to talking. */
const CONTACT_UNLOCKED_STATUSES = new Set([
  "accepted",
  "assessment_unlocked",
  "assessment_completed",
  "passed",
  "hired",
]);

type TalentOfferDetailPageProps = {
  offerId: string;
};

function expiryPillCopy(offer: TalentOffer): string | null {
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

export function TalentOfferDetailPage({ offerId }: TalentOfferDetailPageProps) {
  const router = useRouter();
  const { data: offer, isLoading, isError } = useTalentOffer(offerId);
  const { mutate: respond, isPending: isSubmitting } =
    useRespondToTalentOffer();

  const [pendingAction, setPendingAction] =
    useState<TalentOfferResponseAction | null>(null);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 py-8">
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !offer) {
    notFound();
  }

  // `notFound()` returns `never`, but TS won't carry the narrowing into the
  // closures below. Re-bind so handleConfirm sees the narrowed type.
  const loadedOffer = offer;
  const expiryPill = expiryPillCopy(loadedOffer);

  function handleConfirm() {
    if (!pendingAction) return;
    respond(
      { offerId: loadedOffer.id, action: pendingAction },
      {
        onSuccess: () => {
          appToast.success(
            pendingAction === "accept" ? "Offer accepted." : "Offer declined.",
          );
          setPendingAction(null);
        },
        onError: (err) => {
          appToast.error(authFailureMessage(err));
        },
      },
    );
  }

  function handleTakeAssessment() {
    appToast.success("Assessment taking is coming soon.");
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 py-8">
      <button
        type="button"
        onClick={() => router.push("/t/offers")}
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#475467] transition-colors hover:text-[#101828]"
      >
        <ChevronLeft className="size-4" />
        Back to offers
      </button>

      <div className="flex flex-col gap-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <CandidateAvatar
                avatarUrl={offer.employer.avatarUrl}
                fullName={offer.employer.fullName}
                className="size-14 text-base"
              />
              {offer.employer.isVerified ? (
                <BadgeCheck
                  className="absolute -right-1 -bottom-1 size-5 text-[#34A853]"
                  fill="white"
                  aria-label="Verified employer"
                />
              ) : null}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[#475467]">
                {offer.employer.fullName}
                {offer.employer.isVerified ? " · Verified" : ""}
              </p>
              <h1 className="text-2xl font-semibold leading-tight text-[#101828]">
                {offer.roleTitle}
              </h1>
              <p className="text-xs text-[#98A2B3]">
                Received {formatRelativeTime(offer.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <OfferStatusBadge status={offer.status} />
            {expiryPill ? (
              <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-medium text-[#92400E]">
                {expiryPill}
              </span>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DetailField label="Compensation" value={offer.compensation} />
          <DetailField label="Employment type" value={offer.employmentType} />
          <DetailField label="Work arrangement" value={offer.workArrangement} />
          {offer.applicationDeadline ? (
            <DetailField
              label="Apply by"
              value={formatAbsoluteDate(offer.applicationDeadline) || "—"}
            />
          ) : null}
          {offer.assessmentDeadline ? (
            <DetailField
              label="Assessment due"
              value={formatAbsoluteDate(offer.assessmentDeadline) || "—"}
            />
          ) : null}
          <DetailField
            label="Offer expires"
            value={formatAbsoluteDate(offer.expiresAt) || "—"}
          />
        </div>

        {offer.message ? (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#475467]">
              Message from {offer.employer.fullName}
            </p>
            <p className="rounded-xl border border-[#E4E7EC] bg-[#FAFAFA] p-4 text-base text-[#101828]">
              {offer.message}
            </p>
          </div>
        ) : null}

        {offer.roleDescription ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#475467]">
              <Package className="size-4" aria-hidden />
              Role description
            </div>
            <div
              className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-base text-[#101828]"
              dangerouslySetInnerHTML={{ __html: offer.roleDescription }}
            />
          </div>
        ) : null}

        {offer.assessmentUnlockedAt || offer.assessmentDeadline ? (
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E4E7EC] bg-[#FAFAFA] p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#10242F]">
                <FlaskConical className="size-5 text-white" aria-hidden />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[#101828]">
                  Assessment required
                </p>
                <p className="text-sm text-[#475467]">
                  Complete the assessment to move this offer forward.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {CONTACT_UNLOCKED_STATUSES.has(offer.status) ? (
          <TalentOfferContactPanel offer={offer} />
        ) : null}

        <TalentOfferActionBar
          offer={offer}
          isSubmitting={isSubmitting}
          onAccept={() => setPendingAction("accept")}
          onDecline={() => setPendingAction("decline")}
          onTakeAssessment={handleTakeAssessment}
        />
      </div>

      <TalentOfferRespondDialog
        open={pendingAction !== null}
        onOpenChange={(next) => {
          if (!next) setPendingAction(null);
        }}
        action={pendingAction}
        employerName={offer.employer.fullName}
        roleTitle={offer.roleTitle}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium text-[#667085]">{label}</p>
      <p className="text-base font-medium text-[#101828]">{value || "—"}</p>
    </div>
  );
}

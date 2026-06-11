"use client";

import { useMemo, useState } from "react";

import { DataPagination } from "@/components/dashboard/employer/shared/data-pagination";
import { useTalentOffers } from "@/hooks/api";
import { authFailureMessage } from "@/lib/api";
import type { EmployerOfferStatus } from "@/types/api/employer-offers";
import type { TalentOffer } from "@/types/api/talent-offers";

import { TalentOffersTable } from "./talent-offers-table";
import {
  TalentOffersToolbar,
  type TalentOffersTabId,
} from "./talent-offers-toolbar";

const PAGE_SIZE = 20;

/** Maps the toolbar tab id to the set of offer statuses it covers.
 *  Accepted bucket folds in the post-accept progression states so the
 *  talent sees a single "Accepted" tab rather than splitting hairs. */
const TAB_STATUS_FILTER: Record<
  Exclude<TalentOffersTabId, "all">,
  ReadonlyArray<EmployerOfferStatus>
> = {
  pending: ["pending"],
  accepted: [
    "accepted",
    "assessment_unlocked",
    "assessment_completed",
    "passed",
    "hired",
  ],
  declined: ["declined", "failed"],
  expired: ["expired", "withdrawn"],
};

function matchesTab(offer: TalentOffer, tab: TalentOffersTabId): boolean {
  if (tab === "all") return true;
  return TAB_STATUS_FILTER[tab].includes(offer.status);
}

function emptyCopyFor(tab: TalentOffersTabId): {
  title: string;
  description: string;
} {
  switch (tab) {
    case "pending":
      return {
        title: "No pending offers",
        description: "You'll see new offers from employers here.",
      };
    case "accepted":
      return {
        title: "No accepted offers yet",
        description: "Offers you accept will appear here.",
      };
    case "declined":
      return {
        title: "No declined offers",
        description: "Offers you decline or fail will appear here.",
      };
    case "expired":
      return {
        title: "No expired or withdrawn offers",
        description: "Old offers that lapsed will show up here.",
      };
    case "all":
    default:
      return {
        title: "No offers yet",
        description: "Once an employer sends you an offer, it'll show up here.",
      };
  }
}

export function TalentOffersPage() {
  const [activeTab, setActiveTab] = useState<TalentOffersTabId>("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useTalentOffers({
    page,
    limit: PAGE_SIZE,
  });

  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.page ?? page;
  // Memoised so the `offers` reference stays stable across renders when
  // `data` hasn't changed — keeps the dependent useMemo hooks below honest.
  const offers = useMemo(() => data?.offers ?? [], [data?.offers]);

  const counts = useMemo(() => {
    const base: Record<TalentOffersTabId, number> = {
      all: offers.length,
      pending: 0,
      accepted: 0,
      declined: 0,
      expired: 0,
    };
    for (const offer of offers) {
      (
        Object.keys(TAB_STATUS_FILTER) as (keyof typeof TAB_STATUS_FILTER)[]
      ).forEach((tab) => {
        if (TAB_STATUS_FILTER[tab].includes(offer.status)) base[tab] += 1;
      });
    }
    return base;
  }, [offers]);

  const filtered = useMemo(
    () => offers.filter((o) => matchesTab(o, activeTab)),
    [offers, activeTab],
  );

  const emptyCopy = emptyCopyFor(activeTab);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-tight text-[#101828]">
          Offers
        </h1>
        <p className="text-sm text-[#475467]">
          Review the offers employers have sent you and respond when you&apos;re
          ready.
        </p>
      </header>

      <TalentOffersToolbar
        activeTab={activeTab}
        counts={counts}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setPage(1);
        }}
      />

      <div className="rounded-2xl border border-[#E4E7EC] bg-white">
        <TalentOffersTable
          offers={filtered}
          isLoading={isLoading}
          isError={isError}
          errorMessage={error ? authFailureMessage(error) : undefined}
          emptyTitle={emptyCopy.title}
          emptyDescription={emptyCopy.description}
        />
        {total > 0 ? (
          <DataPagination
            page={currentPage}
            totalPages={totalPages}
            total={total}
            pageSize={PAGE_SIZE}
            itemLabel="offers"
            onPageChange={setPage}
          />
        ) : null}
      </div>

      {activeTab !== "all" ? (
        <p className="text-xs text-[#98A2B3]">
          Tab filters apply to the current page. Use pagination to load older
          offers.
        </p>
      ) : null}
    </div>
  );
}

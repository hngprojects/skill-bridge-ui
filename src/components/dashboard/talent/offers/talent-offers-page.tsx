"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useMemo, useState } from "react";

import { DataPagination } from "@/components/dashboard/employer/shared/data-pagination";
import { pickDashboardVariant } from "@/components/dashboard/dashboard-variant";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTalentOffers } from "@/hooks/api";
import { useDashboardHome } from "@/hooks/api/use-dashboard";
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

/** Gate: offers only ever land in a talent's inbox once they've completed
 *  the advanced assessment and are surfaced as "job ready" to employers.
 *  Showing the offers UI to a not-yet-ready talent would falsely imply
 *  eligibility, so we route them to a tailored explainer instead. */
function GatePending() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 py-8">
      <header className="flex flex-col gap-2">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-4 w-80 rounded-lg" />
      </header>
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}

function NotJobReadyState() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-tight text-[#101828]">
          Offers
        </h1>
        <p className="text-sm text-[#475467]">
          Once you&apos;re verified job-ready, employer offers will appear here.
        </p>
      </header>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#E4E7EC] bg-white px-6 py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#F2F4F7] text-[#475467]">
          <Lock className="size-5" aria-hidden />
        </div>
        <div className="flex max-w-md flex-col gap-1">
          <p className="text-base font-semibold text-[#101828]">
            Offers unlock at the job-ready tier
          </p>
          <p className="text-sm text-[#475467]">
            Employers can only send offers to talents who&apos;ve completed
            their advanced assessment and been verified as job-ready. Head to
            your dashboard to see your next step.
          </p>
        </div>
        <Button asChild className="h-10 rounded-lg">
          <Link href="/t/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}

export function TalentOffersPage() {
  const [activeTab, setActiveTab] = useState<TalentOffersTabId>("all");
  const [page, setPage] = useState(1);

  const { data: dashboardHome, isLoading: isDashboardLoading } =
    useDashboardHome();
  const isJobReady = pickDashboardVariant(dashboardHome) === "job-ready";

  const { data, isLoading, isError, error } = useTalentOffers(
    { page, limit: PAGE_SIZE },
    { enabled: isJobReady },
  );

  // All hooks must run on every render — keep memos above the conditional
  // returns. They tolerate `data === undefined` (when the gate is closed)
  // so the gated path doesn't trip them.
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.page ?? page;
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

  if (isDashboardLoading) {
    return <GatePending />;
  }
  if (!isJobReady) {
    return <NotJobReadyState />;
  }

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

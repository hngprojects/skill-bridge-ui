"use client";

import { useMemo, useState } from "react";

import { DataPagination } from "@/components/dashboard/employer/shared/data-pagination";
import { pickDashboardVariant } from "@/components/dashboard/dashboard-variant";
import { useTalentOffers } from "@/hooks/api";
import { useDashboardHome } from "@/hooks/api/use-dashboard";
import { authFailureMessage } from "@/lib/api";

import {
  emptyCopyFor,
  matchesTab,
  TAB_STATUS_FILTER,
} from "./talent-offers-filters";
import {
  GateError,
  GatePending,
  NotJobReadyState,
} from "./talent-offers-gates";
import { TalentOffersTable } from "./talent-offers-table";
import {
  TalentOffersToolbar,
  type TalentOffersTabId,
} from "./talent-offers-toolbar";

const PAGE_SIZE = 20;

export function TalentOffersPage() {
  const [activeTab, setActiveTab] = useState<TalentOffersTabId>("all");
  const [page, setPage] = useState(1);

  const {
    data: dashboardHome,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
    refetch: refetchDashboard,
  } = useDashboardHome();
  const isJobReady = pickDashboardVariant(dashboardHome) === "job-ready";

  const { data, isLoading, isError, error } = useTalentOffers(
    { page, limit: PAGE_SIZE },
    { enabled: isJobReady },
  );

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
  if (isDashboardError || !dashboardHome) {
    return <GateError onRetry={() => void refetchDashboard()} />;
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

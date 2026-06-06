"use client";

import { useMemo, useState } from "react";

import {
  MOCK_EMPLOYER_OFFERS,
  type ShortlistTabId,
} from "@/constants/employer-shortlist";
import { useSavedCandidates } from "@/hooks/api/use-employer-discovery";

import { OffersTable } from "./offers-table";
import { ShortlistHeroBanner } from "./shortlist-hero-banner";
import { ShortlistPagination } from "./shortlist-pagination";
import { ShortlistTable } from "./shortlist-table";
import { SHORTLIST_TAB_IDS, ShortlistToolbar } from "./shortlist-toolbar";

const PAGE_SIZE = 20;

export function ShortlistPage() {
  const [activeTab, setActiveTab] = useState<ShortlistTabId>("shortlist");
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const { data: savedData, isLoading: isSavedLoading } = useSavedCandidates({
    page,
    limit: PAGE_SIZE,
  });

  const savedTotal = savedData?.total ?? 0;
  const savedTotalPages = savedData?.totalPages ?? 1;
  const savedPage = savedData?.page ?? page;

  // Mock for now — replaced by real query when the offers endpoints exist.
  const offers = MOCK_EMPLOYER_OFFERS;

  // Client-side filter on the current page only. Search across name +
  // role/role track (shortlist) or name + job title (offers).
  const searchTerm = searchValue.trim().toLowerCase();
  const filteredCandidates = useMemo(() => {
    const candidates = savedData?.candidates ?? [];
    if (!searchTerm) return candidates;
    return candidates.filter((c) =>
      [c.fullName, c.role, c.roleTrack, c.validatedLevel]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(searchTerm)),
    );
  }, [savedData?.candidates, searchTerm]);

  const filteredOffers = useMemo(() => {
    if (!searchTerm) return offers;
    return offers.filter((o) =>
      [o.candidateName, o.jobTitle, o.roleTrack ?? ""]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(searchTerm)),
    );
  }, [offers, searchTerm]);

  const searchPlaceholder =
    activeTab === "shortlist"
      ? "Search talent's name, level"
      : "Search talent's name, Job title";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 py-8">
      <ShortlistHeroBanner />

      <ShortlistToolbar
        activeTab={activeTab}
        shortlistCount={savedTotal}
        offersCount={offers.length}
        searchValue={searchValue}
        searchPlaceholder={searchPlaceholder}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSearchValue("");
          setPage(1);
        }}
        onSearchChange={setSearchValue}
      />

      <div className="rounded-2xl border border-[#E4E7EC] bg-white">
        {activeTab === "shortlist" ? (
          <div
            role="tabpanel"
            id={SHORTLIST_TAB_IDS.shortlist.panelId}
            aria-labelledby={SHORTLIST_TAB_IDS.shortlist.tabId}
          >
            <ShortlistTable
              candidates={filteredCandidates}
              isLoading={isSavedLoading}
            />
            {searchTerm ? null : (
              <ShortlistPagination
                page={savedPage}
                totalPages={savedTotalPages}
                total={savedTotal}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
              />
            )}
          </div>
        ) : (
          <div
            role="tabpanel"
            id={SHORTLIST_TAB_IDS.offers.panelId}
            aria-labelledby={SHORTLIST_TAB_IDS.offers.tabId}
          >
            <OffersTable offers={filteredOffers} />
          </div>
        )}
      </div>
    </div>
  );
}

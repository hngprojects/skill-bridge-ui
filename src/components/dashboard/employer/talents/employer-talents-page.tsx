"use client";

import Link from "next/link";
import { useState } from "react";

import { getEmployerFilterLabel } from "@/constants/employer-talents";
import { useDiscoveryCandidates } from "@/hooks/api/use-employer-discovery";
import type { TalentFilters, TalentViewMode } from "@/types/employer-talents";
import { DEFAULT_FILTERS } from "@/types/employer-talents";

import { DataEmptyState } from "../shared/data-empty-state";
import { DataPagination } from "../shared/data-pagination";
import { TalentCard } from "./talent-card";
import { TalentsFilterChips } from "./talents-filter-chips";
import { TalentsFilterSidebar } from "./talents-filter-sidebar";
import { TalentsHeroBanner } from "./talents-hero-banner";
import { TalentsViewToggle } from "./talents-view-toggle";

const PAGE_SIZE = 20;

export function EmployerTalentsPage() {
  const [view, setView] = useState<TalentViewMode>("list");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [pendingFilters, setPendingFilters] =
    useState<TalentFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<TalentFilters>(DEFAULT_FILTERS);

  const { data, isLoading, isError } = useDiscoveryCandidates(appliedFilters, {
    page,
    limit: PAGE_SIZE,
    search: appliedSearch,
  });

  const candidates = data?.candidates ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const listPage = data?.page ?? page;

  const handleApply = () => {
    setAppliedFilters(pendingFilters);
    setAppliedSearch(search.trim());
    setPage(1);
  };

  const handleClear = () => {
    setPendingFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setSearch("");
    setAppliedSearch("");
    setPage(1);
  };

  const removeChip = (
    key: keyof Pick<
      TalentFilters,
      "roleTrack" | "experience" | "availability" | "region"
    >,
    val: string,
  ) => {
    const updated = {
      ...appliedFilters,
      [key]: (appliedFilters[key] as string[]).filter((v) => v !== val),
    };
    setAppliedFilters(updated);
    setPendingFilters(updated);
    setPage(1);
  };

  const activeChips = [
    ...appliedFilters.experience.map((val) => ({
      key: "experience" as const,
      val,
      label: getEmployerFilterLabel("experience", val),
    })),
    ...appliedFilters.roleTrack.map((val) => ({
      key: "roleTrack" as const,
      val,
      label: getEmployerFilterLabel("roleTrack", val),
    })),
    ...appliedFilters.availability.map((val) => ({
      key: "availability" as const,
      val,
      label: getEmployerFilterLabel("availability", val),
    })),
    ...appliedFilters.region.map((val) => ({
      key: "region" as const,
      val,
      label: getEmployerFilterLabel("region", val),
    })),
  ];

  const emptyTitle = isError
    ? "Unable to load talents"
    : "No talents match your filters";
  const emptyDescription = isError
    ? "Something went wrong while loading candidates. Please try again."
    : (data?.emptyStateMessage ??
      "Try adjusting your filters or clear them to see more results.");

  return (
    <div className="mx-auto max-w-274 space-y-6 py-8">
      <TalentsHeroBanner />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Talent list</h1>
        <TalentsViewToggle view={view} onChange={setView} />
      </div>

      <TalentsFilterChips
        chips={activeChips}
        onRemove={removeChip}
        onClear={handleClear}
      />

      <div className="flex items-start gap-10">
        <TalentsFilterSidebar
          filters={pendingFilters}
          search={search}
          onSearchChange={setSearch}
          onChange={setPendingFilters}
          onApply={handleApply}
          onClear={handleClear}
        />
        <div className="flex flex-1 flex-col gap-6">
          <div
            className={
              view === "grid" ? "grid grid-cols-2 gap-6" : "flex flex-col gap-6"
            }
          >
            {isLoading && candidates.length === 0 ? (
              <div className="py-12 text-center text-base text-muted-foreground">
                Loading talents…
              </div>
            ) : candidates.length === 0 ? (
              <DataEmptyState
                icon="/assets/icons/icon-shortlisted-candidates.svg"
                title={emptyTitle}
                description={emptyDescription}
              />
            ) : (
              candidates.map((candidate) => (
                <Link
                  key={candidate.userId}
                  href={`/e/talents/${candidate.userId}`}
                >
                  <TalentCard candidate={candidate} />
                </Link>
              ))
            )}
          </div>
          {!isLoading && total > 0 ? (
            <DataPagination
              page={listPage}
              totalPages={totalPages}
              total={total}
              pageSize={PAGE_SIZE}
              itemLabel="talents"
              onPageChange={setPage}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

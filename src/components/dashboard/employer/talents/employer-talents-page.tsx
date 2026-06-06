"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { EMPLOYER_TALENTS } from "@/constants/employer-talents";
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
  const [pendingFilters, setPendingFilters] =
    useState<TalentFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<TalentFilters>(DEFAULT_FILTERS);

  const handleApply = () => {
    setAppliedFilters(pendingFilters);
    setPage(1);
  };

  const handleClear = () => {
    setPendingFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
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

  const filteredTalents = useMemo(() => {
    return EMPLOYER_TALENTS.filter((talent) => {
      const f = appliedFilters;
      if (f.experience.length > 0) {
        const match = f.experience.some((exp) =>
          talent.level.toLowerCase().includes(exp.toLowerCase()),
        );
        if (!match) return false;
      }
      if (f.roleTrack.length > 0) {
        const match = f.roleTrack.some((role) =>
          talent.role.toLowerCase().includes(role.toLowerCase()),
        );
        if (!match) return false;
      }
      if (f.availability.length > 0) {
        const hasAvailability = f.availability.some((item) =>
          talent.tags?.some((tag) =>
            tag.toLowerCase().includes(item.toLowerCase()),
          ),
        );
        if (!hasAvailability) return false;
      }
      if (f.region.length > 0) {
        const hasRegion = f.region.some((item) =>
          talent.tags?.some((tag) =>
            tag.toLowerCase().includes(item.toLowerCase()),
          ),
        );
        if (!hasRegion) return false;
      }
      if (talent.score < f.scoreMin || talent.score > f.scoreMax) return false;
      return true;
    });
  }, [appliedFilters]);

  const total = filteredTalents.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const activeChips = [
    ...appliedFilters.experience.map((val) => ({
      key: "experience" as const,
      val,
    })),
    ...appliedFilters.roleTrack.map((val) => ({
      key: "roleTrack" as const,
      val,
    })),
    ...appliedFilters.availability.map((val) => ({
      key: "availability" as const,
      val,
    })),
    ...appliedFilters.region.map((val) => ({ key: "region" as const, val })),
  ];

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
            {filteredTalents.length === 0 ? (
              <DataEmptyState
                icon="/assets/icons/icon-shortlisted-candidates.svg"
                title="No talents match your filters"
                description="Try adjusting your filters or clear them to see more results."
              />
            ) : (
              filteredTalents.map((talent) => (
                <Link key={talent.id} href={`/e/talents/${talent.id}`}>
                  <TalentCard {...talent} />
                </Link>
              ))
            )}
          </div>
          <DataPagination
            page={page}
            totalPages={totalPages}
            total={total}
            pageSize={PAGE_SIZE}
            itemLabel="talents"
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}

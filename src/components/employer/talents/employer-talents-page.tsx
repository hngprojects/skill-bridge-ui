"use client";

import Link from "next/link";
import { List, Grid2X2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

import { TalentsHeroBanner } from "./talents-hero-banner";
import { TalentsFilterSidebar } from "./talents-filter-sidebar";
import { TalentCard } from "./talent-card";

import { EMPLOYER_TALENTS } from "@/constants/employer-talents";
import type { TalentFilters } from "@/types/employer-talents";
import { DEFAULT_FILTERS } from "@/types/employer-talents";

export function EmployerTalentsPage() {
  const [pendingFilters, setPendingFilters] =
    useState<TalentFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<TalentFilters>(DEFAULT_FILTERS);

  const handleApply = () => {
    setAppliedFilters(pendingFilters);
  };

  const handleClear = () => {
    const cleared = DEFAULT_FILTERS;
    setPendingFilters(cleared);
    setAppliedFilters(cleared);
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
  };

  const filteredTalents = useMemo(() => {
    return EMPLOYER_TALENTS.filter((talent) => {
      const f = appliedFilters;

      // Experience Level Filter
      if (f.experience.length > 0) {
        const match = f.experience.some((exp) => {
          const normalizedTalentLevel = talent.level.toLowerCase();
          const normalizedFilter = exp.toLowerCase();
          return normalizedTalentLevel.includes(normalizedFilter);
        });
        if (!match) return false;
      }

      // Role Track Filter
      if (f.roleTrack.length > 0) {
        const match = f.roleTrack.some((role) =>
          talent.role.toLowerCase().includes(role.toLowerCase()),
        );
        if (!match) return false;
      }

      // Availability & Region
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

      // Score Range
      if (talent.score < f.scoreMin || talent.score > f.scoreMax) {
        return false;
      }

      return true;
    });
  }, [appliedFilters]);

  // Active filter chips
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
        <h1 className="text-2xl font-bold text-[#151515]">Talent list</h1>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-[#EBEBEB] px-2.5 py-1">
            <List className="size-6 text-[#141B34]" />
            <span className="text-base font-medium tracking-[0.017em] text-[#151515]">
              List
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-[#FBFBFB] px-2.5 py-1">
            <Grid2X2 className="size-6 text-[#757575]" />
            <span className="text-base font-normal tracking-[0.017em] text-[#757575]">
              Grid
            </span>
          </div>
        </div>
      </div>

      {/* Active Filters Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeChips.map(({ key, val }) => (
            <span
              key={`${key}-${val}`}
              className="flex items-center gap-1.5 rounded-full border border-[#D9D9D9] bg-white px-3 py-1 text-sm text-[#151515]"
            >
              {val}
              <button
                type="button"
                onClick={() => removeChip(key, val)}
                className="focus:outline-none"
              >
                <X className="size-3.5 text-[#757575]" />
              </button>
            </span>
          ))}
          <button
            onClick={handleClear}
            className="text-sm font-medium text-[#757575] underline"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex items-start gap-10">
        <TalentsFilterSidebar
          filters={pendingFilters}
          onChange={setPendingFilters}
          onApply={handleApply}
          onClear={handleClear}
        />

        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-6">
            {filteredTalents.map((talent) => (
              <Link key={talent.id} href={`/e/talents/${talent.id}`}>
                <TalentCard {...talent} />
              </Link>
            ))}

            {filteredTalents.length === 0 && (
              <p className="py-12 text-center text-base text-[#757575]">
                No talents match the selected filters.
              </p>
            )}
          </div>

          {/* Pagination  */}
          <div className="flex h-6 w-full max-w-199 flex-row items-center justify-between gap-10 bg-white">
            <span className="text-base font-medium leading-[150%] tracking-[0.017em] text-[#757575]">
              Showing 1-{filteredTalents.length} of {EMPLOYER_TALENTS.length}{" "}
              talents
            </span>

            <div className="flex h-6 w-70 flex-row items-center justify-end gap-2">
              <button className="flex size-6 items-center justify-center rounded bg-[#EBEBEB] text-[#141B34]">
                <ChevronLeft className="size-4 stroke-[1.5]" />
              </button>

              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  className={`flex size-6 items-center justify-center rounded text-base font-semibold ${
                    p === 1 ? "bg-[#05060F] text-white" : "text-[#151515]"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="flex size-6 items-center justify-center rounded bg-[#EBEBEB] text-[#141B34]">
                <ChevronRight className="size-4 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

import { TalentsHeroBanner } from "./talents-hero-banner";
import { TalentsFilterSidebar } from "./talents-filter-sidebar";
import { TalentCard } from "./talent-card";
import { TalentsFilterChips } from "./talents-filter-chips";
import { TalentsPagination } from "./talents-pagination";
import { TalentsViewToggle } from "./talents-view-toggle";

import { EMPLOYER_TALENTS } from "@/constants/employer-talents";
import type { TalentFilters, TalentViewMode } from "@/types/employer-talents";
import { DEFAULT_FILTERS } from "@/types/employer-talents";

export function EmployerTalentsPage() {
  const [view, setView] = useState<TalentViewMode>("list");
  const [pendingFilters, setPendingFilters] =
    useState<TalentFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<TalentFilters>(DEFAULT_FILTERS);

  const handleApply = () => setAppliedFilters(pendingFilters);

  const handleClear = () => {
    setPendingFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
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
          <div className="flex flex-col gap-6">
            {filteredTalents.map((talent) => (
              <Link key={talent.id} href={`/e/talents/${talent.id}`}>
                <TalentCard {...talent} />
              </Link>
            ))}
            {filteredTalents.length === 0 && (
              <p className="py-12 text-center text-base text-muted-foreground">
                No talents match the selected filters.
              </p>
            )}
          </div>
          <TalentsPagination
            showing={filteredTalents.length}
            total={EMPLOYER_TALENTS.length}
          />
        </div>
      </div>
    </div>
  );
}

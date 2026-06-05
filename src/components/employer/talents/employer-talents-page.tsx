"use client";

import Link from "next/link";
import { List, Grid2X2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { TalentsHeroBanner } from "./talents-hero-banner";
import {
  TalentsFilterSidebar,
  DEFAULT_FILTERS,
  type TalentFilters,
} from "./talents-filter-sidebar";
import { TalentCard } from "./talent-card";
import { EMPLOYER_TALENTS } from "@/constants/employer-talents";

export function EmployerTalentsPage() {
  const [pendingFilters, setPendingFilters] =
    useState<TalentFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<TalentFilters>(DEFAULT_FILTERS);

  function handleApply() {
    setAppliedFilters(pendingFilters);
  }

  function handleClear() {
    setPendingFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  }

  function removeChip(
    key: keyof Pick<
      TalentFilters,
      "roleTrack" | "experience" | "availability" | "region"
    >,
    val: string,
  ) {
    const updated = {
      ...appliedFilters,
      [key]: (appliedFilters[key] as string[]).filter((v) => v !== val),
    };
    setAppliedFilters(updated);
    setPendingFilters(updated);
  }

  const filtered = useMemo(() => {
    return EMPLOYER_TALENTS.filter((t) => {
      const f = appliedFilters;

      if (f.experience.length > 0) {
        const levelMap: Record<string, string> = {
          Junior: "JUNIOR",
          Mid: "MID-LEVEL",
          Senior: "Senior Level",
        };
        const match = f.experience.some(
          (e) =>
            t.level.toUpperCase().includes(e.toUpperCase()) ||
            t.level === levelMap[e],
        );
        if (!match) return false;
      }

      if (f.roleTrack.length > 0) {
        if (
          !f.roleTrack.some((r) =>
            t.role.toLowerCase().includes(r.toLowerCase()),
          )
        )
          return false;
      }

      if (t.score < f.scoreMin || t.score > f.scoreMax) return false;

      return true;
    });
  }, [appliedFilters]);

  const activeChips: {
    key: keyof Pick<
      TalentFilters,
      "roleTrack" | "experience" | "availability" | "region"
    >;
    val: string;
  }[] = [
    ...appliedFilters.experience.map((v) => ({
      key: "experience" as const,
      val: v,
    })),
    ...appliedFilters.roleTrack.map((v) => ({
      key: "roleTrack" as const,
      val: v,
    })),
    ...appliedFilters.availability.map((v) => ({
      key: "availability" as const,
      val: v,
    })),
    ...appliedFilters.region.map((v) => ({ key: "region" as const, val: v })),
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

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeChips.map(({ key, val }) => (
            <span
              key={`${key}-${val}`}
              className="flex items-center gap-1.5 rounded-full border border-[#D9D9D9] bg-white px-3 py-1 text-sm text-[#151515]"
            >
              {val}
              <button onClick={() => removeChip(key, val)}>
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
            {filtered.map((talent) => (
              <Link key={talent.id} href={`/e/talents/${talent.id}`}>
                <TalentCard {...talent} />
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="py-12 text-center text-base text-[#757575]">
                No talents match the selected filters.
              </p>
            )}
          </div>

          <div className="flex h-6 w-full max-w-199 flex-row items-center justify-between gap-10 bg-white">
            <span className="text-base font-medium leading-[150%] tracking-[0.017em] text-[#757575]">
              Showing 1-4 of 50 talents
            </span>
            <div className="flex h-6 w-70 flex-row items-center justify-end gap-2">
              <button className="flex size-6 items-center justify-center rounded bg-[#EBEBEB] text-[#141B34]">
                <ChevronLeft className="size-4 stroke-[1.5]" />
              </button>
              {["1", "2", "3", "4", "5", "...", "10"].map((p, i) => (
                <div
                  key={i}
                  className={`flex size-6 items-center justify-center rounded text-base font-semibold leading-[150%] tracking-[0.017em] ${
                    p === "1"
                      ? "bg-[rgba(5,6,15,0.1)] text-[#05060F]"
                      : "text-[#151515]"
                  }`}
                >
                  {p}
                </div>
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

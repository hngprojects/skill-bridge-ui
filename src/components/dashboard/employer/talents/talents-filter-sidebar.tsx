"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EMPLOYER_FILTER_OPTIONS } from "@/constants/employer-talents";
import { cn } from "@/lib/utils";
import { DISCOVERY_MIN_SCORE } from "@/types/api/employer-discovery";
import type {
  TalentFilters,
  TalentsFilterSidebarProps,
} from "@/types/employer-talents";

import { FilterSection } from "./filter-section";
import { ScoreSlider } from "./score-slider";

export function TalentsFilterSidebar({
  filters,
  search,
  onSearchChange,
  onChange,
  onApply,
  onClear,
  className,
}: TalentsFilterSidebarProps) {
  function toggle(
    key: keyof Pick<
      TalentFilters,
      "roleTrack" | "experience" | "availability" | "region"
    >,
    val: string,
  ) {
    const current = filters[key] as string[];
    const updated = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val];
    onChange({ ...filters, [key]: updated });
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-5 rounded-2xl bg-muted p-4 lg:w-65 lg:shrink-0",
        className,
      )}
    >
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-2 py-2">
        <Search className="size-4.5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
      <FilterSection
        title="Experience"
        options={EMPLOYER_FILTER_OPTIONS.experience}
        selected={filters.experience}
        onToggle={(v) => toggle("experience", v)}
      />
      <div className="w-full border-t border-border" />
      <FilterSection
        title="Role Track"
        options={EMPLOYER_FILTER_OPTIONS.roleTrack}
        selected={filters.roleTrack}
        onToggle={(v) => toggle("roleTrack", v)}
        searchable
      />
      <div className="w-full border-t border-border" />
      <ScoreSlider
        value={filters.scoreMin}
        onChange={(scoreMin) =>
          onChange({
            ...filters,
            scoreMin: Math.max(DISCOVERY_MIN_SCORE, scoreMin),
          })
        }
      />
      <div className="w-full border-t border-border" />
      <FilterSection
        title="Availability status"
        options={EMPLOYER_FILTER_OPTIONS.availability}
        selected={filters.availability}
        onToggle={(v) => toggle("availability", v)}
      />
      <div className="w-full border-t border-border" />
      <FilterSection
        title="Region"
        options={EMPLOYER_FILTER_OPTIONS.region}
        selected={filters.region}
        onToggle={(v) => toggle("region", v)}
      />
      <div className="flex gap-2 pt-2">
        <Button onClick={onApply} className="flex-1">
          Apply
        </Button>
        <Button onClick={onClear} variant="outline" className="flex-1">
          Clear All
        </Button>
      </div>
    </div>
  );
}

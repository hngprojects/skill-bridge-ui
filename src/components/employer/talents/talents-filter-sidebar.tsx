"use client";

import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";
import { EMPLOYER_FILTER_OPTIONS } from "@/constants/employer-talents";
import { type TalentFilters } from "@/types/employer-talents";

type Props = {
  filters: TalentFilters;
  onChange: (filters: TalentFilters) => void;
  onApply: () => void;
  onClear: () => void;
};

function FilterSection({
  title,
  options,
  selected,
  onToggle,
  searchable,
}: {
  title: string;
  options: readonly string[];
  selected: string[];
  onToggle: (val: string) => void;
  searchable?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");

  const filtered = search
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between focus:outline-none"
      >
        <p className="text-base font-semibold tracking-[0.017em] text-[#05060F]">
          {title}
        </p>
        {open ? (
          <ChevronUp className="size-5 text-[#757575]" />
        ) : (
          <ChevronDown className="size-5 text-[#757575]" />
        )}
      </button>

      {searchable && (
        <div className="flex items-center gap-2 rounded-lg border border-[#D9D9D9] bg-white px-2 py-2">
          <Search className="size-4 text-[#757575]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search role"
            className="w-full bg-transparent text-sm text-[#151515] outline-none placeholder:text-[#757575]"
          />
        </div>
      )}

      {open && (
        <div className="flex flex-col gap-0.5">
          {filtered.map((option) => {
            const checked = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => onToggle(option)}
                aria-pressed={checked}
                className="flex w-full cursor-pointer items-center gap-3 rounded-full px-0 py-2 text-left select-none focus:outline-none"
              >
                <span
                  className={`flex size-4.5 shrink-0 items-center justify-center rounded-sm border-2 transition-colors ${
                    checked
                      ? "border-[#05060F] bg-[#05060F]"
                      : "border-[#757575] bg-transparent"
                  }`}
                >
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-base font-normal tracking-[0.017em] text-[#151515]">
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ScoreSlider({
  min,
  max,
  onChange,
}: {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between focus:outline-none"
      >
        <p className="text-base font-semibold tracking-[0.017em] text-[#05060F]">
          Composite score
        </p>
        {open ? (
          <ChevronUp className="size-5 text-[#757575]" />
        ) : (
          <ChevronDown className="size-5 text-[#757575]" />
        )}
      </button>
      {open && (
        <div className="flex flex-col gap-3 pt-1">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#757575]">Min: {min}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={min}
              onChange={(e) =>
                onChange(Math.min(Number(e.target.value), max), max)
              }
              className="w-full accent-[#05060F]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#757575]">Max: {max}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={max}
              onChange={(e) =>
                onChange(min, Math.max(Number(e.target.value), min))
              }
              className="w-full accent-[#05060F]"
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#757575]">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function TalentsFilterSidebar({
  filters,
  onChange,
  onApply,
  onClear,
}: Props) {
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
    <div className="flex w-65 shrink-0 flex-col gap-5 rounded-2xl bg-[#F2F2F2] p-4">
      <div className="flex items-center gap-2 rounded-lg border border-[#D9D9D9] bg-white px-2 py-2">
        <Search className="size-4.5 text-[#757575]" />
        <span className="text-base font-normal tracking-[0.017em] text-[#757575]">
          Search
        </span>
      </div>
      <FilterSection
        title="Experience"
        options={EMPLOYER_FILTER_OPTIONS.experience}
        selected={filters.experience}
        onToggle={(v) => toggle("experience", v)}
      />
      <div className="w-full border-t border-[#D9D9D9]" />
      <FilterSection
        title="Role Track"
        options={EMPLOYER_FILTER_OPTIONS.roleTrack}
        selected={filters.roleTrack}
        onToggle={(v) => toggle("roleTrack", v)}
        searchable
      />
      <div className="w-full border-t border-[#D9D9D9]" />
      <ScoreSlider
        min={filters.scoreMin}
        max={filters.scoreMax}
        onChange={(mn, mx) =>
          onChange({ ...filters, scoreMin: mn, scoreMax: mx })
        }
      />
      <div className="w-full border-t border-[#D9D9D9]" />
      <FilterSection
        title="Availability status"
        options={EMPLOYER_FILTER_OPTIONS.availability}
        selected={filters.availability}
        onToggle={(v) => toggle("availability", v)}
      />
      <div className="w-full border-t border-[#D9D9D9]" />
      <FilterSection
        title="Region"
        options={EMPLOYER_FILTER_OPTIONS.region}
        selected={filters.region}
        onToggle={(v) => toggle("region", v)}
      />
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onApply}
          className="flex-1 rounded-lg bg-[#05060F] py-2 text-sm font-semibold text-white"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={onClear}
          className="flex-1 rounded-lg border border-[#D9D9D9] bg-white py-2 text-sm font-semibold text-[#151515]"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

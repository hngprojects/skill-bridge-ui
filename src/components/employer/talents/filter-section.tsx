"use client";

import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";
import type { FilterSectionProps } from "@/types/employer-talents";

export function FilterSection({
  title,
  options,
  selected,
  onToggle,
  searchable,
}: FilterSectionProps) {
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
        <p className="text-base font-semibold tracking-[0.017em] text-foreground">
          {title}
        </p>
        {open ? (
          <ChevronUp className="size-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-5 text-muted-foreground" />
        )}
      </button>

      {searchable && (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-2 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}`}
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
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
                      ? "border-primary bg-primary"
                      : "border-muted-foreground bg-transparent"
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
                <span className="text-base font-normal tracking-[0.017em] text-foreground">
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

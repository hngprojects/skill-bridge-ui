"use client";

import { X } from "lucide-react";
import type { TalentsFilterChipsProps } from "@/types/employer-talents";

export function TalentsFilterChips({
  chips,
  onRemove,
  onClear,
}: TalentsFilterChipsProps) {
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map(({ key, val }) => (
        <span
          key={`${key}-${val}`}
          className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
        >
          {val}
          <button
            type="button"
            onClick={() => onRemove(key, val)}
            className="focus:outline-none"
          >
            <X className="size-3.5 text-muted-foreground" />
          </button>
        </span>
      ))}
      <button
        onClick={onClear}
        className="text-sm font-medium text-muted-foreground underline"
      >
        Clear all
      </button>
    </div>
  );
}

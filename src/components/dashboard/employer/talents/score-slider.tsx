"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { DISCOVERY_MIN_SCORE } from "@/types/api/employer-discovery";
import type { ScoreSliderProps } from "@/types/employer-talents";

export function ScoreSlider({ value, onChange }: ScoreSliderProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between focus:outline-none"
      >
        <p className="text-base font-semibold tracking-[0.017em] text-foreground">
          Composite score
        </p>
        {open ? (
          <ChevronUp className="size-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-5 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="flex flex-col gap-3 pt-1">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">
              Minimum: {value}%
            </label>
            <input
              type="range"
              min={DISCOVERY_MIN_SCORE}
              max={100}
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{DISCOVERY_MIN_SCORE}%</span>
            <span>100%</span>
          </div>
        </div>
      )}
    </div>
  );
}

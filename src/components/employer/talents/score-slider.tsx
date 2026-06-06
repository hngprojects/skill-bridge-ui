"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { ScoreSliderProps } from "@/types/employer-talents";

export function ScoreSlider({ min, max, onChange }: ScoreSliderProps) {
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
            <label className="text-xs text-muted-foreground">Min: {min}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={min}
              onChange={(e) =>
                onChange(Math.min(Number(e.target.value), max), max)
              }
              className="w-full accent-primary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">Max: {max}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={max}
              onChange={(e) =>
                onChange(min, Math.max(Number(e.target.value), min))
              }
              className="w-full accent-primary"
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      )}
    </div>
  );
}

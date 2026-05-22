"use client";

import * as React from "react";
import {
  Palette,
  Laptop,
  BarChart2,
  Cloud,
  Briefcase,
  Wrench,
  Smartphone,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";
import type { TrackOptionId } from "@/constants/talent-onboarding";
import { TRACK_OPTIONS } from "@/constants/talent-onboarding";
import { cn } from "@/lib/utils";

const TRACK_ICONS: Record<TrackOptionId, React.ElementType> = {
  "product-designer": Palette,
  "frontend-developer": Laptop,
  "data-analyst": BarChart2,
  "cloud-devops": Cloud,
  "product-manager": Briefcase,
  "backend-developer": Wrench,
  "mobile-developer": Smartphone,
  cybersecurity: ShieldCheck,
  "data-scientist": BrainCircuit,
};

type SelectTrackStepProps = {
  value: TrackOptionId[];
  onValueChange: (trackIds: TrackOptionId[]) => void;
};

function SelectTrackStep({ value = [], onValueChange }: SelectTrackStepProps) {
  const selected = new Set(value);

  function toggle(id: TrackOptionId) {
    onValueChange?.(selected.has(id) ? [] : [id]);
  }

  return (
    <div className="grid w-full max-w-2xl md:grid-cols-3 grid-cols-2 gap-3">
      {TRACK_OPTIONS.map((track) => {
        const Icon = TRACK_ICONS[track.id];
        const isSelected = selected.has(track.id);

        return (
          <button
            key={track.id}
            type="button"
            onClick={() => toggle(track.id)}
            className={cn(
              "hover:bg-muted hover:text-foreground hover:cursor-pointer flex flex-col items-center gap-2 rounded-[5px] border bg-card px-3 py-5 text-center transition-colors",
              isSelected
                ? "border-primary ring-1 ring-primary/20"
                : "border-[#D9D9D9] hover:border-muted-foreground/30",
            )}
          >
            <Icon
              size={28}
              strokeWidth={1.5}
              className={cn(
                "shrink-0",
                isSelected ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span
              className={cn(
                "text-sm font-medium leading-tight",
                isSelected ? "text-primary" : "text-foreground",
              )}
            >
              {track.label}
            </span>
            <span className="text-xs text-muted-foreground">{track.tags}</span>
          </button>
        );
      })}
    </div>
  );
}

export { SelectTrackStep };

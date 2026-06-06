"use client";

import { List, Grid2X2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TalentsViewToggleProps } from "@/types/employer-talents";

export function TalentsViewToggle({ view, onChange }: TalentsViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={view === "list" ? "secondary" : "ghost"}
        size="sm"
        aria-pressed={view === "list"}
        onClick={() => onChange("list")}
      >
        <List className="size-5" />
        <span className="hidden sm:inline">List</span>
      </Button>
      <Button
        variant={view === "grid" ? "secondary" : "ghost"}
        size="sm"
        aria-pressed={view === "grid"}
        onClick={() => onChange("grid")}
      >
        <Grid2X2 className="size-5" />
        <span className="hidden sm:inline">Grid</span>
      </Button>
    </div>
  );
}

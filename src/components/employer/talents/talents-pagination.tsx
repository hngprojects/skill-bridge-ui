"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TalentsPaginationProps } from "@/types/employer-talents";

export function TalentsPagination({ showing, total }: TalentsPaginationProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-base font-medium tracking-[0.017em] text-muted-foreground">
        Showing 1-{showing} of {total} talents
      </span>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon-xs">
          <ChevronLeft className="size-4 stroke-[1.5]" />
        </Button>
        {[1, 2, 3, 4, 5].map((p) => (
          <Button
            key={p}
            size="icon-xs"
            variant={p === 1 ? "default" : "ghost"}
          >
            {p}
          </Button>
        ))}
        <Button variant="outline" size="icon-xs">
          <ChevronRight className="size-4 stroke-[1.5]" />
        </Button>
      </div>
    </div>
  );
}

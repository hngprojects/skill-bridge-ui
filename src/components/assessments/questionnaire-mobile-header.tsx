"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { LogOut, Timer } from "lucide-react";

import { cn } from "@/lib/utils";

type QuestionnaireMobileHeaderProps = {
  sectionTitle: string;
  /** Overall assessment progress, 0..1. */
  progress: number;
  /** Owned by the parent. Undefined hides the timer chip. */
  secondsLeft?: number;
  className?: string;
};

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function QuestionnaireMobileHeader({
  sectionTitle,
  progress,
  secondsLeft,
  className,
}: QuestionnaireMobileHeaderProps) {
  const { name } = useParams<{ name: string }>();
  const showTimer = secondsLeft != null;
  const pct = Math.min(100, Math.max(0, progress * 100));

  return (
    <header
      className={cn("border-b border-border/60 bg-white px-4 py-3", className)}
    >
      <div className="flex items-center justify-end gap-3">
        {showTimer && (
          <span className="inline-flex items-center gap-1 rounded-full border border-success/40 px-2 py-0.5 text-xs font-semibold text-success tabular-nums">
            <Timer className="size-3.5" aria-hidden strokeWidth={2} />
            {formatCountdown(secondsLeft ?? 0)}
          </span>
        )}
        <Link
          href={`/t/assessments/${name}`}
          aria-label="Save and exit"
          className="text-foreground/80 transition-colors hover:text-foreground"
        >
          <LogOut className="size-5" aria-hidden />
        </Link>
      </div>
      <p className="mt-3 truncate font-sans text-sm font-medium text-foreground/80">
        {sectionTitle}
      </p>
      <div
        className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label="Assessment progress"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-[#9B3048] transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </header>
  );
}

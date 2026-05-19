"use client";

import Link from "next/link";
import { Monitor, FlaskConical, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RecommendedItem {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  estimatedTime: string;
  thumbnailBg: string;
  thumbnail: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RECOMMENDED_ITEMS: RecommendedItem[] = [
  {
    id: "ai-mock-interview",
    title: "AI mock Interview",
    description:
      "To get verified score and become discoverable to top employers.",
    actionLabel: "Continue to next",
    actionHref: "/t/assessments",
    estimatedTime: "30–45 minutes",
    thumbnailBg: "bg-green-400",
    thumbnail: <Monitor className="size-8 text-white" aria-hidden="true" />,
  },
  {
    id: "practical-assessment",
    title: "Practical assessment",
    description:
      "To get verified score and become discoverable to top employers.",
    actionLabel: "Continue to next",
    actionHref: "/t/assessments",
    estimatedTime: "30–45 minutes",
    thumbnailBg: "bg-slate-800",
    thumbnail: (
      <FlaskConical className="size-8 text-white" aria-hidden="true" />
    ),
  },
];

// ─── Item row ─────────────────────────────────────────────────────────────────

function RecommendedItemRow({ item }: { item: RecommendedItem }) {
  return (
    <div className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
      {/* Thumbnail */}
      <div
        className={cn(
          "flex size-[68px] shrink-0 items-center justify-center rounded-2xl",
          item.thumbnailBg,
        )}
      >
        {item.thumbnail}
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold leading-snug text-foreground">
          {item.title}
        </p>
        <p className="mt-0.5 line-clamp-1 text-[12px] text-muted-foreground">
          {item.description}
        </p>

        {/* Action row */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Link
            href={item.actionHref}
            className="text-[12px] font-semibold text-amber-500 hover:underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            {item.actionLabel}
          </Link>
          <span className="text-muted-foreground text-[12px]">
            Estimated time: {item.estimatedTime}
          </span>
        </div>
      </div>

      {/* Overflow menu */}
      <button
        type="button"
        aria-label={`Options for ${item.title}`}
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        <MoreHorizontal className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DashboardRecommended() {
  return (
    <section
      aria-labelledby="recommended-heading"
      className="rounded-2xl border border-border bg-white p-6"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="recommended-heading"
          className="text-[18px] font-bold tracking-tight text-foreground"
        >
          Recommended for you
        </h2>
        <Link
          href="/t/assessments"
          className="label shrink-0 text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          See all →
        </Link>
      </div>

      {/* Items */}
      <div className="flex flex-col divide-y divide-border">
        {RECOMMENDED_ITEMS.map((item) => (
          <RecommendedItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

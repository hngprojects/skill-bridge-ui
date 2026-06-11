"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MoreHorizontal } from "lucide-react";

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
    estimatedTime: "30 minutes",
    thumbnailBg: "bg-[#7EFF3C]",
    thumbnail: (
      <Image
        src="/assets/recommend/ai-mock-interview.svg"
        alt="AI mock Interview"
        width={32}
        height={32}
        className="size-14 text-white"
      />
    ),
  },
  {
    id: "practical-assessment",
    title: "Practical assessment",
    description:
      "To get verified score and become discoverable to top employers.",
    actionLabel: "Continue to next",
    actionHref: "/t/assessments",
    estimatedTime: "30 minutes",
    thumbnailBg: "bg-slate-800",
    thumbnail: (
      <Image
        src="/assets/recommend/practical-assessment.svg"
        alt="Practical-assessment"
        width={32}
        height={32}
        className="size-14 text-white"
      />
    ),
  },
];

// ─── Item row ─────────────────────────────────────────────────────────────────

function RecommendedItemRow({ item }: { item: RecommendedItem }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-4">
      {/* Thumbnail */}
      <div
        className={cn(
          "flex size-18 shrink-0 items-center justify-center rounded-xl",
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
        <p className="mt-1 line-clamp-1 text-[12px] text-muted-foreground">
          {item.description}
        </p>

        {/* Action row */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Link
            href={item.actionHref}
            className="text-[12px] font-semibold text-[#34A853] underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            {item.actionLabel}
          </Link>
          <span className="text-muted-foreground text-[12px]">
            Estimated time: {item.estimatedTime}
          </span>
        </div>
      </div>

      {/* Add button */}
      <Link
        href={item.actionHref}
        aria-label={`Add ${item.title}`}
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <MoreHorizontal className="size-4" />
      </Link>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DashboardRecommended() {
  return (
    <section
      aria-labelledby="recommended-heading"
      className="rounded-2xl border border-border bg-[#FAFAFA] p-6"
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
          className="flex items-center label shrink-0 text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity group"
        >
          See all
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3">
        {RECOMMENDED_ITEMS.map((item) => (
          <RecommendedItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

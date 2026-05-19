"use client";

import Link from "next/link";
import {
  BarChart2,
  LayoutGrid,
  Briefcase,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type AssessmentStatus = "completed" | "pending";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: AssessmentStatus;
  iconBg: string;
  icon: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: "personal",
    title: "Personal assessment",
    description:
      "Tell us about your specialization, tools, experience level,...",
    status: "completed",
    iconBg: "bg-orange-100",
    icon: <BarChart2 className="size-5 text-orange-500" aria-hidden="true" />,
  },
  {
    id: "skills-career",
    title: "Skills/Career assessment",
    description:
      "This assessment is designed to evaluate your current skill...",
    status: "completed",
    iconBg: "bg-yellow-100",
    icon: <LayoutGrid className="size-5 text-yellow-600" aria-hidden="true" />,
  },
  {
    id: "advance",
    title: "Advance assessment",
    description: "To get verified score and become discoverable to top e...",
    status: "pending",
    iconBg: "bg-purple-100",
    icon: <Briefcase className="size-5 text-purple-500" aria-hidden="true" />,
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: AssessmentStatus }) {
  if (status === "completed") {
    return (
      <CheckCircle2
        className="size-5 shrink-0 text-emerald-500"
        aria-label="Completed"
      />
    );
  }
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white">
      <Clock className="size-3 text-muted-foreground" aria-label="Pending" />
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DashboardJobRoadmap() {
  return (
    <section
      aria-labelledby="roadmap-heading"
      className="flex flex-col rounded-2xl border border-border bg-white p-6"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2
          id="roadmap-heading"
          className="text-[18px] font-bold tracking-tight text-foreground"
        >
          Job assessment roadmap
        </h2>
        <Link
          href="/t/assessments"
          className="label shrink-0 text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          Continue →
        </Link>
      </div>

      {/* Items */}
      <div className="flex flex-col divide-y divide-border">
        {ROADMAP_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
          >
            {/* Icon tile */}
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                item.iconBg,
              )}
            >
              {item.icon}
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold leading-snug text-foreground">
                {item.title}
              </p>
              <p className="mt-0.5 line-clamp-1 text-[12px] text-muted-foreground">
                {item.description}
              </p>
            </div>

            {/* Status */}
            <StatusIcon status={item.status} />
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";

import { ArrowRight, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type {
  DashboardJourneyKey,
  DashboardJourneyOverviewItem,
} from "@/types/api";

type AssessmentStatus = "completed" | "pending";

interface RoadmapItem {
  id: string;
  journeyKey?: DashboardJourneyKey;
  title: string;
  description: string;
  status: AssessmentStatus;
  iconBg: string;
  icon: React.ReactNode;
  summarySlug?: string;
}

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: "personal",
    journeyKey: "personal",
    summarySlug: "personal",
    title: "Personal  assessment",
    description:
      "Tell us about your specialization, tools, experience level,...",
    status: "completed",
    iconBg: "bg-orange-100",
    icon: (
      <Image
        src="/assets/assessments/personal-assessment-icon.svg"
        alt="Personal assessment"
        width={40}
        height={40}
        className="size/10"
      />
    ),
  },
  {
    id: "skills-career",
    journeyKey: "skill",
    summarySlug: "skill",
    title: "Skills/Career assessment",
    description:
      "This assessment is designed to evaluate your current skill...",
    status: "completed",
    iconBg: "bg-yellow-100",
    icon: (
      <Image
        src="/assets/assessments/skill-assessment-icon.svg"
        alt="Skills/Career assessment"
        width={40}
        height={40}
        className="size/10"
      />
    ),
  },
  {
    id: "advance",
    journeyKey: "advanced",
    summarySlug: "advanced",
    title: "Job Readiness Evaluation",
    description: "To get verified score and become discoverable to top e...",
    status: "pending",
    iconBg: "bg-purple-100",
    icon: (
      <Image
        src="/assets/assessments/advanced-assessment-icon.svg"
        alt="Job Readiness Evaluation"
        width={40}
        height={40}
        className="size/10"
      />
    ),
  },
];

function toAssessmentStatus(
  status: DashboardJourneyOverviewItem["status"],
): AssessmentStatus {
  return status === "completed" ? "completed" : "pending";
}

function StatusIcon({ status }: { status: AssessmentStatus }) {
  if (status === "completed") {
    return (
      <Image
        src="/assets/checkmark.svg"
        alt="checkmark"
        width={20}
        height={20}
        className="size-5 shrink-0"
        aria-label="Completed"
      />
    );
  }
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-ful">
      <Image
        src="/assets/clock.svg"
        alt="clock"
        width={20}
        height={20}
        className="size-5 shrink-0"
        aria-label="Pending"
      />
    </span>
  );
}

type DashboardJobRoadmapProps = {
  journeyOverview?: DashboardJourneyOverviewItem[];
};

export function DashboardJobRoadmap({
  journeyOverview,
}: DashboardJobRoadmapProps = {}) {
  const statusByKey = new Map(
    (journeyOverview ?? []).map((item) => [item.key, item.status]),
  );
  const items = ROADMAP_ITEMS.map((item) => {
    if (!item.journeyKey) return item;
    const status = statusByKey.get(item.journeyKey);
    return status ? { ...item, status: toAssessmentStatus(status) } : item;
  });

  return (
    <section
      aria-labelledby="roadmap-heading"
      className="flex flex-col rounded-2xl border border-border bg-[#FAFAFA] p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2
          id="roadmap-heading"
          className="text-[18px] font-bold tracking-tight text-foreground"
        >
          Job assessment roadmap
        </h2>
        <Link
          href="/t/assessments"
          className="flex items-center label shrink-0 text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity group"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-transform hover:-translate-y-1 hover:shadow-sm"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl">
              {item.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold leading-snug text-foreground">
                {item.title}
              </p>
              <p className="mt-1 line-clamp-1 text-[12px] text-muted-foreground">
                {item.description}
              </p>
            </div>

            <StatusIcon status={item.status} />

            {item.status === "completed" && item.summarySlug ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/t/assessments/${item.summarySlug}/summary`}>
                      View Summary
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <span className="size-7 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

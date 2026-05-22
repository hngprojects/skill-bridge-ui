"use client";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type AssessmentStatus = "completed" | "pending";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: AssessmentStatus;
  iconBg: string;
  icon: React.ReactNode;
}

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: "personal",
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
    title: "Advanced assessment",
    description: "To get verified score and become discoverable to top e...",
    status: "pending",
    iconBg: "bg-purple-100",
    icon: (
      <Image
        src="/assets/assessments/advanced-assessment-icon.svg"
        alt="Advance assessment"
        width={40}
        height={40}
        className="size/10"
      />
    ),
  },
];

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
        aria-label="Completed"
      />
    </span>
  );
}

export function DashboardJobRoadmap() {
  return (
    <section
      aria-labelledby="roadmap-heading"
      className="flex flex-col rounded-2xl border border-border bg-[#FAFAFA] p-6"
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
          className="flex items-center label shrink-0 text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity group"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2">
        {ROADMAP_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-transform hover:-translate-y-1 hover:shadow-sm"
          >
            {/* Icon tile */}
            <div
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl",
              )}
            >
              {item.icon}
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold leading-snug text-foreground">
                {item.title}
              </p>
              <p className="mt-1 line-clamp-1 text-[12px] text-muted-foreground">
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

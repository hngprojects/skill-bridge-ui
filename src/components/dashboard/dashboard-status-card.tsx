"use client";

import Link from "next/link";
import { Clock, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

function CircularProgress({
  value,
  size = 112,
  strokeWidth = 10,
  color = "#F97316",
}: CircularProgressProps) {
  const center = 50;
  const radius = center - strokeWidth / 2 - 1;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className="relative shrink-0 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span className="relative text-2xl font-bold text-foreground">
        {value}%
      </span>
    </div>
  );
}

interface DashboardStatusCardProps {
  badge?: string;
  tier?: string;
  description?: string;
  score?: number;
  coolingDays?: number;
}

export function DashboardStatusCard({
  badge = "Validated",
  tier = "Emerging Talent",
  description = "Your next attempt is coming up. Keep preparing while you wait. Use the resources below to strengthen your weak areas and come back stronger.",
  score = 62,
  coolingDays = 14,
}: DashboardStatusCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#F2F2F2]">
      {/* Main row */}
      <div className="flex items-start justify-between gap-6 p-6">
        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="flex">
            <div className="flex-1 space-y-2.5">
              <h2 className="text-lg font-semibold leading-snug text-foreground">
                {badge}{" "}
                <span className="text-muted-foreground font-normal">•</span>{" "}
                <strong className="font-bold">{tier}</strong>
              </h2>
              <p
                className={cn(
                  "body text-muted-foreground leading-relaxed",
                  "max-w-[520px]",
                )}
              >
                {description}
              </p>
            </div>
            <CircularProgress value={score} />    
          </div>
          <div
            className={cn(
              "flex flex-col gap-3 border-t border-border bg-white px-6 py-3 rounded-2xl",
              "sm:flex-row sm:items-center sm:justify-between sm:gap-4",
            )}
          >
            <div className="flex items-center gap-2">
              {/* Orange clock badge */}
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-100">
                <AlertCircle className="size-3.5 text-orange-500" aria-hidden="true" />
              </span>
              <p className="body-3 text-muted-foreground">
                {coolingDays}-day cooling period between attempts
                <span className="mx-1.5">•</span>
                Use this time to prepare
              </p>
            </div>

            <Link
              href="/t/assessments"
              className={cn(
                "label shrink-0 text-foreground underline underline-offset-2",
                "hover:opacity-70 transition-opacity",
              )}
            >
              See assessment roadmap →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

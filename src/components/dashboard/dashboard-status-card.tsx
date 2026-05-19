"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface HexagonScoreProps {
  value: number;
  color?: string;
}

function HexagonScore({ value, color = "#F59E0B" }: HexagonScoreProps) {
  return (
    <div
      className="relative shrink-0 flex items-center justify-center"
      style={{ width: 108, height: 96 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: color,
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
      />
      <span className="relative text-[22px] font-bold text-white leading-none tracking-tight">
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
            <HexagonScore value={score} />
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
                <AlertCircle
                  className="size-3.5 text-orange-500"
                  aria-hidden="true"
                />
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

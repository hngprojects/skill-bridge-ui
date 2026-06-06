"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  DEFAULT_EMPLOYER_ACTIVITY_META,
  EMPLOYER_ACTIVITY_TYPE_META,
} from "@/constants/employer-dashboard";
import type { EmployerRecentActivityItem } from "@/types/api/employer-dashboard";

type EmployerRecentActivityProps = {
  items: EmployerRecentActivityItem[];
};

const RELATIVE_TIME_UNITS = [
  { label: "year", seconds: 60 * 60 * 24 * 365 },
  { label: "month", seconds: 60 * 60 * 24 * 30 },
  { label: "day", seconds: 60 * 60 * 24 },
  { label: "hour", seconds: 60 * 60 },
  { label: "minute", seconds: 60 },
] as const;

function formatRelativeTime(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Just now";
  const elapsed = Math.max(
    0,
    Math.floor((Date.now() - parsed.getTime()) / 1000),
  );
  for (const unit of RELATIVE_TIME_UNITS) {
    const count = Math.floor(elapsed / unit.seconds);
    if (count >= 1) return `${count} ${unit.label}${count > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}

function ActivityCard({ item }: { item: EmployerRecentActivityItem }) {
  const meta =
    EMPLOYER_ACTIVITY_TYPE_META[item.type] ?? DEFAULT_EMPLOYER_ACTIVITY_META;
  return (
    <Link
      href={meta.route}
      className="flex items-center gap-6 rounded-[10px] border border-[#D9D9D9] bg-white px-4 py-4 transition-colors hover:bg-[#FAFAFA]"
    >
      <div className="flex flex-1 items-center gap-4">
        <div
          className="flex size-6 shrink-0 items-center justify-center rounded-[3.43px]"
          style={{ backgroundColor: meta.iconBg }}
        >
          <Image src={meta.icon} alt="" width={17} height={17} />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-sans text-base font-medium leading-[150%] text-[#151515]">
            {item.title}
          </p>
          {item.description ? (
            <p className="font-sans text-sm font-normal leading-[150%] text-[#757575]">
              {item.description}
            </p>
          ) : null}
        </div>
      </div>
      <span className="shrink-0 font-sans text-base font-normal leading-[150%] text-[#757575]">
        {formatRelativeTime(item.occurredAt)}
      </span>
    </Link>
  );
}

export function EmployerRecentActivity({ items }: EmployerRecentActivityProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-[#F2F2F2] p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-xl font-semibold leading-[150%] text-[#151515]">
          Recent activity
        </h2>
        <Link
          href="/e/notifications"
          className="flex items-center gap-0.5 font-sans text-base font-semibold leading-[150%] tracking-[0.016em] text-[#05060F] underline"
        >
          See all
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

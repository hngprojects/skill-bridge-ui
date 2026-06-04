"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EMPLOYER_RECENT_ACTIVITY } from "@/constants/employer-dashboard";

function ActivityCard({
  message,
  time,
  iconBg,
  icon,
}: (typeof EMPLOYER_RECENT_ACTIVITY)[number]) {
  return (
    <div className="flex items-center gap-6 rounded-[10px] border border-[#D9D9D9] bg-white px-4 py-4">
      <div className="flex flex-1 items-center gap-4">
        <div
          className="flex size-6 shrink-0 items-center justify-center rounded-[3.43px]"
          style={{ backgroundColor: iconBg }}
        >
          <Image src={icon} alt="" width={17} height={17} />
        </div>
        <p className="font-sans text-base font-normal leading-[150%] text-[#151515]">
          {message}
        </p>
      </div>
      <span className="shrink-0 font-sans text-base font-normal leading-[150%] text-[#757575]">
        {time}
      </span>
    </div>
  );
}

export function EmployerRecentActivity() {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-[#F2F2F2] p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-xl font-semibold leading-[150%] text-[#151515]">
          Recent activity
        </h2>
        <Link
          href="/e/activity"
          className="flex items-center gap-0.5 font-sans text-base font-semibold leading-[150%] tracking-[0.016em] text-[#05060F] underline"
        >
          See all
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {EMPLOYER_RECENT_ACTIVITY.map((item) => (
          <ActivityCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

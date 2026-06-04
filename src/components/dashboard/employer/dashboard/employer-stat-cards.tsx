"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EMPLOYER_STAT_CARDS } from "@/constants/employer-dashboard";

function StatCard({
  label,
  value,
  description,
  linkLabel,
  linkHref,
  iconBg,
  icon,
}: (typeof EMPLOYER_STAT_CARDS)[number]) {
  return (
    <div className="flex flex-col gap-6 rounded-[10px] border border-[#D9D9D9] bg-white p-4">
      <div className="flex items-start gap-4">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: iconBg }}
        >
          <Image src={icon} alt={label} width={40} height={40} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-sans text-base font-semibold leading-[150%] tracking-[0.017em] text-[#151515]">
            {label}
          </p>
          <p className="font-sans text-[32px] font-semibold leading-[150%] text-[#151515]">
            {value}
          </p>
          <p className="font-sans text-base font-normal leading-[150%] text-[#151515]">
            {description}
          </p>
        </div>
      </div>
      <Link
        href={linkHref}
        className="flex items-center gap-0.5 font-sans text-base font-semibold leading-[150%] tracking-[0.016em] text-[#05060F] underline"
      >
        {linkLabel}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export function EmployerStatCards() {
  return (
    <div className="rounded-2xl bg-[#F2F2F2] p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {EMPLOYER_STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
}

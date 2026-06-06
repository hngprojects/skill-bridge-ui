"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EMPLOYER_OVERVIEW_CARDS_META } from "@/constants/employer-dashboard";

type EmployerStatCardsProps = {
  /** Count keyed by `EMPLOYER_OVERVIEW_CARDS_META[].key`. Missing entries
   *  default to 0 so the cards always render. */
  counts: Record<string, number>;
};

type Meta = (typeof EMPLOYER_OVERVIEW_CARDS_META)[number];

function StatCard({ meta, value }: { meta: Meta; value: number }) {
  return (
    <div className="flex flex-col gap-6 rounded-[10px] border border-[#D9D9D9] bg-white p-4">
      <div className="flex items-start gap-4">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: meta.iconBg }}
        >
          <Image src={meta.icon} alt={meta.label} width={40} height={40} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-sans text-base font-semibold leading-[150%] tracking-[0.017em] text-[#151515]">
            {meta.label}
          </p>
          <p className="font-sans text-[32px] font-semibold leading-[150%] text-[#151515]">
            {value.toLocaleString()}
          </p>
          <p className="font-sans text-base font-normal leading-[150%] text-[#151515]">
            {meta.description}
          </p>
        </div>
      </div>
      <Link
        href={meta.linkHref}
        className="flex items-center gap-0.5 font-sans text-base font-semibold leading-[150%] tracking-[0.016em] text-[#05060F] underline"
      >
        {meta.linkLabel}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export function EmployerStatCards({ counts }: EmployerStatCardsProps) {
  return (
    <div className="rounded-2xl bg-[#F2F2F2] p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {EMPLOYER_OVERVIEW_CARDS_META.map((meta) => (
          <StatCard key={meta.key} meta={meta} value={counts[meta.key] ?? 0} />
        ))}
      </div>
    </div>
  );
}

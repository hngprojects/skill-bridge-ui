"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function EmployerTalentProfileHeader() {
  return (
    <section className="flex flex-row justify-between items-center h-10">
      <Link
        href="/e/talents"
        className="flex items-center gap-0.5 font-semibold text-base leading-[150%] tracking-[0.016em] text-[#05060F] underline"
      >
        <ArrowLeft className="size-6" strokeWidth={1} />
        Back
      </Link>
      <div className="flex flex-row items-center gap-4">
        <button className="flex items-center justify-center px-[10px] py-1 w-40 h-10 border border-[#05060F] rounded-lg font-semibold text-base leading-5 tracking-[0.016em] text-[#151515]">
          Add to Shortlist
        </button>
        <button className="flex items-center justify-center px-[10px] py-1 w-[108px] h-10 bg-[#05060F] rounded-lg font-semibold text-base leading-5 tracking-[0.016em] text-white">
          Send Offer
        </button>
      </div>
    </section>
  );
}

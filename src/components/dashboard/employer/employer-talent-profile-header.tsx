"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmployerTalentProfileHeader() {
  const handleAddToShortlist = () => {
    alert("Added to Shortlist (Scaffolding)");
  };

  const handleSendOffer = () => {
    alert("Initiating Offer Modal (Scaffolding)");
  };

  return (
    <div className="flex flex-row justify-between items-center w-full pb-4 border-b border-[#EBEBEB]">
      <Link
        href="/e/talents"
        className="flex items-center gap-x-2 text-[#757575] hover:text-[#151515] transition-colors font-medium"
      >
        <ChevronLeft size={20} />
        Back to Talents
      </Link>

      <div className="flex flex-row gap-x-3">
        <button
          onClick={handleAddToShortlist}
          className={cn(
            "flex items-center justify-center rounded-lg font-semibold text-base",
            "leading-5 tracking-[0.016em] text-[#151515] hover:bg-black/5",
            "w-40 h-10 border border-[#05060F] transition-colors",
          )}
        >
          Add to Shortlist
        </button>
        <button
          onClick={handleSendOffer}
          className={cn(
            "flex items-center justify-center rounded-lg font-semibold text-base",
            "leading-5 tracking-[0.016em] text-white hover:bg-[#151515]/90",
            "w-27 h-10 bg-[#05060F] transition-colors",
          )}
        >
          Send Offer
        </button>
      </div>
    </div>
  );
}

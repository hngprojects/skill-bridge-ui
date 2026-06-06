"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { useSaveCandidate } from "@/hooks/api/use-employer-discovery";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

type EmployerTalentProfileHeaderProps = {
  userId: string;
  isSaved: boolean;
};

export function EmployerTalentProfileHeader({
  userId,
  isSaved,
}: EmployerTalentProfileHeaderProps) {
  const { mutate: saveCandidate, isPending: isSaving } = useSaveCandidate();

  function handleAddToShortlist() {
    if (isSaved || isSaving) return;

    saveCandidate(userId, {
      onSuccess: () => {
        appToast.success("Added to shortlist.");
      },
      onError: (error) => {
        appToast.error(authFailureMessage(error));
      },
    });
  }

  function handleSendOffer() {
    toast("Send offer is coming soon.");
  }

  return (
    <div className="flex w-full flex-row items-center justify-between border-b border-[#EBEBEB] pb-4">
      <Link
        href="/e/talents"
        className="flex items-center gap-x-2 font-medium text-[#757575] transition-colors hover:text-[#151515]"
      >
        <ChevronLeft size={20} />
        Back to Talents
      </Link>

      <div className="flex flex-row gap-x-3">
        <button
          type="button"
          onClick={handleAddToShortlist}
          disabled={isSaved || isSaving}
          className={cn(
            "flex h-10 w-40 items-center justify-center rounded-lg border border-[#05060F] text-base font-semibold leading-5 tracking-[0.016em] text-[#151515] transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {isSaved ? "Shortlisted" : "Add to Shortlist"}
        </button>
        <button
          type="button"
          onClick={handleSendOffer}
          className={cn(
            "flex h-10 w-27 items-center justify-center rounded-lg bg-[#05060F] text-base font-semibold leading-5 tracking-[0.016em] text-white transition-colors hover:bg-[#151515]/90",
          )}
        >
          Send Offer
        </button>
      </div>
    </div>
  );
}

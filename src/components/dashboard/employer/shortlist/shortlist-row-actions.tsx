"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SendOfferDialog } from "@/components/dashboard/employer/talents/send-offer-dialog";
import { useRemoveCandidate } from "@/hooks/api/use-employer-discovery";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";

type ShortlistRowActionsProps = {
  candidateId: string;
  candidateName: string;
};

export function ShortlistRowActions({
  candidateId,
  candidateName,
}: ShortlistRowActionsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sendOfferOpen, setSendOfferOpen] = useState(false);
  const { mutate: removeCandidate, isPending: isRemoving } =
    useRemoveCandidate();

  function handleRemove() {
    removeCandidate(candidateId, {
      onSuccess: () => {
        setConfirmOpen(false);
        appToast.success(`${candidateName} removed from shortlist.`);
      },
      onError: (error) => {
        appToast.error(authFailureMessage(error));
      },
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-[#52525B]"
            aria-label={`Actions for ${candidateName}`}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={4}
          className="w-44 rounded-xl border border-[#E4E7EC] bg-white p-2 shadow-[0_12px_32px_rgba(16,24,40,0.14)]"
        >
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setSendOfferOpen(true);
            }}
            className="h-9 cursor-pointer rounded-md px-2 text-sm text-[#344054]"
          >
            Send offer
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="h-9 cursor-pointer rounded-md px-2 text-sm text-[#344054]"
          >
            <Link href={`/e/talents/${candidateId}`}>Verified profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setConfirmOpen(true);
            }}
            className="h-9 cursor-pointer rounded-md px-2 text-sm text-[#B42318]"
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SendOfferDialog
        open={sendOfferOpen}
        onOpenChange={setSendOfferOpen}
        userId={candidateId}
      />

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove from shortlist?</DialogTitle>
            <DialogDescription>
              {candidateName} will be removed from your shortlist. You can
              shortlist them again from the discovery page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={isRemoving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleRemove}
              disabled={isRemoving}
              className="bg-[#B42318] text-white hover:bg-[#B42318]/90"
            >
              {isRemoving ? "Removing…" : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

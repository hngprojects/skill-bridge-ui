"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TalentOfferResponseAction } from "@/types/api/talent-offers";

type RespondCopy = {
  title: string;
  description: (employerName: string, roleTitle: string) => string;
  actionLabel: string;
  pendingLabel: string;
  destructive: boolean;
};

const COPY: Record<TalentOfferResponseAction, RespondCopy> = {
  accept: {
    title: "Accept this offer?",
    description: (employerName, roleTitle) =>
      `Accepting will let ${employerName} know you've taken the offer for ${roleTitle}. You may be asked to complete an assessment next.`,
    actionLabel: "Accept offer",
    pendingLabel: "Accepting…",
    destructive: false,
  },
  decline: {
    title: "Decline this offer?",
    description: (employerName, roleTitle) =>
      `Declining the offer from ${employerName} for ${roleTitle} can't be undone. They'll be notified.`,
    actionLabel: "Decline offer",
    pendingLabel: "Declining…",
    destructive: true,
  },
};

type TalentOfferRespondDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: TalentOfferResponseAction | null;
  employerName: string;
  roleTitle: string;
  isSubmitting: boolean;
  onConfirm: () => void;
};

export function TalentOfferRespondDialog({
  open,
  onOpenChange,
  action,
  employerName,
  roleTitle,
  isSubmitting,
  onConfirm,
}: TalentOfferRespondDialogProps) {
  const copy = action ? COPY[action] : null;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!isSubmitting) onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-md">
        {copy ? (
          <>
            <DialogHeader>
              <DialogTitle>{copy.title}</DialogTitle>
              <DialogDescription>
                {copy.description(employerName, roleTitle)}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={onConfirm}
                disabled={isSubmitting}
                className={
                  copy.destructive
                    ? "bg-[#B42318] text-white hover:bg-[#B42318]/90"
                    : undefined
                }
              >
                {isSubmitting ? copy.pendingLabel : copy.actionLabel}
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

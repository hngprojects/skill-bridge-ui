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

type RestrictedFieldConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fieldName: string;
  isSaving: boolean;
  onConfirm: () => void;
};

export function RestrictedFieldConfirmDialog({
  open,
  onOpenChange,
  fieldName,
  isSaving,
  onConfirm,
}: RestrictedFieldConfirmDialogProps) {
  const name = fieldName.toLowerCase();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-105 gap-5 rounded-2xl p-6">
        <DialogHeader className="items-start text-left">
          <DialogTitle className="text-base font-bold">
            Confirm {name} change
          </DialogTitle>
          <DialogDescription className="text-xs leading-5">
            Saving will lock {name} for 180 days. You won&apos;t be able to
            change it again until the cooldown ends. Continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-3">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-9 rounded-md bg-[#D9D9D9] text-xs text-foreground hover:bg-[#D9D9D9]/80"
              disabled={isSaving}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="h-9 rounded-md text-xs"
            onClick={onConfirm}
            disabled={isSaving}
          >
            {isSaving ? "Saving…" : "Yes, save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

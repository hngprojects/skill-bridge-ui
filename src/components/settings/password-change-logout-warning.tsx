"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type PasswordChangeLogoutWarningProps = {
  open: boolean;
  isUpdating: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function PasswordChangeLogoutWarning({
  open,
  isUpdating,
  onConfirm,
  onCancel,
}: PasswordChangeLogoutWarningProps) {
  return (
    <AlertDialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <AlertDialogContent className="max-w-md rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base font-semibold text-foreground">
            Heads up
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            Updating your password will sign you out of this session.
            You&apos;ll be prompted to log in again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel
            onClick={onCancel}
            disabled={isUpdating}
            className="h-9 rounded-lg text-sm"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isUpdating}
            className="h-9 rounded-lg bg-[#322B2B] text-sm text-white hover:bg-[#322B2B]/80 disabled:opacity-50"
          >
            {isUpdating ? "Updating…" : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

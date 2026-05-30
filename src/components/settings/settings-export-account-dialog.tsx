"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { useRef, useState } from "react";

import { exportAccountData } from "@/actions/settings";
import { SettingsAccountActionLink } from "@/components/settings/settings-account-action-link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";

function triggerDownload(downloadUrl: string) {
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "skillbridge-account-data.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function SettingsExportAccountDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const exportInFlightRef = useRef(false);

  const handleExportAccountData = async () => {
    if (exportInFlightRef.current) return;

    try {
      exportInFlightRef.current = true;
      setIsExporting(true);
      const response = await exportAccountData();
      if (response.download_url) {
        triggerDownload(response.download_url);
      }
      appToast.success(
        response.download_url
          ? "Account data download started. A copy has also been sent to your email."
          : "Account data export generated and sent to your email.",
      );
      setIsOpen(false);
    } catch (error) {
      appToast.error(authFailureMessage(error));
    } finally {
      exportInFlightRef.current = false;
      setIsExporting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!isExporting) setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <SettingsAccountActionLink
          disabled={isExporting}
          icon={<HugeiconsIcon icon={Download01Icon} className="size-4" />}
        >
          Request export
        </SettingsAccountActionLink>
      </DialogTrigger>
      <DialogContent className="max-w-[390px] gap-5 rounded-2xl p-6">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-base font-bold">
            Export account data
          </DialogTitle>
          <DialogDescription className="max-w-67 text-xs leading-5">
            Request a copy of your account data. We&apos;ll generate the export
            from your current account information.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-3 sm:grid-cols-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-9 rounded-md bg-[#D9D9D9] text-xs text-foreground hover:bg-[#D9D9D9]/80"
              disabled={isExporting}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="h-9 rounded-md bg-primary text-xs text-primary-foreground hover:bg-primary/90"
            disabled={isExporting}
            onClick={handleExportAccountData}
          >
            {isExporting ? "Requesting..." : "Request export"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

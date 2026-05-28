"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import {
  ArrowRight01Icon,
  ChromeIcon,
  Download01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { deleteAccount, exportAccountData } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";
import { authFailureMessage } from "@/lib/api";
import { clearPersistedSessionState } from "@/lib/client-session-cleanup";
import { appToast } from "@/lib/toast";

function AccountRow({
  title,
  description,
  action,
}: {
  title: string;
  description: React.ReactNode;
  action: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-foreground">{title}</p>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

function ActionLink({
  children,
  destructive,
  icon,
  className,
  ...props
}: {
  children: React.ReactNode;
  destructive?: boolean;
  icon?: React.ReactNode;
} & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={`flex items-center gap-1 text-sm font-medium underline underline-offset-2 transition-colors disabled:pointer-events-none disabled:opacity-60 ${
        destructive
          ? "text-destructive hover:text-destructive/80"
          : "text-foreground hover:text-muted-foreground"
      } ${className ?? ""}`}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}

export function SettingsAccount() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { email } = useSessionUserProfile();
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handleExportAccountData = async () => {
    try {
      setIsExporting(true);
      await exportAccountData();
      appToast.success("Account data export generated.");
      setIsExportDialogOpen(false);
    } catch (error) {
      appToast.error(authFailureMessage(error));
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!isDeleteConfirmed) return;

    try {
      setIsDeletingAccount(true);
      await deleteAccount({ confirmation: "DELETE" });
      appToast.success("Account deleted successfully.");
      queryClient.clear();
      clearPersistedSessionState();
      const result = await signOut({ callbackUrl: "/login", redirect: false });
      router.replace(result.url ?? "/login");
    } catch (error) {
      appToast.error(authFailureMessage(error));
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <AccountRow
        title="Email Address"
        description={email || "—"}
        action={
          <ActionLink
            icon={<HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />}
          >
            Change email
          </ActionLink>
        }
      />

      <AccountRow
        title="Password"
        description="**************"
        action={
          <ActionLink
            icon={<HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />}
          >
            Change password
          </ActionLink>
        }
      />

      <AccountRow
        title="Active Sessions"
        description={
          <span className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span className="flex items-center gap-2">
              <HugeiconsIcon icon={ChromeIcon} className="size-4 shrink-0" />
              Chrome on Mac OS X
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span>Last access: Today at 4:38 PM</span>
          </span>
        }
        action={
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            Current session
            <HugeiconsIcon icon={InformationCircleIcon} className="size-4" />
          </span>
        }
      />

      <AccountRow
        title="Download Personal Data"
        description="Request a copy of your data for export. You will receive an email when your export is ready for download"
        action={
          <Dialog
            open={isExportDialogOpen}
            onOpenChange={(open) => {
              if (!isExporting) setIsExportDialogOpen(open);
            }}
          >
            <DialogTrigger asChild>
              <ActionLink
                disabled={isExporting}
                icon={
                  <HugeiconsIcon icon={Download01Icon} className="size-4" />
                }
              >
                Request export
              </ActionLink>
            </DialogTrigger>
            <DialogContent className="max-w-[390px] gap-5 rounded-2xl p-6">
              <DialogHeader className="items-center text-center">
                <DialogTitle className="text-base font-bold">
                  Export account data
                </DialogTitle>
                <DialogDescription className="max-w-67 text-xs leading-5">
                  Request a copy of your account data. We&apos;ll generate the
                  export from your current account information.
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
        }
      />

      <AccountRow
        title="Deactivate my account"
        description="Your account will be hidden but not deleted"
        action={<ActionLink>Deactivate my account</ActionLink>}
      />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <p className="text-sm font-semibold text-destructive">WARNING!</p>
        <div className="h-px flex-1 bg-border" />
      </div>

      <AccountRow
        title="Delete my account"
        description="This will permanently and irreversibly remove all your CredLane data."
        action={
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={(open) => {
              if (isDeletingAccount) return;
              setIsDeleteDialogOpen(open);
              if (!open) setIsDeleteConfirmed(false);
            }}
          >
            <DialogTrigger asChild>
              <ActionLink destructive disabled={isDeletingAccount}>
                Delete account
              </ActionLink>
            </DialogTrigger>
            <DialogContent className="max-w-[390px] gap-5 rounded-2xl p-6">
              <DialogHeader className="items-center text-center">
                <DialogTitle className="text-base font-bold">
                  Delete my Account
                </DialogTitle>
                <DialogDescription className="max-w-67 text-xs leading-5">
                  Are you sure you want to permanently delete your account?
                </DialogDescription>
              </DialogHeader>

              <label className="flex items-center gap-3 text-xs text-muted-foreground">
                <Checkbox
                  checked={isDeleteConfirmed}
                  disabled={isDeletingAccount}
                  onCheckedChange={(checked) =>
                    setIsDeleteConfirmed(checked === true)
                  }
                  aria-label="Confirm account deletion"
                />
                <span>
                  Yes, I confirm that I want to delete my CredLane account.
                </span>
              </label>

              <DialogFooter className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="h-9 rounded-md bg-[#D9D9D9] text-xs text-foreground hover:bg-[#D9D9D9]/80"
                    disabled={isDeletingAccount}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  className="h-9 rounded-md bg-[#DE3B46] text-xs text-white hover:bg-[#DE3B46]/90"
                  disabled={!isDeleteConfirmed || isDeletingAccount}
                  onClick={handleDeleteAccount}
                >
                  {isDeletingAccount ? "Deleting..." : "Delete my account"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
    </div>
  );
}

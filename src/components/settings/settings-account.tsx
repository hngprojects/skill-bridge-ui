"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ChromeIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";

import { SettingsAccountActionLink } from "@/components/settings/settings-account-action-link";
import { SettingsChangePasswordDialog } from "@/components/settings/settings-change-password-dialog";
import { SettingsDeleteAccountDialog } from "@/components/settings/settings-delete-account-dialog";
import { SettingsExportAccountDialog } from "@/components/settings/settings-export-account-dialog";
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";

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

export function SettingsAccount() {
  const { email } = useSessionUserProfile();

  return (
    <div className="flex flex-col gap-3">
      <AccountRow
        title="Email Address"
        description={email || "-"}
        action={
          <SettingsAccountActionLink
            icon={<HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />}
          >
            Change email
          </SettingsAccountActionLink>
        }
      />

      <AccountRow
        title="Password"
        description="**************"
        action={<SettingsChangePasswordDialog />}
      />

      <AccountRow
        title="Active Sessions"
        description={
          <span className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span className="flex items-center gap-2">
              <HugeiconsIcon icon={ChromeIcon} className="size-4 shrink-0" />
              Chrome on Mac OS X
            </span>
            <span className="hidden text-border sm:inline">-</span>
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
        action={<SettingsExportAccountDialog />}
      />

      <AccountRow
        title="Deactivate my account"
        description="Your account will be hidden but not deleted"
        action={
          <SettingsAccountActionLink>
            Deactivate my account
          </SettingsAccountActionLink>
        }
      />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <p className="text-sm font-semibold text-destructive">WARNING!</p>
        <div className="h-px flex-1 bg-border" />
      </div>

      <AccountRow
        title="Delete my account"
        description="This will permanently and irreversibly remove all your SkillBridge data."
        action={<SettingsDeleteAccountDialog email={email} />}
      />
    </div>
  );
}

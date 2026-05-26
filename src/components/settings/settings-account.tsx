"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ChromeIcon,
  Download01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";

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

function ActionLink({
  children,
  destructive,
  icon,
}: {
  children: React.ReactNode;
  destructive?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`flex items-center gap-1 text-sm font-medium underline underline-offset-2 transition-colors ${
        destructive
          ? "text-destructive hover:text-destructive/80"
          : "text-foreground hover:text-muted-foreground"
      }`}
    >
      {children}
      {icon}
    </button>
  );
}

export function SettingsAccount() {
  const { email } = useSessionUserProfile();

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
          <ActionLink
            icon={<HugeiconsIcon icon={Download01Icon} className="size-4" />}
          >
            Request export
          </ActionLink>
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
        action={<ActionLink destructive>Delete account</ActionLink>}
      />
    </div>
  );
}

"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Download01Icon } from "@hugeicons/core-free-icons";

import { useSessionUserProfile } from "@/hooks/use-session-user-profile";

import { AccountRow, ActionLink } from "./account-row";
import { ActiveSessionsCard } from "./active-sessions-card";

const ArrowIcon = <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />;

export function SettingsAccount() {
  const { email } = useSessionUserProfile();

  return (
    <div className="flex flex-col gap-3">
      <AccountRow
        title="Email Address"
        description={email || "—"}
        action={<ActionLink icon={ArrowIcon}>Change email</ActionLink>}
      />
      <AccountRow
        title="Password"
        description="**************"
        action={<ActionLink icon={ArrowIcon}>Change password</ActionLink>}
      />

      <ActiveSessionsCard />

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

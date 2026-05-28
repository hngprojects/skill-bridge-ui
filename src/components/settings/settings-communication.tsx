"use client";

import { useState } from "react";

import { Switch } from "@/components/ui/switch";
import {
  useTalentCommunicationPreferences,
  useUnsubscribeTalentEmailNotifications,
  useUpdateTalentCommunicationPreferences,
} from "@/hooks/api";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import type {
  TalentSettingsCommunicationPreferences,
  TalentSettingsNotificationPrefs,
} from "@/types/api";

const NOTIFICATION_ITEMS = [
  {
    id: "newOffers",
    label: "New Offers",
    description: "Get notified when new opportunities are available.",
  },
  {
    id: "assessmentReminders",
    label: "Assessment Reminders",
    description: "Receive reminders about assessment progress and next steps.",
  },
  {
    id: "retakeWindowOpen",
    label: "Retake Window Open",
    description: "Know when an assessment retake window becomes available.",
  },
] as const;

const DEFAULT_NOTIFICATION_GROUP: TalentSettingsNotificationPrefs = {
  newOffers: true,
  assessmentReminders: true,
  retakeWindowOpen: true,
};

const DEFAULT_COMMUNICATION_PREFERENCES: TalentSettingsCommunicationPreferences =
  {
    email: DEFAULT_NOTIFICATION_GROUP,
    inApp: DEFAULT_NOTIFICATION_GROUP,
  };

type NotificationId = (typeof NOTIFICATION_ITEMS)[number]["id"];
type NotificationGroupKey = keyof TalentSettingsCommunicationPreferences;

type NotificationGroupProps = {
  title: string;
  preferences: TalentSettingsNotificationPrefs;
  isSaving: boolean;
  showUnsubscribe?: boolean;
  onToggle: (id: NotificationId, checked: boolean) => void;
  onUnsubscribe?: () => void;
};

function clonePreferences(
  preferences: TalentSettingsCommunicationPreferences,
): TalentSettingsCommunicationPreferences {
  return {
    email: { ...preferences.email },
    inApp: { ...preferences.inApp },
  };
}

function disableEmailPreferences(
  preferences: TalentSettingsCommunicationPreferences,
): TalentSettingsCommunicationPreferences {
  return {
    ...clonePreferences(preferences),
    email: {
      newOffers: false,
      assessmentReminders: false,
      retakeWindowOpen: false,
    },
  };
}

function NotificationGroup({
  title,
  preferences,
  isSaving,
  showUnsubscribe,
  onToggle,
  onUnsubscribe,
}: NotificationGroupProps) {
  return (
    <div className="rounded-2xl border border-border bg-white">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {showUnsubscribe && (
          <button
            type="button"
            onClick={onUnsubscribe}
            disabled={isSaving}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
          >
            Unsubscribe from emails
          </button>
        )}
      </div>

      <div className="flex flex-col divide-y divide-border">
        {NOTIFICATION_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <Switch
              checked={preferences[item.id]}
              onCheckedChange={(checked) => onToggle(item.id, checked)}
              disabled={isSaving}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsCommunication() {
  const { data: serverPreferences } = useTalentCommunicationPreferences();
  const { mutateAsync: updatePreferences, isPending: isUpdating } =
    useUpdateTalentCommunicationPreferences();
  const { mutateAsync: unsubscribeEmails, isPending: isUnsubscribing } =
    useUnsubscribeTalentEmailNotifications();
  const [optimisticPreferences, setOptimisticPreferences] =
    useState<TalentSettingsCommunicationPreferences | null>(null);

  const preferences =
    optimisticPreferences ??
    serverPreferences ??
    DEFAULT_COMMUNICATION_PREFERENCES;
  const isSaving = isUpdating || isUnsubscribing;

  const updatePreferenceGroup = async (
    group: NotificationGroupKey,
    id: NotificationId,
    checked: boolean,
  ) => {
    if (isSaving) return;

    const nextPreferences = clonePreferences(preferences);
    nextPreferences[group][id] = checked;
    setOptimisticPreferences(nextPreferences);

    try {
      const updatedPreferences = await updatePreferences(nextPreferences);
      setOptimisticPreferences(updatedPreferences);
      appToast.success("Communication preferences updated.");
    } catch (error) {
      setOptimisticPreferences(null);
      appToast.error(authFailureMessage(error));
    }
  };

  const handleUnsubscribeEmails = async () => {
    if (isSaving) return;

    const nextPreferences = disableEmailPreferences(preferences);
    setOptimisticPreferences(nextPreferences);

    try {
      const updatedPreferences = await unsubscribeEmails();
      setOptimisticPreferences(updatedPreferences);
      appToast.success("Email notifications disabled.");
    } catch (error) {
      setOptimisticPreferences(null);
      appToast.error(authFailureMessage(error));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <NotificationGroup
        title="Email Notifications"
        preferences={preferences.email}
        isSaving={isSaving}
        showUnsubscribe
        onToggle={(id, checked) =>
          void updatePreferenceGroup("email", id, checked)
        }
        onUnsubscribe={() => void handleUnsubscribeEmails()}
      />
      <NotificationGroup
        title="In-app Notifications"
        preferences={preferences.inApp}
        isSaving={isSaving}
        onToggle={(id, checked) =>
          void updatePreferenceGroup("inApp", id, checked)
        }
      />
    </div>
  );
}

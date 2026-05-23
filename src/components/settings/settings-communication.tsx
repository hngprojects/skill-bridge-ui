"use client";

import { useState } from "react";

import { Switch } from "@/components/ui/switch";

const NOTIFICATION_ITEMS = [
  {
    id: "new-offers",
    label: "New Offers",
    description: "You are doing well in this area, keep it up",
  },
  {
    id: "assessment-reminders",
    label: "Assessment Reminders",
    description: "You are doing well in this area, keep it up",
  },
  {
    id: "retake-window-open",
    label: "Retake Window Open",
    description: "You are doing well in this area, keep it up",
  },
] as const;

type NotificationId = (typeof NOTIFICATION_ITEMS)[number]["id"];

interface GroupState {
  "new-offers": boolean;
  "assessment-reminders": boolean;
  "retake-window-open": boolean;
}

const DEFAULT_STATE: GroupState = {
  "new-offers": true,
  "assessment-reminders": true,
  "retake-window-open": true,
};

function NotificationGroup({
  title,
  showUnsubscribe,
}: {
  title: string;
  showUnsubscribe?: boolean;
}) {
  const [state, setState] = useState<GroupState>(DEFAULT_STATE);

  const toggle = (id: NotificationId) =>
    setState((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-base font-semibold text-foreground">{title}</p>
        {showUnsubscribe && (
          <button
            type="button"
            className="text-sm font-medium underline underline-offset-2 text-foreground hover:text-muted-foreground transition-colors"
          >
            Unsubscribe
          </button>
        )}
      </div>

      <div className="flex flex-col divide-y divide-border">
        {NOTIFICATION_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-foreground">
                {item.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <Switch
              checked={state[item.id]}
              onCheckedChange={() => toggle(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsCommunication() {
  return (
    <div className="flex flex-col gap-3">
      <NotificationGroup title="Email" showUnsubscribe />
      <NotificationGroup title="In-App Group" />
    </div>
  );
}

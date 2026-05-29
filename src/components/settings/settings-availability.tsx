"use client";

import { useState } from "react";

import { Switch } from "@/components/ui/switch";
import { useTalentSettings, useUpdateTalentAvailability } from "@/hooks/api";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import type { TalentAvailabilityStatus } from "@/types/api";

const AVAILABILITY_ITEMS = [
  {
    id: "actively_looking",
    label: "Actively Looking",
    description:
      "You demonstrate strong visual thinking, interface structuring, and product intuition. Your growth opportunities currently lie in communication confidence, systems thinking, and decision-making under ambiguity.",
  },
  {
    id: "open_to_opportunities",
    label: "Open to Opportunities",
    description:
      "You demonstrate strong visual thinking, interface structuring, and product intuition. Your growth opportunities currently lie in communication confidence, systems thinking, and decision-making under ambiguity.",
  },
  {
    id: "not_looking",
    label: "Not Looking Profile Visibility",
    description:
      "You demonstrate strong visual thinking, interface structuring, and product intuition. Your growth opportunities currently lie in communication confidence, systems thinking, and decision-making under ambiguity.",
  },
] as const;

type AvailabilityId = (typeof AVAILABILITY_ITEMS)[number]["id"];

function isAvailabilityId(value: unknown): value is AvailabilityId {
  return AVAILABILITY_ITEMS.some((item) => item.id === value);
}

export function SettingsAvailability() {
  const { data: settings } = useTalentSettings();
  const { mutateAsync: updateAvailability, isPending } =
    useUpdateTalentAvailability();
  const [optimisticActive, setOptimisticActive] =
    useState<AvailabilityId | null>(null);
  const serverAvailability = settings?.profile.availability_status;
  const active =
    optimisticActive ??
    (isAvailabilityId(serverAvailability) ? serverAvailability : null) ??
    "actively_looking";

  const handleAvailabilityChange = async (next: AvailabilityId) => {
    if (next === active || isPending) return;

    setOptimisticActive(next);

    try {
      await updateAvailability({
        availabilityStatus: next as TalentAvailabilityStatus,
      });
    } catch (error) {
      setOptimisticActive(null);
      appToast.error(authFailureMessage(error));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {AVAILABILITY_ITEMS.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-base font-semibold text-foreground">
              {item.label}
            </p>
            <Switch
              checked={active === item.id}
              onCheckedChange={(checked) => {
                if (checked) void handleAvailabilityChange(item.id);
              }}
              disabled={isPending}
            />
          </div>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

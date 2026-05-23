"use client";

import { useState } from "react";

import { Switch } from "@/components/ui/switch";

const AVAILABILITY_ITEMS = [
  {
    id: "actively-looking",
    label: "Actively Looking",
    description:
      "You demonstrate strong visual thinking, interface structuring, and product intuition. Your growth opportunities currently lie in communication confidence, systems thinking, and decision-making under ambiguity.",
  },
  {
    id: "open-to-opportunities",
    label: "Open to Opportunities",
    description:
      "You demonstrate strong visual thinking, interface structuring, and product intuition. Your growth opportunities currently lie in communication confidence, systems thinking, and decision-making under ambiguity.",
  },
  {
    id: "not-looking",
    label: "Not Looking Profile Visibility",
    description:
      "You demonstrate strong visual thinking, interface structuring, and product intuition. Your growth opportunities currently lie in communication confidence, systems thinking, and decision-making under ambiguity.",
  },
] as const;

type AvailabilityId = (typeof AVAILABILITY_ITEMS)[number]["id"];

export function SettingsAvailability() {
  const [active, setActive] = useState<AvailabilityId>("actively-looking");

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
                if (checked) setActive(item.id);
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

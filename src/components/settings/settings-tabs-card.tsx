"use client";

import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { SettingsAccount } from "./settings-account";
import { SettingsAvailability } from "./settings-availability";
import { SettingsCommunication } from "./settings-communication";
import { SettingsResume } from "./settings-resume";

const TAB_ITEMS = [
  { value: "resume", label: "Resume" },
  { value: "availability", label: "Availability" },
  { value: "communication", label: "Communication" },
  { value: "account", label: "Account" },
] as const;

export function SettingsTabsCard() {
  return (
    <div className="rounded-2xl border border-border bg-[#FAFAFA] p-6">
      <TabsPrimitive.Root defaultValue="resume">
        <TabsPrimitive.List className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {TAB_ITEMS.map((tab) => (
            <TabsPrimitive.Trigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "h-9 rounded-lg border px-4 text-sm font-medium transition-colors outline-none",
                "border-border bg-transparent text-muted-foreground",
                "data-[state=active]:border-[#EBEBEB] data-[state=active]:bg-[#EBEBEB] data-[state=active]:text-foreground",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              )}
            >
              {tab.label}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>

        {TAB_ITEMS.map((tab) => (
          <TabsPrimitive.Content
            key={tab.value}
            value={tab.value}
            className="mt-6 outline-none"
          >
            {tab.value === "resume" && <SettingsResume />}
            {tab.value === "availability" && <SettingsAvailability />}
            {tab.value === "communication" && <SettingsCommunication />}
            {tab.value === "account" && <SettingsAccount />}
          </TabsPrimitive.Content>
        ))}
      </TabsPrimitive.Root>
    </div>
  );
}

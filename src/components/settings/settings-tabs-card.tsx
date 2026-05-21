"use client";

import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const TAB_ITEMS = [
  { value: "resume", label: "Resume" },
  { value: "location", label: "Location & Work authorization" },
  { value: "availability", label: "Availability" },
  { value: "communication", label: "Communication" },
  { value: "account", label: "Account" },
] as const;

export function SettingsTabsCard() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <TabsPrimitive.Root defaultValue="resume">
        <TabsPrimitive.List className="flex flex-wrap gap-2">
          {TAB_ITEMS.map((tab) => (
            <TabsPrimitive.Trigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "h-9 rounded-lg border px-4 text-sm font-medium transition-colors outline-none",
                "border-border bg-white text-muted-foreground",
                "data-[state=active]:border-[#EBEBEB] data-[state=active]:bg-[#EBEBEB] data-[state=active]:text-foreground",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              )}
            >
              {tab.label}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>

        <TabsPrimitive.Content
          value="resume"
          className="mt-6 min-h-80 outline-none"
        />
        <TabsPrimitive.Content
          value="location"
          className="mt-6 min-h-80 outline-none"
        />
        <TabsPrimitive.Content
          value="availability"
          className="mt-6 min-h-80 outline-none"
        />
        <TabsPrimitive.Content
          value="communication"
          className="mt-6 min-h-80 outline-none"
        />
        <TabsPrimitive.Content
          value="account"
          className="mt-6 min-h-80 outline-none"
        />
      </TabsPrimitive.Root>
    </div>
  );
}

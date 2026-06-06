"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

import { EmployerAccount } from "./employer-account";
import { EmployerCompanyProfile } from "./employer-company-profile";
import { EmployerHiringPreferences } from "./employer-hiring-preferences";

const TAB_ITEMS = [
  { value: "company", label: "Company profile" },
  { value: "hiring", label: "Hiring preferences" },
  { value: "account", label: "Account" },
] as const;

export function EmployerSettingsTabsCard() {
  return (
    <div className="rounded-2xl border border-border bg-[#FAFAFA] p-6">
      <TabsPrimitive.Root defaultValue="company">
        <TabsPrimitive.List className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {TAB_ITEMS.map((tab) => (
            <TabsPrimitive.Trigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "cursor-pointer h-9 rounded-lg border px-4 text-sm font-medium transition-colors outline-none",
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
            {tab.value === "company" && <EmployerCompanyProfile />}
            {tab.value === "hiring" && <EmployerHiringPreferences />}
            {tab.value === "account" && <EmployerAccount />}
          </TabsPrimitive.Content>
        ))}
      </TabsPrimitive.Root>
    </div>
  );
}

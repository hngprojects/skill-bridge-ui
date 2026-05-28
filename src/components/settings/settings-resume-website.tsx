"use client";

import { Globe } from "lucide-react";
import { Input } from "@/components/ui/input";

type SettingsResumeWebsiteProps = {
  website: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export function SettingsResumeWebsite({
  website,
  onChange,
  onBlur,
}: SettingsResumeWebsiteProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        Personal website
      </label>
      <div className="relative flex items-center">
        <Input
          type="url"
          value={website}
          placeholder="Enter your website link"
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="pr-10"
        />
        <span className="absolute right-3 pointer-events-none text-muted-foreground">
          <Globe className="size-4" />
        </span>
      </div>
    </div>
  );
}

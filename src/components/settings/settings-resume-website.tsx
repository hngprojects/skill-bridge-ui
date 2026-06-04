"use client";

import { Globe } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTalentSettings, useUpdateTalentSettingsProfile } from "@/hooks/api";
import { personalWebsiteSchema } from "@/types/form-schema";

export function SettingsResumeWebsite() {
  const { data: settings } = useTalentSettings();
  const { mutate: updateProfile, isPending: isSaving } =
    useUpdateTalentSettingsProfile();

  const serverWebsite = settings?.profile.personal_website ?? "";
  const [localWebsite, setLocalWebsite] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const website = localWebsite ?? serverWebsite;
  const isDirty =
    localWebsite !== null && localWebsite.trim() !== serverWebsite.trim();

  function handleSave() {
    const trimmed = website.trim();
    if (!trimmed) {
      setError(null);
      setLocalWebsite(null);
      return;
    }
    const result = personalWebsiteSchema.safeParse(trimmed);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid URL");
      return;
    }
    setError(null);
    updateProfile(
      { personalWebsite: trimmed },
      { onSuccess: () => setLocalWebsite(null) },
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        Personal website
      </label>
      <div className="relative flex items-center">
        <Input
          type="url"
          value={website}
          placeholder="https://yourwebsite.com"
          onChange={(e) => {
            setLocalWebsite(e.target.value);
            setError(null);
          }}
          className={cn(
            isDirty ? "pr-20" : "pr-10",
            error && "border-destructive focus-visible:ring-destructive",
          )}
        />
        <span className="absolute right-2 flex items-center">
          {isDirty ? (
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className={cn(
                "h-7 cursor-pointer rounded-md px-3 text-xs font-medium",
                "bg-primary text-primary-foreground transition-colors",
                "hover:bg-primary/90",
                "disabled:cursor-not-allowed disabled:opacity-60",
              )}
            >
              {isSaving ? "Saving…" : "Save"}
            </button>
          ) : (
            <span className="pointer-events-none text-muted-foreground">
              <Globe className="size-4" />
            </span>
          )}
        </span>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

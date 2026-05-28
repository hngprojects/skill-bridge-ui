import { useState } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { useTalentSettings, useUpdateTalentSettingsProfile } from "@/hooks/api";

export function SettingsLinkedInField() {
  const { data: settings } = useTalentSettings();
  const { mutate: updateProfile, isPending: isSaving } =
    useUpdateTalentSettingsProfile();

  const serverValue = settings?.profile.linkedin_url ?? "";
  const [localValue, setLocalValue] = useState<string | null>(null);
  const value = localValue ?? serverValue;

  function handleSave() {
    if (!value.trim()) return;
    updateProfile(
      { linkedinUrl: value.trim() },
      { onSuccess: () => setLocalValue(null) },
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        Connect LinkedIn
      </label>
      <div className="relative flex items-center">
        <Input
          type="url"
          value={value}
          placeholder="Enter LinkedIn URL"
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleSave}
          className="pr-12"
        />
        <span className="absolute right-3 pointer-events-none">
          {isSaving ? (
            <span className="text-xs text-muted-foreground">Saving…</span>
          ) : (
            <Image
              src="/waitlist-icons/linkedin.svg"
              alt="LinkedIn"
              width={20}
              height={20}
            />
          )}
        </span>
      </div>
    </div>
  );
}

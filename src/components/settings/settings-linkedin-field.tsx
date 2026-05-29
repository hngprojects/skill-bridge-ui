import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useTalentSettings, useUpdateTalentSettingsProfile } from "@/hooks/api";
import { linkedinUrlSchema } from "@/types/form-schema";

export function SettingsLinkedInField() {
  const { data: settings } = useTalentSettings();
  const { mutate: updateProfile, isPending: isSaving } =
    useUpdateTalentSettingsProfile();

  const serverValue = settings?.profile.linkedin_url ?? "";
  const [localValue, setLocalValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const value = localValue ?? serverValue;
  const isDirty =
    localValue !== null && localValue.trim() !== serverValue.trim();

  function handleSave() {
    const trimmed = value.trim();
    if (!trimmed) {
      setError(null);
      setLocalValue(null);
      return;
    }
    const result = linkedinUrlSchema.safeParse(trimmed);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid LinkedIn URL");
      return;
    }
    setError(null);
    updateProfile(
      { linkedinUrl: trimmed },
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
          placeholder="https://linkedin.com/in/username"
          onChange={(e) => {
            setLocalValue(e.target.value);
            setError(null);
          }}
          className={`pr-12 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
        />
        <span className="absolute right-3">
          {isSaving ? (
            <span className="text-xs text-muted-foreground pointer-events-none">
              Saving…
            </span>
          ) : isDirty ? (
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center justify-center size-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Save LinkedIn URL"
            >
              <Check className="size-3" strokeWidth={2.5} />
            </button>
          ) : (
            <span className="pointer-events-none">
              <Image
                src="/waitlist-icons/linkedin.svg"
                alt="LinkedIn"
                width={20}
                height={20}
              />
            </span>
          )}
        </span>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

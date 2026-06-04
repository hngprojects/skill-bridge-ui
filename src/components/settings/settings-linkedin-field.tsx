import { useState } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
    // Blank is treated as "discard the in-flight edit" rather than a clear
    if (!trimmed) {
      setError(null);
      setLocalValue(null);
      return;
    }
    const result = linkedinUrlSchema.safeParse(trimmed);
    if (!result.success) {
      setError(
        result.error.issues[0]?.message ??
          "Enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/username)",
      );
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
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "linkedin-url-error" : undefined}
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
            <span className="pointer-events-none pr-1">
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
      {error && (
        <p
          id="linkedin-url-error"
          role="alert"
          className="text-xs text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}

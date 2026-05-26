import Image from "next/image";

import { Input } from "@/components/ui/input";

interface SettingsLinkedInFieldProps {
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function SettingsLinkedInField({
  value,
  onChange,
  onSave,
  isSaving,
}: SettingsLinkedInFieldProps) {
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
          onChange={(e) => onChange(e.target.value)}
          onBlur={onSave}
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

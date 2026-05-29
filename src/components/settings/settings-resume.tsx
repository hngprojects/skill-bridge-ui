"use client";

import { Check, Globe } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Pdf01Icon } from "@hugeicons/core-free-icons";
import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { useTalentSettings, useUpdateTalentSettingsProfile } from "@/hooks/api";
import { personalWebsiteSchema } from "@/types/form-schema";

const ACCEPTED_TYPES = ".doc,.docx,.pdf,.txt";

export function SettingsResume() {
  const { data: settings } = useTalentSettings();
  const { mutate: updateProfile } = useUpdateTalentSettingsProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const serverWebsite = settings?.profile.personal_website ?? "";
  const [localWebsite, setLocalWebsite] = useState<string | null>(null);
  const [websiteError, setWebsiteError] = useState<string | null>(null);
  const website = localWebsite ?? serverWebsite;
  const isWebsiteDirty =
    localWebsite !== null && localWebsite.trim() !== serverWebsite.trim();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (
      dropped &&
      ACCEPTED_TYPES.split(",").some((ext) =>
        dropped.name.toLowerCase().endsWith(ext),
      )
    ) {
      setFile(dropped);
    }
  };

  function handleSaveWebsite() {
    const trimmed = website.trim();
    if (!trimmed) {
      setWebsiteError(null);
      setLocalWebsite(null);
      return;
    }
    const result = personalWebsiteSchema.safeParse(trimmed);
    if (!result.success) {
      setWebsiteError(result.error.issues[0]?.message ?? "Invalid URL");
      return;
    }
    setWebsiteError(null);
    updateProfile(
      { personalWebsite: trimmed },
      { onSuccess: () => setLocalWebsite(null) },
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <p className="text-base font-semibold text-foreground">
          Upload your recent resume or CV
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Upload your most up-to-date resume
        </p>
        <p className="text-sm text-muted-foreground">
          File types: DOC, DOCX, PDF, TXT
        </p>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-12 cursor-pointer hover:bg-muted/40 transition-colors"
      >
        <HugeiconsIcon
          icon={Pdf01Icon}
          className="size-10 text-muted-foreground"
          strokeWidth={1.5}
        />
        <p className="text-sm text-foreground">
          {file ? file.name : "Upload new file"}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={handleFileChange}
      />

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
              setWebsiteError(null);
            }}
            className={`pr-10 ${websiteError ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          <span className="absolute right-3">
            {isWebsiteDirty ? (
              <button
                type="button"
                onClick={handleSaveWebsite}
                className="flex items-center justify-center size-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Save website URL"
              >
                <Check className="size-3" strokeWidth={2.5} />
              </button>
            ) : (
              <span className="pointer-events-none text-muted-foreground">
                <Globe className="size-4" />
              </span>
            )}
          </span>
        </div>
        {websiteError && (
          <p className="text-xs text-destructive">{websiteError}</p>
        )}
      </div>
    </div>
  );
}

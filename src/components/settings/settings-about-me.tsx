"use client";

import { UserRound } from "lucide-react";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { SettingsEditableField } from "./settings-editable-field";
import { SettingsLinkedInField } from "./settings-linkedin-field";
import { AvatarCropModal } from "./avatar-crop-modal";
import {
  useTalentSettings,
  useUploadAvatar,
  talentSettingsKeys,
} from "@/hooks/api";
import { appToast } from "@/lib/toast";
import Image from "next/image";

export function SettingsAboutMe() {
  const { data: settings } = useTalentSettings();
  const { mutate: uploadAvatar, isPending: uploading } = useUploadAvatar();
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropFile, setCropFile] = useState<File | null>(null);

  const user = settings?.user;
  const profile = settings?.profile;

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCropFile(file);
    e.target.value = "";
  }

  function handleCropApply(croppedFile: File) {
    setCropFile(null);
    uploadAvatar(croppedFile, {
      onSuccess: () =>
        void qc.invalidateQueries({ queryKey: talentSettingsKeys.detail() }),
      onError: () => {
        appToast.error("Failed to upload photo. Please try again.");
      },
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-[#FAFAFA] p-6">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">About me</h2>
        {profile?.profile_verified && (
          <Badge
            variant="outline"
            className="h-auto px-3 py-1.5 text-xs font-medium text-foreground rounded-md bg-[#EBEBEB] border-[#EBEBEB]"
          >
            Verified Talent
          </Badge>
        )}
      </div>

      <div className="flex flex-col items-center mb-8">
        <Avatar className="size-20 rounded-full bg-muted border border-border">
          {user?.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={`${user.full_name}'s profile picture`}
              width={80}
              height={80}
              className="size-full rounded-full object-cover"
            />
          ) : (
            <AvatarFallback className="rounded-full bg-muted">
              <UserRound className="size-10 text-muted-foreground/60" />
            </AvatarFallback>
          )}
        </Avatar>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
        <button
          type="button"
          disabled={uploading || !!cropFile}
          onClick={() => fileInputRef.current?.click()}
          className="mt-3 text-sm font-medium text-foreground underline underline-offset-2 hover:text-primary transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading…" : "Upload photo"}
        </button>
        <p className="mt-1 text-xs text-muted-foreground">
          Recommended size is 400 x 300
        </p>
      </div>

      <AvatarCropModal
        file={cropFile}
        onClose={() => setCropFile(null)}
        onApply={handleCropApply}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <SettingsEditableField
          label="Full name"
          value={user?.full_name ?? ""}
          placeholder="Your full name"
        />
        <SettingsEditableField
          label="Email"
          value={user?.email ?? ""}
          type="email"
          placeholder="Your email"
        />
        <SettingsEditableField
          label="Role"
          value={profile?.role_label ?? ""}
          placeholder="e.g. Frontend Developer"
        />
        <SettingsLinkedInField />
      </div>
    </div>
  );
}

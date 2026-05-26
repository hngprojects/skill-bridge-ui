"use client";

import { UserRound } from "lucide-react";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import { SettingsEditableField } from "./settings-editable-field";
import { SettingsLinkedInField } from "./settings-linkedin-field";
import {
  useMe,
  useUploadAvatar,
  authKeys,
  useSaveTalentOnboardingProfile,
} from "@/hooks/api";
import Image from "next/image";

interface SettingsAboutMeProps {
  initialFullName?: string;
  initialEmail?: string;
  initialRole?: string;
  isVerified?: boolean;
}

export function SettingsAboutMe({}: SettingsAboutMeProps) {
  const qc = useQueryClient();
  const { data: user } = useMe({ enabled: true });
  const { mutate: uploadAvatar, isPending: uploading } = useUploadAvatar();
  const { mutate: saveProfile, isPending: savingLinkedin } =
    useSaveTalentOnboardingProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fullName = `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim();
  const [linkedin, setLinkedin] = useState("");

  function handleSaveLinkedin() {
    if (!linkedin.trim()) return;
    saveProfile({ linkedinUrl: linkedin.trim() });
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadAvatar(file, {
      onSuccess: () => void qc.invalidateQueries({ queryKey: authKeys.me() }),
    });
    e.target.value = "";
  }

  const formatRole = (role?: string) => {
    if (!role) return "";
    return role
      .split("_")
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(" ");
  };

  return (
    <div className="rounded-2xl border border-border bg-[#FAFAFA] p-6">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">About me</h2>
        {user?.is_verified && (
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
              alt={`${fullName}'s profile picture`}
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
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="mt-3 text-sm font-medium text-foreground underline underline-offset-2 hover:text-primary transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading…" : "Upload photo"}
        </button>
        <p className="mt-1 text-xs text-muted-foreground">
          Recommended size is 400 x 300
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <SettingsEditableField
          label="Full name"
          value={fullName}
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
          value={formatRole(user?.track ?? "")}
          placeholder="e.g. Frontend Developer"
        />
        <SettingsLinkedInField
          value={linkedin}
          onChange={setLinkedin}
          onSave={handleSaveLinkedin}
          isSaving={savingLinkedin}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Bio</label>
        <Textarea
          value=""
          readOnly
          placeholder="Brief description about yourself"
          className="min-h-22 resize-none rounded-md border-border text-sm placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );
}

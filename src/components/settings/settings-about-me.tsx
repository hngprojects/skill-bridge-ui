"use client";

import { UserRound } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import { SettingsEditableField } from "./settings-editable-field";
import { SettingsLinkedInField } from "./settings-linkedin-field";

interface SettingsAboutMeProps {
  initialFullName?: string;
  initialEmail?: string;
  initialRole?: string;
  isVerified?: boolean;
}

export function SettingsAboutMe({
  initialFullName = "",
  initialEmail = "",
  initialRole = "",
  isVerified = false,
}: SettingsAboutMeProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [email, setEmail] = useState(initialEmail);
  const [role, setRole] = useState(initialRole);
  const [linkedin, setLinkedin] = useState("");
  const [bio, setBio] = useState("");

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">About me</h2>
        {isVerified && (
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
          <AvatarFallback className="rounded-full bg-muted">
            <UserRound className="size-10 text-muted-foreground/60" />
          </AvatarFallback>
        </Avatar>
        <button
          type="button"
          className="mt-3 text-sm font-medium text-foreground underline underline-offset-2 hover:text-primary transition-colors"
        >
          Upload photo
        </button>
        <p className="mt-1 text-xs text-muted-foreground">
          Recommended size is 400 x 300
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <SettingsEditableField
          label="Full name"
          value={fullName}
          onChange={setFullName}
          placeholder="Your full name"
        />
        <SettingsEditableField
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="Your email"
        />
        <SettingsEditableField
          label="Role"
          value={role}
          onChange={setRole}
          placeholder="e.g. Frontend Developer"
        />
        <SettingsLinkedInField value={linkedin} onChange={setLinkedin} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Bio</label>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Brief description about yourself"
          className="min-h-22 resize-none rounded-md border-border text-sm placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );
}

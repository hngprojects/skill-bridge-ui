"use client";

import { Pencil, UserRound } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const LINKEDIN_ICON = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect width="24" height="24" rx="4" fill="#0A66C2" />
    <path d="M7.5 9.5H5V19H7.5V9.5Z" fill="white" />
    <circle cx="6.25" cy="6.75" r="1.5" fill="white" />
    <path
      d="M19 19H16.5V14C16.5 12.9 15.9 12 14.75 12C13.6 12 13 12.9 13 14V19H10.5V9.5H13V10.8C13.5 9.9 14.6 9.2 16 9.2C17.9 9.2 19 10.5 19 13V19Z"
      fill="white"
    />
  </svg>
);

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}

function EditableField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: EditableFieldProps) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative flex items-center rounded-md border border-border bg-background focus-within:border-primary transition-colors">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          readOnly={!editing}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          className="w-full bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none pr-10 rounded-md"
        />
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={`Edit ${label}`}
        >
          <Pencil className="size-4" />
        </button>
      </div>
    </div>
  );
}

interface LinkedInFieldProps {
  value: string;
  onChange: (v: string) => void;
}

function LinkedInField({ value, onChange }: LinkedInFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        Connect LinkedIn
      </label>
      <div className="relative flex items-center rounded-md border border-border bg-background focus-within:border-primary transition-colors">
        <input
          type="url"
          value={value}
          placeholder="Enter LinkedIn URL"
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none pr-12 rounded-md"
        />
        <span className="absolute right-3 pointer-events-none">
          {LINKEDIN_ICON}
        </span>
      </div>
    </div>
  );
}

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
        <EditableField
          label="Full name"
          value={fullName}
          onChange={setFullName}
          placeholder="Your full name"
        />
        <EditableField
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="Your email"
        />
        <EditableField
          label="Role"
          value={role}
          onChange={setRole}
          placeholder="e.g. Frontend Developer"
        />
        <LinkedInField value={linkedin} onChange={setLinkedin} />
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

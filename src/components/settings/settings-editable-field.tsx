"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

interface SettingsEditableFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}

export function SettingsEditableField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: SettingsEditableFieldProps) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative flex items-center">
        <Input
          type={type}
          value={value}
          placeholder={placeholder}
          readOnly={!editing}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          className="pr-10"
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

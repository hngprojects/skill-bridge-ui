"use client";

import { Input } from "@/components/ui/input";

interface SettingsEditableFieldProps {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
}

export function SettingsEditableField({
  label,
  value,
  type = "text",
  placeholder,
}: SettingsEditableFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly
        className="cursor-default"
      />
    </div>
  );
}

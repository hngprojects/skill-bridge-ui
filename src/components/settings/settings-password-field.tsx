"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type SettingsPasswordFieldProps = {
  label: string;
  value: string;
  autoComplete: string;
  disabled: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function SettingsPasswordField({
  label,
  value,
  autoComplete,
  disabled,
  onChange,
}: SettingsPasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className="flex flex-col gap-2 text-xs text-muted-foreground">
      <span>{label}</span>
      <span className="relative">
        <input
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "h-9 w-full rounded-md border border-border bg-white px-3 pr-10",
            "text-sm font-medium text-foreground outline-none",
            "transition-colors focus:border-primary",
            "focus:ring-2 focus:ring-primary/20 disabled:opacity-60",
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          disabled={disabled}
          className="absolute inset-y-0 right-1 flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-60"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </span>
    </label>
  );
}

"use client";

import { FormEvent } from "react";

import { SettingsPasswordField } from "@/components/settings/settings-password-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

const PASSWORD_FIELDS = [
  ["currentPassword", "Current password", "current-password"],
  ["newPassword", "New password", "new-password"],
  ["confirmNewPassword", "Confirm new password", "off"],
] as const;

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

type SettingsChangePasswordFormProps = {
  passwordForm: PasswordForm;
  passwordError: string | null;
  passwordErrorId: string;
  isUpdating: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFieldChange: (
    field: keyof PasswordForm,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SettingsChangePasswordForm({
  passwordForm,
  passwordError,
  passwordErrorId,
  isUpdating,
  onSubmit,
  onFieldChange,
}: SettingsChangePasswordFormProps) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {PASSWORD_FIELDS.map(([field, label, autoComplete]) => (
        <SettingsPasswordField
          key={field}
          label={label}
          autoComplete={autoComplete}
          value={passwordForm[field]}
          disabled={isUpdating}
          aria-describedby={passwordError ? passwordErrorId : undefined}
          onChange={onFieldChange(field)}
        />
      ))}

      {passwordError && (
        <p
          id={passwordErrorId}
          role="alert"
          aria-live="polite"
          className="text-xs leading-5 text-destructive"
        >
          {passwordError}
        </p>
      )}

      <DialogFooter className="grid grid-cols-2 gap-3 sm:grid-cols-2">
        <DialogClose asChild>
          <Button
            type="button"
            variant="secondary"
            className="h-9 rounded-md bg-[#D9D9D9] text-xs text-foreground hover:bg-[#D9D9D9]/80"
            disabled={isUpdating}
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="h-9 rounded-md bg-primary text-xs text-primary-foreground hover:bg-primary/90"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update password"}
        </Button>
      </DialogFooter>
    </form>
  );
}

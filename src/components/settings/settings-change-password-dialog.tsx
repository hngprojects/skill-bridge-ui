"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { SettingsAccountActionLink } from "@/components/settings/settings-account-action-link";
import { SettingsChangePasswordForm } from "@/components/settings/settings-change-password-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChangePasswordDialog } from "@/hooks/use-change-password-dialog";

export function SettingsChangePasswordDialog() {
  const {
    isOpen,
    isUpdating,
    passwordForm,
    passwordError,
    passwordErrorId,
    handleOpenChange,
    handleChangePassword,
    updatePasswordField,
  } = useChangePasswordDialog();

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <SettingsAccountActionLink
          disabled={isUpdating}
          icon={<HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />}
        >
          Change password
        </SettingsAccountActionLink>
      </DialogTrigger>
      <DialogContent className="max-w-[390px] gap-5 rounded-2xl p-6">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-base font-bold">
            Change password
          </DialogTitle>
          <DialogDescription className="max-w-67 text-xs leading-5">
            Enter your current password and choose a new one.
          </DialogDescription>
        </DialogHeader>
        <SettingsChangePasswordForm
          passwordForm={passwordForm}
          passwordError={passwordError}
          passwordErrorId={passwordErrorId}
          isUpdating={isUpdating}
          onSubmit={handleChangePassword}
          onFieldChange={updatePasswordField}
        />
      </DialogContent>
    </Dialog>
  );
}

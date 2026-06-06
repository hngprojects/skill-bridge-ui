"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";

import { PasswordChangeLogoutWarning } from "@/components/settings/password-change-logout-warning";
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
import { useChangeEmployerPassword } from "@/hooks/api";
import { authFailureMessage } from "@/lib/api";
import { clearPersistedSessionState } from "@/lib/client-session-cleanup";
import { appToast } from "@/lib/toast";

const initialPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export function EmployerChangePasswordDialog() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const changePasswordMutation = useChangeEmployerPassword();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const changeInFlightRef = useRef(false);
  const passwordErrorId = useId();
  const isUpdating = changePasswordMutation.isPending;

  const updatePasswordField =
    (field: keyof typeof initialPasswordForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordError(null);
      setPasswordForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const redirectToLogin = async () => {
    queryClient.clear();
    clearPersistedSessionState();
    try {
      const result = await signOut({ callbackUrl: "/login", redirect: false });
      router.replace(result.url ?? "/login");
    } catch (error) {
      console.error("Password change redirect failed", error);
      router.replace("/login");
    } finally {
      changeInFlightRef.current = false;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (changeInFlightRef.current) return;

    const validationError = !passwordForm.currentPassword
      ? "Enter your current password."
      : passwordForm.newPassword.length < 8
        ? "New password must be at least 8 characters."
        : passwordForm.newPassword !== passwordForm.confirmNewPassword
          ? "New passwords do not match."
          : passwordForm.currentPassword === passwordForm.newPassword
            ? "New password must be different from your current password."
            : null;

    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    setShowLogoutWarning(true);
  };

  const handleConfirm = async () => {
    if (changeInFlightRef.current) return;
    setShowLogoutWarning(false);

    try {
      changeInFlightRef.current = true;
      await changePasswordMutation.mutateAsync(passwordForm);
    } catch (error) {
      changeInFlightRef.current = false;
      setPasswordError(authFailureMessage(error));
      return;
    }

    appToast.success("Password changed. Please sign in again.");
    await redirectToLogin();
  };

  const handleOpenChange = (open: boolean) => {
    if (isUpdating) return;
    setIsOpen(open);
    if (!open) {
      setPasswordForm(initialPasswordForm);
      setPasswordError(null);
      setShowLogoutWarning(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <SettingsAccountActionLink
            disabled={isUpdating}
            icon={<HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />}
          >
            Change password
          </SettingsAccountActionLink>
        </DialogTrigger>
        <DialogContent className="max-w-97.5 gap-5 rounded-2xl p-6">
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
            onSubmit={handleSubmit}
            onFieldChange={updatePasswordField}
          />
        </DialogContent>
      </Dialog>

      <PasswordChangeLogoutWarning
        open={showLogoutWarning}
        isUpdating={isUpdating}
        onConfirm={handleConfirm}
        onCancel={() => setShowLogoutWarning(false)}
      />
    </>
  );
}

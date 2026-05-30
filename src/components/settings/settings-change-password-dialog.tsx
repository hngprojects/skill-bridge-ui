"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useId, useRef, useState } from "react";

import { SettingsAccountActionLink } from "@/components/settings/settings-account-action-link";
import { SettingsPasswordField } from "@/components/settings/settings-password-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChangePassword } from "@/hooks/api/use-auth";
import { authFailureMessage } from "@/lib/api";
import { clearPersistedSessionState } from "@/lib/client-session-cleanup";
import { appToast } from "@/lib/toast";

const initialPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export function SettingsChangePasswordDialog() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const changePasswordMutation = useChangePassword();
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

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
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

    try {
      changeInFlightRef.current = true;
      await changePasswordMutation.mutateAsync(passwordForm);
    } catch (error) {
      changeInFlightRef.current = false;
      setPasswordError(authFailureMessage(error));
      return;
    }

    // Show logout warning before redirecting
    setShowLogoutWarning(true);
  };

  const handleConfirmLogout = async () => {
    appToast.success("Password changed. Please sign in again.");
    await redirectToLogin();
  };

  const handleCancelLogout = () => {
    setShowLogoutWarning(false);
    changeInFlightRef.current = false;
    setPasswordForm(initialPasswordForm);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (isUpdating) return;
          setIsOpen(open);
          if (!open) {
            setPasswordForm(initialPasswordForm);
            setPasswordError(null);
          }
        }}
      >
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

          <form className="flex flex-col gap-4" onSubmit={handleChangePassword}>
            {(
              [
                ["currentPassword", "Current password", "current-password"],
                ["newPassword", "New password", "new-password"],
                ["confirmNewPassword", "Confirm new password", "new-password"],
              ] as const
            ).map(([field, label, autoComplete]) => (
              <SettingsPasswordField
                key={field}
                label={label}
                autoComplete={autoComplete}
                value={passwordForm[field]}
                disabled={isUpdating}
                aria-describedby={passwordError ? passwordErrorId : undefined}
                onChange={updatePasswordField(field)}
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
        </DialogContent>
      </Dialog>

      {/* Logout warning confirmation dialog */}
      <Dialog
        open={showLogoutWarning}
        onOpenChange={(open) => {
          if (!open) handleCancelLogout();
        }}
      >
        <DialogContent className="max-w-[390px] gap-5 rounded-2xl p-6">
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-base font-bold">
              You&apos;ll be signed out
            </DialogTitle>
            <DialogDescription className="text-xs leading-5">
              Your password has been updated successfully. For security, you
              will be signed out and need to log in again with your new
              password.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              className="h-9 rounded-md bg-[#D9D9D9] text-xs text-foreground hover:bg-[#D9D9D9]/80"
              onClick={handleCancelLogout}
            >
              Stay signed in
            </Button>
            <Button
              type="button"
              className="h-9 rounded-md bg-primary text-xs text-primary-foreground hover:bg-primary/90"
              onClick={handleConfirmLogout}
            >
              Sign out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

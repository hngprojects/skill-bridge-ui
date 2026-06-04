"use client";

import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";

import { useChangePassword } from "@/hooks/api/use-auth";
import { authFailureMessage } from "@/lib/api";
import { clearPersistedSessionState } from "@/lib/client-session-cleanup";
import { appToast } from "@/lib/toast";

const initialPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export function useChangePasswordDialog() {
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

  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
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

    // Show logout warning before proceeding
    setShowLogoutWarning(true);
  };

  const handleConfirmPasswordChange = async () => {
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

  const handleCancelLogoutWarning = () => {
    setShowLogoutWarning(false);
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

  return {
    isOpen,
    isUpdating,
    showLogoutWarning,
    passwordForm,
    passwordError,
    passwordErrorId,
    handleOpenChange,
    handleChangePassword,
    handleConfirmPasswordChange,
    handleCancelLogoutWarning,
    updatePasswordField,
  };
}

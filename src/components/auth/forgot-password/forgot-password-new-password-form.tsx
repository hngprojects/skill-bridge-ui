"use client";

import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { ForgotPasswordStepImage } from "./forgot-password-step-image";
import { cn } from "@/lib/utils";

type ForgotPasswordNewPasswordFormProps = {
  password: string;
  confirmPassword: string;
  passwordError: string;
  confirmPasswordError: string;
  isSubmitting?: boolean;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (password: string) => void;
  onContinue: () => void;
};

function ForgotPasswordNewPasswordForm({
  password,
  confirmPassword,
  passwordError,
  confirmPasswordError,
  isSubmitting = false,
  onPasswordChange,
  onConfirmPasswordChange,
  onContinue,
}: ForgotPasswordNewPasswordFormProps) {
  const handleContinue = () => {
    if (isSubmitting) return;
    onContinue();
  };

  const confirmPasswordSuccess =
    !passwordError &&
    !confirmPasswordError &&
    password.length >= 8 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleContinue();
      }}
      noValidate
      className="flex w-full flex-col items-center"
    >
      <ForgotPasswordStepImage
        src="/forgot-password-images/forgot-password-secure.svg"
        alt="Secure password reset illustration"
      />

      <h1 className="section-h2 font-bold text-center text-foreground">
        Reset your password
      </h1>

      <p className="body mt-4 max-w-xs text-center text-muted-foreground">
        Enter a new password below to change your password
      </p>

      <div className="mt-8 flex w-full flex-col gap-4">
        <FormInput
          label="Create password"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          error={passwordError}
        />

        <FormInput
          label="Confirm password"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(event) => onConfirmPasswordChange(event.target.value)}
          description={
            passwordError || confirmPasswordError
              ? undefined
              : "Password must be at least 8 characters and include uppercase, lowercase, and a number"
          }
          error={confirmPasswordError}
          success={confirmPasswordSuccess}
        />

        <Button
          type="button"
          onClick={handleContinue}
          disabled={isSubmitting}
          className={cn(
            "h-12 min-h-12 w-full cursor-pointer rounded-lg bg-primary-900",
            "text-xs font-semibold text-primary-foreground",
            "hover:bg-primary-900/90 disabled:cursor-not-allowed",
            "disabled:pointer-events-auto sm:text-sm",
          )}
        >
          {isSubmitting ? "Changing..." : "Continue"}
        </Button>
      </div>
    </form>
  );
}

export { ForgotPasswordNewPasswordForm };
export type { ForgotPasswordNewPasswordFormProps };

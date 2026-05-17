"use client";

import Link from "next/link";

import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { ForgotPasswordStepImage } from "./forgot-password-step-image";

type ForgotPasswordEmailFormProps = {
  email: string;
  emailError: string;
  isSubmitting?: boolean;
  onEmailChange: (email: string) => void;
  onContinue: () => void;
};

function ForgotPasswordEmailForm({
  email,
  emailError,
  isSubmitting = false,
  onEmailChange,
  onContinue,
}: ForgotPasswordEmailFormProps) {
  return (
    <>
      <ForgotPasswordStepImage
        src="/forgot-password-images/forgot-password-reset.svg"
        alt="Password reset illustration"
      />

      <h1 className="section-h2 font-bold! text-center text-foreground">
        Forgot password?
      </h1>

      <p className="body mt-4 max-w-xs text-center text-muted-foreground">
        Enter the email address linked to your account
      </p>

      <div className="mt-8 flex w-full flex-col gap-4">
        <FormInput
          label="Email"
          required
          type="email"
          validateEmail
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          error={emailError}
        />

        <Button
          type="button"
          onClick={onContinue}
          disabled={isSubmitting}
          className="bg-primary-900 text-primary-foreground hover:bg-primary-900/90 h-12 min-h-12 w-full rounded-lg text-xs font-semibold sm:text-sm"
        >
          {isSubmitting ? "Sending..." : "Continue"}
        </Button>

        <Button
          asChild
          type="button"
          className="h-12 min-h-12 w-full rounded-lg bg-[#D9D9D9] text-xs font-semibold text-[#03040D] hover:bg-[#D9D9D9]/80 sm:text-sm"
        >
          <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    </>
  );
}

export { ForgotPasswordEmailForm };
export type { ForgotPasswordEmailFormProps };

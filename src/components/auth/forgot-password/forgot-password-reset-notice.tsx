"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ForgotPasswordStepImage } from "./forgot-password-step-image";

type ForgotPasswordResetNoticeProps = {
  email: string;
  onContinue: () => void;
};

function ForgotPasswordResetNotice({
  email,
  onContinue,
}: ForgotPasswordResetNoticeProps) {
  const handleContinue = () => {
    onContinue();
  };

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

      <h1 className="section-h2 font-bold! text-center text-foreground">
        Reset your password
      </h1>

      <p className="body mt-4 text-center text-muted-foreground">
        Click {`"Continue"`} to reset your password
        {email ? (
          <>
            {" "}
            for <span className="text-foreground font-bold">{email}</span>
          </>
        ) : null}
        .
      </p>

      <div className="mt-8 w-full">
        <Button
          type="button"
          onClick={handleContinue}
          className="h-12 min-h-12 w-full cursor-pointer rounded-lg bg-primary-900 text-xs font-semibold text-primary-foreground hover:bg-primary-900/90 sm:text-sm"
        >
          Continue
        </Button>

        <Button
          asChild
          type="button"
          className="mt-3 h-12 min-h-12 w-full rounded-lg bg-[#D9D9D9] text-xs font-semibold text-[#03040D] hover:bg-[#D9D9D9]/80 sm:text-sm"
        >
          <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    </form>
  );
}

export { ForgotPasswordResetNotice };
export type { ForgotPasswordResetNoticeProps };

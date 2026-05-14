"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ForgotPasswordStepImage } from "./forgot-password-step-image";

type ForgotPasswordOtpFormProps = {
  email: string;
  otp: string;
  otpError: string;
  secondsRemaining: number;
  canResend: boolean;
  isSubmitting?: boolean;
  isResending?: boolean;
  onOtpChange: (otp: string) => void;
  onContinue: () => void;
  onResend: () => void;
};

function ForgotPasswordOtpForm({
  email,
  otp,
  otpError,
  secondsRemaining,
  canResend,
  isSubmitting = false,
  isResending = false,
  onOtpChange,
  onContinue,
  onResend,
}: ForgotPasswordOtpFormProps) {
  const countdownMinutes = Math.floor(secondsRemaining / 60);
  const countdownSeconds = String(secondsRemaining % 60).padStart(2, "0");
  const countdownText = `${countdownMinutes}:${countdownSeconds}`;

  return (
    <>
      <ForgotPasswordStepImage
        src="/forgot-password-images/forgot-password-sent.svg"
        alt="Reset code sent illustration"
      />

      <h1 className="text-center font-sans text-[28px] leading-[1.15] font-bold tracking-normal text-foreground">
        Check your Inbox
      </h1>

      <p className="mt-1 max-w-[280px] text-center font-sans text-[13px] leading-5 font-normal tracking-normal text-[#4B4F55]">
        Enter the verification code we just sent to
        {email ? (
          <>
            <br />
            <span className="text-foreground">{email}</span>
          </>
        ) : null}
      </p>

      <div className="mt-12 flex w-full max-w-[392px] flex-col items-center">
        <label htmlFor="forgot-password-code" className="sr-only">
          Verification code
        </label>
        <input
          id="forgot-password-code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="Enter 6-digits code"
          value={otp}
          onChange={(event) =>
            onOtpChange(event.target.value.replace(/\D/g, "").slice(0, 6))
          }
          aria-invalid={Boolean(otpError)}
          aria-describedby={otpError ? "forgot-password-code-error" : undefined}
          className={cn(
            "h-[34px] w-full rounded-[5px] border border-[#D9D9D9]",
            "bg-white px-3 font-sans text-sm leading-none tracking-normal",
            "text-foreground outline-none transition-colors",
            "placeholder:text-[#8C8C8C] focus:border-[#0A171F]",
            "focus:ring-2 focus:ring-[#0A171F]/10 aria-invalid:border-error",
          )}
        />
        {otpError ? (
          <p
            id="forgot-password-code-error"
            className="mt-1 w-full text-left font-sans text-xs text-error"
            role="alert"
          >
            {otpError}
          </p>
        ) : null}

        <p className="mt-3 text-center font-sans text-[12px] leading-4 tracking-normal text-[#4B4F55]">
          {secondsRemaining > 0
            ? `Code expires in ${countdownText}`
            : "Your code has expired, please request a new one."}
        </p>

        <p className="mt-4 text-center font-sans text-[12px] leading-4 tracking-normal text-[#4B4F55]">
          Didn&apos;t receive a code?{" "}
          <button
            type="button"
            disabled={!canResend || isResending}
            className="font-semibold text-foreground underline underline-offset-2 hover:opacity-80 disabled:cursor-wait disabled:opacity-60"
            onClick={onResend}
          >
            {isResending ? "Sending..." : "Send code again"}
          </button>
        </p>

        <Button
          type="button"
          onClick={onContinue}
          disabled={otp.length !== 6 || isSubmitting}
          className="mt-8 h-8 min-h-8 w-full rounded-[5px] bg-[#03040D] text-sm font-semibold text-white hover:bg-[#03040D]/90 disabled:bg-[#03040D]/40 disabled:opacity-100"
        >
          {isSubmitting ? "Checking..." : "Continue"}
        </Button>
      </div>
    </>
  );
}

export { ForgotPasswordOtpForm };
export type { ForgotPasswordOtpFormProps };

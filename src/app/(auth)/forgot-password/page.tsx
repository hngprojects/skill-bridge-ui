"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  ForgotPasswordEmailForm,
  ForgotPasswordNewPasswordForm,
  ForgotPasswordOtpForm,
  ForgotPasswordResetNotice,
  ForgotPasswordSuccessState,
} from "@/components/auth/forgot-password";
import { AuthShell } from "@/components/custom/auth-shell";

const OTP_EXPIRY_SECONDS = 5 * 60;
const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const NUMBER_REGEX = /[0-9]/;

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email")?.trim() ?? "";
  const [step, setStep] = useState<
    "email" | "intro" | "code" | "password" | "success"
  >("email");
  const [resetEmail, setResetEmail] = useState(initialEmail);
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [rootError, setRootError] = useState("");
  const [resendHint, setResendHint] = useState("");
  const [otpExpiresAt, setOtpExpiresAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [otpAttemptsRemaining, setOtpAttemptsRemaining] = useState(3);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const otpSecondsRemaining = useMemo(() => {
    if (!otpExpiresAt) return 0;
    return Math.max(0, Math.ceil((otpExpiresAt - now) / 1000));
  }, [now, otpExpiresAt]);

  const otpExpired = step === "code" && otpSecondsRemaining === 0;
  const canResendCode = step === "code" && otpExpired && !isSendingCode;
  const maxOtpAttemptsReached = otpAttemptsRemaining <= 0;

  useEffect(() => {
    if (step !== "code" || !otpExpiresAt) return;

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [step, otpExpiresAt]);

  const startOtpCountdown = () => {
    setNow(Date.now());
    setOtpExpiresAt(Date.now() + OTP_EXPIRY_SECONDS * 1000);
    setOtpAttemptsRemaining(3);
  };

  const validateEmail = async () => {
    const trimmedEmail = resetEmail.trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    setRootError("");
    setResendHint("");

    if (!trimmedEmail) {
      setEmailError("Email is required.");
      return;
    }

    if (!emailIsValid) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setResetEmail(trimmedEmail);
    setEmailError("");
    setOtp("");
    setOtpError("");

    setIsSendingCode(true);
    window.setTimeout(() => {
      setIsSendingCode(false);
      setStep("intro");
    }, 400);
  };

  const validateOtp = async () => {
    setRootError("");
    setResendHint("");

    if (maxOtpAttemptsReached) {
      setOtpError(
        "You have exceeded the maximum attempts, request a new code.",
      );
      return;
    }

    if (otpExpired) {
      setOtpError("Your code has expired, please request a new one.");
      return;
    }

    if (otp.length !== 6) {
      setOtpError("Enter the complete 6-digit code.");
      return;
    }

    setOtpError("");
    setStep("password");
  };

  const validatePasswords = async () => {
    setRootError("");
    setResendHint("");
    const nextPasswordError =
      password.length < 8
        ? "Password must be at least 8 characters"
        : !UPPERCASE_REGEX.test(password)
          ? "Password must include at least one uppercase letter"
          : !LOWERCASE_REGEX.test(password)
            ? "Password must include at least one lowercase letter"
            : !NUMBER_REGEX.test(password)
              ? "Password must include at least one number"
              : "";
    const nextConfirmPasswordError =
      confirmPassword !== password ? "Passwords do not match" : "";

    setPasswordError(nextPasswordError);
    setConfirmPasswordError(nextConfirmPasswordError);

    if (!nextPasswordError && !nextConfirmPasswordError) {
      setIsResettingPassword(true);
      window.setTimeout(() => {
        setIsResettingPassword(false);
        setStep("success");
      }, 400);
    }
  };

  const resendCode = async () => {
    const trimmedEmail = resetEmail.trim();
    if (!trimmedEmail || (!canResendCode && !maxOtpAttemptsReached)) return;

    setRootError("");
    setResendHint("");

    setIsSendingCode(true);
    window.setTimeout(() => {
      setIsSendingCode(false);
      setOtp("");
      setOtpError("");
      startOtpCountdown();
      setResendHint("A new code was sent.");
    }, 400);
  };

  const showOtpStep = () => {
    setRootError("");
    setResendHint("");
    setOtpError("");
    startOtpCountdown();
    setStep("code");
  };

  return (
    <AuthShell
      className="[&_header]:h-[54px] [&_header]:px-9 [&_header_img]:h-7"
      mainClassName="justify-start px-4 pt-7 sm:pt-7 lg:pt-7"
      headerTrailing={
        <div className="flex flex-col items-end sm:flex-row sm:items-center sm:gap-1 body-2 font-light text-muted-foreground text-right">
          <span>Are you looking for Talents?</span>
          <Link
            href="/signup?user=employer"
            className="font-normal text-foreground underline decoration-foreground underline-offset-4 hover:opacity-80 transition-all"
          >
            Click here
          </Link>
        </div>
      }
    >
      <div className="mx-auto flex w-full min-w-0 max-w-md flex-col items-center px-0">
        {rootError ? (
          <p className="mb-4 w-full rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {rootError}
          </p>
        ) : null}
        {resendHint ? (
          <p className="mb-4 w-full rounded-lg border border-muted bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
            {resendHint}
          </p>
        ) : null}
        {step === "email" ? (
          <ForgotPasswordEmailForm
            email={resetEmail}
            emailError={emailError}
            isSubmitting={isSendingCode}
            onEmailChange={(email) => {
              setResetEmail(email);
              setEmailError("");
              setRootError("");
              setResendHint("");
            }}
            onContinue={() => void validateEmail()}
          />
        ) : step === "success" ? (
          <ForgotPasswordSuccessState />
        ) : step === "code" ? (
          <ForgotPasswordOtpForm
            email={resetEmail}
            otp={otp}
            otpError={otpError}
            secondsRemaining={otpSecondsRemaining}
            canResend={canResendCode || maxOtpAttemptsReached}
            isSubmitting={false}
            onOtpChange={(nextOtp) => {
              setOtp(nextOtp);
              setOtpError("");
              setRootError("");
              setResendHint("");
            }}
            onContinue={() => void validateOtp()}
            onResend={() => void resendCode()}
            isResending={isSendingCode}
          />
        ) : step === "password" ? (
          <ForgotPasswordNewPasswordForm
            password={password}
            confirmPassword={confirmPassword}
            passwordError={passwordError}
            confirmPasswordError={confirmPasswordError}
            onPasswordChange={(nextPassword) => {
              setPassword(nextPassword);
              setPasswordError("");
              setConfirmPasswordError("");
              setRootError("");
              setResendHint("");
            }}
            onConfirmPasswordChange={(nextPassword) => {
              setConfirmPassword(nextPassword);
              setConfirmPasswordError("");
              setRootError("");
              setResendHint("");
            }}
            onContinue={() => void validatePasswords()}
            isSubmitting={isResettingPassword}
          />
        ) : (
          <ForgotPasswordResetNotice
            email={resetEmail}
            onContinue={showOtpStep}
          />
        )}
      </div>
    </AuthShell>
  );
}

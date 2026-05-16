"use client";

import { useEffect, useMemo, useState } from "react";

import {
  useForgotPassword,
  useResetPassword,
  useVerifyPasswordResetOtp,
} from "@/hooks/api/use-auth";
import { authFailureMessage } from "@/lib/api";

const OTP_EXPIRY_SECONDS = 5 * 60;
const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const NUMBER_REGEX = /[0-9]/;

type ForgotPasswordStep = "email" | "intro" | "code" | "password" | "success";

function useForgotPasswordFlow(initialEmail = "") {
  const [step, setStep] = useState<ForgotPasswordStep>("email");
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

  const { mutateAsync: requestPasswordReset, isPending: isSendingCode } =
    useForgotPassword();
  const { mutateAsync: verifyResetOtp, isPending: isVerifyingOtp } =
    useVerifyPasswordResetOtp();
  const { mutateAsync: resetPassword, isPending: isResettingPassword } =
    useResetPassword();

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

  const clearMessages = () => {
    setRootError("");
    setResendHint("");
  };

  const startOtpCountdown = () => {
    setNow(Date.now());
    setOtpExpiresAt(Date.now() + OTP_EXPIRY_SECONDS * 1000);
    setOtpAttemptsRemaining(3);
  };

  const validateEmail = async () => {
    const trimmedEmail = resetEmail.trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    clearMessages();

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

    try {
      await requestPasswordReset({ email: trimmedEmail });
      setStep("intro");
    } catch (error) {
      setRootError(authFailureMessage(error));
    }
  };

  const validateOtp = async () => {
    clearMessages();

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

    try {
      await verifyResetOtp({
        email: resetEmail.trim(),
        otp,
      });
      setOtpError("");
      setStep("password");
    } catch (error) {
      setOtpAttemptsRemaining((remaining) => Math.max(0, remaining - 1));
      setOtpError(authFailureMessage(error));
    }
  };

  const validatePasswords = async () => {
    clearMessages();
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

    if (nextPasswordError || nextConfirmPasswordError) return;

    try {
      await resetPassword({
        email: resetEmail.trim(),
        otp,
        password,
        confirmPassword,
      });
      setStep("success");
    } catch (error) {
      setRootError(authFailureMessage(error));
    }
  };

  const resendCode = async () => {
    const trimmedEmail = resetEmail.trim();
    if (!trimmedEmail || (!canResendCode && !maxOtpAttemptsReached)) return;

    clearMessages();

    try {
      await requestPasswordReset({ email: trimmedEmail });
      setOtp("");
      setOtpError("");
      startOtpCountdown();
      setResendHint("A new code was sent.");
    } catch (error) {
      setRootError(authFailureMessage(error));
    }
  };

  const showOtpStep = () => {
    clearMessages();
    setOtpError("");
    startOtpCountdown();
    setStep("code");
  };

  return {
    step,
    resetEmail,
    emailError,
    otp,
    otpError,
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    rootError,
    resendHint,
    otpSecondsRemaining,
    canResendCode,
    maxOtpAttemptsReached,
    isSendingCode,
    isVerifyingOtp,
    isResettingPassword,
    setResetEmail,
    setEmailError,
    setOtp,
    setOtpError,
    setPassword,
    setConfirmPassword,
    setPasswordError,
    setConfirmPasswordError,
    clearMessages,
    validateEmail,
    validateOtp,
    validatePasswords,
    resendCode,
    showOtpStep,
  };
}

export { useForgotPasswordFlow };
export type { ForgotPasswordStep };

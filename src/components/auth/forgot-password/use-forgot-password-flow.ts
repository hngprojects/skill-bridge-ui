"use client";

import { useEffect, useMemo, useState } from "react";

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

    setIsSendingCode(true);
    window.setTimeout(() => {
      setIsSendingCode(false);
      setStep("intro");
    }, 400);
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

    setOtpError("");
    setStep("password");
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

    clearMessages();

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

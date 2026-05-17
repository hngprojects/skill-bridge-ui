"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { appToast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { getMe } from "@/actions/auth";
import {
  postAuthRedirectForUser,
  signInWithVerifiedUser,
} from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { useResendVerification, useVerifyEmail } from "@/hooks/api/use-auth";
import { authFailureMessage } from "@/lib/api";
import { useSignupFlowStore } from "@/stores/signup-flow-store";
import {
  emailVerificationCodeSchema,
  type EmailVerificationCodeValues,
} from "@/types/form-schema";

const RESEND_SECONDS = 300;

function formatCountdown(secs: number) {
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function startInterval(
  intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>,
  setSecondsLeft: React.Dispatch<React.SetStateAction<number>>,
) {
  if (intervalRef.current) clearInterval(intervalRef.current);
  intervalRef.current = setInterval(() => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        clearInterval(intervalRef.current!);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
}

function TalentVerifyEmailForm() {
  const router = useRouter();
  const talentSignup = useSignupFlowStore((s) => s.talentSignup);
  const clearTalentSignup = useSignupFlowStore((s) => s.clearTalentSignup);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [codeValue, setCodeValue] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoResendTriggeredRef = useRef(false);

  const { mutateAsync: resendVerification, isPending: resending } =
    useResendVerification();
  const { mutateAsync: verifyEmail, isPending: verifying } = useVerifyEmail();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EmailVerificationCodeValues>({
    resolver: zodResolver(emailVerificationCodeSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    startInterval(intervalRef, setSecondsLeft);
    const currentInterval = intervalRef;
    return () => {
      if (currentInterval.current) clearInterval(currentInterval.current);
    };
  }, []);

  const onSubmit = async (values: EmailVerificationCodeValues) => {
    const email = talentSignup?.email;
    if (!email) return;

    try {
      const verified = await verifyEmail({
        email,
        otp: values.code,
      });
      let user = verified.user;
      try {
        user = await getMe();
      } catch {
        user = verified.user;
      }

      const signResult = await signInWithVerifiedUser(user);

      if (signResult?.error) {
        appToast.error(
          "Your email was verified but we couldn't start your session. Try signing in.",
        );
        return;
      }

      clearTalentSignup();
      router.push(postAuthRedirectForUser(user));
      router.refresh();
    } catch (e) {
      appToast.error(authFailureMessage(e));
    }
  };

  const onResend = useCallback(async () => {
    const email = talentSignup?.email;
    if (!email) return;

    try {
      await resendVerification({ email });
      appToast.success("If that email is registered, a new code was sent.");
      setSecondsLeft(RESEND_SECONDS);
      startInterval(intervalRef, setSecondsLeft);
    } catch (e) {
      appToast.error(authFailureMessage(e));
    }
  }, [talentSignup?.email, resendVerification]);

  useEffect(() => {
    if (
      new URLSearchParams(window.location.search).get("autoResend") !== "1" ||
      !talentSignup?.email ||
      autoResendTriggeredRef.current
    ) {
      return;
    }
    autoResendTriggeredRef.current = true;
    void onResend();
  }, [talentSignup?.email, onResend]);

  const isCodeComplete = codeValue.length === 6;

  if (!talentSignup?.email) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        <Link
          href="/signup"
          className="font-semibold text-foreground underline underline-offset-4 hover:opacity-80"
        >
          Go back to sign up
        </Link>{" "}
        to continue.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full min-w-0 flex-col gap-4 font-sans"
    >
      <FormInput
        {...register("code")}
        label="Verification code"
        type="text"
        placeholder="Enter 6-digit code"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        error={errors.code?.message}
        value={codeValue}
        onChange={(e) => {
          const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 6);
          setCodeValue(digitsOnly);
          setValue("code", digitsOnly, { shouldValidate: false });
        }}
      />

      {secondsLeft > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Resend code in{" "}
          <span className="font-semibold text-google-red">
            {formatCountdown(secondsLeft)}
          </span>
        </p>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Didn&apos;t receive a code?{" "}
        <button
          type="button"
          disabled={secondsLeft > 0 || resending}
          onClick={() => void onResend()}
          className="font-semibold text-foreground underline underline-offset-4 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {resending ? "Sending..." : "Send code again"}
        </button>
      </p>

      <Button
        type="submit"
        disabled={isSubmitting || verifying || !isCodeComplete}
        className="h-12 min-h-12 w-full rounded-lg text-sm font-semibold"
      >
        {isSubmitting || verifying ? "Verifying..." : "Verify Email"}
      </Button>
    </form>
  );
}

export { TalentVerifyEmailForm };

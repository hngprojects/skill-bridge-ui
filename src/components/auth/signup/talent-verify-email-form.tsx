"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithCredentials } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { useResendVerification, useVerifyEmail } from "@/hooks/api/use-auth";
import { authFailureMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
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

function displayName(user: {
  email: string;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  fullname?: string;
}) {
  return (
    user.fullname ||
    [user.firstName ?? user.first_name, user.lastName ?? user.last_name]
      .filter(Boolean)
      .join(" ") ||
    user.email
  );
}

function TalentVerifyEmailForm() {
  const router = useRouter();
  const talentSignup = useSignupFlowStore((s) => s.talentSignup);
  const clearTalentSignup = useSignupFlowStore((s) => s.clearTalentSignup);
  const [rootError, setRootError] = useState<string | null>(null);
  const [resendHint, setResendHint] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [codeValue, setCodeValue] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { mutateAsync: verifyEmail, isPending: verifying } = useVerifyEmail();
  const { mutateAsync: resendVerification, isPending: resending } =
    useResendVerification();

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
    setRootError(null);
    setResendHint(null);
    const email = talentSignup?.email;
    if (!email) return;

    try {
      const data = await verifyEmail({
        email,
        otp: values.code,
      });

      const signResult = await signInWithCredentials({
        email: data.user.email,
        accessToken: data.tokens?.access_token,
        userId: data.user.id,
        name: displayName(data.user),
        image: data.user.profile_pic_url ?? data.user.avatar_url ?? undefined,
      });

      if (signResult?.error) {
        setRootError(
          "Your email was verified but we couldn't start your session. Try signing in.",
        );
        return;
      }

      clearTalentSignup();
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      setRootError(authFailureMessage(e));
    }
  };

  const onResend = async () => {
    setRootError(null);
    setResendHint(null);
    const email = talentSignup?.email;
    if (!email) return;

    try {
      await resendVerification({ email });
      setResendHint("If that email is registered, a new code was sent.");
      setSecondsLeft(RESEND_SECONDS);
      startInterval(intervalRef, setSecondsLeft);
    } catch (e) {
      setRootError(authFailureMessage(e));
    }
  };

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
      {rootError ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {rootError}
        </p>
      ) : null}
      {resendHint ? (
        <p className="rounded-lg border border-muted bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
          {resendHint}
        </p>
      ) : null}

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
        className={cn(
          "h-12 min-h-12 w-full rounded-lg text-sm font-semibold transition-colors",
          isCodeComplete
            ? "bg-primary-900 text-primary-foreground hover:bg-primary-900/90"
            : "bg-muted text-muted-foreground cursor-not-allowed",
        )}
      >
        {isSubmitting || verifying ? "Verifying..." : "Verify Email"}
      </Button>
    </form>
  );
}

export { TalentVerifyEmailForm };

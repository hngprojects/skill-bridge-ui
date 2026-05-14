"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithCredentials } from "@/lib/auth-client";
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

function EmployerVerifyEmailForm() {
  const router = useRouter();
  const employerLead = useSignupFlowStore((s) => s.employerLead);
  const clearEmployerLead = useSignupFlowStore((s) => s.clearEmployerLead);
  const [codeValue, setCodeValue] = useState("");
  const [rootError, setRootError] = useState<string | null>(null);
  const [resendHint, setResendHint] = useState<string | null>(null);

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

  const onSubmit = async (values: EmailVerificationCodeValues) => {
    setRootError(null);
    setResendHint(null);
    const email = employerLead?.email;
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

      clearEmployerLead();
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      setRootError(authFailureMessage(e));
    }
  };

  const onResend = async () => {
    setRootError(null);
    setResendHint(null);
    const email = employerLead?.email;
    if (!email) return;

    try {
      await resendVerification({ email });
      setResendHint("If that email is registered, a new code was sent.");
    } catch (e) {
      setRootError(authFailureMessage(e));
    }
  };

  if (!employerLead?.email) {
    return (
      <p className="body-2 text-muted-foreground">
        <Link
          href="/signup?user=employer"
          className="font-semibold text-foreground underline underline-offset-4 hover:text-foreground"
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
      className="flex flex-col gap-4 font-sans"
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

      <Button
        type="submit"
        disabled={isSubmitting || verifying || codeValue.length !== 6}
        className="mt-1 h-12 w-full rounded-lg bg-primary-900 label-sm text-primary-foreground hover:bg-primary-900/90 disabled:opacity-60"
      >
        {isSubmitting || verifying ? "Verifying..." : "Verify Email"}
      </Button>

      <p className="body-2 mt-6 text-muted-foreground">
        Didn&apos;t receive a code?{" "}
        <button
          type="button"
          disabled={resending}
          className="font-semibold text-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-50"
          onClick={() => void onResend()}
        >
          {resending ? "Sending..." : "Send code again"}
        </button>
      </p>
    </form>
  );
}

export { EmployerVerifyEmailForm };

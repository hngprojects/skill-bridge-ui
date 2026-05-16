"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { login as loginAccount } from "@/actions/auth";
import { FormInput } from "@/components/custom/form-input";
import { GoogleButton } from "@/components/custom/google-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { authKeys } from "@/hooks/api/keys";
import { authFailureMessage } from "@/lib/api";
import {
  postAuthRedirectForUser,
  signInWithGoogle,
  signInWithPassword,
} from "@/lib/auth-client";
import { signInFormSchema, type SignInFormValues } from "@/types/form-schema";

function SignInForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [rootError, setRootError] = useState<string | null>(null);
  const [isGooglePending, setIsGooglePending] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setRootError(null);

    try {
      const login = await loginAccount({
        email: data.email,
        password: data.password,
      });

      const result = await signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setRootError(
          "Signed in with the API, but couldn't start your session. Try again.",
        );
        return;
      }

      queryClient.removeQueries({ queryKey: authKeys.all });
      router.replace(postAuthRedirectForUser(login.user));
      router.refresh();
    } catch (e) {
      setRootError(authFailureMessage(e));
    }
  };

  const onGoogleSignIn = async () => {
    setRootError(null);
    setIsGooglePending(true);

    try {
      const { result, redirectTo } = await signInWithGoogle();

      if (result?.error) {
        setRootError(
          "Signed in with Google, but couldn't start your session. Try again.",
        );
        return;
      }

      queryClient.removeQueries({ queryKey: authKeys.all });
      router.replace(redirectTo);
      router.refresh();
    } catch (e) {
      setRootError(authFailureMessage(e));
    } finally {
      setIsGooglePending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full min-w-0 flex-col gap-4 [font-family:var(--font-outfit),sans-serif]"
    >
      {rootError ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {rootError}
        </p>
      ) : null}

      <FormInput
        label="Email"
        required
        type="email"
        validateEmail
        placeholder="Enter your email address"
        error={errors.email?.message}
        {...register("email")}
      />

      <FormInput
        label="Password"
        required
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="sign-in-remember-me"
                checked={field.value ?? false}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
          <Label
            htmlFor="sign-in-remember-me"
            className="cursor-pointer text-sm font-normal text-[#535862]"
          >
            Remember me
          </Label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-[#535862] underline-offset-4 hover:text-[#0D2025] hover:underline sm:text-right"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 h-12 min-h-12 w-full rounded-lg bg-black text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-black/90 disabled:opacity-60 sm:text-sm"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>

      <div
        className="relative my-2 flex items-center gap-4"
        role="separator"
        aria-label="or"
      >
        <div className="h-px flex-1 bg-[#E2E8F0]" />
        <span className="shrink-0 text-sm text-[#64748B]">or</span>
        <div className="h-px flex-1 bg-[#E2E8F0]" />
      </div>

      <GoogleButton
        disabled={isGooglePending}
        label={isGooglePending ? "Connecting..." : "Continue with Google"}
        onClick={() => void onGoogleSignIn()}
      />

      <p className="mt-5 text-center text-xs leading-relaxed text-[#64748B] sm:mt-6 sm:text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[#0D2025] underline underline-offset-4 hover:text-[#0D2025]"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

export { SignInForm };

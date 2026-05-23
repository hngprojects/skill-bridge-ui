"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { appToast } from "@/lib/toast";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { login as loginAccount } from "@/actions/auth";
import { AuthNavigationLoading } from "@/components/auth/auth-navigation-loading";
import { FormInput } from "@/components/custom/form-input";
import { GoogleButton } from "@/components/custom/google-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { authKeys } from "@/hooks/api/keys";
import { ApiError, authFailureMessage } from "@/lib/api";
import {
  postAuthRedirectForUser,
  signInWithGoogle,
  signInWithVerifiedUser,
} from "@/lib/auth-client";
import { prepareGoogleAuth } from "@/lib/google-auth";
import { useSignupFlowStore } from "@/stores/signup-flow-store";
import { signInFormSchema, type SignInFormValues } from "@/types/form-schema";

type UnverifiedLoginErrorBody = {
  error?: string;
  email?: string;
  role?: string;
};

function SignInForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setTalentSignup = useSignupFlowStore((s) => s.setTalentSignup);
  const setEmployerLead = useSignupFlowStore((s) => s.setEmployerLead);
  const [isGooglePending, setIsGooglePending] = useState(false);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [isAuthNavigating, setIsAuthNavigating] = useState(false);

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

  useEffect(() => {
    let isMounted = true;

    prepareGoogleAuth()
      .then(() => {
        if (isMounted) setIsGoogleReady(true);
      })
      .catch(() => {
        if (isMounted) setIsGoogleReady(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const login = await loginAccount({
        email: data.email,
        password: data.password,
      });

      const result = await signInWithVerifiedUser(login.user);

      if (result?.error) {
        appToast.error(
          "Signed in with the API, but couldn't start your session. Try again.",
        );
        return;
      }

      queryClient.removeQueries({ queryKey: authKeys.all });
      setIsAuthNavigating(true);
      router.replace(postAuthRedirectForUser(login.user));
      router.refresh();
    } catch (e) {
      setIsAuthNavigating(false);
      if (e instanceof ApiError && e.status === 403) {
        const body = e.data as UnverifiedLoginErrorBody | undefined;
        if (body?.error === "EMAIL_NOT_VERIFIED" && body.email?.trim()) {
          const email = body.email.trim();
          const resumePayload = { email, firstName: "", lastName: "" };

          if (body.role === "employer") {
            setEmployerLead(resumePayload);
            router.push("/signup/verify-employer?autoResend=1");
          } else {
            setTalentSignup(resumePayload);
            router.push("/signup/verify-talent?autoResend=1");
          }

          appToast.error(authFailureMessage(e));
          return;
        }
      }

      appToast.error(authFailureMessage(e));
    }
  };

  const onGoogleSignIn = async () => {
    setIsGooglePending(true);

    try {
      const { result, redirectTo } = await signInWithGoogle();

      if (result?.error) {
        appToast.error(
          "Signed in with Google, but couldn't start your session. Try again.",
        );
        return;
      }

      queryClient.removeQueries({ queryKey: authKeys.all });
      setIsAuthNavigating(true);
      router.replace(redirectTo);
      router.refresh();
    } catch (e) {
      setIsAuthNavigating(false);
      appToast.error(authFailureMessage(e));
    } finally {
      setIsGooglePending(false);
    }
  };

  return (
    <>
      {isAuthNavigating && <AuthNavigationLoading />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex w-full min-w-0 flex-col gap-4 [font-family:var(--font-outfit),sans-serif]"
      >
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

        <div className="flex w-full items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="sign-in-remember-me"
                  checked={field.value ?? false}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                  className="border-[#0D2025]/50 data-[state=checked]:border-[#0D2025]/70 data-[state=checked]:bg-[#0D2025]"
                />
              )}
            />

            <Label
              htmlFor="sign-in-remember-me"
              className="cursor-pointer text-sm font-medium text-[#535862]"
            >
              Remember me
            </Label>
          </div>

          <Link
            href="/forgot-password"
            className="whitespace-nowrap text-sm font-medium text-[#0D2025] underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isAuthNavigating}
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
          disabled={
            !isGoogleReady ||
            isGooglePending ||
            isSubmitting ||
            isAuthNavigating
          }
          label={isGooglePending ? "Connecting..." : "Continue with Google"}
          loading={!isGoogleReady}
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
    </>
  );
}

export { SignInForm };

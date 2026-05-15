"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import {
  employerSignupFinalSchema,
  type EmployerSignup,
  type EmployerSignupFinalValues,
} from "@/types/form-schema";
import {
  employerRegisterBody,
  register as registerAccount,
} from "@/actions/auth";
import { authFailureMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useSignupFlowStore } from "@/stores/signup-flow-store";

function EmployerFinalSignupForm() {
  const router = useRouter();
  const setEmployerLead = useSignupFlowStore((s) => s.setEmployerLead);
  const [rootError, setRootError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EmployerSignupFinalValues>({
    resolver: zodResolver(employerSignupFinalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = useWatch({ control, name: "password" }) ?? "";
  const confirmPasswordValue =
    useWatch({ control, name: "confirmPassword" }) ?? "";

  const isPasswordValid =
    !errors.password &&
    passwordValue.length >= 8 &&
    /[A-Z]/.test(passwordValue) &&
    /[a-z]/.test(passwordValue) &&
    /[0-9]/.test(passwordValue);

  const passwordsMatch =
    passwordValue === confirmPasswordValue && confirmPasswordValue !== "";

  const onSubmit = async (data: EmployerSignupFinalValues) => {
    setRootError(null);
    try {
      await registerAccount(
        employerRegisterBody({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
      );
      setEmployerLead({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      } satisfies EmployerSignup);
      router.push("/signup/verify-employer");
      router.refresh();
    } catch (e) {
      setRootError(authFailureMessage(e));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full min-w-0 flex-col gap-6 font-sans"
    >
      {rootError ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {rootError}
        </p>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormInput
          label="First name"
          required
          placeholder="Enter your first name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <FormInput
          label="Last name"
          required
          placeholder="Enter your last name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <FormInput
        label="Work email"
        required
        type="email"
        validateEmail
        placeholder="Enter your work email"
        error={errors.email?.message}
        {...register("email")}
      />

      <FormInput
        label="Create password"
        required
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        success={isPasswordValid}
        {...register("password")}
      />

      <FormInput
        label="Confirm password"
        required
        type="password"
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message}
        success={passwordsMatch && !errors.confirmPassword}
        {...register("confirmPassword")}
      />

      <div className="mt-2 flex flex-col gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "h-12 w-full",
            "rounded-xl",
            "bg-primary-900 text-base font-bold text-primary-foreground",
            "transition-all hover:bg-primary-900/90 active:scale-[0.98]",
            "disabled:opacity-60",
          )}
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>

        <p className="body-2 font-light text-muted-foreground">
          Already have an account? Click{" "}
          <Link
            href="/login"
            className="font-normal text-foreground underline decoration-foreground underline-offset-4 transition-all hover:opacity-80"
          >
            here
          </Link>{" "}
          to Log in
        </p>
      </div>
    </form>
  );
}

export { EmployerFinalSignupForm };

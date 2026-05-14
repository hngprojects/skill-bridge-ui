"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ForgotPasswordStepImage } from "./forgot-password-step-image";

function ForgotPasswordSuccessState() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      router.push("/login");
    }, 4000);

    return () => window.clearTimeout(redirectTimer);
  }, [router]);

  return (
    <>
      <ForgotPasswordStepImage
        src="/forgot-password-images/forgot-password-done.svg"
        alt="Password changed illustration"
      />

      <h1 className="section-h2 font-bold text-center text-foreground">
        Password changed
      </h1>

      <p className="body mt-4 text-center text-muted-foreground">
        Your password has been changed successfully
      </p>

      <Button
        asChild
        type="button"
        className="bg-primary-900 text-primary-foreground hover:bg-primary-900/90 mt-8 h-12 min-h-12 w-full rounded-lg text-xs font-semibold sm:text-sm"
      >
        <Link href="/login">Back to Login</Link>
      </Button>
    </>
  );
}

export { ForgotPasswordSuccessState };

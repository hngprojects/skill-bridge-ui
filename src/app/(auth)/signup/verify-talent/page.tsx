"use client";

import Link from "next/link";

import { AuthShell } from "@/components/custom/auth-shell";
import { TalentVerifyEmailForm } from "@/components/auth/signup";
import { useSignupFlowStore } from "@/stores/signup-flow-store";

export default function TalentVerifyEmailPage() {
  const email = useSignupFlowStore((s) => s.talentSignup?.email);

  const emailDisplay = email != null && email.length > 0 ? email : "your email";

  return (
    <AuthShell
      headerTrailing={
        <p className="text-left text-sm sm:text-right">
          <Link
            href="/signup"
            className="font-medium text-foreground underline underline-offset-4 hover:text-foreground"
          >
            Back to sign up
          </Link>
        </p>
      }
    >
      <div className="mx-auto flex w-full min-w-0 max-w-md flex-col items-center px-0">
        <h1 className="section-h2 font-bold text-center text-foreground">
          Verify your email
        </h1>

        <p className="body mt-4 text-center text-muted-foreground">
          We sent you a six-digit confirmation code to{" "}
          <span className="break-all font-medium text-foreground">
            {emailDisplay}
          </span>
          . Please enter it below to confirm your email address.
        </p>

        <div className="mt-8 w-full">
          <TalentVerifyEmailForm />
        </div>
      </div>
    </AuthShell>
  );
}

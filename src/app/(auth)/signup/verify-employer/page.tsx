"use client";

import Link from "next/link";
import Image from "next/image";

import { AuthShell } from "@/components/custom/auth-shell";
import { EmployerVerifyEmailForm } from "@/components/auth/signup";
import { useSignupFlowStore } from "@/stores/signup-flow-store";

export default function EmployerVerifyEmailPage() {
  const email = useSignupFlowStore((s) => s.employerLead?.email);

  const emailDisplay = email != null && email.length > 0 ? email : "your email";

  return (
    <AuthShell
      simpleFooter={true}
      headerTrailing={
        <p className="text-right text-sm">
          <Link
            href="/"
            className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Back to Homepage
          </Link>
        </p>
      }
    >
      <div className="mx-auto flex w-full max-w-360 flex-col px-4 pt-8 pb-20 lg:min-h-[72vh] lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:pt-16 lg:pb-16 xl:px-16">
        {/* LEFT CONTENT */}
        <div className="w-full max-w-92.5 lg:max-w-140">
          {/* HEADER */}
          <div className="mb-6 flex flex-col gap-3 lg:mb-10">
            <h1 className="text-[32px] leading-[110%] font-bold tracking-[-0.03em] text-foreground lg:text-[56px]">
              Verify your email
            </h1>

            <p className="max-w-130 text-[18px] leading-[160%] font-medium text-foreground lg:text-[22px]">
              We sent you a six-digit confirmation code to{" "}
              <span className="break-all font-medium">{emailDisplay}</span>.
              Please enter it below to confirm your email address.
            </p>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-6">
            <EmployerVerifyEmailForm />
          </div>
        </div>

        {/* RIGHT IMAGE (DESKTOP ONLY) */}
        <div className="relative hidden w-full max-w-135 shrink-0 lg:flex lg:items-center lg:justify-center">
          <Image
            src="/assets/hire.svg"
            alt="Hire with confidence — every candidate is assessed, scored, and verified"
            width={540}
            height={540}
            className="h-auto w-full object-contain"
            priority={false}
          />
        </div>
      </div>
    </AuthShell>
  );
}

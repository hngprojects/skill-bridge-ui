"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function GatePending() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 py-8">
      <header className="flex flex-col gap-2">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-4 w-80 rounded-lg" />
      </header>
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}

export function GateError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-tight text-[#101828]">
          Offers
        </h1>
        <p className="text-sm text-[#475467]">
          We&apos;ll show your offers here once we can load your account.
        </p>
      </header>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#E4E7EC] bg-white px-6 py-12 text-center">
        <div className="flex max-w-md flex-col gap-1">
          <p className="text-base font-semibold text-[#101828]">
            We couldn&apos;t check your eligibility
          </p>
          <p className="text-sm text-[#475467]">
            Something went wrong loading your account status. This usually
            clears up after a retry — give it another go.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={onRetry}
          className="h-10 rounded-lg"
        >
          Retry
        </Button>
      </div>
    </div>
  );
}

export function NotJobReadyState() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-tight text-[#101828]">
          Offers
        </h1>
        <p className="text-sm text-[#475467]">
          Once you&apos;re verified job-ready, employer offers will appear here.
        </p>
      </header>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#E4E7EC] bg-white px-6 py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#F2F4F7] text-[#475467]">
          <Lock className="size-5" aria-hidden />
        </div>
        <div className="flex max-w-md flex-col gap-1">
          <p className="text-base font-semibold text-[#101828]">
            Offers unlock at the job-ready tier
          </p>
          <p className="text-sm text-[#475467]">
            Employers can only send offers to talents who&apos;ve completed
            their advanced assessment and been verified as job-ready. Head to
            your dashboard to see your next step.
          </p>
        </div>
        <Button asChild className="h-10 rounded-lg">
          <Link href="/t/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}

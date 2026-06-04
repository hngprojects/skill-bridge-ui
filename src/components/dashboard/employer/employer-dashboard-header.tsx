"use client";

import Link from "next/link";
import { SquarePlus } from "lucide-react";
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";

export function EmployerDashboardHeader() {
  const { fullName } = useSessionUserProfile();
  const firstName = fullName?.split(" ")[0] ?? "there";

  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex flex-col gap-2">
        <h1 className="font-sans text-2xl font-bold leading-[150%] text-[#010103]">
          Welcome back, {firstName}!
        </h1>
        <p className="font-sans text-sm font-light leading-[150%] tracking-[0.016em] text-[#151515]">
          Browse through top Job Ready talents who have completed our assessment
          roadmap.
        </p>
      </div>
      <Link
        href="/e/roles/create"
        className="flex shrink-0 items-end gap-2 font-sans text-base font-semibold leading-[150%] tracking-[0.016em] text-[#05060F] underline"
      >
        <SquarePlus className="size-5 text-[#141B34]" />
        Create a Role
      </Link>
    </div>
  );
}

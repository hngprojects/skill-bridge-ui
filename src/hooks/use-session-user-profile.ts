"use client";

import { useSession } from "next-auth/react";

import type { UserRole } from "@/types/api";

export function useSessionUserProfile() {
  const { data: session, status } = useSession();

  return {
    userId: session?.user?.id ?? "",
    fullName: session?.user?.name?.trim() ?? "",
    email: session?.user?.email?.trim() ?? "",
    role: (session?.user?.role ?? null) as UserRole | null,
    isLoading: status === "loading",
  };
}

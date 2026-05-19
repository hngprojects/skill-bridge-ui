"use client";

import { useSession } from "next-auth/react";

export function useSessionUserProfile() {
  const { data: session, status } = useSession();

  return {
    fullName: session?.user?.name?.trim() ?? "",
    email: session?.user?.email?.trim() ?? "",
    isLoading: status === "loading",
  };
}

"use client";

import { useCallback } from "react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { logout } from "@/actions/auth";
import { clearPersistedSessionState } from "@/lib/client-session-cleanup";

type AppLogoutOptions = {
  callbackUrl?: string;
};

export function useAppLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logoutAndRedirect = useCallback(
    async ({ callbackUrl = "/login" }: AppLogoutOptions = {}) => {
      setIsLoggingOut(true);
      let shouldResetLoading = true;

      try {
        try {
          await logout();
        } finally {
          queryClient.clear();
          clearPersistedSessionState();
          const result = await signOut({ callbackUrl, redirect: false });
          router.replace(result.url ?? callbackUrl);
          shouldResetLoading = false;
        }
      } finally {
        if (shouldResetLoading) {
          setIsLoggingOut(false);
        }
      }
    },
    [queryClient, router],
  );

  return { isLoggingOut, logoutAndRedirect };
}

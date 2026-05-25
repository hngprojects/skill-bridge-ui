"use client";

import { useCallback } from "react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import { logout } from "@/actions/auth";
import { clearPersistedSessionState } from "@/lib/client-session-cleanup";

type AppLogoutOptions = {
  callbackUrl?: string;
};

export function useAppLogout() {
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logoutAndRedirect = useCallback(
    async ({ callbackUrl = "/login" }: AppLogoutOptions = {}) => {
      setIsLoggingOut(true);
      try {
        await logout();
      } finally {
        queryClient.clear();
        clearPersistedSessionState();
        await signOut({ callbackUrl });
      }
    },
    [queryClient],
  );

  return { isLoggingOut, logoutAndRedirect };
}

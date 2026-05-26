"use client";

import type { MouseEvent, ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { useAppLogout } from "@/hooks/use-app-logout";

type SignOutDialogProps = {
  children: ReactNode;
};

export function SignOutDialog({ children }: SignOutDialogProps) {
  const { isLoggingOut, logoutAndRedirect } = useAppLogout();

  const handleSignOut = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await logoutAndRedirect();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out of your account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoggingOut}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut} disabled={isLoggingOut}>
            {isLoggingOut ? (
              <>
                <Spinner className="size-4" />
                Signing out...
              </>
            ) : (
              "Sign Out"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { Bell, ChevronDown, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import { getInitials } from "@/components/dashboard/nav-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";

type DashboardNavbarUserMenuProps = {
  isVerified?: boolean;
};

export function DashboardNavbarUserMenu({
  isVerified = true,
}: DashboardNavbarUserMenuProps) {
  const { fullName, email } = useSessionUserProfile();
  const { data: session } = useSession();
  const initials = getInitials(fullName, email);
  const avatarUrl = session?.user?.image ?? undefined;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="h-10 gap-2 rounded-md px-0 hover:bg-transparent"
          >
            <Avatar
              size="lg"
              className="rounded-full border border-gray-300 bg-white after:hidden"
            >
              {avatarUrl && (
                <AvatarImage src={avatarUrl} alt={fullName || "User avatar"} />
              )}
              <AvatarFallback className="rounded-full bg-white text-sm font-semibold text-foreground font p-3">
                {initials}
              </AvatarFallback>
            </Avatar>
            <ChevronDown
              className="size-4 shrink-0 text-foreground/60"
              aria-hidden
            />
            <span className="sr-only">Account menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-full rounded-xl border border-[#E4E7EC] bg-white p-2 shadow-[0_12px_32px_rgba(16,24,40,0.14)]"
        >
          {isVerified ? (
            <DropdownMenuItem className="h-8 gap-2 rounded-md px-2 text-xs text-[#344054]">
              <UserRound className="size-5 text-[#00000]" aria-hidden />
              Verified profile
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem className="h-8 gap-2 rounded-md px-2 text-xs text-[#344054]">
            <Bell className="size-5 text-[#00000]" aria-hidden />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="h-8 gap-2 rounded-md px-2 text-xs text-[#344054]"
          >
            <Link href="/t/settings">
              <Settings className="size-5 text-[#00000]" aria-hidden />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-2 bg-[#E4E7EC]" />
          <DropdownMenuItem
            asChild
            className="h-8 rounded-md px-2 text-xs text-[#667085]"
          >
            <Link href="/contact">Help Center</Link>
          </DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="h-8 rounded-md px-2 text-xs text-[#667085]"
                onSelect={(e) => e.preventDefault()}
              >
                Sign Out
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign out?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to sign out of your account?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  Sign Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

"use client";

import { Bell, ChevronDown, Settings, UserRound } from "lucide-react";
import Link from "next/link";

import { getInitials } from "@/components/dashboard/nav-utils";
import { SignOutDialog } from "@/components/dashboard/sign-out-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";
import { useMe } from "@/hooks/api";

type DashboardNavbarUserMenuProps = {
  isVerified?: boolean;
};

export function DashboardNavbarUserMenu({
  isVerified = true,
}: DashboardNavbarUserMenuProps) {
  const { fullName, email } = useSessionUserProfile();
  const { data: user } = useMe({ enabled: true });
  const initials = getInitials(fullName, email);
  const avatarUrl = user?.avatar_url;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            tabIndex={-1}
            className="h-10 gap-2 rounded-md px-0 hover:bg-transparent outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
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
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
          align="end"
          sideOffset={8}
          className="*:cursor-pointer w-full rounded-xl border border-[#E4E7EC] bg-white p-2 shadow-[0_12px_32px_rgba(16,24,40,0.14)]"
        >
          {isVerified ? (
            <DropdownMenuItem
              asChild
              className="h-8 gap-2 rounded-md px-2 text-xs text-[#344054]"
            >
              <Link href="/t/verified-profile">
                <UserRound className="size-5 text-[#00000]" aria-hidden />
                Verified profile
              </Link>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem
            asChild
            className="h-8 gap-2 rounded-md px-2 text-xs text-[#344054]"
          >
            <Link href="/t/notifications">
              <Bell className="size-5 text-[#00000]" aria-hidden />
              Notifications
            </Link>
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
          <SignOutDialog>
            <DropdownMenuItem
              className="h-8 rounded-md px-2 text-xs text-[#667085]"
              onSelect={(e) => e.preventDefault()}
            >
              Sign Out
            </DropdownMenuItem>
          </SignOutDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

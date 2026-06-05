"use client";

import { Bell, ChevronDown, Settings } from "lucide-react";
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
import { useMe } from "@/hooks/api";
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";

/**
 * Employer-side avatar dropdown. Mirrors the talent menu's shape but routes
 * to employer URLs and skips talent-only entries like "Verified profile".
 */
export function EmployerNavbarUserMenu() {
  const { fullName, email } = useSessionUserProfile();
  const { data: user } = useMe({ enabled: true });
  const initials = getInitials(fullName, email);
  const avatarUrl = user?.avatar_url;

  return (
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
            <AvatarFallback className="rounded-full bg-white text-sm font-semibold text-foreground p-3">
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
        className="*:cursor-pointer w-full rounded-xl border border-[#E4E7EC] bg-white p-2 shadow-[0_12px_32px_rgba(16,24,40,0.14)]"
      >
        <DropdownMenuItem
          asChild
          className="h-8 gap-2 rounded-md px-2 text-xs text-[#344054]"
        >
          <Link href="/e/notifications">
            <Bell className="size-5" aria-hidden />
            Notifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="h-8 gap-2 rounded-md px-2 text-xs text-[#344054]"
        >
          <Link href="/e/settings">
            <Settings className="size-5" aria-hidden />
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
  );
}

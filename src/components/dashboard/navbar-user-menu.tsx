"use client";

import { ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";

import { getInitials } from "@/components/dashboard/nav-utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";

export function DashboardNavbarUserMenu() {
  const { fullName, email } = useSessionUserProfile();
  const initials = getInitials(fullName, email);

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
      <DropdownMenuContent align="end" className="w-48">
        {fullName ? (
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-foreground">{fullName}</p>
            {email ? (
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            ) : null}
          </div>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

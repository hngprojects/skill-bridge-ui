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
          className="h-10 gap-1.5 rounded-full border border-gray-200 px-1.5 hover:bg-muted/50"
        >
          <Avatar size="sm" className="size-9 border-0 bg-white after:hidden">
            <AvatarFallback className="bg-white text-sm font-semibold text-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="size-4 text-foreground/60" aria-hidden />
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

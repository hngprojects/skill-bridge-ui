"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppLogout } from "@/hooks/use-app-logout";

const LOGO = "/assets/logo/logo.svg";

/**
 * Minimal navbar for the employer shell while the dashboard is still a
 * placeholder. Logo on the left, an explicit Sign Out button on the right.
 */
export function EmployerNavbar() {
  const { isLoggingOut, logoutAndRedirect } = useAppLogout();

  const handleSignOut = async () => {
    await logoutAndRedirect();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center px-4 sm:px-6 lg:h-[72px]">
        <Link
          href="/e/dashboard"
          className="inline-flex shrink-0 items-center gap-2"
          aria-label="SkillBridge home"
        >
          <Image
            src={LOGO}
            alt=""
            width={36}
            height={36}
            className="size-9 object-contain"
            priority
          />
          <span className="hidden font-sans text-xl font-bold text-primary-900 sm:text-2xl md:block">
            SkillBridge
          </span>
        </Link>

        <div className="ml-auto flex items-center">
          <Button
            type="button"
            variant="ghost"
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="gap-2 text-sm font-medium"
          >
            <LogOut className="size-4" aria-hidden />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}

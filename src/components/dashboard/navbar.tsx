"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell } from "lucide-react";

import { DashboardNavLinks } from "@/components/dashboard/nav-links";
import { DashboardNavbarMobileMenu } from "@/components/dashboard/navbar-mobile-menu";
import { DashboardNavbarUserMenu } from "@/components/dashboard/navbar-user-menu";
import { useUnreadCount } from "@/hooks/api/use-notifications";
import { cn } from "@/lib/utils";

const LOGO = "/assets/logo/logo.svg";

function NotificationBell() {
  const { data } = useUnreadCount();
  const count = data?.count ?? 0;
  const capped = count > 99 ? "99+" : count > 0 ? String(count) : null;

  return (
    <Link
      href="/t/notifications"
      aria-label={capped ? `Notifications, ${capped} unread` : "Notifications"}
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-md",
        "text-foreground/70 transition-colors hover:bg-gray-100 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <Bell className="size-5" aria-hidden />
      {capped && (
        <span
          aria-hidden
          className={cn(
            "absolute -right-0.5 -top-0.5 flex min-w-4.5 items-center",
            "justify-center rounded-full bg-red-500 px-1 text-[10px]",
            "font-semibold leading-none text-white",
            count > 9 ? "h-4.5" : "size-4.5",
          )}
        >
          {capped}
        </span>
      )}
    </Link>
  );
}

export default function DashboardNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div
        className={cn(
          "mx-auto flex h-16 w-full max-w-360 items-center px-4 sm:px-6 lg:h-18",
        )}
      >
        <DashboardNavbarMobileMenu
          pathname={pathname}
          open={mobileOpen}
          onOpenChange={setMobileOpen}
        />
        <Link
          href="/t/dashboard"
          className="inline-flex shrink-0 items-center gap-2"
          aria-label="SkillBridge home"
        >
          <Image
            src={LOGO}
            alt="Credlane logo"
            width={36}
            height={36}
            className="size-9 object-contain"
            priority
          />
          <span className="font-sans text-xl font-bold text-primary-900 sm:text-2xl hidden md:block">
            SkillBridge
          </span>
        </Link>

        <nav
          className="hidden items-center lg:ml-17.5 lg:flex"
          aria-label="Dashboard"
        >
          <DashboardNavLinks
            pathname={pathname}
            className="flex items-center gap-8"
          />
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-3 lg:flex-none lg:gap-4">
          <NotificationBell />
          <DashboardNavbarUserMenu />
        </div>
      </div>
    </header>
  );
}

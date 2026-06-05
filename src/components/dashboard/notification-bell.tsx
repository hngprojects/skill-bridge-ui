"use client";

import { Bell } from "lucide-react";
import Link from "next/link";

import { useUnreadCount } from "@/hooks/api/use-notifications";
import { cn } from "@/lib/utils";

type NotificationBellProps = {
  /** Where the bell links to, e.g. "/t/notifications" or "/e/notifications". */
  href: string;
};

/**
 * Bell icon with an unread-count badge. Same hook drives both the talent and
 * employer navbars; the `href` lets each shell point at its own
 * notifications route.
 */
export function NotificationBell({ href }: NotificationBellProps) {
  const { data } = useUnreadCount();
  const count = data?.count ?? 0;
  const capped = count > 99 ? "99+" : count > 0 ? String(count) : null;

  return (
    <Link
      href={href}
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

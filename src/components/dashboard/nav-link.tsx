"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { isNavLinkActive } from "@/components/dashboard/nav-utils";
import { cn } from "@/lib/utils";

type DashboardNavLinkProps = {
  label: string;
  href: string;
  badge?: "New";
  pathname: string;
  onNavigate?: () => void;
};

export function DashboardNavLink({
  label,
  href,
  badge,
  pathname,
  onNavigate,
}: DashboardNavLinkProps) {
  const active = isNavLinkActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "inline-flex items-center gap-2 text-[15px] font-medium transition-colors",
        active
          ? "text-[#9B3048]"
          : "text-foreground/55 hover:text-foreground/80",
      )}
    >
      {label}
      {badge === "New" ? (
        <Badge
          variant="secondary"
          className="gap-1 rounded-full border border-gray-300 bg-white p-2 text-[11px] font-bold text-foreground"
        >
          New
          <Image
            src="/assets/new-flame.svg"
            alt=""
            width={12}
            height={12}
            aria-hidden
          />
        </Badge>
      ) : null}
    </Link>
  );
}

"use client";

import { DashboardNavLink } from "@/components/dashboard/nav-link";
import { DASHBOARD_NAV_LINKS } from "@/constants/dashboard-nav";
import { cn } from "@/lib/utils";

type DashboardNavLinksProps = {
  pathname: string;
  onNavigate?: () => void;
  className?: string;
};

export function DashboardNavLinks({
  pathname,
  onNavigate,
  className,
}: DashboardNavLinksProps) {
  return (
    <div className={cn(className)}>
      {DASHBOARD_NAV_LINKS.map((link) => (
        <DashboardNavLink
          key={link.href}
          label={link.label}
          href={link.href}
          badge={"badge" in link ? link.badge : undefined}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

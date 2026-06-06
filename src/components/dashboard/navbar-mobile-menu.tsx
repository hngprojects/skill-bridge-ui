"use client";

import { Menu, X } from "lucide-react";

import { DashboardNavLink } from "@/components/dashboard/nav-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type NavbarMobileNavLink = {
  label: string;
  href: string;
  badge?: "New";
};

type NavbarMobileMenuProps = {
  pathname: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: readonly NavbarMobileNavLink[];
  navAriaLabel: string;
  variant?: "talent" | "employer";
};

export function NavbarMobileMenu({
  pathname,
  open,
  onOpenChange,
  links,
  navAriaLabel,
  variant = "talent",
}: NavbarMobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-muted lg:hidden"
        >
          <Menu className="size-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-full gap-0 border-0 bg-[#FCFCFC] p-0 sm:max-w-md"
        aria-describedby={undefined}
      >
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
          <SheetTitle className="font-sans text-lg font-bold text-foreground">
            Menu
          </SheetTitle>
          <SheetClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 text-foreground hover:bg-muted"
            >
              <X className="size-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </SheetClose>
        </div>

        <nav
          className="flex flex-col gap-8 px-6 py-6"
          aria-label={navAriaLabel}
        >
          {links.map((link) => (
            <DashboardNavLink
              key={link.href}
              label={link.label}
              href={link.href}
              badge={link.badge}
              pathname={pathname}
              variant={variant}
              onNavigate={() => onOpenChange(false)}
              className="flex w-full items-center justify-between font-sans text-base"
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

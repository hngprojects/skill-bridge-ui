"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";

import { isNavLinkActive } from "@/components/dashboard/nav-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DASHBOARD_NAV_LINKS } from "@/constants/dashboard-nav";
import { cn } from "@/lib/utils";

type DashboardNavbarMobileMenuProps = {
  pathname: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DashboardNavbarMobileMenu({
  pathname,
  open,
  onOpenChange,
}: DashboardNavbarMobileMenuProps) {
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

        <div className="border-y border-gray-200 px-6 py-5">
          <InputGroup className="h-11 w-full border border-gray-200 bg-white shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0">
            <InputGroupAddon
              align="inline-start"
              className="text-muted-foreground"
            >
              <Search className="size-4" aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              placeholder="Search"
              aria-label="Search dashboard"
              className="bg-transparent text-foreground placeholder:text-muted-foreground"
            />
          </InputGroup>
        </div>

        <nav className="flex flex-col gap-8 px-6 py-6" aria-label="Dashboard">
          {DASHBOARD_NAV_LINKS.map((link) => {
            const active = isNavLinkActive(pathname, link.href);
            const badge = "badge" in link ? link.badge : undefined;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex w-full items-center justify-between font-sans text-base font-medium transition-colors",
                  active ? "text-[#9B3048]" : "text-foreground",
                )}
              >
                {link.label}
                {badge === "New" ? (
                  <Badge
                    variant="secondary"
                    className="h-5 gap-1 rounded-full border-0.5 border-gray-200 bg-white px-2 text-[11px] font-semibold text-foreground"
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
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

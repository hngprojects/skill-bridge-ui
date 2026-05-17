"use client";

import { Menu } from "lucide-react";

import { DashboardNavLinks } from "@/components/dashboard/nav-links";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        side="right"
        className="w-75 border-border bg-background"
        aria-describedby={undefined}
      >
        <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
        <DashboardNavLinks
          pathname={pathname}
          onNavigate={() => onOpenChange(false)}
          className="mt-8 flex flex-col gap-5 pl-2"
        />
      </SheetContent>
    </Sheet>
  );
}

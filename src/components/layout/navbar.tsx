"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const logoWithText = "/assets/logo/logo-with-text.svg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Contact Us", href: "/contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { status, data: session } = useSession();
  const isAuthed = status === "authenticated";
  const dashboardHref =
    session?.user?.role === "talent" ? "/t/dashboard" : "/dashboard";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-[#EFEFEF] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
        {/* Logo */}
        <Link href="/" className="relative h-9 w-32 shrink-0 md:h-10 md:w-40">
          <Image
            src={logoWithText}
            alt="SkillBridge"
            fill
            className="object-contain object-left"
            priority
            sizes="(max-width: 768px) 128px, 160px"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-8 text-[15px] font-medium lg:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-gray-900 ${
                  isActive ? "text-gray-900" : "text-gray-600"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-5.25 left-0 h-0.75 w-full bg-[#1B2935]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          <Link
            href="/signup?user=employer"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 sm:text-[15px]"
          >
            Hire a Talent
          </Link>

          {status === "loading" ? null : (
            <Button
              asChild
              className="hidden rounded-lg bg-[#1B2935] px-6 py-5 text-sm font-semibold text-white hover:bg-[#25394a] lg:inline-flex"
            >
              <Link href={isAuthed ? dashboardHref : "/login"}>
                {isAuthed ? "Dashboard" : "Log In"}
              </Link>
            </Button>
          )}

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-75"
                aria-describedby={undefined}
              >
                <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
                <nav className="flex flex-col gap-6 mt-8 pl-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium text-gray-600 hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {status === "loading" ? null : (
                    <Button
                      asChild
                      className="mt-2 w-fit rounded-lg bg-[#1B2935] px-6 py-5 text-sm font-semibold text-white hover:bg-[#25394a]"
                    >
                      <Link
                        href={isAuthed ? dashboardHref : "/login"}
                        onClick={() => setMobileOpen(false)}
                      >
                        {isAuthed ? "Dashboard" : "Log In"}
                      </Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const logoWithText = "/assets/logo/logo-with-text-white.svg";

type NavLink = { label: string; href: string; hash?: string };

const mainNavColumn: { title: string; links: NavLink[] } = {
  title: "Navigate",
  links: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const footerColumns: { title: string; links: NavLink[] }[] = [
  mainNavColumn,
  {
    title: "Resources",
    links: [
      { label: "FAQs", href: "/#faq", hash: "faq" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-use" },
    ],
  },
];

type SocialItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#000000"
        d={
          "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 " +
          ".88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 " +
          "1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
        }
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-5" aria-hidden>
      <path
        fill="#000000"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <defs>
        <linearGradient id="footer-ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#footer-ig)"
        d={
          "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 " +
          "3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 " +
          "0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 " +
          "0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 " +
          "7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 " +
          "6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 " +
          "6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 " +
          "0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 " +
          "8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
        }
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#1877F2"
        d={
          "M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 " +
          "11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 " +
          "2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 " +
          "3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        }
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#0A66C2"
        d={
          "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 " +
          "2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 " +
          "7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 " +
          "0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 " +
          "22.222 0h.003z"
        }
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#FF0000"
        d={
          "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 " +
          "6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 " +
          "9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 " +
          "3.568z"
        }
      />
    </svg>
  );
}

const socialLinks: SocialItem[] = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@credlanehq",
    icon: <TikTokIcon />,
  },
  { label: "X", href: "https://x.com", icon: <XIcon /> },
  {
    label: "Instagram",
    href: "https://www.instagram.com/credlanehq",
    icon: <InstagramIcon />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/credlanehq",
    icon: <FacebookIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/credlanehq",
    icon: <LinkedInIcon />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@credlanehq",
    icon: <YouTubeIcon />,
  },
];

function FooterColumn({
  title,
  links,
  onLinkClick,
}: {
  title: string;
  links: NavLink[];
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              onClick={(e) => onLinkClick(e, link)}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    link: NavLink,
  ) {
    if (!link.hash) return;
    e.preventDefault();
    if (pathname === "/") {
      document
        .getElementById(link.hash)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(link.href);
    }
  }

  return (
    <footer className={cn("bg-[#05060F] text-white", className)}>
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-16">
          <div className="flex max-w-xs flex-col gap-6">
            <Link href="/" className="relative block h-10 w-42 shrink-0">
              <Image
                src={logoWithText}
                alt="SkillBridge"
                fill
                className="object-contain object-left"
                sizes="168px"
              />
            </Link>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-opacity hover:opacity-90"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-10 lg:gap-x-16">
            {footerColumns.map((col) => (
              <FooterColumn
                key={col.title}
                title={col.title}
                links={col.links}
                onLinkClick={handleLinkClick}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>
          <p>Verified talent for early-career roles across Africa.</p>
        </div>
      </div>
    </footer>
  );
}

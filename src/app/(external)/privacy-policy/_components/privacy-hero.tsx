"use client";

import { Button } from "@/components/ui/button";

export function PrivacyHero() {
  return (
    <section className="border-b border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Legal
        </p>

        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Your privacy is important to us. This policy explains how we collect,
          use and protect your data.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Last updated May 31, 2025</span>
          <span>|</span>
          <span>Version 1.0</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <a href="#" download>
              Download PDF
            </a>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.print()}
          >
            Print this page
          </Button>
        </div>
      </div>
    </section>
  );
}

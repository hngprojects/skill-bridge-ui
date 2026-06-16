"use client";

import { Copy, Mail } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { appToast } from "@/lib/toast";

type EmployerTalentContactPanelProps = {
  candidateName: string;
  email: string | null;
  roleTitle?: string;
};

function buildMailto(email: string, roleTitle: string | undefined): string {
  const subject = roleTitle ? `Re: ${roleTitle}` : "Following up on our offer";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    appToast.success("Email copied.");
  } catch {
    appToast.error("Couldn't copy. Select and copy manually.");
  }
}

export function EmployerTalentContactPanel({
  candidateName,
  email,
  roleTitle,
}: EmployerTalentContactPanelProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!email) return;
    await copyToClipboard(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  // Placeholder variant — kept for resilience if the backend ever omits the
  // email (e.g. older accepted offers from before the field shipped).
  if (!email) {
    return (
      <section
        aria-label="Contact talent"
        className="flex flex-col gap-3 rounded-2xl border border-[#E4E7EC] bg-[#FAFAFA] p-5"
      >
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#10242F]">
            <Mail className="size-5 text-white" aria-hidden />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-[#101828]">
              Contact {candidateName}
            </p>
            <p className="text-sm text-[#475467]">
              {candidateName} accepted your offer, but their contact details
              aren&apos;t available yet. We&apos;ll surface them here as soon as
              they&apos;re ready.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Contact talent"
      className="flex flex-col gap-4 rounded-2xl border border-[#E4E7EC] bg-[#FAFAFA] p-5"
    >
      <header className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#10242F]">
          <Mail className="size-5 text-white" aria-hidden />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-[#101828]">
            Contact {candidateName}
          </p>
          <p className="text-xs text-[#667085]">
            {candidateName} accepted your offer. Reach out by email to
            coordinate next steps — chat is coming soon.
          </p>
        </div>
      </header>

      <dl className="grid grid-cols-1 gap-3">
        <div className="flex flex-col gap-1">
          <dt className="text-xs font-medium text-[#667085]">Email</dt>
          <dd className="text-sm font-medium text-[#101828]">{email}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2">
        <Button asChild className="h-10 rounded-lg">
          <a href={buildMailto(email, roleTitle)}>
            <Mail className="mr-2 size-4" aria-hidden />
            Email talent
          </a>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleCopy}
          className="h-10 rounded-lg"
        >
          <Copy className="mr-2 size-4" aria-hidden />
          {copied ? "Copied" : "Copy email"}
        </Button>
      </div>
    </section>
  );
}

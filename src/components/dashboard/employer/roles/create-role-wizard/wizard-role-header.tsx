"use client";

import { Box } from "lucide-react";

type WizardRoleHeaderProps = {
  title: string;
  category: string;
  companyUrl: string;
};

export function WizardRoleHeader({
  title,
  category,
  companyUrl,
}: WizardRoleHeaderProps) {
  const normalizedUrl =
    companyUrl && !companyUrl.startsWith("http")
      ? `https://${companyUrl}`
      : companyUrl;

  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7] text-[#667085]">
        <Box className="size-5" strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[#101828]">
          {title || "New Role"}
        </p>
        {(category || companyUrl) && (
          <p className="flex items-center gap-1 truncate text-xs text-[#667085]">
            {category && <span>{category}</span>}
            {category && companyUrl && <span>•</span>}
            {companyUrl && (
              <a
                href={normalizedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#101828]"
              >
                {companyUrl}
              </a>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

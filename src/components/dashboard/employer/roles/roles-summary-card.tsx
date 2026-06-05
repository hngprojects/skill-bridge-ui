"use client";

import type React from "react";

type RolesSummaryCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  helperText?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  actionIcon?: React.ReactNode;
};

export function RolesSummaryCard({
  icon,
  label,
  value,
  helperText,
  actionLabel,
  onActionClick,
  actionIcon,
}: RolesSummaryCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#F5F7FA] text-[#475467]">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#344054]">{label}</p>
            <p className="mt-2 text-[2rem] font-semibold leading-none text-[#101828]">
              {value}
            </p>
          </div>
        </div>
        <span className="shrink-0 pt-0.5 text-xs font-medium text-[#98A2B3]">
          Last 7d
        </span>
      </div>

      {helperText ? (
        <p className="mt-3 max-w-[18rem] pl-11 text-xs leading-5 text-[#475467]">
          {helperText}
        </p>
      ) : null}

      {actionLabel ? (
        <button
          type="button"
          className="mt-auto inline-flex items-center gap-1 pl-11 pt-4 text-left text-xs font-medium text-[#111827] underline underline-offset-4 transition-colors hover:text-[#344054]"
          onClick={onActionClick}
        >
          {actionIcon ? (
            <span className="flex size-3.5 items-center justify-center">
              {actionIcon}
            </span>
          ) : null}
          {actionLabel}
        </button>
      ) : null}
    </article>
  );
}

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ShortlistPaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (next: number) => void;
};

/** How many numeric buttons to show on either side of the current page
 *  before falling back to an ellipsis. */
const SIBLING_COUNT = 1;

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Build the numeric pagination list
 */
function paginationItems(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 7) return range(1, total);

  const leftSibling = Math.max(current - SIBLING_COUNT, 1);
  const rightSibling = Math.min(current + SIBLING_COUNT, total);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, 5), "ellipsis", total];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, "ellipsis", ...range(total - 4, total)];
  }
  return [
    1,
    "ellipsis",
    ...range(leftSibling, rightSibling),
    "ellipsis",
    total,
  ];
}

export function ShortlistPagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: ShortlistPaginationProps) {
  const effectiveTotalPages = Math.max(1, totalPages);
  const items = paginationItems(page, effectiveTotalPages);
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col items-start justify-between gap-3 px-4 py-4 sm:flex-row sm:items-center">
      <p className="font-sans text-sm text-[#52525B]">
        Showing {start}–{end} of {total} talents
      </p>
      <nav aria-label="Pagination" className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-md text-[#52525B] transition-colors",
            "hover:bg-[#F4F4F5] disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        {items.map((item, idx) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              aria-hidden
              className="inline-flex size-8 items-center justify-center text-[#A1A1AA]"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={item === page ? "page" : undefined}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-md font-sans text-sm font-medium transition-colors",
                item === page
                  ? "bg-primary text-white"
                  : "text-[#52525B] hover:bg-[#F4F4F5]",
              )}
            >
              {item}
            </button>
          ),
        )}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= effectiveTotalPages}
          aria-label="Next page"
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-md text-[#52525B] transition-colors",
            "hover:bg-[#F4F4F5] disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </nav>
    </div>
  );
}

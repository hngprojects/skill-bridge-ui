"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DataPaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  itemLabel?: string;
  onPageChange: (next: number) => void;
};

const SIBLING_COUNT = 1;

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

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

export function DataPagination({
  page,
  totalPages,
  total,
  pageSize,
  itemLabel = "items",
  onPageChange,
}: DataPaginationProps) {
  const effectiveTotalPages = Math.max(1, totalPages);
  const items = paginationItems(page, effectiveTotalPages);
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col items-start justify-between gap-3 px-4 py-4 sm:flex-row sm:items-center">
      <p className="font-sans text-sm text-[#52525B]">
        Showing {start}–{end} of {total} {itemLabel}
      </p>
      <nav aria-label="Pagination" className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </Button>
        {items.map((item, idx) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              aria-hidden
              className={cn(
                "inline-flex size-6 items-center justify-center text-[#A1A1AA] sm:size-8",
              )}
            >
              …
            </span>
          ) : (
            <Button
              key={item}
              type="button"
              size="icon-xs"
              variant={item === page ? "default" : "ghost"}
              onClick={() => onPageChange(item)}
              aria-current={item === page ? "page" : undefined}
            >
              {item}
            </Button>
          ),
        )}
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= effectiveTotalPages}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" aria-hidden />
        </Button>
      </nav>
    </div>
  );
}

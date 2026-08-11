"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

const STAR = "/assets/employer-dashboard/star.svg";

type StarRatingProps = {
  value: number;
  max?: number;
  /** Omit for a read-only display; pass to make it a clickable input. */
  onChange?: (next: number) => void;
  size?: number;
  className?: string;
};

export function StarRating({
  value,
  max = 5,
  onChange,
  size = 18,
  className,
}: StarRatingProps) {
  const isInteractive = Boolean(onChange);

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      aria-label={isInteractive ? undefined : `${value} out of ${max} stars`}
      role={isInteractive ? undefined : "img"}
    >
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= value;

        if (!isInteractive) {
          return (
            <Image
              key={index}
              src={STAR}
              alt=""
              width={size}
              height={size}
              className={cn(!filled && "opacity-30")}
              aria-hidden
            />
          );
        }

        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange?.(starValue)}
            aria-label={`Rate ${starValue} out of ${max}`}
            aria-pressed={filled}
            className="cursor-pointer"
          >
            <Image
              src={STAR}
              alt=""
              width={size}
              height={size}
              className={cn(
                "transition-opacity",
                !filled && "opacity-30 hover:opacity-60",
              )}
              aria-hidden
            />
          </button>
        );
      })}
    </div>
  );
}

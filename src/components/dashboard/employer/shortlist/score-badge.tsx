import { cn } from "@/lib/utils";

type ScoreBadgeProps = {
  value: number;
  className?: string;
};

/**
 * Cred. Score badge — green hexagonal pill rendered via `clip-path`. The
 * shape scales with its container, so size via the `className` prop (default
 * suits the shortlist table row).
 */
export function ScoreBadge({ value, className }: ScoreBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center bg-[#34A853] text-sm font-semibold text-white",
        className,
      )}
      style={{
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
      aria-label={`Cred Score ${value}%`}
    >
      {value}%
    </span>
  );
}

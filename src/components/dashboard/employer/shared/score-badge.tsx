import { cn } from "@/lib/utils";

type ScoreBadgeProps = {
  value: number;
  className?: string;
};

/**
 * Cred. Score badge — green hexagonal pill with softly rounded corners. The
 * shape scales with its container, so size via the `className` prop (default
 * suits the shortlist table row).
 */
export function ScoreBadge({ value, className }: ScoreBadgeProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <span
      className={cn(
        "relative inline-flex size-12 items-center justify-center text-sm font-semibold text-white",
        className,
      )}
      aria-label={`Cred Score ${clamped}%`}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <polygon
          points="50,4 93,27 93,73 50,96 7,73 7,27"
          fill="#34A853"
          stroke="#34A853"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
      <span className="relative">{clamped}%</span>
    </span>
  );
}

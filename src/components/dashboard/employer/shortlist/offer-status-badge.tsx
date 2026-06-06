import { OFFER_STATUS_META } from "@/constants/employer-shortlist";
import { cn } from "@/lib/utils";
import type { EmployerOfferStatus } from "@/types/api/employer-offers";

type OfferStatusBadgeProps = {
  status: EmployerOfferStatus;
};

export function OfferStatusBadge({ status }: OfferStatusBadgeProps) {
  const meta = OFFER_STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        meta.pillClass,
      )}
    >
      {meta.label}
    </span>
  );
}

import { ASSESSMENT_STATUS_META } from "@/constants/employer-assessments";
import { cn } from "@/lib/utils";
import type { EmployerAssessmentItem } from "@/types/api/employer-assessments";

type AssessmentStatusBadgeProps = {
  assessment: Pick<EmployerAssessmentItem, "status" | "closesAt">;
};

/** "Closes in 5 days" / "Closes today" / "Closed" — for an active
 *  assessment's deadline. Returns null when there's no deadline to show. */
function formatClosesIn(iso: string | null): string | null {
  if (!iso) return null;
  const target = new Date(iso);
  if (Number.isNaN(target.getTime())) return null;

  const days = Math.ceil((target.getTime() - Date.now()) / 86_400_000);
  if (days < 0) return "Closed";
  if (days === 0) return "Closes today";
  if (days === 1) return "Closes in 1 day";
  return `Closes in ${days} days`;
}

export function AssessmentStatusBadge({
  assessment,
}: AssessmentStatusBadgeProps) {
  // Defensive fallback — a status value the frontend doesn't recognize
  // should never crash the row it's in.
  const meta =
    ASSESSMENT_STATUS_META[assessment.status] ??
    ASSESSMENT_STATUS_META.inactive;

  const subLabel =
    assessment.status === "active" ? formatClosesIn(assessment.closesAt) : null;

  return (
    <div className="flex flex-col items-start gap-1">
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-semibold",
          meta.pillClass,
        )}
      >
        {meta.label}
      </span>
      {subLabel ? (
        <span className="text-xs text-[#757575]">{subLabel}</span>
      ) : null}
    </div>
  );
}

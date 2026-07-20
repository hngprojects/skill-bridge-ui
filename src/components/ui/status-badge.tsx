import { cn } from "@/lib/utils";

export type StatusBadgeVariant =
  | "full"
  | "matched"
  | "interested"
  | "assessment_sent"
  | "assessment_completed_pass"
  | "assessment_completed_fail"
  | "interview_invited"
  | "interview_accepted"
  | "interview_declined";

type StatusBadgeProps = {
  variant: StatusBadgeVariant;
  className?: string;
};

const badgeStyles: Record<
  StatusBadgeVariant,
  { label: string; className: string }
> = {
  full: { label: "Full", className: "bg-red-100 text-red-700" },
  matched: { label: "Matched", className: "bg-blue-100 text-blue-700" },
  interested: {
    label: "Interested",
    className: "bg-purple-100 text-purple-700",
  },
  assessment_sent: {
    label: "Assessment Sent",
    className: "bg-orange-100 text-orange-700",
  },
  assessment_completed_pass: {
    label: "Assessment Passed",
    className: "bg-green-100 text-green-700",
  },
  assessment_completed_fail: {
    label: "Assessment Failed",
    className: "bg-red-100 text-red-700",
  },
  interview_invited: {
    label: "Interview Invited",
    className: "bg-yellow-100 text-yellow-700",
  },
  interview_accepted: {
    label: "Interview Accepted",
    className: "bg-green-100 text-green-700",
  },
  interview_declined: {
    label: "Interview Declined",
    className: "bg-gray-100 text-gray-700",
  },
};

export function StatusBadge({ variant, className }: StatusBadgeProps) {
  const config = badgeStyles[variant];
  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

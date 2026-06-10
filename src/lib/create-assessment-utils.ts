export function formatAssessmentCategoryLabel(category: string): string {
  if (!category) return "";
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatAssessmentDeadlineLabel(deadline: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(deadline);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "In 1 day";
  return `In ${diffDays} days`;
}

export function buildAssessmentHeaderSubtitle(
  category: string,
  deadline?: Date,
): string | undefined {
  const parts: string[] = [];

  const categoryLabel = formatAssessmentCategoryLabel(category);
  if (categoryLabel) parts.push(categoryLabel);

  if (deadline) {
    parts.push(formatAssessmentDeadlineLabel(deadline));
  }

  return parts.length > 0 ? parts.join(" • ") : undefined;
}

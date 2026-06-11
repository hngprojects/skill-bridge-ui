/** Date-formatting helpers shared across dashboards.
 *
 *  All inputs are ISO-8601 strings (the wire format used by every backend
 *  endpoint we consume). Invalid / unparseable inputs degrade gracefully —
 *  callers never need to wrap these in try/catch.
 */

const RELATIVE_TIME_UNITS = [
  { label: "year", seconds: 60 * 60 * 24 * 365 },
  { label: "month", seconds: 60 * 60 * 24 * 30 },
  { label: "day", seconds: 60 * 60 * 24 },
  { label: "hour", seconds: 60 * 60 },
  { label: "minute", seconds: 60 },
] as const;

/** "3 days ago" / "Just now". Future timestamps clamp to "Just now". */
export function formatRelativeTime(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "Just now";
  const elapsed = Math.max(
    0,
    Math.floor((Date.now() - parsed.getTime()) / 1000),
  );
  for (const unit of RELATIVE_TIME_UNITS) {
    const count = Math.floor(elapsed / unit.seconds);
    if (count >= 1) return `${count} ${unit.label}${count > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}

/** "Jan 15, 2026" by default; pass a different `Intl.DateTimeFormatOptions`
 *  for variations (e.g. include time). Returns an empty string on parse fail
 *  so the caller can render nothing rather than "Invalid Date". */
export function formatAbsoluteDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString(undefined, options);
}

/** "Created Jan 15, 2026 · 3 days ago". Used on role cards. */
export function formatRoleCardDate(iso: string): string {
  const absolute = formatAbsoluteDate(iso);
  if (!absolute) return "";
  return `Created ${absolute} · ${formatRelativeTime(iso)}`;
}

export function getInitials(name: string, email: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase();
  }
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  if (email) return email.slice(0, 2).toUpperCase();
  return "U";
}

// Dashboard overview routes are exact-match only — without this, every
// `/t/...` or `/e/...` sub-route would light up the "Overview" tab because
// the dashboard route is a prefix of theirs.
const EXACT_MATCH_HREFS = new Set(["/t/dashboard", "/e/dashboard"]);

export function isNavLinkActive(pathname: string, href: string): boolean {
  if (EXACT_MATCH_HREFS.has(href)) return pathname === href;

  return pathname === href || pathname.startsWith(`${href}/`);
}

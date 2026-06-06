/** Options shown in the Create Role dialog's Category select. */
export const ROLE_CATEGORY_OPTIONS = [
  "Mobile app development",
  "Frontend development",
  "Backend development",
  "Product design",
  "Data analysis",
  "Project management",
] as const;

export type RoleCategoryOption = (typeof ROLE_CATEGORY_OPTIONS)[number];

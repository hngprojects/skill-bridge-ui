/**
 * Employer roles domain types. Currently only the local zustand store and
 * the roles UI consume these; once a backend roles endpoint lands, the same
 * types can back the API contract (snake_case raw responses → these shapes
 * via a mapper in `actions/`).
 */

export type EmployerRoleStatus = "active" | "closed";

export type EmployerRoleItem = {
  id: string;
  title: string;
  status: EmployerRoleStatus;
  offersSent: number;
  requirements: string;
  createdAt: string;
};

/** Values captured by the Create Role dialog form. */
export type CreateRoleValues = {
  companyName: string;
  roleTitle: string;
  category: string;
  companyUrl: string;
};

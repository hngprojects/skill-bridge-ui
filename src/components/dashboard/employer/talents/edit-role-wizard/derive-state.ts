import type {
  RawEmployerRole,
  UpdateRoleInput,
} from "@/types/api/employer-roles";

import type { RoleDescriptionValues } from "./step-role-description";
import type { RoleDetailsValues } from "./step-role-details";

/** "NGN 200,000 - 250,000" / "NGN 200,000" / undefined when nothing is set. */
export function buildSalaryRangeLabel(
  role: RawEmployerRole,
): string | undefined {
  const { salary_min, salary_max, currency } = role;
  if (salary_min == null && salary_max == null) return undefined;
  const prefix = currency ? `${currency} ` : "";
  if (salary_min != null && salary_max != null) {
    return `${prefix}${salary_min.toLocaleString()} - ${salary_max.toLocaleString()}`;
  }
  return `${prefix}${(salary_min ?? salary_max)?.toLocaleString()}`;
}

export function deriveInitialDescription(
  role: RawEmployerRole,
): RoleDescriptionValues {
  return {
    roleTitle: role.title ?? "",
    jdHtml: role.description ?? "",
  };
}

export function deriveInitialDetails(role: RawEmployerRole): RoleDetailsValues {
  return {
    employmentType: role.employment_type ?? "",
    // Backend doesn't expose experience / location / acceptsRelocation as
    // structured fields, so these stay UI-only and are not PATCHed.
    experience: "",
    location: "",
    skills: role.keywords ?? [],
    acceptsRelocation: "no",
  };
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

/** Diff the wizard's current values against the server role and return a
 *  PATCH payload containing only fields the backend understands AND that
 *  actually changed. Returns null when nothing's dirty so the caller can
 *  skip the network call entirely. */
export function buildRolePatch({
  role,
  roleDescription,
  roleDetails,
  selectedAssessmentId,
}: {
  role: RawEmployerRole;
  roleDescription: RoleDescriptionValues;
  roleDetails: RoleDetailsValues;
  selectedAssessmentId: string | undefined;
}): UpdateRoleInput | null {
  const patch: UpdateRoleInput = {};

  if (roleDescription.roleTitle !== (role.title ?? "")) {
    patch.title = roleDescription.roleTitle;
  }
  if (roleDescription.jdHtml !== (role.description ?? "")) {
    patch.jdHtml = roleDescription.jdHtml;
  }
  if (roleDetails.employmentType !== (role.employment_type ?? "")) {
    patch.employmentType = roleDetails.employmentType;
  }
  if (!arraysEqual(roleDetails.skills, role.keywords ?? [])) {
    patch.keywords = roleDetails.skills;
  }

  const incomingAssessment = selectedAssessmentId ?? null;
  const currentAssessment = role.assessment_id ?? null;
  if (incomingAssessment !== currentAssessment) {
    patch.assessmentId = incomingAssessment;
  }

  return Object.keys(patch).length > 0 ? patch : null;
}

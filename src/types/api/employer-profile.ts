import type {
  EmployerCompanySize,
  EmployerHiringCountRange,
  EmployerJoiningRoleId,
  EmployerRegion,
  EmployerRoleTrackId,
} from "@/constants/employer-onboarding";

export type EmployerExperienceLevel = "junior" | "mid" | "senior" | "expert";

export type EmployerHiringCount = EmployerHiringCountRange | null;

export type RestrictedFieldMeta = {
  locked: boolean;
  last_changed_at: string | null;
  next_editable_at: string | null;
};

export type EmployerRestrictedFieldKey =
  | "companyName"
  | "companyWebsite"
  | "linkedinCompanyPageUrl";

export type EmployerRestrictedFields = Partial<
  Record<EmployerRestrictedFieldKey, RestrictedFieldMeta>
>;

/** GET /employer/profile — raw response shape. Backend duplicates several
 *  fields under legacy snake_case keys (`employer_type`, `desired_roles`, ...);
 *  we keep them on the raw type so the mapper can ignore them safely without
 *  drifting from the wire shape, but they never reach UI code. */
export type RawEmployerProfileResponseData = {
  id: string;
  userId: string;
  joiningAs: EmployerJoiningRoleId;
  employerType?: EmployerJoiningRoleId;
  employer_type?: EmployerJoiningRoleId;
  companyName: string;
  company_name?: string;
  companyWebsite: string;
  company_website?: string;
  industry: string;
  companySize: EmployerCompanySize;
  company_size?: EmployerCompanySize;
  region: EmployerRegion;
  linkedinCompanyPageUrl: string | null;
  linkedin_company_page_url?: string | null;
  desiredRoles?: EmployerRoleTrackId[];
  hiringRoles?: EmployerRoleTrackId[];
  desired_roles?: EmployerRoleTrackId[];
  preferredExperienceLevels?: EmployerExperienceLevel[];
  preferred_experience_levels?: EmployerExperienceLevel[];
  hiringCount?: EmployerHiringCount;
  hiring_count_range?: EmployerHiringCount;
  restricted_fields?: EmployerRestrictedFields;
};

/** Slim profile passed to UI. Field names mirror PATCH body. */
export type EmployerProfileDetail = {
  id: string;
  userId: string;
  joiningAs: EmployerJoiningRoleId;
  companyName: string;
  companyWebsite: string;
  industry: string;
  companySize: EmployerCompanySize;
  region: EmployerRegion;
  linkedinCompanyPageUrl: string;
  hiringRoles: EmployerRoleTrackId[];
  preferredExperienceLevels: EmployerExperienceLevel[];
  hiringCount: EmployerHiringCount;
  restrictedFields: EmployerRestrictedFields;
};

export type UpdateEmployerProfileInput = {
  employerType?: EmployerJoiningRoleId;
  joiningAs?: EmployerJoiningRoleId;
  companyName?: string;
  companyWebsite?: string;
  industry?: string;
  companySize?: EmployerCompanySize;
  region?: EmployerRegion;
  linkedinCompanyPageUrl?: string;
  hiringRoles?: EmployerRoleTrackId[];
  preferredExperienceLevels?: EmployerExperienceLevel[];
  hiringCount?: EmployerHiringCount;
};

export type EmployerVerificationCriterion =
  | "email_verified"
  | "website_resolvable"
  | "linkedin_provided";

export type RawEmployerVerificationStatusResponseData = {
  verified: boolean;
  criteria: Record<EmployerVerificationCriterion, boolean>;
  banner_visible: boolean;
};

export type EmployerVerificationStatus = {
  verified: boolean;
  criteria: Record<EmployerVerificationCriterion, boolean>;
  bannerVisible: boolean;
};

import { authApi } from "@/lib/api";
import type {
  ApiEnvelope,
  ChangePasswordInput,
  DeleteAccountInput,
  EmployerProfileDetail,
  EmployerVerificationStatus,
  EmptyData,
  RawEmployerProfileResponseData,
  RawEmployerVerificationStatusResponseData,
  UpdateEmployerProfileInput,
} from "@/types/api";

import { unwrapData } from "./utils";

/** Normalize the GET /employer/profile response. Backend ships both PATCH-style
 *  camelCase names and legacy snake_case duplicates — we collapse to a single
 *  canonical shape using the PATCH names so the UI works against one schema. */
function normalizeEmployerProfile(
  raw: RawEmployerProfileResponseData,
): EmployerProfileDetail {
  const joiningAs =
    raw.joiningAs ?? raw.employerType ?? raw.employer_type ?? "Recruiter";

  const hiringRoles =
    raw.hiringRoles ?? raw.desiredRoles ?? raw.desired_roles ?? [];

  const preferredExperienceLevels =
    raw.preferredExperienceLevels ?? raw.preferred_experience_levels ?? [];

  const hiringCountRaw =
    raw.hiringCount !== undefined ? raw.hiringCount : raw.hiring_count_range;
  const hiringCount = hiringCountRaw ?? null;

  return {
    id: raw.id,
    userId: raw.userId,
    joiningAs,
    companyName: raw.companyName ?? raw.company_name ?? "",
    companyWebsite: raw.companyWebsite ?? raw.company_website ?? "",
    industry: raw.industry ?? "",
    companySize: raw.companySize ?? raw.company_size,
    region: raw.region,
    linkedinCompanyPageUrl:
      raw.linkedinCompanyPageUrl ?? raw.linkedin_company_page_url ?? "",
    hiringRoles,
    preferredExperienceLevels,
    hiringCount,
    restrictedFields: raw.restricted_fields ?? {},
  };
}

function normalizeVerificationStatus(
  raw: RawEmployerVerificationStatusResponseData,
): EmployerVerificationStatus {
  return {
    verified: raw.verified,
    criteria: raw.criteria,
    bannerVisible: raw.banner_visible,
  };
}

export async function getEmployerProfile(): Promise<EmployerProfileDetail> {
  const res =
    await authApi.get<ApiEnvelope<RawEmployerProfileResponseData>>(
      "/employer/profile",
    );
  return normalizeEmployerProfile(unwrapData(res));
}

export async function updateEmployerProfile(
  body: UpdateEmployerProfileInput,
): Promise<EmployerProfileDetail> {
  const res = await authApi.patch<ApiEnvelope<RawEmployerProfileResponseData>>(
    "/employer/profile",
    body,
  );
  return normalizeEmployerProfile(unwrapData(res));
}

export async function getEmployerVerificationStatus(): Promise<EmployerVerificationStatus> {
  const res = await authApi.get<
    ApiEnvelope<RawEmployerVerificationStatusResponseData>
  >("/employer/verification-status");
  return normalizeVerificationStatus(unwrapData(res));
}

export async function changeEmployerPassword(
  body: ChangePasswordInput,
): Promise<EmptyData> {
  const res = await authApi.patch<ApiEnvelope<EmptyData>>(
    "/employer/settings/change-password",
    body,
  );
  return unwrapData(res);
}

export async function deleteEmployerAccount(
  body: DeleteAccountInput,
): Promise<EmptyData> {
  const res = await authApi.delete<ApiEnvelope<EmptyData>>(
    "/employer/settings/account",
    { data: body },
  );
  return unwrapData(res);
}

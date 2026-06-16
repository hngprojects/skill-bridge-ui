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

function normalizeEmployerProfile(
  raw: RawEmployerProfileResponseData,
): EmployerProfileDetail {
  const joiningAsRaw =
    raw.joiningAs ?? raw.employerType ?? raw.employer_type ?? "recruiter";

  const joiningAs = joiningAsRaw.toLowerCase() as typeof joiningAsRaw;

  const hiringRoles =
    raw.hiringRoles ?? raw.desiredRoles ?? raw.desired_roles ?? [];

  const preferredExperienceLevels =
    raw.preferredExperienceLevels ?? raw.preferred_experience_levels ?? [];

  const hiringCountRaw =
    raw.hiringCount !== undefined ? raw.hiringCount : raw.hiring_count_range;
  const hiringCount = hiringCountRaw ?? null;

  const rawRestrictedFields = raw.restricted_fields ?? {};
  const restrictedFields: EmployerProfileDetail["restrictedFields"] = {
    companyName: rawRestrictedFields.company_name,
    companyWebsite: rawRestrictedFields.company_website,

    linkedinCompanyPageUrl: rawRestrictedFields.linkedin_url,
  };

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
    restrictedFields,
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

import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api/common";
import type {
  CatalogueResponse,
  CreateRoleInput,
  RawEmployerRole,
} from "@/types/api/employer-roles";

import { unwrapData } from "./utils";

function parseSalary(value: string): number | undefined {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 0 || n > 99_999_999) return undefined;
  return n;
}

export async function getAssessmentCatalogue(params?: {
  page?: number;
  limit?: number;
}): Promise<CatalogueResponse> {
  const res = await authApi.get<ApiEnvelope<CatalogueResponse>>(
    "/employer/assessments/credlane-catalogue",
    { params },
  );
  return unwrapData(res);
}

export async function createRole(
  input: CreateRoleInput,
): Promise<RawEmployerRole> {
  const {
    title,
    category,
    jdHtml,
    jdFile,
    employmentType,
    workArrangement,
    education,
    keywords,
    salaryMin,
    salaryMax,
    currency,
    assessmentId,
  } = input;

  const min = parseSalary(salaryMin);
  const max = parseSalary(salaryMax);

  if (jdFile) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("jd_file", jdFile);
    if (employmentType) formData.append("employmentType", employmentType);
    if (workArrangement) formData.append("workArrangement", workArrangement);
    if (education) formData.append("education", education);
    keywords.forEach((k) => formData.append("keywords", k));
    if (min !== undefined) formData.append("salaryMin", String(min));
    if (max !== undefined) formData.append("salaryMax", String(max));
    if (currency) formData.append("currency", currency);
    if (assessmentId) formData.append("assessmentId", assessmentId);
    const res = await authApi.post<ApiEnvelope<RawEmployerRole>>(
      "/employer/roles",
      formData,
    );
    return unwrapData(res);
  }

  const payload: Record<string, unknown> = { title, category };
  if (jdHtml) payload.description = jdHtml;
  if (employmentType) payload.employmentType = employmentType;
  if (workArrangement) payload.workArrangement = workArrangement;
  if (education) payload.education = education;
  if (keywords.length > 0) payload.keywords = keywords;
  if (min !== undefined) payload.salaryMin = min;
  if (max !== undefined) payload.salaryMax = max;
  if (currency) payload.currency = currency;
  if (assessmentId) payload.assessmentId = assessmentId;

  const res = await authApi.post<ApiEnvelope<RawEmployerRole>>(
    "/employer/roles",
    payload,
  );
  return unwrapData(res);
}

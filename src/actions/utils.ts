import type { AxiosResponse } from "axios";

import type { ApiEnvelope } from "@/types/api";

export function unwrapData<T>(res: AxiosResponse<ApiEnvelope<T>>): T {
  if (res.data.data !== undefined) return res.data.data;

  const data: Record<string, unknown> = { ...res.data };
  delete data.status_code;
  delete data.message;
  delete data.meta;
  return data as T;
}

export function unwrapEnvelope<T>(
  res: AxiosResponse<ApiEnvelope<T>>,
): ApiEnvelope<T> {
  return res.data;
}

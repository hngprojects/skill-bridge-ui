import { publicApi } from "@/lib/api";

import type { HealthResponse } from "@/types/api";

/**
 * Health check — spec shows a plain `{ status: "ok" }` body (may differ from HNG envelope).
 */
export async function getHealth(): Promise<HealthResponse> {
  const res = await publicApi.get<HealthResponse>("/health");
  return res.data;
}

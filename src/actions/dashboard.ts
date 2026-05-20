import { authApi } from "@/lib/api";
import type { ApiEnvelope, DashboardHomeResponseData } from "@/types/api";

import { unwrapData } from "./utils";

export async function getDashboardHome(): Promise<DashboardHomeResponseData> {
  const res =
    await authApi.get<ApiEnvelope<DashboardHomeResponseData>>(
      "/dashboard/home",
    );
  return unwrapData(res);
}

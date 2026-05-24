import { authApi } from "@/lib/api";
import type { ApiEnvelope, ResourcesResponseData } from "@/types/api";

import { unwrapData } from "./utils";

export async function getTalentResources(): Promise<ResourcesResponseData> {
  const res =
    await authApi.get<ApiEnvelope<ResourcesResponseData>>("/talent/resources");
  return unwrapData(res);
}

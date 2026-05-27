import { authApi } from "@/lib/api";
import type { ApiEnvelope, VerifiedProfileResponseData } from "@/types/api";

import { unwrapData } from "./utils";

export async function getVerifiedProfile(): Promise<VerifiedProfileResponseData> {
  const res = await authApi.get<ApiEnvelope<VerifiedProfileResponseData>>(
    "/talent/verified-profile",
  );
  return unwrapData(res);
}

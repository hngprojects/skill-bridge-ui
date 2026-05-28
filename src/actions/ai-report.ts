import { GuidanceReport } from "@/types/resources";
import { unwrapData } from "@/actions";
import { authApi } from "@/lib/api";
import { ApiEnvelope } from "@/types/api";

const getAiReport = async () => {
  const response = await authApi.get<ApiEnvelope<GuidanceReport>>(
    "/talent/ai-report/guidance-report",
  );
  return unwrapData(response);
};

export default getAiReport;

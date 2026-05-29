import { queryOptions } from "@tanstack/react-query";

import { aiGuidanceReport } from "./keys";
import getAiReport from "@/actions/ai-report";

export const aiReportQueryOptions = () =>
  queryOptions({
    queryKey: aiGuidanceReport.all,
    queryFn: () => getAiReport(),
  });

import Image from "next/image";
import { Dot } from "lucide-react";

import InfoDisplay from "@/components/verified-report/info-display";
import HexagonPercentageItem from "@/components/verified-report/hexagon-percentage-item";
import type { VerifiedProfileResponseData } from "@/types/api";

import { getAboutTags, getAiReport } from "./verified-report-utils";

type VerifiedReportSummaryProps = {
  data: VerifiedProfileResponseData;
};

export function VerifiedReportSummary({ data }: VerifiedReportSummaryProps) {
  return (
    <div className="flex flex-col gap-y-5 md:flex-row md:justify-between gap-x-10 rounded-xl border border-[#DBDBDB] p-3 md:p-6 bg-[#FAFAFA]">
      <div className="flex flex-1 flex-col gap-y-6 min-w-0">
        <div className="flex flex-col gap-y-2 sm:flex-row gap-x-6 sm:items-center">
          <Image
            src={data.avatar_url ?? "/assets/placeholder-avatar.svg"}
            height={124}
            width={124}
            alt=""
            className="rounded-full object-cover size-[124px]"
            unoptimized={Boolean(data.avatar_url)}
          />
          <div className="flex flex-col gap-y-1">
            <p className="font-bold text-2xl">{data.full_name}</p>
            <p className="text-lg font-light flex flex-row gap-x-2 items-center flex-wrap">
              {data.role}
              <Dot size={30} className="hidden lg:block" />
              <span>Goal: {data.goal}</span>
            </p>
          </div>
        </div>
        <InfoDisplay title="About" info={getAboutTags(data)} />
        <InfoDisplay title="Skills" info={data.skills} />
        <InfoDisplay title="AI Report" info={getAiReport(data)} />
      </div>
      <div className="max-md:self-center">
        <HexagonPercentageItem
          value={data.score_percentage}
          tierLabel={data.tier_label}
        />
      </div>
    </div>
  );
}

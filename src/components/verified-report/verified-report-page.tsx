"use client";

import Image from "next/image";
import { Dot, Download } from "lucide-react";

import InfoDisplay from "@/components/verified-report/info-display";
import { Button } from "@/components/ui/button";
import HexagonPercentageItem from "@/components/verified-report/hexagon-percentage-item";
import SkillsDisplay from "@/components/verified-report/skills-display";
import { useVerifiedProfile } from "@/hooks/api/use-verified-profile";
import type { VerifiedProfileResponseData } from "@/types/api";

function aboutTags(data: VerifiedProfileResponseData): string[] {
  if (data.about_tags.length > 0) return data.about_tags;
  if (data.about.trim()) return [data.about.trim()];
  return [];
}

const VerifiedReportPage = () => {
  const { data, isPending, isError } = useVerifiedProfile();

  if (isPending) {
    return (
      <div className="flex flex-col gap-y-6 my-8.5 animate-pulse">
        <div className="h-10 w-64 rounded-lg bg-muted" />
        <div className="min-h-80 rounded-xl bg-muted" />
        <div className="min-h-64 rounded-xl bg-muted" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center my-8.5 min-h-64">
        <p className="text-base text-muted-foreground">
          Failed to load verified profile. Please try again later.
        </p>
      </div>
    );
  }

  const aiReport = data.ai_report || data.ai_summary;

  return (
    <div className="flex flex-col gap-y-6 my-8.5">
      <section className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-y-2">
          <h2 className="font-bold text-2xl text-black">Verified Profile</h2>
          <p className="font-light text-base">
            Here&apos;s how to know how employers see your profile!
          </p>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <Button className="underline" variant={"ghost"}>
            Download CV
            <Download size={16} />
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-5 md:flex-row md:justify-between gap-x-10 rounded-xl border border-[#DBDBDB] p-3 md:p-6 bg-[#FAFAFA]">
          <div className="flex flex-1 flex-col gap-y-6 min-w-0">
            <div className="flex flex-col gap-y-2 sm:flex-row gap-x-6 sm:items-center">
              <Image
                src={data.avatar_url ?? "/assets/placeholder-avatar.svg"}
                height={124}
                width={124}
                alt="User avatar"
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
            <InfoDisplay title="About" info={aboutTags(data)} />
            <InfoDisplay title="Skills" info={data.skills} />
            <InfoDisplay title="AI Report" info={aiReport} />
          </div>
          <div className="max-md:self-center">
            <HexagonPercentageItem
              value={data.score_percentage}
              tierLabel={data.tier_label}
            />
          </div>
        </div>

        <div className="flex flex-col bg-[#FAFAFA] rounded-xl border border-[#DBDBDB] p-3 md:p-6">
          <SkillsDisplay skills={data.detailed_skills} />
        </div>
      </section>
    </div>
  );
};

export default VerifiedReportPage;

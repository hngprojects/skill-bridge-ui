import { useTalentResources } from "@/hooks/api/use-resources";
import type { ResourceSection } from "@/types/resources";
import ResourcesSection from "@/components/resources/resources-section";
import { AiReportSkillBreakdown } from "@/components/dashboard/ai-report/ai-report-skill-breakdown";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title:"AI Report",
};

const AiReport = () => {
  const { data, isPending, isError } = useTalentResources();

  if (isPending) {
    return (
      <div className="flex flex-col gap-y-8 my-8 animate-pulse">
        <div className="w-full rounded-2xl min-h-40 md:min-h-57.75 bg-muted" />
        <div className="h-64 rounded-2xl bg-muted" />
        <div className="h-64 rounded-2xl bg-muted" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center my-8 min-h-64">
        <p className="body text-muted-foreground">
          Failed to load resources. Please try again later.
        </p>
      </div>
    );
  }

  const sections: ResourceSection[] = [
    {
      id: "recommended-courses",
      title: "Recommended Courses",
      type: "article",
      items: data.resources.map((item) => ({
        url: item.url,
        title: item.title,
        description: item.description,
        duration: item.duration,
      })),
    },
    {
      id: "recommended-videos",
      title: "Recommended Videos",
      type: "video",
      items: data.videos.map((item) => ({
        url: item.url,
        title: item.title,
        duration: item.duration,
      })),
    },
  ];
  
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-5xl flex-col space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col">
          <h1 className="text-[22px] font-bold leading-tight tracking-tight text-foreground">
            AI Report
          </h1>

          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-muted-foreground sm:text-[15px] sm:leading-7 lg:text-[16px]">
            AI-powered insights to help you understand your strengths and
            areas to improve
          </p>
        </div>

        {/* AI Report Skill Breakdown */}
        <AiReportSkillBreakdown />

        {/* Recommended Resources */}
        <section className="flex flex-col">
          <div className="mb-5">
            <h2 className="text-[22px] font-bold tracking-tight text-foreground">
              Recommended Resources
            </h2>
          </div>

          <div className="flex flex-col gap-y-8 my-8">
            {sections.map((section) => (
              <ResourcesSection key={section.id} {...section} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AiReport;

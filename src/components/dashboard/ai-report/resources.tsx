"use client";

import { useTalentResources } from "@/hooks/api/use-resources";
import type { ResourceSection } from "@/types/resources";

import ResourcesSection from "@/components/Resources/resources-section";

const Resources = () => {
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
    <div className="flex flex-col gap-y-8 my-8">
      {sections.map((section) => (
        <ResourcesSection key={section.id} {...section} />
      ))}
    </div>
  );
};

export default Resources;
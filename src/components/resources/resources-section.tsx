import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ResourceSection } from "@/types/resources";
import ResourceArticleCard from "./resource-article-card";
import ResourceVideoCard from "./resource-video-card";

const ResourcesSection = (section: ResourceSection) => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-row justify-between items-center">
        <h2 className="section-h4 font-semibold text-foreground">
          {section.title}
        </h2>
        <div className="flex flex-row gap-x-2">
          <button
            aria-label="Previous"
            disabled
            className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg hover:bg-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft
              size={24}
              className="text-foreground"
              strokeWidth={1.5}
            />
          </button>
          <button
            aria-label="Next"
            disabled
            className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg hover:bg-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight
              size={24}
              className="text-foreground"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        {section.type === "article"
          ? section.items.map((item) => (
              <ResourceArticleCard key={item.url} {...item} />
            ))
          : section.items.map((item) => (
              <ResourceVideoCard key={item.url} {...item} />
            ))}
      </div>
    </div>
  );
};

export default ResourcesSection;

import { resourceSections } from "@/constants/resources";
import ResourcesHeroBanner from "./resources-hero-banner";
import ResourcesSection from "./resources-section";

const ResourcesPage = () => {
  return (
    <div className="flex flex-col gap-y-8 my-8">
      <ResourcesHeroBanner />
      {resourceSections.map((section) => (
        <ResourcesSection key={section.title} {...section} />
      ))}
    </div>
  );
};

export default ResourcesPage;

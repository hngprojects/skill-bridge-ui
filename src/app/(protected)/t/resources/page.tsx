import type { Metadata } from "next";

import { ComingSoon } from "@/components/custom/coming-soon";

export const metadata: Metadata = {
  title: "Resources",
};

const Page = () => {
  return (
    <ComingSoon
      title="Resources are coming soon"
      description="We're curating learning paths, guides, and prep material to support your roadmap. Check back shortly."
      backHref="/t/dashboard"
    />
  );
};

export default Page;

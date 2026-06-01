import type { Metadata } from "next";

import ResourcesPage from "@/components/resources/resource-page";

export const metadata: Metadata = {
  title: "Resources",
};

const Page = () => {
  return <ResourcesPage />;
};

export default Page;

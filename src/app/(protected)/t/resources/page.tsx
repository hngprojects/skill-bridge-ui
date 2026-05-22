import ResourcesPage from "@/components/resources/resource-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
};

const Page = () => {
  return <ResourcesPage />;
};

export default Page;

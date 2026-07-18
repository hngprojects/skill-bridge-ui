import type { Metadata } from "next";
import { ExploreJobsPage } from "@/components/dashboard/talent/explore-jobs/explore-jobs-page";

export const metadata: Metadata = {
  title: "Explore Jobs",
};

export default function Page() {
  return <ExploreJobsPage />;
}

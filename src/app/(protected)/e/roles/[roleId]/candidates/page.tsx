import type { Metadata } from "next";
import { CandidatePipelinePage } from "@/components/dashboard/employer/roles/candidates/pipeline-page";

export const metadata: Metadata = {
  title: "Candidate Pipeline",
};

export default async function Page({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const resolvedParams = await params;
  return <CandidatePipelinePage roleId={resolvedParams.roleId} />;
}

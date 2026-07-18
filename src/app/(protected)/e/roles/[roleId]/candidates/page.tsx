import type { Metadata } from "next";
import { CandidatePipelinePage } from "@/components/dashboard/employer/roles/candidates/pipeline-page";

export const metadata: Metadata = {
  title: "Candidate Pipeline",
};

export default function Page({ params }: { params: { roleId: string } }) {
  return <CandidatePipelinePage roleId={params.roleId} />;
}

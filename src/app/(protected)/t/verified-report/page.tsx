import VerifiedReportPage from "@/components/verified-report/verified-report-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verified reports",
  description: "Verified reports page for Skill bridge",
  keywords: ["skill bridge", "verified reports skillbridge"],
};

const Page = () => {
  return <VerifiedReportPage />;
};

export default Page;

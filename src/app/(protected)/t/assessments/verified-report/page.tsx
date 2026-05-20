import VerifiedReportPage from "@/components/verified-report/verified-report-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verified Report",
};

const Page = () => {
  return <VerifiedReportPage />;
};

export default Page;

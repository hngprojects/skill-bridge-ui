import type { Metadata } from "next";
import { EmployerTalentsPage } from "@/components/employer/talents/employer-talents-page";

export const metadata: Metadata = {
  title: "Talents",
};

export default function Page() {
  return <EmployerTalentsPage />;
}

import type { Metadata } from "next";

import { ShortlistPage } from "@/components/dashboard/employer/shortlist/shortlist-page";

export const metadata: Metadata = {
  title: "Shortlist",
};

export default function EmployerShortlistPage() {
  return <ShortlistPage />;
}

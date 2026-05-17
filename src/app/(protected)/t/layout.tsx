import type { ReactNode } from "react";
import DashboardNavbar from "@/components/dashboard/navbar";

const TalentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col">
      <DashboardNavbar />
      {children}
    </div>
  );
};

export default TalentLayout;

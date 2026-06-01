import type { ReactNode } from "react";

import { EmployerNavbar } from "@/components/dashboard/employer/employer-navbar";

export default function EmployerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col bg-[#FCFCFC]">
      <EmployerNavbar />
      <main className="flex-1">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

"use client";

import { AuthShell } from "@/components/custom/auth-shell";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isGenerateRoadmap = pathname?.includes("generate-roadmap");

  return (
    <AuthShell
      className="bg-white [--primary-foreground:#5B5D60] [&_footer]:hidden [&_footer]:sm:block"
      mainClassName="!p-0 !justify-start"
      simpleFooter={!isGenerateRoadmap}
    >
      {children}
    </AuthShell>
  );
};

export default OnboardingLayout;

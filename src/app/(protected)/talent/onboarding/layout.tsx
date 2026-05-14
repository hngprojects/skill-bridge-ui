import { AuthShell } from "@/components/custom/auth-shell";
import React, { ReactNode } from "react";

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  return <AuthShell className="bg-white">{children}</AuthShell>;
};

export default OnboardingLayout;

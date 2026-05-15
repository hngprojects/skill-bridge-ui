import type { ReactNode } from "react";

import { AuthShell } from "@/components/custom/auth-shell";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthShell
      className="bg-white [--primary-foreground:#5B5D60] [&_footer]:hidden [&_footer]:sm:block"
      mainClassName="!p-0 !justify-start"
      simpleFooter
    >
      {children}
    </AuthShell>
  );
}

import type { ReactNode } from "react";

import { AuthShell } from "@/components/custom/auth-shell";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthShell
      className="bg-white [&_footer]:hidden [&_footer]:sm:block"
      mainClassName="!p-0 !justify-start"
      simpleFooter
    >
      {children}
    </AuthShell>
  );
}

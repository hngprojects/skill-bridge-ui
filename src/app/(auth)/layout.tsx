import type { ReactNode } from "react";

import { GoogleAuthPreloader } from "@/components/auth/google-auth-preloader";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <GoogleAuthPreloader />
      {children}
    </div>
  );
}

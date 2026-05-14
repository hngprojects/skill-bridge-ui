import Link from "next/link";

import { ForgotPasswordFlow } from "@/components/auth/forgot-password";
import { AuthShell } from "@/components/custom/auth-shell";

type ForgotPasswordPageProps = {
  searchParams?: Promise<{
    email?: string | string[];
  }>;
};

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const params = await searchParams;
  const initialEmailParam = Array.isArray(params?.email)
    ? params.email[0]
    : params?.email;
  const initialEmail = initialEmailParam?.trim() ?? "";

  return (
    <AuthShell
      className="[&_header]:h-[54px] [&_header]:px-9 [&_header_img]:h-7"
      mainClassName="justify-start px-4 pt-7 sm:pt-7 lg:pt-7"
      headerTrailing={
        <div className="flex flex-col items-end sm:flex-row sm:items-center sm:gap-1 body-2 font-light text-muted-foreground text-right">
          <span>Are you looking for Talents?</span>
          <Link
            href="/signup?user=employer"
            className="font-normal text-foreground underline decoration-foreground underline-offset-4 hover:opacity-80 transition-all"
          >
            Click here
          </Link>
        </div>
      }
    >
      <ForgotPasswordFlow initialEmail={initialEmail} />
    </AuthShell>
  );
}

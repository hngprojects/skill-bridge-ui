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
    >
      <ForgotPasswordFlow initialEmail={initialEmail} />
    </AuthShell>
  );
}

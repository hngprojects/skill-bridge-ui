import { PublicVerifiedProfilePage } from "@/components/verified-report/public-verified-profile-page";

export default async function ShareTokenPage({
  params,
}: {
  params: Promise<{ shareToken: string }>;
}) {
  const { shareToken } = await params;
  return <PublicVerifiedProfilePage shareToken={shareToken} />;
}

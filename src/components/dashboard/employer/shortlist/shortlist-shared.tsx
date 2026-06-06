import Image from "next/image";

import { getInitials } from "@/components/dashboard/nav-utils";

export function formatTableDate(value: string): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  const yyyy = parsed.getUTCFullYear();
  const mm = String(parsed.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

type CandidateAvatarProps = {
  avatarUrl: string | null;
  fullName: string;
};

export function CandidateAvatar({ avatarUrl, fullName }: CandidateAvatarProps) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={fullName}
        width={36}
        height={36}
        className="size-9 rounded-full border border-[#E4E7EC] object-cover"
        unoptimized
      />
    );
  }
  return (
    <span className="flex size-9 items-center justify-center rounded-full border border-[#E4E7EC] bg-[#F4F4F5] font-sans text-xs font-semibold text-[#52525B]">
      {getInitials(fullName, "")}
    </span>
  );
}

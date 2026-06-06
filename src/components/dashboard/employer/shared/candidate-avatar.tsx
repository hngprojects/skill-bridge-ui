import Image from "next/image";

import { getInitials } from "@/components/dashboard/nav-utils";
import { cn } from "@/lib/utils";

type CandidateAvatarProps = {
  avatarUrl: string | null;
  fullName: string;
  className?: string;
};

export function CandidateAvatar({
  avatarUrl,
  fullName,
  className,
}: CandidateAvatarProps) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={fullName}
        width={36}
        height={36}
        className={cn(
          "size-9 rounded-full border border-[#E4E7EC] object-cover",
          className,
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex size-9 items-center justify-center rounded-full border border-[#E4E7EC] bg-[#F4F4F5] font-sans text-xs font-semibold text-[#52525B]",
        className,
      )}
    >
      {getInitials(fullName, "")}
    </span>
  );
}

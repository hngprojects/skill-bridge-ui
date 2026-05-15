"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  onJoinClick: () => void;
};

const SiteHeader = ({ onJoinClick }: Props) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#DBDBDB] bg-[#f5f5f5]/70 backdrop-blur-lg supports-backdrop-filter:bg-[#f5f5f5]/60">
      <div className="mx-auto flex h-18 w-full items-center justify-between px-6 sm:px-15">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo/logo-with-text.svg"
            alt="SkillBridge"
            width={168}
            height={56}
            className="h-10 w-auto sm:h-14"
            priority
          />
        </Link>
        <Button
          type="button"
          onClick={onJoinClick}
          className="h-9 rounded-md border bg-primary-900 px-3 text-xs font-semibold text-primary-foreground hover:bg-primary-900/70 sm:h-10 sm:rounded-lg sm:border-[0.6px] sm:px-4 sm:text-base"
        >
          Join the Waitlist
        </Button>
      </div>
    </header>
  );
};

export default SiteHeader;

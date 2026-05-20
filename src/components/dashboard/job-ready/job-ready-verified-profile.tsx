import Link from "next/link";
import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

export function JobReadyVerifiedProfile() {
  return (
    <section className="p-6 flex flex-col gap-0 w-full border border-border rounded-2xl bg-[#FAFAFA] text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[18px] font-bold tracking-tight">
          Verified profile
        </h2>
        <Link
          href="#"
          className="flex items-center text-foreground text-[15px] font-medium group label shrink-0"
        >
          <span className="underline underline-offset-4 decoration-gray-900">
            See full profile
          </span>
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Avatar */}
      <div className="mb-6">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="bg-[#E5E5E5]">
            <Image
              src="/assets/user.svg"
              alt="user-icon"
              width={32}
              height={32}
              className="size-14 text-white"
            />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col mb-2">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-[32px] font-bold tracking-tight text-gray-900 leading-none">
            Alex Smith
          </h3>
          <Badge className="bg-[#34A853] hover:bg-[#34A853]/90 text-white rounded-sm px-1.5 py-3.5 text-[12px] font-bold tracking-wider uppercase border-none shadow-none mt-1">
            Verified Talent
          </Badge>
        </div>
        <p className="text-[20px] text-gray-800 mb-2 font-normal">
          Frontend Developer
        </p>
        <p className="text-[#A38A40] text-[15px] font-normal tracking-tight">
          Top 1% Job Ready talent in selected role
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-3 text-[15px] text-[#4B5563]">
        <span className="font-normal">Verified by CredLane</span>
        <Separator
          orientation="vertical"
          className="h-4 bg-[#D1D5DB] hidden sm:block"
        />
        <span className="font-normal">Profile verified on May 19, 2026</span>
      </div>
    </section>
  );
}

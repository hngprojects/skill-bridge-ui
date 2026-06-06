"use client";

import Image from "next/image";
import { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { EmployerRoleStatus } from "@/types/api/employer-roles";

const BIG_BRIEFCASE = "/assets/employer-roles/big-briefcase.svg";
const SMALL_BRIEFCASE = "/assets/employer-roles/small-briefcase.svg";

export function EmptyRolesState(props: { onCreateRole: () => void }) {
  const [activeTab, setActiveTab] = useState<EmployerRoleStatus>("active");

  return (
    <>
      <section className="rounded-3xl border border-[#EAECF0] bg-[#F2F4F7] px-5 py-6 sm:px-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-3">
            <h2 className="text-xl font-semibold leading-tight text-[#0F172A]">
              Need role-based assessments for your team?
            </h2>
            <p className="max-w-lg text-sm leading-6 text-[#475467]">
              Create customized assessments tailored to your roles and evaluate
              talents with confidence.
            </p>
            <Button
              type="button"
              size="lg"
              className="h-10 rounded-xl bg-[#111827] px-5 text-sm font-semibold text-white hover:bg-[#111827]/90"
              onClick={props.onCreateRole}
            >
              Create a Role
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex h-32 w-full min-w-56 max-w-72 items-center justify-center rounded-[28px] pt-7 text-[#5B6FD8]">
              <Image
                src={BIG_BRIEFCASE}
                alt="My roles illustration"
                width={144}
                height={144}
                className="h-36 w-36 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#98A2B3]" />
            <Input
              value=""
              readOnly
              placeholder="Search role title, category"
              className="h-10 rounded-full border-[#E5E7EB] bg-white pl-9 text-sm placeholder:text-[#98A2B3]"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("active")}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "active"
                  ? "bg-[#F2F4F7] text-[#111827]"
                  : "border border-[#D0D5DD] bg-white text-[#667085]",
              )}
            >
              Active (0)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("closed")}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "closed"
                  ? "bg-[#F2F4F7] text-[#111827]"
                  : "border border-[#D0D5DD] bg-white text-[#667085]",
              )}
            >
              Closed (0)
            </button>
          </div>
        </div>

        <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl">
            <Image
              src={SMALL_BRIEFCASE}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>
          <p className="mt-4 text-base font-semibold text-[#101828]">
            No Roles created
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#667085]">
            Once you start creating roles, your activity and report will appear
            here.
          </p>
        </div>
      </section>
    </>
  );
}

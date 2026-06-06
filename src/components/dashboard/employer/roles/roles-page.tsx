"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CreateRoleDialog } from "@/components/dashboard/employer/roles/create-role-dialog";
import { EmptyRolesState } from "@/components/dashboard/employer/roles/empty-roles-state";
import { FilledRolesState } from "@/components/dashboard/employer/roles/filled-roles-state";
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";
import { useEmployerRolesStore } from "@/stores/employer-roles-store";
import type { CreateRoleValues } from "@/types/api/employer-roles";

export function EmployerRolesPage() {
  const router = useRouter();
  const { userId } = useSessionUserProfile();
  const rolesByUser = useEmployerRolesStore((s) => s.rolesByUser);
  const roles = rolesByUser[userId] ?? [];

  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);

  const handleDialogContinue = (values: CreateRoleValues) => {
    const params = new URLSearchParams({
      title: values.roleTitle.trim(),
      category: values.category,
      companyUrl: values.companyUrl.trim(),
    });
    router.push(`/e/roles/create?${params.toString()}`);
  };

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-8 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold leading-tight text-[#101828]">
              My Roles
            </h1>
            <p className="text-sm text-[#667085]">
              Manage your open roles and track candidate offers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/e/dashboard"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#111827] underline underline-offset-4"
            >
              Back to overview
            </Link>
          </div>
        </div>

        {roles.length > 0 ? (
          <FilledRolesState
            roles={roles}
            onCreateRole={() => setIsCreateRoleOpen(true)}
          />
        ) : (
          <EmptyRolesState onCreateRole={() => setIsCreateRoleOpen(true)} />
        )}
      </div>

      <CreateRoleDialog
        open={isCreateRoleOpen}
        onOpenChange={setIsCreateRoleOpen}
        onCreateRole={handleDialogContinue}
      />
    </>
  );
}

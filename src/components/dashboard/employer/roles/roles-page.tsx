"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

import {
  CreateRoleDialog,
  type CreateRoleValues,
} from "@/components/dashboard/employer/roles/create-role-dialog";
import { EmptyRolesState } from "@/components/dashboard/employer/roles/empty-roles-state";
import { FilledRolesState } from "@/components/dashboard/employer/roles/filled-roles-state";
import {
  useEmployerRolesStore,
  type EmployerRoleItem,
} from "@/stores/employer-roles-store";

function formatRequirement(values: CreateRoleValues) {
  return values.companyName.trim().length > 0
    ? `${values.category} • ${values.companyName}`
    : values.category;
}

export function EmployerRolesPage() {
  const { data: session } = useSession();
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const rolesByUser = useEmployerRolesStore((state) => state.rolesByUser);
  const addRole = useEmployerRolesStore((state) => state.addRole);

  const userId = session?.user?.id ?? "";
  const roles = userId ? (rolesByUser[userId] ?? []) : [];

  const handleCreateRole = (values: CreateRoleValues) => {
    if (!userId) return;

    const newRole: EmployerRoleItem = {
      id: `${values.roleTitle}-${Date.now()}`,
      title: values.roleTitle.trim(),
      status: "active",
      offersSent: 0,
      requirements: formatRequirement(values),
      createdAt: "Created just now",
    };

    addRole(userId, newRole);
    setIsCreateRoleOpen(false);
  };

  const hasCreatedRoles = roles.length > 0;

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-8 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold leading-tight text-[#101828]">
              My Roles
            </h1>
            <p className="text-sm text-[#667085]">
              Placeholder for the page that shows all roles employer has
              created.
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

        {hasCreatedRoles ? (
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
        onCreateRole={handleCreateRole}
      />
    </>
  );
}

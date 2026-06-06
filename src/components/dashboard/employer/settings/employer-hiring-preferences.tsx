"use client";

import { useMemo, useState } from "react";

import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  EMPLOYER_EXPERIENCE_LEVEL_OPTIONS,
  EMPLOYER_HIRING_COUNT_OPTIONS,
  EMPLOYER_JOINING_ROLES,
  EMPLOYER_TALENT_ROLE_OPTIONS,
  type EmployerHiringCountRange,
  type EmployerJoiningRoleId,
  type EmployerRoleTrackId,
} from "@/constants/employer-onboarding";
import { useEmployerProfile, useUpdateEmployerProfile } from "@/hooks/api";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { EmployerExperienceLevel } from "@/types/api";

type HiringDraft = {
  joiningAs?: EmployerJoiningRoleId;
  hiringRoles?: EmployerRoleTrackId[];
  experienceLevels?: EmployerExperienceLevel[];
  hiringCount?: EmployerHiringCountRange | "";
};

function sameArray<T extends string>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

export function EmployerHiringPreferences() {
  const { data: profile, isLoading, isError, refetch } = useEmployerProfile();
  const { mutateAsync: updateProfile, isPending } = useUpdateEmployerProfile();

  // Same "draft over server" pattern as the company profile section.
  const [draft, setDraft] = useState<HiringDraft>({});

  const joiningAs: EmployerJoiningRoleId =
    draft.joiningAs ?? profile?.joiningAs ?? "recruiter";
  const hiringRoles: EmployerRoleTrackId[] =
    draft.hiringRoles ?? profile?.hiringRoles ?? [];
  const experienceLevels: EmployerExperienceLevel[] =
    draft.experienceLevels ?? profile?.preferredExperienceLevels ?? [];
  const hiringCount: EmployerHiringCountRange | "" =
    draft.hiringCount ?? profile?.hiringCount ?? "";

  const dirty = useMemo(() => {
    if (!profile) return false;
    return (
      (draft.joiningAs !== undefined &&
        draft.joiningAs !== profile.joiningAs) ||
      (draft.hiringRoles !== undefined &&
        !sameArray(draft.hiringRoles, profile.hiringRoles)) ||
      (draft.experienceLevels !== undefined &&
        !sameArray(
          draft.experienceLevels,
          profile.preferredExperienceLevels,
        )) ||
      (draft.hiringCount !== undefined &&
        draft.hiringCount !== (profile.hiringCount ?? ""))
    );
  }, [profile, draft]);

  if (isLoading) {
    return <Skeleton className="h-96 w-full rounded-2xl" />;
  }

  if (isError || !profile) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-white p-5">
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t load your hiring preferences. Please try again.
        </p>
        <Button type="button" variant="secondary" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const handleSave = async () => {
    if (!dirty) return;
    try {
      await updateProfile({
        employerType: joiningAs,
        hiringRoles,
        preferredExperienceLevels: experienceLevels,
        hiringCount: hiringCount === "" ? null : hiringCount,
      });
      setDraft({});
      appToast.success("Hiring preferences updated.");
    } catch (error) {
      appToast.error(authFailureMessage(error));
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-white p-5">
      <div>
        <h2 className="text-base font-semibold text-foreground">
          Hiring preferences
        </h2>
        <p className="text-xs text-muted-foreground">
          Tells us who you&apos;re hiring and at what level.
        </p>
      </div>

      <div className="flex w-full flex-col gap-1.5">
        <Label className="text-sm font-medium text-foreground">
          I am joining as a
        </Label>
        <RadioGroup
          value={joiningAs}
          onValueChange={(value) =>
            setDraft((d) => ({
              ...d,
              joiningAs: value as EmployerJoiningRoleId,
            }))
          }
          className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {EMPLOYER_JOINING_ROLES.map((role) => {
            const selected = joiningAs === role.id;
            return (
              <Label
                key={role.id}
                htmlFor={`emp-settings-role-${role.id}`}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-4 rounded-[5px] border bg-card px-4 py-2.5 text-left text-sm font-medium text-foreground shadow-sm transition-colors",
                  selected
                    ? "border-primary ring-1 ring-primary/20"
                    : "border-border hover:border-muted-foreground/30",
                )}
              >
                <span className="min-w-0 flex-1">{role.label}</span>
                <RadioGroupItem
                  value={role.id}
                  id={`emp-settings-role-${role.id}`}
                  className="shrink-0"
                />
              </Label>
            );
          })}
        </RadioGroup>
      </div>

      <FormInput
        mode="select"
        selection="multiple"
        label="Roles you're hiring for"
        placeholder="Select role(s)"
        options={EMPLOYER_TALENT_ROLE_OPTIONS}
        value={hiringRoles}
        onValueChange={(v: string[]) =>
          setDraft((d) => ({ ...d, hiringRoles: v as EmployerRoleTrackId[] }))
        }
      />

      <FormInput
        mode="select"
        selection="multiple"
        label="Preferred experience levels"
        placeholder="Select level(s)"
        options={EMPLOYER_EXPERIENCE_LEVEL_OPTIONS}
        value={experienceLevels}
        onValueChange={(v: string[]) =>
          setDraft((d) => ({
            ...d,
            experienceLevels: v as EmployerExperienceLevel[],
          }))
        }
      />

      <FormInput
        mode="select"
        label="How many talents are you looking to hire?"
        placeholder="Select amount"
        options={EMPLOYER_HIRING_COUNT_OPTIONS}
        value={hiringCount}
        onValueChange={(v: string) =>
          setDraft((d) => ({
            ...d,
            hiringCount: v as EmployerHiringCountRange,
          }))
        }
      />

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleSave}
          disabled={!dirty || isPending}
        >
          {isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}

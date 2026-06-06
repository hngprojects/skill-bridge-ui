"use client";

import { useMemo, useState } from "react";

import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  EMPLOYER_COMPANY_SIZE_OPTIONS,
  EMPLOYER_INDUSTRY_OPTIONS,
  EMPLOYER_REGION_OPTIONS,
  type EmployerCompanySize,
  type EmployerRegion,
} from "@/constants/employer-onboarding";
import { useEmployerProfile, useUpdateEmployerProfile } from "@/hooks/api";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";

import { EmployerVerifiedBadge } from "./employer-verified-badge";
import { RestrictedField } from "./restricted-field";

type DetailsDraft = {
  industry?: string;
  companySize?: EmployerCompanySize;
  region?: EmployerRegion;
};

function isParsableUrl(value: string): boolean {
  try {
    const url = value.startsWith("http") ? value : `https://${value}`;
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}

export function EmployerCompanyProfile() {
  const { data: profile, isLoading, isError, refetch } = useEmployerProfile();
  const { mutateAsync: updateProfile, isPending } = useUpdateEmployerProfile();

  // Local "draft" sits on top of the server value — keys absent mean "use the
  // server value". This avoids a useEffect to sync state with the fetch result.
  const [draft, setDraft] = useState<DetailsDraft>({});

  const industry = draft.industry ?? profile?.industry ?? "";
  const companySize: EmployerCompanySize | "" =
    draft.companySize ?? profile?.companySize ?? "";
  const region: EmployerRegion | "" = draft.region ?? profile?.region ?? "";

  const sectionDirty = useMemo(() => {
    if (!profile) return false;
    return (
      (draft.industry !== undefined && draft.industry !== profile.industry) ||
      (draft.companySize !== undefined &&
        draft.companySize !== profile.companySize) ||
      (draft.region !== undefined && draft.region !== profile.region)
    );
  }, [profile, draft]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-white p-5">
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t load your company profile. Please try again.
        </p>
        <Button type="button" variant="secondary" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const handleRestrictedSave = async (
    field: "companyName" | "companyWebsite" | "linkedinCompanyPageUrl",
    value: string,
  ) => {
    try {
      const payload =
        field === "companyName"
          ? { companyName: value.trim() }
          : { [field]: normalizeUrl(value) };
      await updateProfile(payload);
      appToast.success("Saved.");
    } catch (error) {
      appToast.error(authFailureMessage(error));
      throw error;
    }
  };

  const handleSaveSection = async () => {
    if (!sectionDirty) return;
    try {
      await updateProfile({
        industry,
        companySize: companySize as EmployerCompanySize,
        region: region as EmployerRegion,
      });
      setDraft({});
      appToast.success("Company profile updated.");
    } catch (error) {
      appToast.error(authFailureMessage(error));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Company identity
            </h2>
            <p className="text-xs text-muted-foreground">
              These fields are locked for 180 days after each change.
            </p>
          </div>
          <EmployerVerifiedBadge />
        </div>

        <div className="flex flex-col gap-5">
          <RestrictedField
            label="Company name"
            fieldName="Company name"
            value={profile.companyName}
            meta={profile.restrictedFields.companyName}
            placeholder="Acme Inc."
            isSaving={isPending}
            validate={(next) => {
              if (!next.trim()) return "Required";
              if (!/[a-zA-Z]/.test(next))
                return "Company name must contain at least one letter";
              return null;
            }}
            onSave={(next) => handleRestrictedSave("companyName", next)}
          />
          <RestrictedField
            label="Company website"
            fieldName="Company website"
            value={profile.companyWebsite}
            meta={profile.restrictedFields.companyWebsite}
            placeholder="https://company.com"
            isSaving={isPending}
            validate={(next) =>
              !next
                ? "Required"
                : isParsableUrl(next)
                  ? null
                  : "Enter a valid URL"
            }
            onSave={(next) => handleRestrictedSave("companyWebsite", next)}
          />
          <RestrictedField
            label="LinkedIn company page"
            fieldName="LinkedIn URL"
            value={profile.linkedinCompanyPageUrl}
            meta={profile.restrictedFields.linkedinCompanyPageUrl}
            placeholder="https://linkedin.com/company/acme"
            isSaving={isPending}
            validate={(next) =>
              !next || isParsableUrl(next) ? null : "Enter a valid URL"
            }
            onSave={(next) =>
              handleRestrictedSave("linkedinCompanyPageUrl", next)
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-5">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Company details
          </h2>
          <p className="text-xs text-muted-foreground">
            These help us route the right talents to your roles.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormInput
            mode="select"
            label="Industry"
            placeholder="Select an industry"
            options={EMPLOYER_INDUSTRY_OPTIONS}
            value={industry}
            onValueChange={(v: string) =>
              setDraft((d) => ({ ...d, industry: v }))
            }
          />
          <FormInput
            mode="select"
            label="Company size"
            placeholder="Select size"
            options={EMPLOYER_COMPANY_SIZE_OPTIONS}
            value={companySize}
            onValueChange={(v: string) =>
              setDraft((d) => ({ ...d, companySize: v as EmployerCompanySize }))
            }
          />
          <FormInput
            mode="select"
            label="Region"
            placeholder="Select region"
            options={EMPLOYER_REGION_OPTIONS}
            value={region}
            onValueChange={(v: string) =>
              setDraft((d) => ({ ...d, region: v as EmployerRegion }))
            }
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleSaveSection}
            disabled={!sectionDirty || isPending}
          >
            {isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

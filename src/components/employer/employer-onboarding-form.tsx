"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  EMPLOYER_COMPANY_SIZE_OPTIONS,
  EMPLOYER_HIRING_COUNT_OPTIONS,
  EMPLOYER_INDUSTRY_OPTIONS,
  EMPLOYER_JOINING_ROLES,
  EMPLOYER_REGION_OPTIONS,
  EMPLOYER_TALENT_ROLE_OPTIONS,
  type EmployerJoiningRoleId,
} from "@/constants/employer-onboarding";
import { useEmployerOnboarding } from "@/hooks/api/use-employer";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import {
  employerOnboardingProfileSchema,
  type EmployerOnboardingProfileValues,
} from "@/types/form-schema";

function EmployerOnboardingForm() {
  const router = useRouter();
  const { mutateAsync: completeOnboarding, isPending } =
    useEmployerOnboarding();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(employerOnboardingProfileSchema),
    // `onChange` so `isValid` updates live as the user fills the form — drives
    // the disabled state on the submit button below.
    mode: "onChange",
    defaultValues: {
      companyName: "",
      companyWebsite: "",
      industry: "",
      linkedinCompanyPageUrl: "",
      desiredRoles: [],
    },
  });

  const onSubmit = async (data: EmployerOnboardingProfileValues) => {
    const companyWebsite = data.companyWebsite.startsWith("http")
      ? data.companyWebsite
      : `https://${data.companyWebsite}`;

    const linkedinCompanyPageUrl = data.linkedinCompanyPageUrl?.trim()
      ? data.linkedinCompanyPageUrl.startsWith("http")
        ? data.linkedinCompanyPageUrl
        : `https://${data.linkedinCompanyPageUrl}`
      : undefined;

    try {
      await completeOnboarding({
        joiningAs: data.joiningAs,
        companyName: data.companyName,
        companyWebsite,
        industry: data.industry,
        companySize: data.companySize,
        region: data.region,
        linkedinCompanyPageUrl,
        desiredRoles: data.desiredRoles,
        hiringCountRange: data.hiringCountRange,
      });
      router.push("/e/dashboard");
      router.refresh();
    } catch (error) {
      appToast.error(authFailureMessage(error));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full min-w-0 flex-col gap-6 font-sans"
    >
      <Controller
        name="joiningAs"
        control={control}
        render={({ field }) => (
          <div className="flex w-full flex-col gap-1.5">
            <Label className="inline-flex items-start gap-0.5 font-sans text-base font-medium text-foreground">
              I am joining as a
              <span aria-hidden className="text-error">
                *
              </span>
              <span className="sr-only"> (required)</span>
            </Label>
            <RadioGroup
              value={field.value ?? ""}
              onValueChange={(value) =>
                field.onChange(value as EmployerJoiningRoleId)
              }
              className="grid w-full grid-cols-3 gap-3"
            >
              {EMPLOYER_JOINING_ROLES.map((role) => {
                const selected = field.value === role.id;
                return (
                  <Label
                    key={role.id}
                    htmlFor={`employer-role-${role.id}`}
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
                      id={`employer-role-${role.id}`}
                      className="shrink-0"
                    />
                  </Label>
                );
              })}
            </RadioGroup>
            {errors.joiningAs ? (
              <p className="font-sans text-sm text-error" role="alert">
                {errors.joiningAs.message}
              </p>
            ) : null}
          </div>
        )}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput
          label="Company name"
          required
          requiredMark
          placeholder="Acme Inc."
          error={errors.companyName?.message}
          {...register("companyName")}
        />

        <FormInput
          label="Company website"
          required
          requiredMark
          placeholder="https://company.com"
          error={errors.companyWebsite?.message}
          {...register("companyWebsite")}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Controller
          name="industry"
          control={control}
          render={({ field }) => (
            <FormInput
              mode="select"
              label="Industry"
              required
              requiredMark
              placeholder="Select an industry"
              options={EMPLOYER_INDUSTRY_OPTIONS}
              value={field.value ?? ""}
              onValueChange={field.onChange}
              error={errors.industry?.message}
            />
          )}
        />

        <Controller
          name="companySize"
          control={control}
          render={({ field }) => (
            <FormInput
              mode="select"
              label="Company size"
              required
              requiredMark
              placeholder="Select your company size"
              options={EMPLOYER_COMPANY_SIZE_OPTIONS}
              value={field.value ?? ""}
              onValueChange={field.onChange}
              error={errors.companySize?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Controller
          name="region"
          control={control}
          render={({ field }) => (
            <FormInput
              mode="select"
              label="Region"
              required
              requiredMark
              placeholder="Select region"
              options={EMPLOYER_REGION_OPTIONS}
              value={field.value ?? ""}
              onValueChange={field.onChange}
              error={errors.region?.message}
            />
          )}
        />

        <FormInput
          label="LinkedIn company page URL"
          placeholder="https://linkedin.com/company/acme"
          error={errors.linkedinCompanyPageUrl?.message}
          {...register("linkedinCompanyPageUrl")}
        />
      </div>

      <Controller
        name="desiredRoles"
        control={control}
        render={({ field }) => (
          <FormInput
            mode="select"
            selection="multiple"
            label="Which role(s) are you looking to hire for?"
            required
            requiredMark
            placeholder="Select role(s)"
            options={EMPLOYER_TALENT_ROLE_OPTIONS}
            value={field.value}
            onValueChange={field.onChange}
            error={errors.desiredRoles?.message}
          />
        )}
      />

      <Controller
        name="hiringCountRange"
        control={control}
        render={({ field }) => (
          <FormInput
            mode="select"
            label="How many talents are you looking to hire?"
            placeholder="Select amount"
            options={EMPLOYER_HIRING_COUNT_OPTIONS}
            value={field.value ?? ""}
            onValueChange={field.onChange}
            error={errors.hiringCountRange?.message}
          />
        )}
      />

      <Button
        type="submit"
        disabled={isPending || !isValid}
        className="w-full rounded-lg p-5"
      >
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}

export { EmployerOnboardingForm };

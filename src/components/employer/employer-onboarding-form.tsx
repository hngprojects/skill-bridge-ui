"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  EMPLOYER_HIRING_COUNT_OPTIONS,
  EMPLOYER_JOINING_ROLES,
  EMPLOYER_REGION_OPTIONS,
  EMPLOYER_TALENT_ROLE_OPTIONS,
  type EmployerJoiningRoleId,
} from "@/constants/employer-onboarding";
import { trackIdsToApiRoleTracks } from "@/constants/talent-onboarding";
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employerOnboardingProfileSchema),
    defaultValues: {
      desiredRoles: [],
      companyWebsite: "",
    },
  });

  const onSubmit = async (data: EmployerOnboardingProfileValues) => {
    const companyWebsite = data.companyWebsite.startsWith("http")
      ? data.companyWebsite
      : `https://${data.companyWebsite}`;

    try {
      await completeOnboarding({
        joiningAs: data.joiningAs,
        desiredRoles: trackIdsToApiRoleTracks(data.desiredRoles),
        region: data.region,
        hiringCountRange: data.hiringCountRange,
        companyWebsite,
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
            <Label className="font-sans text-base font-medium text-foreground">
              I am joining as a
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

      <Controller
        name="desiredRoles"
        control={control}
        render={({ field }) => (
          <FormInput
            mode="select"
            selection="multiple"
            label="Which role(s) are you looking to hire for?"
            required
            placeholder="Select role(s)"
            options={EMPLOYER_TALENT_ROLE_OPTIONS}
            value={field.value}
            onValueChange={field.onChange}
            error={errors.desiredRoles?.message}
          />
        )}
      />

      <Controller
        name="region"
        control={control}
        render={({ field }) => (
          <FormInput
            mode="select"
            label="Select your region"
            required
            placeholder="Select region"
            options={EMPLOYER_REGION_OPTIONS}
            value={field.value ?? ""}
            onValueChange={field.onChange}
            error={errors.region?.message}
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
            required
            placeholder="Select amount"
            options={EMPLOYER_HIRING_COUNT_OPTIONS}
            value={field.value ?? ""}
            onValueChange={field.onChange}
            error={errors.hiringCountRange?.message}
          />
        )}
      />

      <FormInput
        label="Company website"
        required
        placeholder="https://company.com"
        error={errors.companyWebsite?.message}
        {...register("companyWebsite")}
      />

      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg p-5"
      >
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}

export { EmployerOnboardingForm };

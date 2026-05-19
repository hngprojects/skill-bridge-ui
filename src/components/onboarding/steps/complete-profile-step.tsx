"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { REGIONS, EDUCATION_LEVELS } from "@/constants/complete-profile";
import { useSessionUserProfile } from "@/hooks/use-session-user-profile";
import { ProfileImageUploader } from "../complete-profile/profile-image-holder";
import { ReadOnlyField } from "../complete-profile/read-only-field";
import { SelectField } from "../complete-profile/select-field";
import { LinkedInField } from "../complete-profile/linkedin-field";

interface ProfileFormValues {
  region: string;
  education: string;
  linkedin: string;
  profileImage?: File;
}

type CompleteProfileStepProps = {
  onReadyChange?: (ready: boolean) => void;
  onValueChange?: (values: {
    region: string;
    education: string;
    linkedin: string;
  }) => void;
};

const CompleteProfileStep = ({
  onReadyChange,
  onValueChange,
}: CompleteProfileStepProps) => {
  const { fullName, email } = useSessionUserProfile();

  const { register, setValue, control } = useForm<ProfileFormValues>({
    defaultValues: { region: "", education: "", linkedin: "" },
  });

  const region = useWatch({ control, name: "region" });
  const education = useWatch({ control, name: "education" });
  const linkedin = useWatch({ control, name: "linkedin" });

  useEffect(() => {
    onReadyChange?.(Boolean(region && education));
    onValueChange?.({ region, education, linkedin });
  }, [region, education, linkedin, onReadyChange, onValueChange]);

  return (
    <form
      className="flex flex-col items-start gap-6 w-full max-w-2xl font-sans"
      onSubmit={(e) => e.preventDefault()}
    >
      <ProfileImageUploader
        onChange={(file) => setValue("profileImage", file)}
      />

      <div className="flex flex-col w-full gap-7">
        <ReadOnlyField label="Full name" value={fullName} />
        <ReadOnlyField label="Email" value={email} />
        <SelectField
          label="Select your region"
          options={REGIONS}
          onChange={(val) => setValue("region", val)}
        />
        <SelectField
          label="What is your highest level of education?"
          options={EDUCATION_LEVELS}
          onChange={(val) => setValue("education", val)}
        />
        <LinkedInField register={register} />
      </div>
    </form>
  );
};

export default CompleteProfileStep;

"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { REGIONS, EDUCATION_LEVELS } from "@/constants/complete-profile";
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
};

const CompleteProfileStep = ({ onReadyChange }: CompleteProfileStepProps) => {
  const { register, setValue, handleSubmit, control } =
    useForm<ProfileFormValues>({
      defaultValues: { region: "", education: "", linkedin: "" },
    });

  const region = useWatch({ control, name: "region" });
  const education = useWatch({ control, name: "education" });

  useEffect(() => {
    onReadyChange?.(Boolean(region && education));
  }, [region, education, onReadyChange]);

  return (
    <form
      onSubmit={handleSubmit((data) => console.log("Form Data:", data))}
      className="flex flex-col items-start gap-6 w-full max-w-2xl font-sans"
    >
      <ProfileImageUploader
        onChange={(file) => setValue("profileImage", file)}
      />

      <div className="flex flex-col w-full gap-7">
        <ReadOnlyField label="Full name" value="Alex Smith" />
        <ReadOnlyField label="Email" value="alexsmith75@gmail.com" />
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

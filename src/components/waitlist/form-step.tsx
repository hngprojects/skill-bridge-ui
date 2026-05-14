"use client";

import { useState, useTransition, SubmitEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudienceOption from "./audience-option";
import Field from "./field";
import SelectInput from "./select-input";
import SocialFooter from "./social-footer";
import TextInput from "./text-input";
import { addToWaitlistSchema } from "@/types/waitlist";
import { roles, sources } from "./data";
import { addToWaitlist } from "@/actions/waitlist.actions";

const FormStep = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: () => void;
  onCancel: () => void;
}) => {
  const [joiningAs, setJoiningAs] = useState<"talent" | "employer">("talent");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const parsed = addToWaitlistSchema.safeParse({
      joiningAs,
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      preferredRole: formData.get("preferredRole"),
      referralSource: formData.get("referralSource"),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please fill all fields");
      return;
    }

    startTransition(async () => {
      const result = await addToWaitlist(parsed.data);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onSubmit();
    });
  }

  return (
    <div className="flex flex-1 flex-col px-5 py-6 sm:px-5 sm:py-5">
      <header className="text-left sm:text-left">
        <h2 className="text-2xl font-bold leading-7.5 text-[#151515] sm:text-[28px] sm:leading-8.75">
          Join the SkillBridge waitlist
        </h2>
        <p className="mt-2.25 text-sm font-normal leading-4.5 tracking-[0.016em] text-[#151515]">
          Tell us a little about yourself so we can notify you when early access
          opens.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-5.5 sm:mt-7 sm:gap-7"
      >
        <fieldset className="flex flex-col gap-1.25" disabled={isPending}>
          <legend className="text-base font-semibold leading-5 tracking-[0.017em] text-[#151515]">
            I am joining Skillbridge as
          </legend>
          <div className="mt-1.25 flex gap-1.25">
            <AudienceOption
              label="Talent"
              checked={joiningAs === "talent"}
              onChange={() => setJoiningAs("talent")}
            />
            <AudienceOption
              label="Employer"
              checked={joiningAs === "employer"}
              onChange={() => setJoiningAs("employer")}
            />
          </div>
        </fieldset>

        <Field label="Full name" htmlFor="full-name">
          <TextInput
            id="full-name"
            name="fullName"
            placeholder="Enter your full name"
            autoComplete="name"
            disabled={isPending}
          />
        </Field>

        <Field label="Email" htmlFor="email">
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            disabled={isPending}
          />
        </Field>

        <Field label="What is your preferred role" htmlFor="role">
          <SelectInput
            id="preferredRole"
            name="preferredRole"
            defaultValue="Frontend Developer"
            disabled={isPending}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="How did you hear about us?" htmlFor="source">
          <SelectInput
            id="referralSource"
            name="referralSource"
            defaultValue="Facebook"
            disabled={isPending}
          >
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </SelectInput>
        </Field>

        {error && (
          <p
            role="alert"
            className="text-sm font-medium leading-4.5 tracking-[0.016em] text-red-600"
          >
            {error}
          </p>
        )}

        <p className="text-xs font-normal leading-3.75 tracking-[0.017em] text-[#64748B] sm:text-base sm:font-semibold sm:leading-5 sm:text-center">
          By joining, you agree to Skillbridge data{" "}
          <a className="font-semibold underline" href="#">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className="font-semibold underline" href="#">
            Privacy Policy.
          </a>
        </p>

        <div className="flex flex-col gap-4 px-6 sm:px-0">
          <Button
            type="submit"
            disabled={isPending}
            className="h-10 w-full rounded-[5.82px] border-[0.44px] border-[#3F7F95] bg-primary-900 text-base font-normal leading-5 tracking-[0.017em] text-white hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-60 sm:mx-auto sm:w-70.5 sm:rounded-lg sm:border-[0.6px] sm:font-semibold"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting…
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="h-[34.55px] w-full rounded-[5.82px] border-[0.2px] border-[#E35151] bg-white text-base font-normal leading-5 tracking-[0.017em] text-[#B01E1E] hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:hidden"
          >
            Cancel
          </Button>
        </div>
      </form>

      <SocialFooter />
    </div>
  );
};

export default FormStep;

"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContactUs } from "@/hooks/api/use-inquiries";
import { authFailureMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { contactFormSchema, type ContactFormValues } from "@/types/form-schema";

const labelClass =
  "inline-flex flex-row items-start gap-0.5 p-0 shadow-none select-none " +
  "font-sans text-base font-medium leading-normal tracking-[0.256px] text-foreground";

const errorClass = "font-sans text-sm font-normal leading-[18px] text-error";

export function ContactForm() {
  const [rootError, setRootError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutateAsync: submitContact, isPending } = useContactUs();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const messageLength = (useWatch({ control, name: "message" }) ?? "").length;

  const onSubmit = async (values: ContactFormValues) => {
    setRootError(null);
    setSuccessMessage(null);
    try {
      await submitContact(values);
      setSuccessMessage("Thanks! Your message has been sent.");
      reset();
    } catch (e) {
      setRootError(authFailureMessage(e));
    }
  };

  return (
    <section className="bg-white px-6 pt-12 pb-8 sm:pt-16">
      <div className="mx-auto w-full max-w-xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Write Us a Message
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 flex flex-col gap-4 font-sans"
        >
          {rootError ? (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {rootError}
            </p>
          ) : null}
          {successMessage ? (
            <p className="rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm text-success">
              {successMessage}
            </p>
          ) : null}

          <FormInput
            label="Full Name"
            required
            requiredMark
            placeholder="John Doe"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <FormInput
            label="Email Address"
            required
            requiredMark
            type="email"
            validateEmail
            placeholder="john@gmail.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <FormInput
            label="Subject"
            required
            requiredMark
            placeholder="Subject"
            error={errors.subject?.message}
            {...register("subject")}
          />

          <div className="flex w-full flex-col items-stretch gap-1.5">
            <Label htmlFor="contact-message" className={labelClass}>
              Message
              <span aria-hidden className="text-error">
                *
              </span>
              <span className="sr-only"> (required)</span>
            </Label>
            <Textarea
              id="contact-message"
              rows={5}
              maxLength={1000}
              placeholder="How can we be of help?"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message
                  ? "contact-message-error"
                  : "contact-message-hint"
              }
              className={cn(
                "min-h-32 rounded-[5px] border border-border bg-background font-sans text-base placeholder:text-muted-foreground",
                "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25",
                "aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/20",
              )}
              {...register("message")}
            />
            <div className="flex items-center justify-between gap-2">
              {errors.message ? (
                <p
                  id="contact-message-error"
                  className={errorClass}
                  role="alert"
                >
                  {errors.message.message}
                </p>
              ) : (
                <p
                  id="contact-message-hint"
                  className="font-sans text-sm text-muted-foreground"
                >
                  Minimum 10 characters
                </p>
              )}
              <span className="font-sans text-sm text-muted-foreground tabular-nums">
                {messageLength}/1000
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || isPending || !isValid}
            className="mt-2 h-12 w-full rounded-lg bg-primary-900 text-sm font-semibold text-white hover:bg-primary-900/90 disabled:opacity-60"
          >
            {isSubmitting || isPending ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
}

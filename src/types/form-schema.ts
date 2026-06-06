import { z } from "zod";

import {
  EMPLOYER_COMPANY_SIZE_VALUES,
  EMPLOYER_DESIRED_ROLE_IDS,
  EMPLOYER_HIRING_COUNT_VALUES,
  EMPLOYER_REGION_VALUES,
} from "@/constants/employer-onboarding";

/** Letters (incl. accented) plus space, hyphen and apostrophe; must start with a letter. */
const NAME_REGEX = /^\p{L}[\p{L}\p{M} '-]*$/u;

/** Shared validator for human-name fields — rejects digits and symbols, min 2 chars. */
function nameField(label: string) {
  return z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .min(2, `${label} must be at least 2 characters.`)
    .max(50, `${label} must be at most 50 characters.`)
    .regex(NAME_REGEX, `${label} can only contain letters.`);
}

export const onboardingFormSchema = z.object({
  firstName: nameField("First name"),
  lastName: nameField("Last name"),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password must be at most 64 characters.")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
    .regex(/[a-z]/, "Password must include at least one lowercase letter.")
    .regex(/[0-9]/, "Password must include at least one number."),
  country: z.string().trim().min(1, "Country is required."),
});

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

export type OnboardingFormErrors = Partial<
  Record<keyof OnboardingFormValues, string>
>;

export const employerOnboardingFormSchema = z.object({
  fullLegalName: nameField("Full legal name"),
  email: z
    .string()
    .min(1, "Company email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(14, "Password must be at least 14 characters")
    .max(64, "Password must be at most 64 characters")
    .regex(/[a-z]/, "Must include a lowercase character")
    .regex(/[A-Z]/, "Must include an uppercase character")
    .regex(/[0-9]/, "Must include a number"),
});

export type EmployerOnboardingFormValues = z.infer<
  typeof employerOnboardingFormSchema
>;

function isParsableUrl(value: string): boolean {
  try {
    const url = value.startsWith("http") ? value : `https://${value}`;
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const employerOnboardingProfileSchema = z.object({
  joiningAs: z.enum(["recruiter", "founder", "agency"], {
    message: "Select how you are joining",
  }),
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name is too long"),
  companyWebsite: z
    .string()
    .trim()
    .min(1, "Company website is required")
    .refine(isParsableUrl, { message: "Enter a valid website URL" }),
  industry: z.string().trim().min(1, "Select an industry"),
  companySize: z.enum(EMPLOYER_COMPANY_SIZE_VALUES, {
    message: "Select your company size",
  }),
  region: z.enum(EMPLOYER_REGION_VALUES, {
    message: "Select your region",
  }),
  linkedinCompanyPageUrl: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || isParsableUrl(value), {
      message: "Enter a valid LinkedIn URL",
    }),
  desiredRoles: z
    .array(z.enum(EMPLOYER_DESIRED_ROLE_IDS))
    .min(1, "Select at least one role"),
  hiringCountRange: z.enum(EMPLOYER_HIRING_COUNT_VALUES).optional(),
});

export type EmployerOnboardingProfileValues = z.infer<
  typeof employerOnboardingProfileSchema
>;

/** UPDATED: Talent Signup Schema with Confirm Password */
export const signupFormSchema = z
  .object({
    firstName: nameField("First name"),
    lastName: nameField("Last name"),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(64, "Password must be at most 64 characters.")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
      .regex(/[a-z]/, "Password must include at least one lowercase letter.")
      .regex(/[0-9]/, "Password must include at least one number."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupFormSchema>;

export type TalentSignup = Pick<
  SignupFormValues,
  "firstName" | "lastName" | "email"
>;

export const emailVerificationCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit confirmation code."),
});

export type EmailVerificationCodeValues = z.infer<
  typeof emailVerificationCodeSchema
>;

export const employerSignupFinalSchema = z
  .object({
    firstName: nameField("First name"),
    lastName: nameField("Last name"),
    email: z.string().email("Please enter a valid work email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(64, "Password must be at most 64 characters.")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
      .regex(/[a-z]/, "Password must include at least one lowercase letter.")
      .regex(/[0-9]/, "Password must include at least one number."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type EmployerSignupFinalValues = z.infer<
  typeof employerSignupFinalSchema
>;

export type EmployerSignup = Pick<
  EmployerSignupFinalValues,
  "firstName" | "lastName" | "email"
>;

export const contactFormSchema = z.object({
  fullName: nameField("Full name").min(
    5,
    "Full name must be at least 5 characters.",
  ),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(5, "Email is required."),
  subject: z.string().trim().min(5, "Subject is required."),
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .min(10, "Message must be at least 10 characters.")
    .max(1000, "Message must be at most 1000 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const signInFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .max(64, "Password must be at most 64 characters."),
  rememberMe: z.boolean().optional(),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export const linkedinUrlSchema = z.url("Enter a valid URL").refine(
  (val) => {
    try {
      const url = new URL(val);
      return (
        (url.hostname === "linkedin.com" ||
          url.hostname === "www.linkedin.com") &&
        /^\/in\/[^/]+/.test(url.pathname)
      );
    } catch {
      return false;
    }
  },
  {
    message:
      "Enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/username)",
  },
);

export const personalWebsiteSchema = z
  .string({ message: "Enter a valid website URL" })
  .refine(
    (val) => {
      try {
        const url = new URL(val);
        if (url.protocol !== "http:" && url.protocol !== "https:") return false;
        const parts = url.hostname.split(".");
        const tld = parts[parts.length - 1];
        return (
          parts.length >= 2 &&
          parts.every((p) => p.length > 0) &&
          tld.length >= 2
        );
      } catch {
        return false;
      }
    },
    { message: "Enter a valid website URL (e.g. https://yoursite.com)" },
  );

import { z } from "zod";

export const onboardingFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
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
  fullLegalName: z.string().min(1, "Full legal name is required"),
  email: z
    .string()
    .min(1, "Company email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(14, "Password must be at least 14 characters")
    .regex(/[a-z]/, "Must include a lowercase character")
    .regex(/[A-Z]/, "Must include an uppercase character")
    .regex(/[0-9]/, "Must include a number"),
});

export type EmployerOnboardingFormValues = z.infer<
  typeof employerOnboardingFormSchema
>;

export const employerOnboardingProfileSchema = z.object({
  joiningAs: z.enum(["recruiter", "founder", "agency"], {
    message: "Select how you are joining",
  }),
  desiredRoles: z.array(z.string()).min(1, "Select at least one role"),
  region: z.string().min(1, "Select your region"),
  hiringCountRange: z.string().min(1, "Select hiring volume"),
  companyWebsite: z
    .string()
    .trim()
    .min(1, "Company website is required")
    .refine(
      (value) => {
        try {
          const url = value.startsWith("http") ? value : `https://${value}`;
          new URL(url);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Enter a valid website URL" },
    ),
});

export type EmployerOnboardingProfileValues = z.infer<
  typeof employerOnboardingProfileSchema
>;

/** UPDATED: Talent Signup Schema with Confirm Password */
export const signupFormSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
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
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    email: z.string().email("Please enter a valid work email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
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
  fullName: z.string().trim().min(1, "Full name is required."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().trim().min(1, "Subject is required."),
  message: z.string().trim().min(1, "Message is required."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const signInFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().optional(),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

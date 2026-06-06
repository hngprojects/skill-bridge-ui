import { z } from "zod";

export const workPreferencesSchema = z.object({
  employmentType: z.string().min(1, "Employment type is required"),
  experience: z.string().min(1, "Experience level is required"),
  education: z.string().min(1, "Education level is required"),
  keyword: z.string().optional(),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  currency: z.string().optional(),
});

export type WorkPreferencesValues = z.infer<typeof workPreferencesSchema>;

import { z } from "zod";

export const createAssessmentDialogSchema = z.object({
  title: z.string().min(1, "Assessment title is required"),
  category: z.string().min(1, "Category is required"),
  passRate: z.number().min(0).max(100),
  deadline: z.date({ message: "Deadline is required" }),
});

export type CreateAssessmentValues = z.infer<
  typeof createAssessmentDialogSchema
>;

import { z } from "zod";

export const createAssessmentDialogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  passRate: z.number().min(0).max(100),
  deadline: z.date({ message: "Deadline is required" }),
  type: z.enum(["internal", "external"]),
});

export type CreateAssessmentValues = z.infer<
  typeof createAssessmentDialogSchema
>;

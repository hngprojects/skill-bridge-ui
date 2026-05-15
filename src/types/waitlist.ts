import { z } from "zod";

const addToWaitlistSchema = z.object({
  joiningAs: z.enum(["talent", "employer"]),
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.email("Enter a valid email"),
  preferredRole: z.string().min(1, "Select a role"),
  referralSource: z.string().min(1, "Select how you heard about us"),
});

type AddToWaitlistDTO = z.infer<typeof addToWaitlistSchema>;

type AddtoWaitlistAPIResponse = {
  success: boolean;
  status_code: number;
  error?: string;
  message: string[] | string;
  statusCode: number;
  path: string;
  timeStamp: string;
};

type AddToWaitlistResult = { ok: true } | { ok: false; error: string };

export type { AddToWaitlistDTO, AddToWaitlistResult, AddtoWaitlistAPIResponse };
export { addToWaitlistSchema };

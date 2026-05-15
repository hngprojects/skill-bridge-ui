"use server";
import type {
  AddtoWaitlistAPIResponse,
  AddToWaitlistDTO,
  AddToWaitlistResult,
} from "@/types/waitlist";

const addToWaitlist = async (
  data: AddToWaitlistDTO,
): Promise<AddToWaitlistResult> => {
  try {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? ""}/waitlist`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const response: AddtoWaitlistAPIResponse = await request.json();
    if (!response.success)
      return {
        ok: false,
        error: Array.isArray(response.message)
          ? response.message[0]
          : response.message,
      };
    return { ok: true };
  } catch (e) {
    console.error("waitlist api error", e);
    return {
      ok: false,
      error: "Network error. Check your connection and retry.",
    };
  }
};

export { addToWaitlist };

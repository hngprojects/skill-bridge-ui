import { publicApi } from "@/lib/api";
import type {
  ApiEnvelope,
  ContactUsInput,
  EmptyData,
  WaitlistInput,
} from "@/types/api";

import { unwrapData } from "./utils";

export async function joinWaitlist(body: WaitlistInput): Promise<EmptyData> {
  const res = await publicApi.post<ApiEnvelope<EmptyData>>("/waitlist", body);
  return unwrapData(res);
}

export async function submitContact(body: ContactUsInput): Promise<EmptyData> {
  const res = await publicApi.post<ApiEnvelope<EmptyData>>("/contact-us", body);
  return unwrapData(res);
}

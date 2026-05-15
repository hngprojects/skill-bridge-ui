"use client";

import { useMutation } from "@tanstack/react-query";

import { joinWaitlist, submitContact } from "@/actions/inquiries";
import type { ContactUsInput, WaitlistInput } from "@/types/api";

export function useWaitlist() {
  return useMutation({
    mutationFn: (body: WaitlistInput) => joinWaitlist(body),
  });
}

export function useContactUs() {
  return useMutation({
    mutationFn: (body: ContactUsInput) => submitContact(body),
  });
}

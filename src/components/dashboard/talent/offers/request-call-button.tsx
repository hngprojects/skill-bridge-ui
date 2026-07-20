"use client";

import { PhoneCall } from "lucide-react";
import { appToast } from "@/lib/toast";
import { authFailureMessage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useRequestCall } from "@/hooks/api/use-talent-offers";

type RequestCallButtonProps = {
  offerId: string;
};

export function RequestCallButton({ offerId }: RequestCallButtonProps) {
  const { mutate: requestCall, isPending } = useRequestCall();

  const handleRequestCall = () => {
    requestCall(offerId, {
      onSuccess: () => {
        appToast.success("Call requested. The employer has been notified.");
      },
      onError: (err: unknown) => {
        appToast.error(authFailureMessage(err));
      },
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleRequestCall}
      disabled={isPending}
      className="h-10 rounded-lg"
    >
      <PhoneCall className="mr-2 size-4" aria-hidden />
      {isPending ? "Requesting..." : "Request a call"}
    </Button>
  );
}

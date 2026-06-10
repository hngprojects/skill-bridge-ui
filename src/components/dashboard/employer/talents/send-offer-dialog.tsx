"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SAVED_ROLES } from "@/constants/employer-saved-roles";

type SendOfferDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
};

export function SendOfferDialog({
  open,
  onOpenChange,
  userId,
}: SendOfferDialogProps) {
  const router = useRouter();
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>();

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) setSelectedRoleId(undefined);
    onOpenChange(nextOpen);
  }

  function handleContinue() {
    if (!selectedRoleId) return;
    onOpenChange(false);
    router.push(`/e/talents/${userId}/offer/${selectedRoleId}`);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl gap-6 rounded-3xl p-6">
        <DialogHeader className="gap-1 text-left">
          <DialogTitle className="text-lg font-bold text-[#151515]">
            Select from saved roles
          </DialogTitle>
          <DialogDescription className="text-base font-light tracking-[0.016em] text-[#151515]">
            Role selected will be attached to talent&apos;s offer
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 rounded-full border border-[#d9d9d9] bg-white px-3 py-2">
          <Search className="size-4.5 shrink-0 text-muted-foreground" />
          <input
            placeholder="Search role title, category"
            className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <ScrollArea className="h-75 pr-3">
          <RadioGroup
            value={selectedRoleId}
            onValueChange={setSelectedRoleId}
            className="gap-4"
          >
            {SAVED_ROLES.map((role) => (
              <label
                key={role.id}
                htmlFor={`send-offer-role-${role.id}`}
                className="flex w-full cursor-pointer items-start gap-4 rounded-lg border border-[#dbdbdb] bg-white p-4"
              >
                <RadioGroupItem
                  value={role.id}
                  id={`send-offer-role-${role.id}`}
                  className="mt-1"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-base font-semibold tracking-[0.017em] text-[#151515]">
                    {role.title}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-light tracking-[0.017em] text-[#151515]">
                    <span>{role.category}</span>
                    <span className="size-0.75 shrink-0 rounded-full bg-[#151515]" />
                    <span className="underline">{role.website}</span>
                  </div>
                </div>
              </label>
            ))}
          </RadioGroup>
        </ScrollArea>

        <Button
          onClick={handleContinue}
          disabled={!selectedRoleId}
          className="mx-auto h-10 w-60 rounded-lg"
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}

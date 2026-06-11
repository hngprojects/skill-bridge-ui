"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

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
import { Skeleton } from "@/components/ui/skeleton";
import { useEmployerRoles } from "@/hooks/api";

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
  const { data: roles, isLoading } = useEmployerRoles({ status: "active" });
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setSelectedRoleId(undefined);
      setSearchQuery("");
    }
    onOpenChange(nextOpen);
  }

  function handleContinue() {
    if (!selectedRoleId) return;
    onOpenChange(false);
    router.push(`/e/talents/${userId}/offer/${selectedRoleId}`);
  }

  function handleCreateNewRole() {
    onOpenChange(false);
    router.push("/e/roles/create");
  }

  const filteredRoles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = roles ?? [];
    if (!query) return list;
    return list.filter(
      (role) =>
        role.title.toLowerCase().includes(query) ||
        role.requirements.toLowerCase().includes(query),
    );
  }, [roles, searchQuery]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl gap-6 rounded-3xl p-6">
        <DialogHeader className="gap-1 text-left">
          <DialogTitle className="text-lg font-bold text-[#151515]">
            Select a role
          </DialogTitle>
          <DialogDescription className="text-base font-light tracking-[0.016em] text-[#151515]">
            The selected role will be attached to the talent&apos;s offer.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 rounded-full border border-[#d9d9d9] bg-white px-3 py-2">
          <Search className="size-4.5 shrink-0 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search role title or requirements"
            className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <ScrollArea className="h-75 pr-3">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : filteredRoles.length > 0 ? (
            <RadioGroup
              value={selectedRoleId}
              onValueChange={setSelectedRoleId}
              className="gap-4"
            >
              {filteredRoles.map((role) => (
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
                    <p className="text-sm font-light tracking-[0.017em] text-[#151515]">
                      {role.requirements}
                    </p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          ) : (
            <div className="flex flex-col items-center gap-3 py-8">
              <p className="text-center text-sm font-light tracking-[0.017em] text-[#757575]">
                {searchQuery.trim()
                  ? "No roles match your search."
                  : "You don't have any active roles yet."}
              </p>
              {!searchQuery.trim() ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCreateNewRole}
                  className="h-9 rounded-lg"
                >
                  Create a new role
                </Button>
              ) : null}
            </div>
          )}
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

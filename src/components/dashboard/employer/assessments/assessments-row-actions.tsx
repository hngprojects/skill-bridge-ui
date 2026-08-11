"use client";

import Link from "next/link";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeactivateEmployerAssessment } from "@/hooks/api/use-employer-assessments";
import { appToast } from "@/lib/toast";
import type { EmployerAssessmentItem } from "@/types/api/employer-assessments";

import { AssessmentInviteModal } from "./assessment-invite-modal";

type AssessmentsRowActionsProps = {
  assessment: EmployerAssessmentItem;
};

export function AssessmentsRowActions({
  assessment,
}: AssessmentsRowActionsProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const { mutate: deactivate, isPending } = useDeactivateEmployerAssessment();

  function handleConfirmDelete() {
    deactivate(assessment.id, {
      onSuccess: () => {
        appToast.success("Assessment removed.");
        setConfirmDeleteOpen(false);
      },
      onError: () => {
        appToast.error("Failed to remove assessment. Please try again.");
      },
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-[#52525B]"
            aria-label={`Actions for ${assessment.title}`}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={4}
          className="w-40 rounded-xl border border-[#E4E7EC] bg-white p-2 shadow-[0_12px_32px_rgba(16,24,40,0.14)]"
        >
          <DropdownMenuItem
            asChild
            className="h-9 cursor-pointer rounded-md px-2 text-sm text-[#344054]"
          >
            <Link href={`/e/assessments/${assessment.id}`}>View</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setShareOpen(true);
            }}
            className="h-9 cursor-pointer rounded-md px-2 text-sm text-[#344054]"
          >
            Share
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setConfirmDeleteOpen(true);
            }}
            className="h-9 cursor-pointer rounded-md px-2 text-sm text-[#B42318]"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AssessmentInviteModal
        open={shareOpen}
        onOpenChange={setShareOpen}
        assessmentId={assessment.id}
      />

      <Dialog
        open={confirmDeleteOpen}
        onOpenChange={(open) => {
          if (!isPending) setConfirmDeleteOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete this assessment?</DialogTitle>
            <DialogDescription>
              This removes &ldquo;{assessment.title}&rdquo; from your active
              assessments. Candidates who already started it keep their results,
              but no one else can be invited to it. This can&apos;t be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmDeleteOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmDelete}
              disabled={isPending}
              className="bg-[#B42318] text-white hover:bg-[#B42318]/90"
            >
              {isPending ? "Deleting…" : "Delete assessment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

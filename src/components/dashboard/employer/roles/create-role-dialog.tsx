"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CreateRoleValues } from "@/types/api/employer-roles";
import { CreateRoleDialogFields } from "./create-role-dialog-fields";

const INITIAL_FORM_VALUES: CreateRoleValues = {
  companyName: "",
  roleTitle: "",
  category: "",
  companyUrl: "",
};

type CreateRoleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateRole: (values: CreateRoleValues) => void;
};

export function CreateRoleDialog({
  open,
  onOpenChange,
  onCreateRole,
}: CreateRoleDialogProps) {
  const [formValues, setFormValues] =
    useState<CreateRoleValues>(INITIAL_FORM_VALUES);

  const isContinueDisabled =
    formValues.companyName.trim().length === 0 ||
    formValues.roleTitle.trim().length === 0 ||
    formValues.category.trim().length === 0;

  const updateField = <K extends keyof CreateRoleValues>(
    key: K,
    value: CreateRoleValues[K],
  ) => {
    setFormValues((current) => ({ ...current, [key]: value }));
  };

  const resetForm = () => setFormValues(INITIAL_FORM_VALUES);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  };

  const handleContinue = () => {
    if (isContinueDisabled) return;
    onCreateRole(formValues);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-110 gap-4 rounded-[24px] p-6">
        <DialogHeader className="gap-1 text-left">
          <DialogTitle className="text-base font-semibold text-[#101828]">
            Create a Role
          </DialogTitle>
          <DialogDescription className="text-xs leading-5 text-[#667085]">
            Quickest way to send offers to your talents
          </DialogDescription>
        </DialogHeader>

        <CreateRoleDialogFields
          formValues={formValues}
          updateField={updateField}
        />

        <DialogFooter className="grid grid-cols-2 gap-3 sm:grid-cols-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-9 rounded-md bg-[#8D8D8D] text-xs text-white hover:bg-[#8D8D8D]/90"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="h-9 rounded-md bg-[#111827] text-xs text-white hover:bg-[#111827]/90"
            disabled={isContinueDisabled}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

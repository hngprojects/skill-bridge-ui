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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CreateRoleValues = {
  companyName: string;
  roleTitle: string;
  category: string;
  companyUrl: string;
};

const CATEGORY_OPTIONS = [
  "Mobile app development",
  "Frontend development",
  "Backend development",
  "Product design",
  "Data analysis",
  "Project management",
];

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

  const resetForm = () => {
    setFormValues(INITIAL_FORM_VALUES);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const handleContinue = () => {
    if (isContinueDisabled) return;
    onCreateRole(formValues);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[440px] gap-4 rounded-[24px] p-6">
        <DialogHeader className="gap-1 text-left">
          <DialogTitle className="text-base font-semibold text-[#101828]">
            Create a Role
          </DialogTitle>
          <DialogDescription className="text-xs leading-5 text-[#667085]">
            Quickest way to send offers to your talents
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="company-name"
              className="text-xs font-medium text-[#344054]"
            >
              Company Name
            </label>
            <Input
              id="company-name"
              value={formValues.companyName}
              onChange={(event) =>
                updateField("companyName", event.target.value)
              }
              placeholder="Enter your company name"
              className="h-10 rounded-lg border-[#D0D5DD] bg-white text-sm placeholder:text-[#98A2B3]"
            />
            <p className="text-[11px] text-[#98A2B3]">
              Placeholder for more info
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="role-title"
              className="text-xs font-medium text-[#344054]"
            >
              Role Title
            </label>
            <Input
              id="role-title"
              value={formValues.roleTitle}
              onChange={(event) => updateField("roleTitle", event.target.value)}
              placeholder="Enter your role title"
              className="h-10 rounded-lg border-[#D0D5DD] bg-white text-sm placeholder:text-[#98A2B3]"
            />
            <p className="text-[11px] text-[#98A2B3]">
              Placeholder for more info
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#344054]">
              Category
            </label>
            <Select
              value={formValues.category}
              onValueChange={(value) => updateField("category", value)}
            >
              <SelectTrigger className="h-10 w-full rounded-lg border-[#D0D5DD] bg-white text-sm text-[#101828] data-placeholder:text-[#98A2B3]">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {CATEGORY_OPTIONS.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[11px] text-[#98A2B3]">
              Placeholder for more info
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="company-url"
              className="text-xs font-medium text-[#344054]"
            >
              Company URL
            </label>
            <Input
              id="company-url"
              value={formValues.companyUrl}
              onChange={(event) =>
                updateField("companyUrl", event.target.value)
              }
              placeholder="Enter your website url"
              className="h-10 rounded-lg border-[#D0D5DD] bg-white text-sm placeholder:text-[#98A2B3]"
            />
            <p className="text-[11px] text-[#98A2B3]">
              Placeholder for more info
            </p>
          </div>
        </div>

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

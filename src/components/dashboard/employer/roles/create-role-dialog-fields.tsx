"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE_CATEGORY_OPTIONS } from "@/constants/employer-roles";
import type { CreateRoleValues } from "@/types/api/employer-roles";

type CreateRoleDialogFieldsProps = {
  formValues: CreateRoleValues;
  updateField: <K extends keyof CreateRoleValues>(
    key: K,
    value: CreateRoleValues[K],
  ) => void;
};

export function CreateRoleDialogFields({
  formValues,
  updateField,
}: CreateRoleDialogFieldsProps) {
  return (
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
          onChange={(e) => updateField("companyName", e.target.value)}
          placeholder="Enter your company name"
          className="h-10 rounded-lg border-[#D0D5DD] bg-white text-sm placeholder:text-[#98A2B3]"
        />
        <p className="text-[11px] text-[#98A2B3]">Placeholder for more info</p>
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
          onChange={(e) => updateField("roleTitle", e.target.value)}
          placeholder="Enter your role title"
          className="h-10 rounded-lg border-[#D0D5DD] bg-white text-sm placeholder:text-[#98A2B3]"
        />
        <p className="text-[11px] text-[#98A2B3]">Placeholder for more info</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#344054]">Category</label>
        <Select
          value={formValues.category}
          onValueChange={(value) => updateField("category", value)}
        >
          <SelectTrigger className="h-10 w-full rounded-lg border-[#D0D5DD] bg-white text-sm text-[#101828] data-placeholder:text-[#98A2B3]">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            {ROLE_CATEGORY_OPTIONS.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-[11px] text-[#98A2B3]">Placeholder for more info</p>
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
          onChange={(e) => updateField("companyUrl", e.target.value)}
          placeholder="Enter your website url"
          className="h-10 rounded-lg border-[#D0D5DD] bg-white text-sm placeholder:text-[#98A2B3]"
        />
        <p className="text-[11px] text-[#98A2B3]">Placeholder for more info</p>
      </div>
    </div>
  );
}

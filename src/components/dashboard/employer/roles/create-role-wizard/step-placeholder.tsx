import type { CreateRoleStepId } from "@/constants/create-role-wizard";

const STEP_LABELS: Record<CreateRoleStepId, string> = {
  "upload-jd": "Upload JD",
  "work-preferences": "Work Preferences",
  "talent-assessment": "Talent Assessment",
  preview: "Preview",
};

export function StepPlaceholder({ stepId }: { stepId: CreateRoleStepId }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-[#D0D5DD] bg-[#F9FAFB] px-6 py-10 text-center">
      <p className="text-sm font-semibold text-[#101828]">
        {STEP_LABELS[stepId]}
      </p>
      <p className="max-w-sm text-xs leading-5 text-[#667085]">
        This step is still being built. You can continue to the next step for
        now.
      </p>
    </div>
  );
}

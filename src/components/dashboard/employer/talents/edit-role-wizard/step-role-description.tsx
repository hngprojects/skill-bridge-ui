"use client";

import { JdRichEditor } from "../../roles/create-role-wizard/jd-rich-editor";

export type RoleDescriptionValues = {
  roleTitle: string;
  jdHtml: string;
};

type StepRoleDescriptionProps = {
  values: RoleDescriptionValues;
  onChange: (values: RoleDescriptionValues) => void;
};

export function StepRoleDescription({
  values,
  onChange,
}: StepRoleDescriptionProps) {
  return (
    <div className="flex flex-col gap-6 rounded-lg bg-[#fbfbfb] p-4">
      <div className="flex flex-col gap-1.5">
        <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
          Role title
        </p>
        <input
          value={values.roleTitle}
          onChange={(event) =>
            onChange({ ...values, roleTitle: event.target.value })
          }
          className="h-11 w-full rounded-lg border border-[#d9d9d9] bg-white px-4 text-base font-medium tracking-[0.017em] text-[#151515] outline-none"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
          Job description
        </p>
        <JdRichEditor
          initialHtml={values.jdHtml}
          onChange={(jdHtml) => onChange({ ...values, jdHtml })}
        />
      </div>
    </div>
  );
}

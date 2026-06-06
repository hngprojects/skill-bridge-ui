"use client";

import { JdRichEditor } from "./jd-rich-editor";
import { JdUploadZone } from "./jd-upload-zone";

export type UploadJdValues = {
  jdHtml: string;
  jdFile: File | null;
};

type StepUploadJdProps = {
  values: UploadJdValues;
  onChange: (values: UploadJdValues) => void;
};

export function StepUploadJd({ values, onChange }: StepUploadJdProps) {
  return (
    <div className="flex flex-col gap-4">
      <JdUploadZone
        file={values.jdFile}
        onFileChange={(file) => onChange({ ...values, jdFile: file })}
      />

      <div className="relative flex items-center py-1">
        <div className="h-px flex-1 bg-[#E5E7EB]" />
        <span className="px-4 text-xs text-[#98A2B3]">or</span>
        <div className="h-px flex-1 bg-[#E5E7EB]" />
      </div>

      <JdRichEditor
        initialHtml={values.jdHtml}
        onChange={(html) => onChange({ ...values, jdHtml: html })}
      />
    </div>
  );
}

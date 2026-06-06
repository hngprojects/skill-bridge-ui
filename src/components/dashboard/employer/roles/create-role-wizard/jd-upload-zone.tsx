"use client";

import { useRef } from "react";
import { FileText, X } from "lucide-react";

import { cn } from "@/lib/utils";

type JdUploadZoneProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
};

export function JdUploadZone({
  file,
  onFileChange,
  disabled,
}: JdUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    onFileChange(selected);
    e.target.value = "";
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
  };

  if (file) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <FileText className="size-4 shrink-0 text-[#667085]" />
          <span className="truncate text-sm font-medium text-[#101828]">
            {file.name}
          </span>
          <span className="shrink-0 text-xs text-[#98A2B3]">
            ({(file.size / 1024).toFixed(0)} KB)
          </span>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove file"
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-[#98A2B3] transition-colors hover:bg-[#F2F4F7] hover:text-[#667085]"
        >
          <X className="size-3.5" />
        </button>
      </div>
    );
  }

  return (
    <label
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#D0D5DD] bg-white px-6 py-8 transition-colors",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:border-[#98A2B3] hover:bg-[#F9FAFB]",
      )}
    >
      <FileText className="size-8 text-[#667085]" strokeWidth={1.5} />
      <span className="text-sm font-medium text-[#101828] underline underline-offset-2">
        Upload JD
      </span>
      <span className="text-xs text-[#98A2B3]">PDF, DOC, DOCX supported</span>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="sr-only"
        disabled={disabled}
        onChange={handleFileChange}
      />
    </label>
  );
}

"use client";

import { Upload } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Pdf01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

type SettingsResumeDropzoneProps = {
  file: File | null;
  isUploading: boolean;
  onZoneClick: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onUpload: () => void;
  onCancel: () => void;
};

export function SettingsResumeDropzone({
  file,
  isUploading,
  onZoneClick,
  onDrop,
  onUpload,
  onCancel,
}: SettingsResumeDropzoneProps) {
  return (
    <div className="flex flex-col gap-4">
      <div
        role="button"
        tabIndex={0}
        onClick={onZoneClick}
        onKeyDown={(e) => e.key === "Enter" && onZoneClick()}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-12 cursor-pointer hover:bg-muted/40 transition-colors"
      >
        <HugeiconsIcon
          icon={Pdf01Icon}
          className="size-10 text-muted-foreground"
          strokeWidth={1.5}
        />
        <p className="text-sm text-foreground">
          {file ? file.name : "Upload new file"}
        </p>
        <p className="text-xs text-muted-foreground">
          Drag and drop or click to browse
        </p>
      </div>

      {file && (
        <div className="flex items-center gap-3">
          <Button
            onClick={onUpload}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            <Upload className="size-4" />
            {isUploading ? "Uploading..." : "Upload Resume"}
          </Button>
          <Button variant="outline" onClick={onCancel} disabled={isUploading}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

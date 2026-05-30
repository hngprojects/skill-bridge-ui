"use client";

import { FileText, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type SettingsResumePreviewProps = {
  resumeUrl: string;
  fileName: string;
  isDeleting: boolean;
  onReupload: () => void;
  onDelete: () => void;
};

export function SettingsResumePreview({
  resumeUrl,
  fileName,
  isDeleting,
  onReupload,
  onDelete,
}: SettingsResumePreviewProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
          <FileText className="size-5 text-red-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{fileName}</p>
          <p className="text-xs text-muted-foreground">Uploaded resume</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary underline underline-offset-2 hover:opacity-80"
        >
          View
          <ExternalLink className="size-3" />
        </a>
        <Button
          size="sm"
          variant="outline"
          onClick={onReupload}
          disabled={isDeleting}
          className="text-xs"
        >
          Reupload
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onDelete}
          disabled={isDeleting}
          className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="size-4" />
          {isDeleting ? "Deleting..." : ""}
        </Button>
      </div>
    </div>
  );
}

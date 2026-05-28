"use client";

import { Globe, Upload, FileText, ExternalLink } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Pdf01Icon } from "@hugeicons/core-free-icons";
import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useTalentSettings,
  useUpdateTalentSettingsProfile,
  useUploadTalentResume,
} from "@/hooks/api";
import { appToast } from "@/lib/toast";

const ACCEPTED_TYPES = ".doc,.docx,.pdf,.txt";

export function SettingsResume() {
  const { data: settings } = useTalentSettings();
  const { mutate: updateProfile } = useUpdateTalentSettingsProfile();
  const { mutate: uploadResume, isPending: isUploading } =
    useUploadTalentResume();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const serverWebsite = settings?.profile.personal_website ?? "";
  const [localWebsite, setLocalWebsite] = useState<string | null>(null);
  const website = localWebsite ?? serverWebsite;
  const existingResumeUrl = settings?.profile.resume_url ?? null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

  function handleSaveWebsite() {
    if (!website.trim()) return;
    updateProfile(
      { personalWebsite: website.trim() },
      { onSuccess: () => setLocalWebsite(null) },
    );
  }

  function handleUpload() {
    if (!file) return;
    const originalName = file.name;
    uploadResume(file, {
      onSuccess: () => {
        appToast.success("Resume uploaded successfully!");
        setUploadedFileName(originalName);
        setFile(null);
      },
      onError: () => {
        appToast.error("Failed to upload resume. Please try again.");
      },
    });
  }

  const resumeFileName = uploadedFileName ?? "My Resume";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <p className="text-base font-semibold text-foreground">
          Upload your recent resume or CV
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Upload your most up-to-date resume
        </p>
        <p className="text-sm text-muted-foreground">
          File types: DOC, DOCX, PDF, TXT
        </p>
      </div>

      {existingResumeUrl && !file && (
        <div className="flex items-center justify-between rounded-xl border border-border bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
              <FileText className="size-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {resumeFileName}
              </p>
              <p className="text-xs text-muted-foreground">Uploaded resume</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={existingResumeUrl}
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
              onClick={() => fileInputRef.current?.click()}
              className="text-xs"
            >
              Reupload
            </Button>
          </div>
        </div>
      )}

      {(!existingResumeUrl || file) && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          onDrop={handleDrop}
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
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={handleFileChange}
      />

      {file && (
        <div className="flex items-center gap-3">
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            <Upload className="size-4" />
            {isUploading ? "Uploading..." : "Upload Resume"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setFile(null)}
            disabled={isUploading}
          >
            Cancel
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Personal website
        </label>
        <div className="relative flex items-center">
          <Input
            type="url"
            value={website}
            placeholder="Enter your website link"
            onChange={(e) => setLocalWebsite(e.target.value)}
            onBlur={handleSaveWebsite}
            className="pr-10"
          />
          <span className="absolute right-3 pointer-events-none text-muted-foreground">
            <Globe className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";

import { useTalentSettings, useUploadTalentResume } from "@/hooks/api";
import { appToast } from "@/lib/toast";
import { SettingsResumePreview } from "./settings-resume-preview";
import { SettingsResumeDropzone } from "./settings-resume-dropzone";
import { SettingsResumeWebsite } from "./settings-resume-website";

const ACCEPTED_TYPES = ".doc,.docx,.pdf,.txt";

export function SettingsResume() {
  const { data: settings } = useTalentSettings();
  const { mutate: uploadResume, isPending: isUploading } =
    useUploadTalentResume();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const existingResumeUrl = settings?.profile.resume_url ?? null;
  const resumeFileName =
    uploadedFileName ??
    (existingResumeUrl
      ? (existingResumeUrl.split("/").pop() ?? "My Resume")
      : "My Resume");

  const clearSelectedFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) return;
    const isAccepted = ACCEPTED_TYPES.split(",").some((ext) =>
      dropped.name.toLowerCase().endsWith(ext),
    );
    if (!isAccepted) {
      appToast.error("Unsupported file type. Use DOC, DOCX, PDF, or TXT.");
      return;
    }
    setFile(dropped);
  };

  function handleUpload() {
    if (!file) return;
    const originalName = file.name;
    uploadResume(file, {
      onSuccess: () => {
        appToast.success("Resume uploaded successfully!");
        setUploadedFileName(originalName);
        clearSelectedFile();
      },
      onError: () => {
        appToast.error("Failed to upload resume. Please try again.");
      },
    });
  }

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

      {existingResumeUrl && !file ? (
        <SettingsResumePreview
          resumeUrl={existingResumeUrl}
          fileName={resumeFileName}
          onReupload={() => fileInputRef.current?.click()}
        />
      ) : (
        <SettingsResumeDropzone
          file={file}
          isUploading={isUploading}
          onZoneClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onUpload={handleUpload}
          onCancel={clearSelectedFile}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={handleFileChange}
      />

      <SettingsResumeWebsite />
    </div>
  );
}

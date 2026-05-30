"use client";

import { useRef, useState } from "react";

import {
  useTalentSettings,
  useUpdateTalentSettingsProfile,
  useUploadTalentResume,
  useDeleteTalentResume,
} from "@/hooks/api";
import { appToast } from "@/lib/toast";
import { SettingsResumePreview } from "./settings-resume-preview";
import { SettingsResumeDropzone } from "./settings-resume-dropzone";
import { SettingsResumeWebsite } from "./settings-resume-website";

const ACCEPTED_TYPES = ".doc,.docx,.pdf,.txt";
const RESUME_FILENAME_KEY = "resume_original_filename";

export function SettingsResume() {
  const { data: settings } = useTalentSettings();
  const { mutate: updateProfile } = useUpdateTalentSettingsProfile();
  const { mutate: uploadResume, isPending: isUploading } =
    useUploadTalentResume();
  const { mutate: deleteResume, isPending: isDeleting } =
    useDeleteTalentResume();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  // Initialize from localStorage so filename survives tab switches
  const [storedFileName, setStoredFileName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(RESUME_FILENAME_KEY);
  });

  const serverWebsite = settings?.profile.personal_website ?? "";
  const [localWebsite, setLocalWebsite] = useState<string | null>(null);
  const website = localWebsite ?? serverWebsite;
  const existingResumeUrl = settings?.profile.resume_url ?? null;
  const resumeFileName = storedFileName ?? "My Resume";

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
    if (dropped) setFile(dropped);
  };

  const handleDelete = () => {
    deleteResume(undefined, {
      onSuccess: () => {
        localStorage.removeItem(RESUME_FILENAME_KEY);
        setStoredFileName(null);
        appToast.success("Resume deleted successfully.");
      },
      onError: () => {
        appToast.error("Failed to delete resume. Please try again.");
      },
    });
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
        localStorage.setItem(RESUME_FILENAME_KEY, originalName);
        setStoredFileName(originalName);
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
          isDeleting={isDeleting}
          onReupload={() => fileInputRef.current?.click()}
          onDelete={handleDelete}
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

      <SettingsResumeWebsite
        website={website}
        onChange={setLocalWebsite}
        onBlur={handleSaveWebsite}
      />
    </div>
  );
}

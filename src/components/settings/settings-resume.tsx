"use client";

import { Globe } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Pdf01Icon } from "@hugeicons/core-free-icons";
import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";

const ACCEPTED_TYPES = ".doc,.docx,.pdf,.txt";

export function SettingsResume() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [website, setWebsite] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

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
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Personal website
        </label>
        <div className="relative flex items-center">
          <Input
            type="url"
            value={website}
            placeholder="Enter your website link"
            onChange={(e) => setWebsite(e.target.value)}
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

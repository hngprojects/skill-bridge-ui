"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

interface Props {
  onChange: (file: File) => void;
}

export const ProfileImageUploader = ({ onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center gap-6">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative w-20 h-20 bg-border rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Profile preview"
            fill
            className="object-cover"
          />
        ) : (
          <Camera className="w-9 h-9 text-muted-foreground" />
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-base font-medium underline text-primary text-left"
        >
          Upload photo
        </button>
        <span className="text-sm font-light text-muted-foreground">
          Recommended size is 400 x 300
        </span>
      </div>
    </div>
  );
};

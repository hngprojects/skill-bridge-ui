"use client";

import { useState } from "react";
import { Download, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ShareProfileModal } from "./share-profile-modal";
import type { VerifiedProfileViewerMode } from "./verified-report-summary";

type VerifiedReportHeaderProps = {
  downloadDisabled?: boolean;
  viewerMode?: VerifiedProfileViewerMode;
  resumeUrl?: string | null;
  shareUrl?: string;
  qrCodeUrl?: string;
};

export function VerifiedReportHeader({
  downloadDisabled = false,
  viewerMode = "owner",
  resumeUrl,
  shareUrl,
  qrCodeUrl,
}: VerifiedReportHeaderProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const canDownload =
    viewerMode === "owner" && !downloadDisabled && Boolean(resumeUrl);
  const canShare =
    viewerMode === "owner" && !downloadDisabled && Boolean(shareUrl);

  return (
    <section className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold text-2xl text-black">Verified Profile</h2>
        <p className="font-light text-base">
          Here&apos;s how to know how employers see your profile!
        </p>
      </div>
      <div className="flex flex-row gap-x-2 items-center">
        {viewerMode === "owner" ? (
          <Button
            className="underline"
            variant="ghost"
            disabled={!canShare}
            title={canShare ? undefined : "Nothing to share yet"}
            onClick={() => setShareOpen(true)}
          >
            Share
            <Share2 size={16} />
          </Button>
        ) : null}
        {viewerMode === "owner" ? (
          <Button
            className="underline"
            variant="ghost"
            disabled={!canDownload}
            title={canDownload ? undefined : "No resume on file yet"}
            asChild={canDownload}
          >
            {canDownload ? (
              <a href={resumeUrl ?? undefined} target="_blank" rel="noreferrer">
                Download CV
                <Download size={16} />
              </a>
            ) : (
              <>
                Download CV
                <Download size={16} />
              </>
            )}
          </Button>
        ) : null}
      </div>

      {shareUrl ? (
        <ShareProfileModal
          open={shareOpen}
          onOpenChange={setShareOpen}
          shareUrl={shareUrl}
          qrCodeUrl={qrCodeUrl}
        />
      ) : null}
    </section>
  );
}

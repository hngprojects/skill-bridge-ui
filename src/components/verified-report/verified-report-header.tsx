import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

type VerifiedReportHeaderProps = {
  downloadDisabled?: boolean;
};

export function VerifiedReportHeader({
  downloadDisabled = false,
}: VerifiedReportHeaderProps) {
  return (
    <section className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold text-2xl text-black">Verified Profile</h2>
        <p className="font-light text-base">
          Here&apos;s how to know how employers see your profile!
        </p>
      </div>
      <div className="flex flex-row gap-x-2 items-center">
        <Button
          className="underline"
          variant="ghost"
          tabIndex={downloadDisabled ? -1 : undefined}
        >
          Download CV
          <Download size={16} />
        </Button>
      </div>
    </section>
  );
}

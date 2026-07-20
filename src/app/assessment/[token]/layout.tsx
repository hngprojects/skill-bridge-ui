import { ReactNode } from "react";

export default function ExternalAssessmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 flex flex-col p-6">{children}</main>
    </div>
  );
}

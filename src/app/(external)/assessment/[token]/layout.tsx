import { ReactNode } from "react";
import { Compass } from "lucide-react";

export default function ExternalAssessmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            CredLane
          </span>
        </div>
      </header>
      <main className="flex-1 flex flex-col p-6">{children}</main>
    </div>
  );
}

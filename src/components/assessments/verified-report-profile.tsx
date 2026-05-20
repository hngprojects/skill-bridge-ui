import Image from "next/image";
import { Dot } from "lucide-react";
import { UserReport } from "@/constants/verified-report";

interface VerifiedReportProfileProps {
  report: UserReport;
}

interface InfoRowProps {
  title: string;
  content: string | string[];
  isText?: boolean;
}

const InfoRow = ({ title, content, isText }: InfoRowProps) => (
  <div className="flex flex-col gap-y-2">
    <p className="label text-foreground">{title}</p>
    {isText ? (
      <div className="border border-border rounded-xl px-4 py-3">
        <p className="body text-foreground">
          {typeof content === "string" ? content : content[0]}
        </p>
      </div>
    ) : (
      <div className="flex flex-row flex-wrap gap-2">
        {(Array.isArray(content) ? content : [content]).map((item) => (
          <span
            key={item}
            className="px-4 py-2 border border-border rounded-xl body text-foreground bg-card"
          >
            {item}
          </span>
        ))}
      </div>
    )}
  </div>
);

const VerifiedReportProfile = ({ report }: VerifiedReportProfileProps) => {
  return (
    <div className="flex flex-col gap-y-5 md:flex-row md:justify-between gap-x-10 rounded-xl border border-border p-3 md:p-6 bg-muted">
      <div className="flex flex-1 flex-col gap-y-6 min-w-0">
        <div className="flex flex-col gap-y-2 sm:flex-row gap-x-6 sm:items-center">
          <Image
            src="/assets/icons/placeholder-avatar.svg"
            height={124}
            width={124}
            alt="User avatar"
          />
          <div className="flex flex-col gap-y-1">
            <p className="section-h3 font-bold text-foreground">
              {report.name}
            </p>
            <p className="body font-light flex flex-row gap-x-2 items-center flex-wrap text-foreground">
              {report.role}
              <Dot size={30} className="hidden lg:block" />
              <span>Goal: {report.goal}</span>
            </p>
          </div>
        </div>
        <InfoRow title="About" content={report.about} />
        <InfoRow title="Skills" content={report.skills} />
        {/* Cleaner implementation: No longer wrapping the string in a temporary array */}
        <InfoRow title="AI Report" content={report.aiReport} isText />
      </div>
      <div className="max-md:self-center">
        <Image
          src="/assets/icons/job-ready.svg"
          height={221}
          width={250}
          alt="Job ready badge"
        />
      </div>
    </div>
  );
};

export default VerifiedReportProfile;

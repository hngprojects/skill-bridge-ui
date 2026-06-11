"use client";
import Image from "next/image";
import Link from "next/link";
import { AssessmentHeroBanner } from "./assessment-hero-banner";
import {
  useEmployerAssessments,
  useDeactivateEmployerAssessment,
} from "@/hooks/api/use-employer-assessments";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDistanceToNow, parseISO } from "date-fns";

export function EmployerAssessmentsPage() {
  const { data, isLoading, isError } = useEmployerAssessments();
  const deactivate = useDeactivateEmployerAssessment();

  const assessments = (data?.assessments ?? []).filter(
    (assessment) => assessment.status !== "inactive",
  );

  const handleDeactivate = (id: string) => {
    deactivate.mutate(id, {
      onSuccess: () => {
        toast.success("Assessment deactivated");
      },
      onError: (err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Failed to deactivate";
        toast.error(message);
      },
    });
  };

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-274 flex-col py-6 sm:min-h-[calc(100dvh-4.5rem)] sm:py-8">
      <AssessmentHeroBanner />

      <div className="mx-auto w-full max-w-1100 px-4">
        {isLoading ? (
          <div className="py-12 text-center">Loading assessments…</div>
        ) : isError ? (
          <div className="py-12 text-center text-error">
            Failed to load assessments.
          </div>
        ) : assessments.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 pb-8 text-center">
            <Image
              src="/assets/assessments/no-assessments.svg"
              alt=""
              width={56}
              height={56}
              aria-hidden
            />
            <p className="font-sans text-base font-semibold text-[#151515]">
              No Assessments
            </p>
            <p className="font-sans text-sm text-[#757575]">
              Once you start creating assessments, your talent activity and
              reports will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 py-6">
            {assessments.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-border bg-white px-4 py-3"
              >
                <div className="min-w-0">
                  <Link
                    href={`/e/assessments/${a.id}`}
                    className="font-sans text-sm font-semibold text-[#101828] hover:underline"
                  >
                    {a.title}
                  </Link>
                  <p className="mt-1 text-sm text-[#667085]">
                    {a.roleTrack || "—"} · {a.questionsCount} question
                    {a.questionsCount !== 1 ? "s" : ""} · {a.submissionsCount}{" "}
                    submission{a.submissionsCount !== 1 ? "s" : ""}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Created{" "}
                    {a.createdAt
                      ? formatDistanceToNow(parseISO(a.createdAt), {
                          addSuffix: true,
                        })
                      : "—"}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/e/assessments/${a.id}`}
                    className="text-sm text-[#101828] underline"
                  >
                    View
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleDeactivate(a.id)}
                    className="text-sm"
                    disabled={deactivate.isPending}
                  >
                    Deactivate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

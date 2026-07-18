"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AssessmentHeroBanner } from "./assessment-hero-banner";
import { AssessmentInviteModal } from "./assessment-invite-modal";
import {
  useEmployerAssessments,
  useDeactivateEmployerAssessment,
} from "@/hooks/api/use-employer-assessments";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDistanceToNow, parseISO, isValid } from "date-fns";

export function EmployerAssessmentsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useEmployerAssessments({ page, limit });
  const deactivate = useDeactivateEmployerAssessment();
  const [deactivatingIds, setDeactivatingIds] = useState<string[]>([]);

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteAssessmentId, setInviteAssessmentId] = useState<string | null>(
    null,
  );

  const total = data?.total ?? 0;
  const assessments = (data?.assessments ?? []).filter(
    (a) => a.status !== "inactive",
  );

  const handleDeactivate = (id: string) => {
    if (!window.confirm("Are you sure you want to deactivate this assessment?"))
      return;
    setDeactivatingIds((prev) => [...prev, id]);
    deactivate.mutate(id, {
      onSuccess: () => {
        toast.success("Assessment deactivated");
        setDeactivatingIds((prev) => prev.filter((itemId) => itemId !== id));
      },
      onError: (err: unknown) => {
        toast.error(
          err instanceof Error ? err.message : "Failed to deactivate",
        );
        setDeactivatingIds((prev) => prev.filter((itemId) => itemId !== id));
      },
    });
  };

  const renderDate = (dateString: string) => {
    if (!dateString) return "—";
    try {
      const parsed = parseISO(dateString);
      return isValid(parsed)
        ? formatDistanceToNow(parsed, { addSuffix: true })
        : "—";
    } catch {
      return "—";
    }
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
              Once you create assessments, they will appear here.
            </p>
          </div>
        ) : (
          <>
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
                      {a.roleTrack || "—"} ·{" "}
                      {a.type === "external" ? "External" : "Internal"} ·{" "}
                      {a.questionsCount} questions · {a.submissionsCount}{" "}
                      submissions
                    </p>
                    {a.type === "external" && a.token && (
                      <div className="mt-2 text-sm text-[#079455]">
                        <span className="font-medium">Share link:</span>{" "}
                        <a
                          href={
                            typeof window !== "undefined"
                              ? `${window.location.origin}/assessment/${a.token}`
                              : ""
                          }
                          className="underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {typeof window !== "undefined"
                            ? `${window.location.origin}/assessment/${a.token}`
                            : ""}
                        </a>
                      </div>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      Created {renderDate(a.createdAt)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setInviteAssessmentId(a.id);
                        setInviteModalOpen(true);
                      }}
                      className="text-sm"
                    >
                      Share
                    </Button>
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
                      disabled={deactivatingIds.includes(a.id)}
                    >
                      Deactivate
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {total > limit && (
              <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
                <p>
                  Page {page} of {Math.ceil(total / limit)}
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    variant="outline"
                    size="sm"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() =>
                      setPage((p) => (p * limit < total ? p + 1 : p))
                    }
                    disabled={page * limit >= total}
                    variant="outline"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {inviteAssessmentId && (
        <AssessmentInviteModal
          open={inviteModalOpen}
          onOpenChange={(open) => {
            setInviteModalOpen(open);
            if (!open) setTimeout(() => setInviteAssessmentId(null), 200);
          }}
          assessmentId={inviteAssessmentId}
        />
      )}
    </div>
  );
}

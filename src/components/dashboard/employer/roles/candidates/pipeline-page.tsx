"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCandidatePipeline } from "@/hooks/api/use-candidate-pipeline";
import { PipelineTable } from "./pipeline-table";

export function CandidatePipelinePage({ roleId }: { roleId: string }) {
  const [activeTab, setActiveTab] = useState<
    "all" | "best_match" | "interested" | "other"
  >("all");
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, isError } = useCandidatePipeline(roleId, {
    tab: activeTab,
    page,
    limit,
  });

  if (isError) {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-8 text-center text-error">
        Failed to load pipeline.
      </div>
    );
  }

  const handleTabChange = (
    tab: "all" | "best_match" | "interested" | "other",
  ) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div className="mx-auto flex max-w-300 flex-col gap-6 py-8">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#475467] transition-colors hover:text-[#101828]"
      >
        <ChevronLeft className="size-4" />
        Back to role
      </button>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[#101828]">
          Candidate Pipeline
        </h1>
        <p className="text-sm text-[#475467]">
          {data?.role
            ? `Managing candidates for ${data.role.title}`
            : "Loading..."}
        </p>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="flex border-b border-[#E5E7EB] px-4">
          {(
            [
              {
                id: "all",
                label: "All Candidates",
                count: data?.counts.total ?? 0,
              },
              {
                id: "best_match",
                label: "Best Match",
                count: data?.counts.bestMatch ?? 0,
              },
              {
                id: "interested",
                label: "Interested",
                count: data?.counts.interested ?? 0,
              },
              { id: "other", label: "Other", count: data?.counts.other ?? 0 },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-[#101828] text-[#101828]"
                  : "border-transparent text-[#667085] hover:text-[#344054]"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  activeTab === tab.id
                    ? "bg-[#F2F4F7] text-[#101828]"
                    : "bg-[#F9FAFB] text-[#475467]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="p-0">
          <PipelineTable
            candidates={data?.candidates ?? []}
            isLoading={isLoading}
            roleId={roleId}
          />
        </div>

        {(data?.total ?? 0) > limit && (
          <div className="flex items-center justify-between border-t border-[#E5E7EB] px-6 py-4 text-sm text-[#667085]">
            <p>
              Page {page} of {Math.ceil((data?.total ?? 0) / limit)}
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
                  setPage((p) => (p * limit < (data?.total ?? 0) ? p + 1 : p))
                }
                disabled={page * limit >= (data?.total ?? 0)}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MoreHorizontal,
  ShieldCheck,
  Mail,
  Calendar,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  PipelineCandidate,
  PipelineCandidateStatus,
} from "@/types/api/candidate-pipeline";
import { useSendAssessmentToCandidate } from "@/hooks/api/use-candidate-pipeline";
import { useSendOffer } from "@/hooks/api/use-employer-offers";
import { SendInterviewInviteDialog } from "./send-interview-invite-dialog";
import { SelectAssessmentDialog } from "./select-assessment-dialog";

type PipelineTableProps = {
  candidates: PipelineCandidate[];
  isLoading: boolean;
  roleId: string;
};

function StatusBadge({ status }: { status: PipelineCandidateStatus }) {
  const statusConfig: Record<
    PipelineCandidateStatus,
    { label: string; class: string }
  > = {
    matched: { label: "Matched", class: "bg-gray-100 text-gray-700" },
    interested: { label: "Interested", class: "bg-blue-50 text-blue-700" },
    assessment_sent: {
      label: "Assessment Sent",
      class: "bg-yellow-50 text-yellow-700",
    },
    assessment_completed_pass: {
      label: "Passed Assessment",
      class: "bg-green-50 text-green-700",
    },
    assessment_completed_fail: {
      label: "Failed Assessment",
      class: "bg-red-50 text-red-700",
    },
    interview_invited: {
      label: "Interview Invited",
      class: "bg-purple-50 text-purple-700",
    },
    interview_accepted: {
      label: "Interview Accepted",
      class: "bg-emerald-50 text-emerald-700",
    },
    interview_declined: {
      label: "Interview Declined",
      class: "bg-rose-50 text-rose-700",
    },
  };

  const config = statusConfig[status] || statusConfig.matched;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.class}`}
    >
      {config.label}
    </span>
  );
}

export function PipelineTable({
  candidates,
  isLoading,
  roleId,
}: PipelineTableProps) {
  const { mutate: sendAssessment, isPending: isSendingAssessment } =
    useSendAssessmentToCandidate();
  const { mutate: sendOffer, isPending: isSendingOffer } = useSendOffer();

  const [actionId, setActionId] = useState<string | null>(null);

  // For assessment dialog
  const [isAssessmentDialogOpen, setIsAssessmentDialogOpen] = useState(false);
  const [selectedAssessmentCandidate, setSelectedAssessmentCandidate] =
    useState<{
      id: string;
      name: string;
    } | null>(null);

  // For interview invite dialog
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const openAssessmentDialog = (candidateId: string, candidateName: string) => {
    setSelectedAssessmentCandidate({ id: candidateId, name: candidateName });
    setIsAssessmentDialogOpen(true);
  };

  const handleSendAssessment = (assessmentId: string) => {
    if (!selectedAssessmentCandidate) return;

    setActionId(selectedAssessmentCandidate.id);
    sendAssessment(
      { roleId, candidateId: selectedAssessmentCandidate.id, assessmentId },
      {
        onSuccess: () => {
          toast.success(
            `Assessment sent to ${selectedAssessmentCandidate.name}.`,
          );
          setIsAssessmentDialogOpen(false);
        },
        onError: (err: unknown) => {
          toast.error(
            err instanceof Error ? err.message : "Failed to send assessment.",
          );
        },
        onSettled: () => setActionId(null),
      },
    );
  };

  const handleInviteInterview = (
    candidateId: string,
    candidateName: string,
  ) => {
    setSelectedCandidate({ id: candidateId, name: candidateName });
    setIsInviteDialogOpen(true);
  };

  const handleSubmitInterviewInvite = ({
    schedulingLink,
    message,
  }: {
    schedulingLink: string;
    message: string;
  }) => {
    if (!selectedCandidate) return;

    sendOffer(
      {
        candidateIds: [selectedCandidate.id],
        roleId,
        schedulingLink: schedulingLink || undefined,
        message: message || undefined,
      },
      {
        onSuccess: () => {
          toast.success(`Interview invite sent to ${selectedCandidate.name}`);
          setIsInviteDialogOpen(false);
        },
        onError: (err: unknown) => {
          toast.error(
            err instanceof Error
              ? err.message
              : "Failed to send interview invite.",
          );
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <UserRound className="mb-4 size-10 text-[#98A2B3]" />
        <p className="text-sm font-semibold text-[#101828]">
          No candidates found
        </p>
        <p className="mt-1 text-xs text-[#475467]">
          There are currently no candidates matching this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-sm text-[#475467]">
        <thead className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-xs font-medium text-[#475467]">
          <tr>
            <th className="px-6 py-3">Candidate</th>
            <th className="px-6 py-3">Score</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E7EB]">
          {candidates.map((c) => (
            <tr
              key={c.candidateId}
              className="transition-colors hover:bg-[#F9FAFB]/50"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                    {c.avatarUrl ? (
                      <Image
                        src={c.avatarUrl}
                        alt={c.fullName}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium text-gray-500">
                        {c.fullName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[#101828]">{c.fullName}</p>
                    <div className="flex items-center gap-2 text-xs text-[#667085]">
                      <span>{c.roleTrack}</span>
                      {c.seniorityBadge && (
                        <span className="inline-flex items-center gap-1 text-[#079455]">
                          <ShieldCheck className="size-3" />
                          Verified {c.seniorityBadge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full bg-[#079455]"
                      style={{ width: `${c.matchScore}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{c.matchScore}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={c.pipelineStatus} />
                {c.isInterested && c.interestedAt && (
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Interested{" "}
                    {new Date(c.interestedAt).toLocaleDateString("en-US", {
                      timeZone: "UTC",
                    })}
                  </p>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontal className="size-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/e/talents/${c.candidateId}`}
                        className="flex items-center gap-2"
                      >
                        <UserRound className="size-4" />
                        View Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        openAssessmentDialog(c.candidateId, c.fullName)
                      }
                      disabled={
                        isSendingAssessment && actionId === c.candidateId
                      }
                      className="flex items-center gap-2"
                    >
                      <Mail className="size-4" />
                      Send Assessment
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleInviteInterview(c.candidateId, c.fullName)
                      }
                      className="flex items-center gap-2"
                    >
                      <Calendar className="size-4" />
                      Invite to Interview
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCandidate && (
        <SendInterviewInviteDialog
          open={isInviteDialogOpen}
          onOpenChange={setIsInviteDialogOpen}
          candidateName={selectedCandidate.name}
          isSubmitting={isSendingOffer}
          onSubmit={handleSubmitInterviewInvite}
        />
      )}

      {selectedAssessmentCandidate && (
        <SelectAssessmentDialog
          open={isAssessmentDialogOpen}
          onOpenChange={setIsAssessmentDialogOpen}
          candidateName={selectedAssessmentCandidate.name}
          isSubmitting={isSendingAssessment}
          onSubmit={handleSendAssessment}
        />
      )}
    </div>
  );
}

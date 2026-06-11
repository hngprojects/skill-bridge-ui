"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { FlaskConical, Package, PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getSavedRoleById } from "@/constants/employer-saved-roles";
import { useDiscoveryCandidateProfile } from "@/hooks/api/use-employer-discovery";
import { appToast } from "@/lib/toast";

import { CandidateAvatar } from "../shared/candidate-avatar";

type EmployerSendOfferPageProps = {
  userId: string;
  roleId: string;
};

export function EmployerSendOfferPage({
  userId,
  roleId,
}: EmployerSendOfferPageProps) {
  const { data: candidate, isPending } = useDiscoveryCandidateProfile(userId);
  const role = getSavedRoleById(roleId);

  if (!role) {
    notFound();
  }

  function handleSendOffer() {
    appToast.success("Sending offer is coming soon.");
  }

  function handleViewAssessment() {
    appToast.success("Viewing assessments is coming soon.");
  }

  return (
    <div className="mx-auto max-w-274 space-y-6 py-6 sm:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <CandidateAvatar
            avatarUrl={candidate?.avatar_url ?? null}
            fullName={candidate?.full_name ?? ""}
            className="size-14 text-base"
          />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-[#151515]">
              {isPending ? "Loading…" : candidate?.full_name}
            </p>
            <div className="flex items-center gap-2 text-sm font-light tracking-[0.017em] text-[#151515]">
              <span>{candidate?.role}</span>
              {candidate?.seniority_badge ? (
                <>
                  <span className="size-0.75 shrink-0 rounded-full bg-[#151515]" />
                  <span>{candidate.seniority_badge}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="h-10 rounded-lg">
            <Link href={`/e/talents/${userId}`}>Cancel</Link>
          </Button>
          <Button onClick={handleSendOffer} className="h-10 rounded-lg">
            Send Offer
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#dbdbdb] bg-white p-4 sm:p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3.5">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-[#ebebeb]">
              <Package className="size-7 text-[#151515]" aria-hidden />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-[#151515]">{role.title}</p>
              <div className="flex items-center gap-2 text-sm font-light tracking-[0.017em] text-[#151515]">
                <span>{role.category}</span>
                <span className="size-0.75 shrink-0 rounded-full bg-[#151515]" />
                <span className="underline">{role.website}</span>
              </div>
            </div>
          </div>

          <Link
            href={`/e/talents/${userId}/offer/${roleId}/edit`}
            className="flex items-center gap-1 font-semibold text-[#05060f] underline"
          >
            Edit this role
            <PencilLine className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-6 space-y-6 rounded-lg border border-[#dbdbdb] bg-white p-4">
          <p className="text-xl font-medium tracking-[0.02em] text-[#151515]">
            {role.title}
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium tracking-[0.017em] text-[#757575]">
                Employment type
              </p>
              <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                {role.employmentType}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium tracking-[0.017em] text-[#757575]">
                Experience
              </p>
              <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                {role.experience}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium tracking-[0.017em] text-[#757575]">
                Education
              </p>
              <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                {role.education}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium tracking-[0.017em] text-[#757575]">
                Salary range
              </p>
              <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                {role.salaryRange}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {role.sections.map((section) => (
              <div key={section.heading} className="space-y-2">
                <p className="font-semibold text-[#151515]">
                  {section.heading}
                </p>
                {section.paragraph ? (
                  <p className="text-base text-[#151515]">
                    {section.paragraph}
                  </p>
                ) : null}
                {section.items ? (
                  <ul className="list-none space-y-1">
                    {section.items.map((item) => (
                      <li key={item} className="text-base text-[#151515]">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-xl font-medium tracking-[0.02em] text-[#151515]">
              Assessment attached
            </p>
            <div className="flex flex-col gap-4 rounded-lg border border-[#dbdbdb] bg-white p-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-1 items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-[#10242f]">
                  <FlaskConical className="size-6 text-white" aria-hidden />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-[#151515]">
                    {role.assessment.title}
                  </p>
                  <p className="text-base text-[#151515]">
                    {role.assessment.description}
                  </p>
                  <p className="text-sm text-[#757575]">
                    Estimated time: {role.assessment.estimatedTime}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleViewAssessment}
                className="shrink-0 font-semibold text-[#05060f] underline"
              >
                View assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

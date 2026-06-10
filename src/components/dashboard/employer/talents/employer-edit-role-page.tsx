"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Check,
  FlaskConical,
  LogOut,
  Search,
  SquarePlus,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ASSESSMENT_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  EXPERIENCE_OPTIONS,
} from "@/constants/create-role-wizard";
import {
  getSavedRoleById,
  type SavedRole,
} from "@/constants/employer-saved-roles";
import {
  useDiscoveryCandidateProfile,
  useSaveCandidate,
} from "@/hooks/api/use-employer-discovery";
import { authFailureMessage } from "@/lib/api";
import { appToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

import { JdRichEditor } from "../roles/create-role-wizard/jd-rich-editor";
import { CandidateAvatar } from "../shared/candidate-avatar";

type EmployerEditRolePageProps = {
  userId: string;
  roleId: string;
};

const STEPS = [
  "Role description",
  "Role details",
  "Talent assessment",
  "Preview",
];

const STEP_META = [
  {
    title: "Role description",
    description: "Update your role title and role description",
  },
  {
    title: "Role details",
    description: "Refine and setup your preferences for this job",
  },
  {
    title: "Choose assessment for this offer",
    description: "Choose the assessment you would like your talent to take",
  },
  {
    title: "Review and send offer",
    description: "Take a last look at your information before sending.",
  },
];

const SELECT_TRIGGER_CLASS =
  "!h-11 w-full rounded-lg border-[#d9d9d9] bg-white text-base font-medium tracking-[0.017em] text-[#151515]";

function buildJobDescriptionHtml(role: SavedRole): string {
  return role.sections
    .map((section) => {
      const lines = [section.heading];
      if (section.paragraph) lines.push("", section.paragraph);
      if (section.items?.length) lines.push("", ...section.items);
      return lines.join("<br>");
    })
    .join("<br><br>");
}

export function EmployerEditRolePage({
  userId,
  roleId,
}: EmployerEditRolePageProps) {
  const router = useRouter();
  const { data: candidate, isPending } = useDiscoveryCandidateProfile(userId);
  const { mutate: saveCandidate, isPending: isSubmittingOffer } =
    useSaveCandidate();
  const role = getSavedRoleById(roleId);

  const [currentStep, setCurrentStep] = useState(0);

  const [roleTitle, setRoleTitle] = useState(role?.title ?? "");
  const [jdHtml, setJdHtml] = useState(() =>
    role ? buildJobDescriptionHtml(role) : "",
  );

  const [employmentType, setEmploymentType] = useState(
    role?.employmentType ?? "",
  );
  const [experience, setExperience] = useState(role?.experience ?? "");
  const [location, setLocation] = useState(role?.location ?? "");
  const [skills, setSkills] = useState<string[]>(role?.skills ?? []);
  const [skillInput, setSkillInput] = useState("");
  const [acceptsRelocation, setAcceptsRelocation] = useState(
    role?.acceptsRelocation ? "yes" : "no",
  );
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<
    string | undefined
  >();
  const [isAssessmentsModalOpen, setIsAssessmentsModalOpen] = useState(false);
  const [isSendOfferModalOpen, setIsSendOfferModalOpen] = useState(false);
  const [sendScoreUpdates, setSendScoreUpdates] = useState(false);

  if (!role) {
    notFound();
  }

  const selectedAssessment = ASSESSMENT_OPTIONS.find(
    (option) => option.id === selectedAssessmentId,
  );

  function handleStepClick(index: number) {
    setCurrentStep(index);
  }

  function handleAddSkill() {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((current) => [...current, trimmed]);
    }
    setSkillInput("");
  }

  function handleNext() {
    setCurrentStep((step) => Math.min(step + 1, STEPS.length - 1));
  }

  function handleBack() {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  function handleSendOffer() {
    setIsSendOfferModalOpen(true);
  }

  function handleSubmitOffer() {
    saveCandidate(userId, {
      onSuccess: () => {
        setIsSendOfferModalOpen(false);
        appToast.success("Offer sent successfully.");
        router.push(`/e/talents/${userId}`);
      },
      onError: (error) => {
        appToast.error(authFailureMessage(error));
      },
    });
  }

  function handleViewAssessment() {
    appToast.success("Viewing assessments is coming soon.");
  }

  const meta = STEP_META[currentStep];

  return (
    <div className="mx-auto max-w-274 space-y-6 py-6 sm:py-8">
      <div className="flex flex-col gap-4 border-b border-[#ebebeb] pb-4 sm:flex-row sm:items-center sm:justify-between">
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

        <Link
          href={`/e/talents/${userId}/offer/${roleId}`}
          className="flex items-center gap-2 text-base font-medium tracking-[0.017em] text-[#151515]"
        >
          Save and Exit
          <LogOut className="size-5" aria-hidden />
        </Link>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex shrink-0 flex-col gap-4 rounded-2xl border border-[#dbdbdb] bg-white p-4 lg:w-72">
          {STEPS.map((step, index) => {
            const isVisited = index <= currentStep;
            return (
              <button
                key={step}
                type="button"
                onClick={() => handleStepClick(index)}
                className="flex items-center gap-4 px-2 py-1 text-left"
              >
                {isVisited ? (
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1a7f37]">
                    <Check className="size-3.5 text-white" aria-hidden />
                  </div>
                ) : (
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#757575] text-sm text-[#151515]">
                    {index + 1}
                  </div>
                )}
                <p
                  className={cn(
                    "text-sm tracking-[0.016em]",
                    isVisited
                      ? "font-medium text-[#151515]"
                      : "font-normal text-[#757575]",
                  )}
                >
                  {step}
                </p>
              </button>
            );
          })}
        </div>

        <div className="flex flex-1 flex-col gap-6 rounded-3xl border border-[#dbdbdb] bg-white p-6">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-semibold text-[#151515]">
              {meta.title}
            </p>
            <p className="text-base font-light tracking-[0.017em] text-[#151515]">
              {meta.description}
            </p>
          </div>

          {currentStep === 0 ? (
            <div className="flex flex-col gap-6 rounded-lg bg-[#fbfbfb] p-4">
              <div className="flex flex-col gap-1.5">
                <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                  Role title
                </p>
                <input
                  value={roleTitle}
                  onChange={(event) => setRoleTitle(event.target.value)}
                  className="h-11 w-full rounded-lg border border-[#d9d9d9] bg-white px-4 text-base font-medium tracking-[0.017em] text-[#151515] outline-none"
                />
              </div>

              <div className="flex flex-1 flex-col gap-1.5">
                <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                  Job description
                </p>
                <JdRichEditor initialHtml={jdHtml} onChange={setJdHtml} />
              </div>
            </div>
          ) : currentStep === 1 ? (
            <div className="flex flex-col gap-5 rounded-lg bg-[#fbfbfb] p-4">
              <div className="flex flex-col gap-1.5">
                <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                  Employment type
                </p>
                {employmentType ? (
                  <div className="flex h-11 items-center justify-between rounded-lg border border-[#d9d9d9] bg-white px-4">
                    <span className="text-base font-medium tracking-[0.017em] text-[#151515]">
                      {employmentType}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEmploymentType("")}
                      aria-label="Clear employment type"
                    >
                      <X className="size-5 text-[#757575]" aria-hidden />
                    </button>
                  </div>
                ) : (
                  <Select
                    value={employmentType}
                    onValueChange={setEmploymentType}
                  >
                    <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                  Experience
                </p>
                {experience ? (
                  <div className="flex h-11 items-center justify-between rounded-lg border border-[#d9d9d9] bg-white px-4">
                    <span className="text-base font-medium tracking-[0.017em] text-[#151515]">
                      {experience}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExperience("")}
                      aria-label="Clear experience"
                    >
                      <X className="size-5 text-[#757575]" aria-hidden />
                    </button>
                  </div>
                ) : (
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                  Skills
                </p>
                {skills.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="flex h-10 items-center gap-2.5 rounded-lg bg-[#ebebeb] px-2.5 text-base tracking-[0.017em] text-[#151515]"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() =>
                            setSkills((current) =>
                              current.filter((item) => item !== skill),
                            )
                          }
                          aria-label={`Remove ${skill}`}
                        >
                          <X className="size-4 text-[#757575]" aria-hidden />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="flex h-11 items-center gap-2 rounded-lg border border-[#d9d9d9] bg-white px-4">
                  <Search
                    className="size-4.5 shrink-0 text-[#757575]"
                    aria-hidden
                  />
                  <input
                    value={skillInput}
                    onChange={(event) => setSkillInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    onBlur={handleAddSkill}
                    placeholder="e.g. React, Typescript"
                    className="w-full bg-transparent text-base font-light tracking-[0.017em] text-[#151515] outline-none placeholder:text-[#757575]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                  Location
                </p>
                <div className="flex h-11 items-center justify-between rounded-lg border border-[#d9d9d9] bg-white px-4">
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="w-full bg-transparent text-base font-medium tracking-[0.017em] text-[#151515] outline-none"
                  />
                  {location ? (
                    <button
                      type="button"
                      onClick={() => setLocation("")}
                      aria-label="Clear location"
                    >
                      <X
                        className="size-5 shrink-0 text-[#757575]"
                        aria-hidden
                      />
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                  Are you accepting candidates that are willing to relocate?
                </p>
                <RadioGroup
                  value={acceptsRelocation}
                  onValueChange={setAcceptsRelocation}
                  className="flex flex-row items-center gap-6"
                >
                  <label className="flex cursor-pointer items-center gap-2">
                    <RadioGroupItem value="yes" id="relocate-yes" />
                    <span className="text-base font-light tracking-[0.017em] text-[#151515]">
                      Yes
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <RadioGroupItem value="no" id="relocate-no" />
                    <span className="text-base font-light tracking-[0.017em] text-[#151515]">
                      No
                    </span>
                  </label>
                </RadioGroup>
              </div>
            </div>
          ) : currentStep === 2 ? (
            <div className="rounded-lg bg-[#fbfbfb] p-4">
              <button
                type="button"
                aria-label="Choose your assessments"
                onClick={() => setIsAssessmentsModalOpen(true)}
                className="flex h-64 w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-dashed border-[#dbdbdb] text-center transition-colors hover:border-[#a6a6a6]"
              >
                <SquarePlus
                  className="size-10 text-[#151515]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                {selectedAssessment ? (
                  <p className="text-lg font-medium tracking-[0.017em] text-[#151515]">
                    {selectedAssessment.name}
                  </p>
                ) : (
                  <p className="text-lg font-normal tracking-[0.017em] text-[#757575]">
                    Choose your assessments
                  </p>
                )}
              </button>

              <Dialog
                open={isAssessmentsModalOpen}
                onOpenChange={setIsAssessmentsModalOpen}
              >
                <DialogContent className="max-w-xl gap-6 rounded-3xl p-6">
                  <DialogHeader className="gap-1 text-left">
                    <DialogTitle className="text-lg font-bold text-[#151515]">
                      Assessments
                    </DialogTitle>
                    <DialogDescription className="text-base font-light tracking-[0.016em] text-[#151515]">
                      {selectedAssessmentId ? 1 : 0} assessment
                      {selectedAssessmentId ? "" : "s"} enabled
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex items-center gap-2 rounded-full border border-[#d9d9d9] bg-white px-3 py-2">
                    <Search className="size-4.5 shrink-0 text-muted-foreground" />
                    <input
                      placeholder="Search assessment title, category"
                      className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>

                  <ScrollArea className="h-75 pr-3">
                    <RadioGroup
                      value={selectedAssessmentId}
                      onValueChange={setSelectedAssessmentId}
                      className="gap-4"
                    >
                      {ASSESSMENT_OPTIONS.map((option) => (
                        <label
                          key={option.id}
                          htmlFor={`assessment-${option.id}`}
                          className="flex w-full cursor-pointer items-start gap-4 rounded-lg border border-[#dbdbdb] bg-white p-4"
                        >
                          <RadioGroupItem
                            value={option.id}
                            id={`assessment-${option.id}`}
                            className="mt-1"
                          />
                          <div className="flex flex-col gap-1">
                            <p className="text-base font-semibold tracking-[0.017em] text-[#151515]">
                              {option.name}
                            </p>
                            <p className="text-sm font-light tracking-[0.017em] text-[#757575]">
                              {option.description}
                            </p>
                            <p className="text-sm font-light tracking-[0.017em] text-[#757575]">
                              Estimated time: {option.estimatedTime}
                            </p>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>
                  </ScrollArea>

                  <Button
                    onClick={() => setIsAssessmentsModalOpen(false)}
                    className="mx-auto h-10 w-60 rounded-lg"
                  >
                    Continue
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="flex flex-col gap-6 rounded-lg bg-[#fbfbfb] p-4">
              <div className="flex h-11 w-full items-center rounded-lg border border-[#d9d9d9] bg-white px-4">
                <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                  {roleTitle}
                </p>
              </div>

              <div className="h-px w-full bg-[#dbdbdb]" />

              <div
                className="max-h-69 overflow-y-auto rounded-lg border border-[#dbdbdb] bg-white p-4 text-base font-light tracking-[0.017em] text-[#151515]"
                dangerouslySetInnerHTML={{ __html: jdHtml }}
              />

              <div className="h-px w-full bg-[#dbdbdb]" />

              <div className="grid grid-cols-1 gap-5 rounded-lg border border-[#dbdbdb] bg-white p-4 sm:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium tracking-[0.017em] text-[#757575]">
                    Employment type
                  </p>
                  <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                    {employmentType || "—"}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium tracking-[0.017em] text-[#757575]">
                    Experience
                  </p>
                  <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                    {experience || "—"}
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
                    Keyword
                  </p>
                  <p className="text-base font-medium tracking-[0.017em] text-[#151515]">
                    {skills[0] ? `#${skills[0].replace(/\s+/g, "")}` : "—"}
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-[#dbdbdb]" />

              <div className="flex flex-col gap-4 rounded-lg border border-[#dbdbdb] bg-white p-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-1 items-start gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-[#10242f]">
                    <FlaskConical className="size-6 text-white" aria-hidden />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-[#151515]">
                      {selectedAssessment?.name ?? "No assessment selected"}
                    </p>
                    {selectedAssessment ? (
                      <>
                        <p className="text-base text-[#151515]">
                          {selectedAssessment.description}
                        </p>
                        <p className="text-sm text-[#757575]">
                          Estimated time: {selectedAssessment.estimatedTime}
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
                {selectedAssessment ? (
                  <button
                    type="button"
                    onClick={handleViewAssessment}
                    className="shrink-0 font-semibold text-[#05060f] underline"
                  >
                    View assessment
                  </button>
                ) : null}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="h-1 w-full overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[#b01e1e] transition-[width] duration-300 ease-out"
                style={{
                  width: `${((currentStep + 1) / STEPS.length) * 100}%`,
                }}
              />
            </div>
            <div
              className={cn(
                "flex items-center",
                currentStep === 0 ? "justify-end" : "justify-between",
              )}
            >
              {currentStep > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="h-10 w-31 rounded-lg"
                >
                  Back
                </Button>
              ) : null}
              <Button
                onClick={
                  currentStep === STEPS.length - 1
                    ? handleSendOffer
                    : handleNext
                }
                className="h-10 w-31 rounded-lg"
              >
                {currentStep === STEPS.length - 1 ? "Send Offer" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isSendOfferModalOpen}
        onOpenChange={setIsSendOfferModalOpen}
      >
        <DialogContent className="max-w-137.5 gap-6 rounded-3xl p-6 text-center">
          <DialogHeader className="items-center gap-3">
            <DialogTitle className="text-3xl font-bold text-[#151515]">
              Send offer to Talent
            </DialogTitle>
            <DialogDescription className="text-base font-light tracking-[0.017em] text-[#151515]">
              You are about to send an offer to{" "}
              <span className="font-bold">{candidate?.full_name}</span> with
              employability score{" "}
              <span className="font-semibold text-[#34a853]">
                {candidate?.score_percentage}%
              </span>
            </DialogDescription>
          </DialogHeader>

          <label className="flex cursor-pointer items-center gap-2 text-left">
            <Checkbox
              checked={sendScoreUpdates}
              onCheckedChange={(checked) =>
                setSendScoreUpdates(checked === true)
              }
            />
            <span className="text-sm font-normal tracking-[0.016em] text-[#757575]">
              I would like CredLane to send email updates of job ready talents
              that have similar score of this role.
            </span>
          </label>

          <Button
            onClick={handleSubmitOffer}
            disabled={isSubmittingOffer}
            className="mx-auto h-10 w-60 rounded-lg"
          >
            {isSubmittingOffer ? "Submitting…" : "Submit"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

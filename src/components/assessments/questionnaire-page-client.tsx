"use client";

import { useState } from "react";

import { QuestionnaireQuestionCard } from "@/components/assessments/questionnaire-question-card";
import { QuestionnaireSidebar } from "@/components/assessments/questionnaire-sidebar";
import { QuestionnaireToolbar } from "@/components/assessments/questionnaire-toolbar";
import { QUESTION_BANK_SECTIONS } from "@/constants/question-bank";

export function QuestionnairePageClient() {
  const [activeSectionId, setActiveSectionId] = useState(
    QUESTION_BANK_SECTIONS[0]!.id,
  );

  return (
    <div className="">
      <QuestionnaireToolbar />
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 pb-10 lg:flex-row lg:items-start lg:gap-10">
        <QuestionnaireSidebar
          activeSectionId={activeSectionId}
          onSectionChange={setActiveSectionId}
        />
        <QuestionnaireQuestionCard />
      </div>
    </div>
  );
}

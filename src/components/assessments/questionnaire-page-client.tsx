"use client";

import { useState } from "react";

import { QuestionnaireQuestionCard } from "@/components/assessments/questionnaire-question-card";
import { QuestionnaireSidebar } from "@/components/assessments/questionnaire-sidebar";
import { QuestionnaireToolbar } from "@/components/assessments/questionnaire-toolbar";
import { QUESTIONNAIRE_DEMO_QUESTIONS } from "@/constants/questionnaire-demo-questions";

export function QuestionnairePageClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [otherAnswers, setOtherAnswers] = useState<Record<string, string>>({});

  const question = QUESTIONNAIRE_DEMO_QUESTIONS[currentIndex]!;
  const isLast = currentIndex === QUESTIONNAIRE_DEMO_QUESTIONS.length - 1;

  const handleChange = (next: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [question.id]: next }));
  };

  const handleOtherChange = (next: string) => {
    setOtherAnswers((prev) => ({ ...prev, [question.id]: next }));
  };

  const handleNext = () => {
    if (isLast) return;
    setCurrentIndex((i) => i + 1);
  };

  return (
    <div className="">
      <QuestionnaireToolbar />
      <div className="mx-auto flex max-w-300 flex-col gap-6 pb-10 lg:flex-row lg:items-start lg:gap-10">
        <QuestionnaireSidebar
          activeSectionId="section_2"
          onSectionChange={() => {
            /* sidebar interaction not wired yet */
          }}
        />
        <QuestionnaireQuestionCard
          question={question}
          value={answers[question.id]}
          otherValue={otherAnswers[question.id] ?? ""}
          onChange={handleChange}
          onOtherChange={handleOtherChange}
          onNext={handleNext}
          questionNumber={currentIndex + 1}
          totalQuestions={QUESTIONNAIRE_DEMO_QUESTIONS.length}
          isLast={isLast}
        />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import { QuestionnaireQuestionCard } from "@/components/assessments/questionnaire-question-card";
import { QuestionnaireSidebar } from "@/components/assessments/questionnaire-sidebar";
import { QuestionnaireToolbar } from "@/components/assessments/questionnaire-toolbar";
import type { Question } from "@/components/assessments/questionnaire-question-field";

const DEMO_QUESTIONS: Question[] = [
  {
    id: "demo-single",
    question: "How would you honestly rate yourself in your primary skill?",
    hint: "Claimed level. Compared against validated level after Skill Evaluation.",
    input_type: "single_pick",
    required: true,
    options: ["Entry", "Junior", "Mid", "Senior", "Expert"],
  },
  {
    id: "demo-multi",
    question: "Which tools or platforms do you use regularly?",
    hint: "Select all technologies you work with.",
    input_type: "multi_pick",
    required: false,
    options: [
      "React",
      "Next.js",
      "Vue.js",
      "Angular",
      "Svelte",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express",
      "Python",
      "Django",
      "Flask",
      "Other",
    ],
    conditional: { trigger_option: "Other", reveals: "free_text_input" },
  },
  {
    id: "demo-text",
    question:
      "Describe a situation where you had to make a difficult decision that affected others at work.",
    hint: "Used by AI as leadership context for assessment framing.",
    input_type: "text",
    required: true,
  },
];

export function QuestionnairePageClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [otherAnswers, setOtherAnswers] = useState<Record<string, string>>({});

  const question = DEMO_QUESTIONS[currentIndex]!;
  const isLast = currentIndex === DEMO_QUESTIONS.length - 1;

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
          totalQuestions={DEMO_QUESTIONS.length}
          isLast={isLast}
        />
      </div>
    </div>
  );
}

import type { Question } from "@/types/questionnaire";

export const QUESTIONNAIRE_DEMO_QUESTIONS: Question[] = [
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

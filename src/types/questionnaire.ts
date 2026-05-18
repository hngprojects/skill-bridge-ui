export type QuestionInputType = "text" | "single_pick" | "multi_pick";

export type Question = {
  id: string;
  question: string;
  hint?: string;
  input_type: QuestionInputType;
  required: boolean;
  options?: readonly string[];
  conditional?: { trigger_option: string; reveals: "free_text_input" };
};

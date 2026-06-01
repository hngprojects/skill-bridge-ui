export type InputTypeParams = "text_required" | "single" | "multi";

export type Question = {
  id: string;
  key: string;
  sourceQuestionNumber?: number;
  sourceSection?: number;
  sourceSectionTitle?: string;
  inputType: InputTypeParams;
  prompt: string;
  helperText?: string | null;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  options?: readonly string[];
  otherTextKey?: string;
  conditional?: { trigger_option: string; reveals: "free_text_input" };
};

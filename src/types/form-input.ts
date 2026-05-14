import type * as React from "react";

import type { Input } from "@/components/ui/input";

export type SelectOption = {
  label: string;
  value: string;
};

type BaseProps = {
  id?: string;
  name?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  error?: string;
  success?: boolean;
  className?: string;
  icon?: React.ReactNode;
};
export type InputModeProps = BaseProps & {
  mode?: "input";
  type?: "text" | "email" | "password";
  validateEmail?: boolean;
} & Omit<
    React.ComponentProps<typeof Input>,
    "type" | "id" | "name" | "required"
  >;

export type SelectModeProps = BaseProps & {
  mode: "select";
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

export type FormInputProps = InputModeProps | SelectModeProps;

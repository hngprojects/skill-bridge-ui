"use client";

import * as React from "react";
import { Eye, EyeOff, AlertCircle, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  FormInputProps,
  InputModeProps,
  SelectOption,
} from "@/types/form-input";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formFieldRootClass = "flex w-full flex-col items-stretch gap-1.5";

const formFieldLabelClass =
  "inline-flex flex-row items-start gap-0.5 p-0 shadow-none select-none " +
  "font-sans text-base font-medium leading-normal tracking-[0.256px] text-foreground";

// const formFieldAsteriskClass =
//   "font-sans text-base font-medium leading-normal tracking-[0.256px] text-error";

const formFieldControlClass =
  "h-9 w-full min-w-0 rounded-[5px] border border-border bg-background px-3 py-2 text-base font-normal leading-5 tracking-[0.017em] md:text-base md:leading-5 " +
  "text-foreground shadow-none outline-none transition-[color,box-shadow,border-color] " +
  "font-sans placeholder:text-muted-foreground " +
  "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 " +
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 " +
  "aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/20";

const formFieldHintClass =
  "font-sans text-sm font-normal leading-[18px] tracking-[0.016em] text-muted-foreground";

const formFieldErrorClass =
  "font-sans text-sm font-normal leading-[18px] text-error";

function FormInput(props: FormInputProps) {
  const {
    id,
    name,
    label,
    required,
    placeholder,
    description,
    error,
    className,
    icon,
    success,
  } = props;

  const [internalError, setInternalError] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);

  const fieldId = React.useId();
  const inputId = id ?? fieldId;
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;
  const hasError = Boolean(error || internalError);
  const displayError = error || internalError;

  const runEmailValidation = (value: string, inputProps: InputModeProps) => {
    const isEmailField =
      inputProps.type === "email" || inputProps.validateEmail;
    if (!isEmailField) return;

    const trimmed = value.trim();
    if (!trimmed) {
      if (required) {
        setInternalError("Email is required.");
      } else {
        setInternalError("");
      }
      return;
    }

    if (!EMAIL_REGEX.test(trimmed)) {
      setInternalError("Please enter a valid email address.");
      return;
    }

    setInternalError("");
  };

  if (props.mode === "select") {
    return (
      <div className={cn(formFieldRootClass, className)}>
        <Label htmlFor={inputId} className={formFieldLabelClass}>
          {label}
        </Label>
        <Select
          value={props.value}
          defaultValue={props.defaultValue}
          onValueChange={props.onValueChange}
          disabled={props.disabled}
          name={name}
        >
          <SelectTrigger
            id={inputId}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : description ? descriptionId : undefined
            }
            className={cn(
              formFieldControlClass,
              success &&
                "border-success focus-visible:border-success focus-visible:ring-success/25",
              "flex w-full items-center justify-between gap-2 whitespace-nowrap md:text-base",
              "data-placeholder:text-muted-foreground",
            )}
          >
            <SelectValue placeholder={placeholder ?? "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {props.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description && !displayError ? (
          <p id={descriptionId} className={formFieldHintClass}>
            {description}
          </p>
        ) : null}
        {displayError ? (
          <p id={errorId} className={formFieldErrorClass} role="alert">
            {displayError}
          </p>
        ) : null}
      </div>
    );
  }

  const inputProps = (({
    mode: _mode,
    label: _label,
    validateEmail: _validateEmail,
    icon: _icon,
    description: _description,
    error: _error,
    success: _success,
    ...rest
  }: InputModeProps) => {
    void _mode;
    void _label;
    void _validateEmail;
    void _icon;
    void _description;
    void _error;
    void _success;
    return rest;
  })(props);

  return (
    <div className={cn(formFieldRootClass, className)}>
      <Label htmlFor={inputId} className={formFieldLabelClass}>
        {label}
      </Label>

      <div className="relative flex w-full flex-row items-center">
        {icon ? (
          <span className="pointer-events-none absolute top-1/2 left-3 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground [&_svg]:size-5">
            {icon}
          </span>
        ) : null}

        <Input
          {...inputProps}
          id={inputId}
          name={name}
          required={required}
          type={props.type === "password" && showPassword ? "text" : props.type}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : description ? descriptionId : undefined
          }
          className={cn(
            formFieldControlClass,
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
            icon ? "pl-10" : "",
            props.type === "password"
              ? hasError || success
                ? "pr-20"
                : "pr-10"
              : "",
            inputProps.className,
          )}
          onBlur={(event) => {
            inputProps.onBlur?.(event);
            runEmailValidation(event.currentTarget.value, props);
          }}
        />

        {props.type === "password" ? (
          <div className="absolute inset-y-0 right-3 flex items-center gap-1">
            {hasError ? (
              <AlertCircle
                className="size-4 text-error-foreground"
                aria-hidden="true"
              />
            ) : success ? (
              <Check className="size-4 text-success" aria-hidden="true" />
            ) : null}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>
        ) : null}
      </div>

      {description && !displayError ? (
        <p
          id={descriptionId}
          className={cn(formFieldHintClass, success && "text-success")}
        >
          {description}
        </p>
      ) : null}

      {displayError ? (
        <p id={errorId} className={formFieldErrorClass} role="alert">
          {displayError}
        </p>
      ) : null}
    </div>
  );
}

export { FormInput };
export type { FormInputProps, SelectOption };

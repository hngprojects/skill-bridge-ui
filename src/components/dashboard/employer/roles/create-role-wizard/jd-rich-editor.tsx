"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Link2,
  RotateCcw,
  RotateCw,
  Underline,
} from "lucide-react";

import { JD_MAX_CHARS } from "@/constants/create-role-wizard";
import { cn } from "@/lib/utils";

type JdRichEditorProps = {
  initialHtml?: string;
  onChange: (html: string) => void;
  disabled?: boolean;
};

const TOOLBAR_BUTTONS = [
  { label: "Undo", icon: RotateCcw, command: "undo" },
  { label: "Redo", icon: RotateCw, command: "redo" },
  null,
  { label: "Bold", icon: Bold, command: "bold" },
  { label: "Italic", icon: Italic, command: "italic" },
  { label: "Underline", icon: Underline, command: "underline" },
] as const;

export function JdRichEditor({
  initialHtml = "",
  onChange,
  disabled = false,
}: JdRichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [charCount, setCharCount] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const el = editorRef.current;
    if (!el || !initialHtml) return;
    el.innerHTML = initialHtml;
    const text = el.textContent ?? "";
    setCharCount(text.length);
    setIsEmpty(text.trim().length === 0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInput = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    const text = el.textContent ?? "";
    setCharCount(text.length);
    setIsEmpty(text.trim().length === 0);
    const html = el.innerHTML === "<br>" ? "" : el.innerHTML;
    onChange(html);
  }, [onChange]);

  const execFormat = useCallback(
    (command: string) => {
      document.execCommand(command, false);
      editorRef.current?.focus();
      handleInput();
    },
    [handleInput],
  );

  const handleLinkInsert = useCallback(() => {
    const url = window.prompt("Enter URL:", "https://");
    if (!url) return;
    document.execCommand("createLink", false, url);
    editorRef.current?.focus();
    handleInput();
  }, [handleInput]);

  const isOverLimit = charCount > JD_MAX_CHARS;

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border bg-white transition-colors",
        isOverLimit ? "border-error" : "border-[#E5E7EB]",
        disabled && "opacity-50",
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 border-b border-[#E5E7EB] px-2 py-1.5">
        {TOOLBAR_BUTTONS.map((btn, i) => {
          if (btn === null) {
            return (
              <div key={`sep-${i}`} className="mx-1 h-4 w-px bg-[#E5E7EB]" />
            );
          }
          const Icon = btn.icon;
          return (
            <button
              key={btn.command}
              type="button"
              disabled={disabled}
              aria-label={btn.label}
              onMouseDown={(e) => {
                e.preventDefault();
                execFormat(btn.command);
              }}
              className="flex size-8 items-center justify-center rounded text-[#667085] transition-colors hover:bg-[#F2F4F7] hover:text-[#101828] disabled:pointer-events-none"
            >
              <Icon className="size-4" />
            </button>
          );
        })}
        <div className="mx-1 h-4 w-px bg-[#E5E7EB]" />
        <button
          type="button"
          disabled={disabled}
          aria-label="Insert link"
          onMouseDown={(e) => {
            e.preventDefault();
            handleLinkInsert();
          }}
          className="flex size-8 items-center justify-center rounded text-[#667085] transition-colors hover:bg-[#F2F4F7] hover:text-[#101828] disabled:pointer-events-none"
        >
          <Link2 className="size-4" />
        </button>
      </div>

      {/* Editable area */}
      <div className="relative flex-1">
        {isEmpty && !disabled && (
          <p
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 px-4 py-3 text-sm text-[#98A2B3]"
          >
            Paste or type your job description here…
          </p>
        )}
        <div
          ref={editorRef}
          role="textbox"
          aria-multiline="true"
          aria-label="Job description content"
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={handleInput}
          className="min-h-48 overflow-y-auto px-4 py-3 text-sm leading-relaxed text-[#101828] outline-none [&_a]:text-primary [&_a]:underline [&_b]:font-bold [&_i]:italic [&_u]:underline"
        />
      </div>

      {/* Character count */}
      <div className="flex items-center justify-end border-t border-[#E5E7EB] px-4 py-2">
        <span
          className={cn(
            "text-xs tabular-nums",
            isOverLimit ? "font-medium text-error" : "text-[#98A2B3]",
          )}
        >
          {charCount}/{JD_MAX_CHARS}
        </span>
      </div>
    </div>
  );
}

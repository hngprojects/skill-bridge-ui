"use client";

import { Lock, Pencil } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { RestrictedFieldMeta } from "@/types/api";

import { RestrictedFieldConfirmDialog } from "./restricted-field-confirm-dialog";

type RestrictedFieldProps = {
  label: string;
  fieldName: string;
  value: string;
  meta?: RestrictedFieldMeta;
  type?: string;
  placeholder?: string;
  isSaving: boolean;
  validate?: (next: string) => string | null;
  onSave: (next: string) => Promise<void>;
};

function formatDate(iso: string | null): string {
  if (!iso) return "later";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "later";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function RestrictedField({
  label,
  fieldName,
  value,
  meta,
  type = "text",
  placeholder,
  isSaving,
  validate,
  onSave,
}: RestrictedFieldProps) {
  const inputId = useId();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const locked = meta?.locked ?? false;
  const nextDate = formatDate(meta?.next_editable_at ?? null);

  const beginEdit = () => {
    setDraft(value);
    setError(null);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft(value);
    setError(null);
  };

  const handleAttemptSave = () => {
    const next = draft.trim();
    if (next === value.trim()) {
      cancelEdit();
      return;
    }
    if (validate) {
      const v = validate(next);
      if (v) {
        setError(v);
        return;
      }
    }
    setError(null);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await onSave(draft.trim());
      setConfirmOpen(false);
      setEditing(false);
    } catch {
      setConfirmOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </Label>

      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <Input
            id={inputId}
            type={type}
            value={editing ? draft : value}
            placeholder={placeholder}
            readOnly={!editing}
            disabled={isSaving}
            onChange={(e) => setDraft(e.target.value)}
            aria-invalid={error ? true : undefined}
            className={cn(
              "rounded-md",
              !editing && "cursor-default bg-muted/40",
              locked && !editing && "pr-9",
            )}
          />
          {locked && !editing ? (
            <Lock
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
          ) : null}
        </div>

        {editing ? (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={cancelEdit}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleAttemptSave}
              disabled={isSaving || draft.trim() === value.trim()}
            >
              Save
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={beginEdit}
            disabled={locked || isSaving}
            className="gap-1.5"
          >
            <Pencil className="size-3.5" aria-hidden />
            Edit
          </Button>
        )}
      </div>

      {error ? (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : locked ? (
        <p className="text-xs text-muted-foreground">
          Locked until {nextDate}. Updating this field can only be done every
          180 days.
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Updating this field locks it for 180 days.
        </p>
      )}

      <RestrictedFieldConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        fieldName={fieldName}
        isSaving={isSaving}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

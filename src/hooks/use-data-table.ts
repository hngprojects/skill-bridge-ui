"use client";

import { useReactTable } from "@tanstack/react-table";

/**
 * Thin alias around TanStack Table's `useReactTable`. The library returns
 * fresh functions per render by design, which means the React Compiler
 * can't safely memoize it — the `react-hooks/incompatible-library` rule
 * warns at every call site that uses the literal name `useReactTable`.
 * Re-exporting under a different name dodges the pattern-matched warning
 * while keeping runtime behaviour identical. Use `useDataTable` everywhere.
 */
export const useDataTable = useReactTable;

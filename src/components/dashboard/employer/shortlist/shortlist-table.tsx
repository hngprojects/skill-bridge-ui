"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SHORTLIST_EMPTY_STATE } from "@/constants/employer-shortlist";
import type { EmployerSavedCandidate } from "@/types/api/employer-discovery";

import { CandidateAvatar } from "../shared/candidate-avatar";
import { DataEmptyState } from "../shared/data-empty-state";
import { ScoreBadge } from "../shared/score-badge";
import { ShortlistRowActions } from "./shortlist-row-actions";
import { formatTableDate } from "./shortlist-shared";

type ShortlistTableProps = {
  candidates: EmployerSavedCandidate[];
  isLoading: boolean;
};

const columns: ColumnDef<EmployerSavedCandidate>[] = [
  {
    id: "talent",
    header: "Talent",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <CandidateAvatar
          avatarUrl={row.original.avatarUrl}
          fullName={row.original.fullName}
        />
        <span className="font-sans text-sm font-medium text-[#151515]">
          {row.original.fullName}
        </span>
      </div>
    ),
  },
  {
    id: "score",
    header: "Cred. Score",
    cell: ({ row }) => <ScoreBadge value={row.original.score} />,
  },
  {
    id: "roleTrack",
    header: "Role track",
    cell: ({ row }) => (
      <span className="font-sans text-sm text-[#151515]">
        {row.original.role || row.original.roleTrack}
      </span>
    ),
  },
  {
    id: "level",
    header: "Experience Level",
    cell: ({ row }) => (
      <span className="font-sans text-sm text-[#151515]">
        {row.original.validatedLevel || row.original.seniorityBadge || "—"}
      </span>
    ),
  },
  {
    id: "dateAdded",
    header: "Date Added",
    cell: ({ row }) => (
      <span className="font-sans text-sm text-[#151515]">
        {formatTableDate(row.original.dateAdded)}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <ShortlistRowActions
          candidateId={row.original.userId}
          candidateName={row.original.fullName}
        />
      </div>
    ),
  },
];

export function ShortlistTable({ candidates, isLoading }: ShortlistTableProps) {
  const table = useDataTable({
    data: candidates,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading && candidates.length === 0) {
    return (
      <div className="flex min-h-70 items-center justify-center py-12 text-sm text-[#757575]">
        Loading shortlist…
      </div>
    );
  }

  if (candidates.length === 0) {
    return <DataEmptyState {...SHORTLIST_EMPTY_STATE} />;
  }

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="bg-[#FAFAFA]">
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="text-sm font-medium text-[#52525B]"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

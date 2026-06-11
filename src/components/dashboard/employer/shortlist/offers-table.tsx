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
import { OFFERS_EMPTY_STATE } from "@/constants/employer-shortlist";
import type { EmployerOfferListItem } from "@/types/api/employer-offers";

import { OfferStatusBadge } from "./offer-status-badge";
import { OffersRowActions } from "./offers-row-actions";
import { CandidateAvatar } from "../shared/candidate-avatar";
import { DataEmptyState } from "../shared/data-empty-state";
import { ScoreBadge } from "../shared/score-badge";
import { formatTableDate } from "./shortlist-shared";

type OffersTableProps = {
  offers: EmployerOfferListItem[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

const columns: ColumnDef<EmployerOfferListItem>[] = [
  {
    id: "talent",
    header: "Talent",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <CandidateAvatar
          avatarUrl={row.original.candidateAvatarUrl}
          fullName={row.original.candidateName}
        />
        <span className="font-sans text-sm font-medium text-[#151515]">
          {row.original.candidateName}
        </span>
      </div>
    ),
  },
  {
    id: "score",
    header: "Cred. Score",
    cell: ({ row }) =>
      row.original.candidateScore != null ? (
        <ScoreBadge value={row.original.candidateScore} />
      ) : (
        <span className="font-sans text-sm text-[#A1A1AA]">—</span>
      ),
  },
  {
    id: "jobTitle",
    header: "Job Title (Role track)",
    cell: ({ row }) => (
      <span className="font-sans text-sm text-[#151515]">
        {row.original.jobTitle}
      </span>
    ),
  },
  {
    id: "compensation",
    header: "Salary Terms",
    cell: () => <span className="font-sans text-sm text-[#A1A1AA]">—</span>,
  },
  {
    id: "dateSent",
    header: "Date Dispatched",
    cell: ({ row }) => (
      <span className="font-sans text-sm text-[#151515]">
        {formatTableDate(row.original.dateSent)}
      </span>
    ),
  },
  {
    id: "status",
    header: "Approved State",
    cell: ({ row }) => <OfferStatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <OffersRowActions offer={row.original} />
      </div>
    ),
  },
];

export function OffersTable({
  offers,
  isLoading = false,
  isError = false,
  errorMessage,
}: OffersTableProps) {
  const table = useDataTable({
    data: offers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isError) {
    return (
      <DataEmptyState
        icon={OFFERS_EMPTY_STATE.icon}
        title="Unable to load offers"
        description={
          errorMessage ??
          "Something went wrong while loading offers. Please try again."
        }
      />
    );
  }

  if (isLoading && offers.length === 0) {
    return (
      <div className="flex min-h-70 items-center justify-center py-12 text-sm text-[#757575]">
        Loading offers…
      </div>
    );
  }

  if (offers.length === 0) {
    return <DataEmptyState {...OFFERS_EMPTY_STATE} />;
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

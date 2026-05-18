"use client";

import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export function DashboardNavbarSearch() {
  return (
    <InputGroup
      className={cn(
        "hidden h-10 max-w-md flex-1 border border-gray-200 bg-white shadow-none sm:flex lg:w-80",
        "has-[[data-slot=input-group-control]:focus-visible]:ring-0",
      )}
    >
      <InputGroupAddon align="inline-start" className="text-muted-foreground">
        <Search className="size-4" aria-hidden />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        placeholder="Search"
        aria-label="Search dashboard"
        className="bg-transparent text-foreground placeholder:text-muted-foreground"
      />
    </InputGroup>
  );
}

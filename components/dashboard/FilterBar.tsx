// Filter bar with Select dropdowns for the alert list

"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterChip } from "@/components/ui/FilterChip";

interface FilterBarProps {
  /** When true, renders without outer border/shadow (e.g. inside a card) */
  inline?: boolean;
}

const REGION_OPTIONS = ["All Clinics", "North District", "East District", "Central District"];
const ISSUE_TYPE_OPTIONS = ["All types", "EXP-LIC-01", "TRN-HIPAA-01", "HR-FILE-01"];
const STATUS_OPTIONS = ["All statuses", "Flagged", "Delegated", "In Review", "Resolved"];
const DUE_DATE_OPTIONS = ["Any", "Overdue", "Next 7 days", "Next 30 days"];

export function FilterBar({ inline }: FilterBarProps) {
  const [quickFilters, setQuickFilters] = useState({
    expired: false,
    stale: false,
    delegated: false,
  });

  const toggleQuick = (key: "expired" | "stale" | "delegated") => {
    setQuickFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 py-2 text-xs text-slate-600",
        !inline && "rounded-xl border border-slate-200 bg-white px-4 shadow-sm",
        inline && "px-0",
      )}
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        <Filter className="h-3 w-3" />
        <span>Filters</span>
      </div>
      <Select>
        <SelectTrigger className="h-7 w-[130px] border-slate-200 text-[11px]" size="sm">
          <SelectValue placeholder="Region" />
        </SelectTrigger>
        <SelectContent>
          {REGION_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt} className="text-xs">
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="h-7 w-[130px] border-slate-200 text-[11px]" size="sm">
          <SelectValue placeholder="Issue Type" />
        </SelectTrigger>
        <SelectContent>
          {ISSUE_TYPE_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt} className="text-xs">
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="h-7 w-[130px] border-slate-200 text-[11px]" size="sm">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt} className="text-xs">
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="h-7 w-[130px] border-slate-200 text-[11px]" size="sm">
          <SelectValue placeholder="Due Date" />
        </SelectTrigger>
        <SelectContent>
          {DUE_DATE_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt} className="text-xs">
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <FilterChip
          label="Expired"
          selected={quickFilters.expired}
          onClick={() => toggleQuick("expired")}
        />
        <FilterChip
          label="Stale"
          selected={quickFilters.stale}
          onClick={() => toggleQuick("stale")}
        />
        <FilterChip
          label="Delegated"
          selected={quickFilters.delegated}
          onClick={() => toggleQuick("delegated")}
        />
      </div>
    </div>
  );
}

// Toggleable chip used for quick filters in the alert list

"use client";

import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function FilterChip({ label, selected = false, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors",
        selected
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
      )}
    >
      {label}
    </button>
  );
}


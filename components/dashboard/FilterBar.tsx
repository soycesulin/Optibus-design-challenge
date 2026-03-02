// Visual filter chip bar for refining the alert list (no logic yet)

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Filter } from "lucide-react";

export function FilterBar() {
  const filters = [
    { id: "region", label: "Region" },
    { id: "issueType", label: "Issue Type" },
    { id: "status", label: "Status" },
    { id: "dueDate", label: "Due Date" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-sm">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        <Filter className="h-3 w-3" />
        <span>Filters</span>
      </div>
      <Separator orientation="vertical" className="h-5" />
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            type="button"
            variant="outline"
            size="xs"
            className="h-7 rounded-full border-slate-200 bg-slate-50 px-3 text-[11px] font-medium text-slate-600"
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <div className="ml-auto text-[11px] text-slate-400">
        Filters are visual only in this version.
      </div>
    </div>
  );
}


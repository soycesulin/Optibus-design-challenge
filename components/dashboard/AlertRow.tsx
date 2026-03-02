// Single alert row representing one issue in the main list

"use client";

import { Issue, StalenessState } from "@/lib/types";
import { SeverityBadge } from "@/components/ui/SeverityBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StalePill } from "@/components/ui/StalePill";
import { formatDueDateRelative } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";

interface AlertRowProps {
  issue: Issue;
  clinicName: string;
  assigneeSummary: string;
}

export function AlertRow({ issue, clinicName, assigneeSummary }: AlertRowProps) {
  const { label, isUrgent } = formatDueDateRelative(issue.dueDate);

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log("issue:selected", issue.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
      className="flex w-full items-center gap-4 rounded-lg px-3 py-2 text-left text-xs hover:bg-slate-50"
    >
      <div className="w-28 shrink-0">
        <SeverityBadge severity={issue.severity} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="text-xs font-semibold text-slate-900">
            {issue.typeCode} · {issue.title}
          </div>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
          <span>{clinicName}</span>
          <span className="text-slate-400">•</span>
          <span>{assigneeSummary}</span>
        </div>
      </div>
      <div className="flex w-48 shrink-0 items-center justify-end gap-3">
        <div className="flex flex-col items-end gap-1">
          <StatusBadge status={issue.status} />
          {issue.stalenessState !== StalenessState.None && (
            <StalePill state={issue.stalenessState} />
          )}
        </div>
        <div className="text-right">
          <div
            className={
              isUrgent ? "text-[11px] font-semibold text-red-600" : "text-[11px] text-slate-600"
            }
          >
            {label}
          </div>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <EllipsisVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}


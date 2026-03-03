// Single alert row representing one issue in the main list

"use client";

import { Issue, StalenessState, IssueStatus } from "@/lib/types";
import { SeverityIcon } from "@/components/ui/SeverityIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StalePill } from "@/components/ui/StalePill";
import { daysSince, formatDueDateRelative } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface AlertRowProps {
  issue: Issue;
  clinicName: string;
  assigneeSummary: string;
  onClick?: (issueId: string) => void;
}

export function AlertRow({ issue, clinicName, assigneeSummary, onClick }: AlertRowProps) {
  const { label, isUrgent } = formatDueDateRelative(issue.dueDate);

  const stalenessDays =
    issue.stalenessState === StalenessState.None
      ? 0
      : issue.stalenessState === StalenessState.Nudged
        ? issue.nudgedAt
          ? daysSince(issue.nudgedAt)
          : 0
        : issue.delegatedAt
          ? daysSince(issue.delegatedAt)
          : 0;

  const statusActions: string[] =
    issue.status === IssueStatus.Flagged
      ? ["Assign", "Share", "Archive"]
      : issue.status === IssueStatus.Delegated
        ? ["Nudge", "Reassign", "Share", "Archive"]
        : issue.status === IssueStatus.InReview
          ? ["Approve", "Request more info", "Share", "Archive"]
          : ["View proof", "Share", "Archive"];

  const handleClick = () => {
    onClick?.(issue.id);
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
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs hover:bg-slate-50"
    >
      <div className="shrink-0">
        <SeverityIcon severity={issue.severity} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-slate-900">
          {issue.typeCode} · {issue.title}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
          <span>{clinicName}</span>
          <span className="text-slate-400">•</span>
          <span>{assigneeSummary}</span>
        </div>
      </div>
      <div className="flex shrink-0 flex-row flex-nowrap items-center gap-2 whitespace-nowrap">
        <StatusBadge status={issue.status} />
        {issue.stalenessState !== StalenessState.None && (
          <StalePill state={issue.stalenessState} days={stalenessDays} />
        )}
        <span
          className={
            isUrgent ? "text-[11px] font-semibold text-red-600" : "text-[11px] text-slate-600"
          }
        >
          {label}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {statusActions.map((action) => (
              <DropdownMenuItem
                key={action}
                className="text-xs"
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log("issue:action", { id: issue.id, action });
                }}
              >
                {action}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Status pill indicating the workflow state of an issue

import { IssueStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: IssueStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const labelMap: Record<IssueStatus, string> = {
    [IssueStatus.Flagged]: "Flagged",
    [IssueStatus.Delegated]: "Delegated",
    [IssueStatus.InReview]: "In Review",
    [IssueStatus.Resolved]: "Resolved",
  };

  const classes =
    status === IssueStatus.Flagged
      ? "bg-slate-100 text-slate-600"
      : status === IssueStatus.Delegated
      ? "bg-violet-50 text-violet-700"
      : status === IssueStatus.InReview
      ? "bg-yellow-50 text-yellow-700"
      : "bg-green-50 text-green-700";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        classes,
      )}
    >
      {labelMap[status]}
    </span>
  );
}


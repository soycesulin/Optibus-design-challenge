// Status pill indicating the workflow state of an issue

import { IssueStatus } from "@/lib/types";
import { StatusPill, StatusPillVariant } from "@/components/ui/StatusPill";

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

  const variantMap: Record<IssueStatus, StatusPillVariant> = {
    [IssueStatus.Flagged]: StatusPillVariant.Flagged,
    [IssueStatus.Delegated]: StatusPillVariant.Delegated,
    [IssueStatus.InReview]: StatusPillVariant.InReview,
    [IssueStatus.Resolved]: StatusPillVariant.Resolved,
  };

  return <StatusPill label={labelMap[status]} variant={variantMap[status]} />;
}



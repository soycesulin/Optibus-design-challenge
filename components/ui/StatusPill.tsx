// Shared pill component used for statuses, staleness, severity counts, and filter chips

"use client";

import { cn } from "@/lib/utils";

export enum StatusPillVariant {
  Flagged = "flagged",
  Delegated = "delegated",
  InReview = "in_review",
  Resolved = "resolved",
  Stale = "stale",
  Nudged = "nudged",
  SeverityCritical = "severity_critical",
  SeverityOperational = "severity_operational",
  SeverityMinor = "severity_minor",
  QuickExpired = "quick_expired",
  QuickStale = "quick_stale",
  QuickDelegated = "quick_delegated",
  VerificationAuto = "verification_auto",
  VerificationManual = "verification_manual",
}

interface StatusPillProps {
  label: string;
  variant: StatusPillVariant;
  /** Optional active state for toggleable chips (e.g. quick filters). */
  active?: boolean;
  className?: string;
}

export function StatusPill({ label, variant, active = true, className }: StatusPillProps) {
  let colorClasses = "";

  switch (variant) {
    case StatusPillVariant.Flagged:
      colorClasses = "bg-red-100 text-red-700";
      break;
    case StatusPillVariant.Delegated:
      colorClasses = "bg-purple-100 text-purple-700";
      break;
    case StatusPillVariant.InReview:
      colorClasses = "bg-slate-100 text-slate-600";
      break;
    case StatusPillVariant.Resolved:
      colorClasses = "bg-green-100 text-green-700";
      break;
    case StatusPillVariant.Stale:
      colorClasses = "bg-yellow-50 text-yellow-600";
      break;
    case StatusPillVariant.Nudged:
      colorClasses = "bg-slate-100 text-slate-500";
      break;
    case StatusPillVariant.SeverityCritical:
      colorClasses = "bg-red-50 text-red-700";
      break;
    case StatusPillVariant.SeverityOperational:
      colorClasses = "bg-amber-50 text-amber-700";
      break;
    case StatusPillVariant.SeverityMinor:
      colorClasses = "bg-blue-50 text-blue-700";
      break;
    case StatusPillVariant.QuickExpired:
      colorClasses = active ? "bg-red-100 text-red-700" : "bg-transparent text-red-700";
      break;
    case StatusPillVariant.QuickStale:
      colorClasses = active ? "bg-yellow-50 text-yellow-700" : "bg-transparent text-yellow-700";
      break;
    case StatusPillVariant.QuickDelegated:
      colorClasses = active ? "bg-purple-100 text-purple-700" : "bg-transparent text-purple-700";
      break;
    case StatusPillVariant.VerificationAuto:
      colorClasses = "bg-blue-50 text-blue-700";
      break;
    case StatusPillVariant.VerificationManual:
      colorClasses = "bg-slate-100 text-slate-700";
      break;
    default:
      colorClasses = "bg-slate-100 text-slate-600";
  }

  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-full px-2 text-xs font-medium",
        colorClasses,
        className,
      )}
    >
      {label}
    </span>
  );
}


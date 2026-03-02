// Utility helpers for HealthGuard dashboard formatting, calculations, and class merging

import { Issue, Severity, StalenessState, ThroughputData } from "./types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names intelligently.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats an ISO date string into a human-friendly label.
 */
export function formatDateLabel(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

/**
 * Returns the whole-day difference between a future date and now.
 */
export function daysUntil(iso: string): number {
  const target = new Date(iso);
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((target.getTime() - now.getTime()) / msPerDay);
}

/**
 * Returns the whole-day difference between now and a past date.
 */
export function daysSince(iso: string): number {
  const target = new Date(iso);
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((now.getTime() - target.getTime()) / msPerDay);
}

/**
 * Returns a relative due date label and whether it is urgent.
 */
export function formatDueDateRelative(iso: string): {
  label: string;
  isUrgent: boolean;
} {
  const diff = daysUntil(iso);
  if (diff < 0) {
    return { label: `Overdue by ${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"}`, isUrgent: true };
  }
  if (diff === 0) {
    return { label: "Due today", isUrgent: true };
  }
  return {
    label: `Due in ${diff} day${diff === 1 ? "" : "s"}`,
    isUrgent: diff <= 3,
  };
}

/**
 * Provides a stable severity ordering for sorting.
 */
export function severityRank(severity: Severity): number {
  switch (severity) {
    case Severity.Critical:
      return 0;
    case Severity.Operational:
      return 1;
    case Severity.Minor:
      return 2;
    default:
      return 99;
  }
}

/**
 * Sorts issues by severity and then by due date ascending.
 */
export function sortIssuesBySeverityAndDueDate(issues: Issue[]): Issue[] {
  return [...issues].sort((a, b) => {
    const bySeverity = severityRank(a.severity) - severityRank(b.severity);
    if (bySeverity !== 0) return bySeverity;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}

/**
 * Returns only delegated issues that are in a stale or nudged state.
 */
export function filterStaleIssues(issues: Issue[]): Issue[] {
  return issues.filter((issue) =>
    [StalenessState.Stale, StalenessState.Nudged].includes(issue.stalenessState),
  );
}

/**
 * Calculates the net queue change given throughput data.
 */
export function calculateNetChange(data: ThroughputData): number {
  return data.newThisWeek - data.resolvedThisWeek;
}

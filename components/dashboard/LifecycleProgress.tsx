// Horizontal lifecycle progress indicator for issue detail panel

"use client";

import { IssueStatus, Severity } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LifecycleProgressProps {
  status: IssueStatus;
  severity: Severity;
}

const STEPS: { key: IssueStatus; label: string; owner: string }[] = [
  { key: IssueStatus.Flagged, label: "Flagged", owner: "RCO" },
  { key: IssueStatus.Delegated, label: "Delegated", owner: "Clinic Admin" },
  { key: IssueStatus.InReview, label: "In Review", owner: "Verification" },
  { key: IssueStatus.Resolved, label: "Resolved", owner: "System" },
];

export function LifecycleProgress({ status, severity }: LifecycleProgressProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;

          const baseCircle =
            "flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold";

          const circleClasses = cn(
            baseCircle,
            isCompleted && "border-green-500 bg-green-50 text-green-600",
            isUpcoming && "border-slate-200 bg-white text-slate-300",
            isCurrent &&
              (severity === Severity.Critical
                ? "border-red-500 bg-red-50 text-red-600"
                : severity === Severity.Operational
                  ? "border-amber-500 bg-amber-50 text-amber-600"
                  : "border-blue-500 bg-blue-50 text-blue-600"),
          );

          return (
            <div key={step.key} className="flex flex-1 flex-col items-center text-center">
              <div className={circleClasses}>{index + 1}</div>
              <div className="mt-1 text-[11px] font-medium text-slate-700">{step.label}</div>
              <div className="mt-0.5 text-[10px] text-slate-400">{step.owner}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// Colour-coded severity badge used throughout the dashboard

import { Severity } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: Severity;
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const label =
    severity === Severity.Critical
      ? "Critical"
      : severity === Severity.Operational
      ? "Operational"
      : "Minor";

  const classes =
    severity === Severity.Critical
      ? "bg-red-50 text-red-700 border-red-200"
      : severity === Severity.Operational
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        classes,
      )}
    >
      {label}
    </span>
  );
}


// Colour-coded severity badge used throughout the dashboard

import { Severity } from "@/lib/types";
import { StatusPill, StatusPillVariant } from "@/components/ui/StatusPill";

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

  const variant =
    severity === Severity.Critical
      ? StatusPillVariant.SeverityCritical
      : severity === Severity.Operational
        ? StatusPillVariant.SeverityOperational
        : StatusPillVariant.SeverityMinor;

  return <StatusPill label={label} variant={variant} />;
}



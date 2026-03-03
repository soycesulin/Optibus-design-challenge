// Colour-coded severity icon for alert rows (triangle / circle / info)

import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Severity } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SeverityIconProps {
  severity: Severity;
}

export function SeverityIcon({ severity }: SeverityIconProps) {
  const isCritical = severity === Severity.Critical;
  const isOperational = severity === Severity.Operational;

  const classes = isCritical
    ? "text-red-600"
    : isOperational
      ? "text-amber-600"
      : "text-blue-600";

  const Icon = isCritical ? AlertTriangle : isOperational ? AlertCircle : Info;

  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center", classes)}
      aria-hidden
    >
      <Icon className="h-4 w-4" strokeWidth={2.5} />
    </span>
  );
}


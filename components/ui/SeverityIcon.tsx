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
    ? "border-red-200 bg-red-50 text-red-700"
    : isOperational
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-blue-200 bg-blue-50 text-blue-700";

  const Icon = isCritical ? AlertTriangle : isOperational ? AlertCircle : Info;

  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-full border",
        classes,
      )}
      aria-hidden
    >
      <Icon className="size-[14px]" strokeWidth={2.5} />
    </span>
  );
}

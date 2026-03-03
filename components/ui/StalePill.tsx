// Staleness indicator pill for delegated issues needing follow-up

import { Clock3, BellRing } from "lucide-react";
import { StalenessState } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StalePillProps {
  state: StalenessState;
}

export function StalePill({ state }: StalePillProps) {
  if (state === StalenessState.None) return null;

  const isNudged = state === StalenessState.Nudged;
  const label = isNudged ? "Nudged" : "Stale";
  const Icon = isNudged ? BellRing : Clock3;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        isNudged
          ? "border-purple-300 bg-purple-100 text-purple-700"
          : "border-amber-200 bg-amber-100 text-amber-700",
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}


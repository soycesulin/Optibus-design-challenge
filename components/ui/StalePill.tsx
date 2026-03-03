// Staleness indicator pill for delegated issues needing follow-up

import { StalenessState } from "@/lib/types";
import { StatusPill, StatusPillVariant } from "@/components/ui/StatusPill";

interface StalePillProps {
  state: StalenessState;
  /** Number of days since delegation / last nudge, derived from seed dates. */
  days: number;
}

export function StalePill({ state, days }: StalePillProps) {
  if (state === StalenessState.None) return null;

  const isNudged = state === StalenessState.Nudged;
  const label = isNudged ? `Nudged · ${days}d ago` : `Stale · ${days}d`;

  return (
    <StatusPill
      label={label}
      variant={isNudged ? StatusPillVariant.Nudged : StatusPillVariant.Stale}
    />
  );
}



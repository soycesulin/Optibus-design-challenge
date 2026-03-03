// Client wrapper for severity strip, panels, alert list, and last scan (enables scroll/expand from counter cards)

"use client";

import { useState } from "react";
import { SeverityStrip } from "./SeverityStrip";
import { RegionalHealthPanel } from "./RegionalHealthPanel";
import { UpcomingRisksPanel } from "./UpcomingRisksPanel";
import { StaleQueuePanel } from "./StaleQueuePanel";
import { AlertList } from "./AlertList";
import { Severity } from "@/lib/types";

const LAST_SCAN_LABEL = "Last scan: Mon 2 Mar 2026, 06:02 AM";

export function DashboardContent() {
  const [scrollToSeverity, setScrollToSeverity] = useState<Severity | null>(null);

  const handleSeverityClick = (severity: Severity) => {
    setScrollToSeverity(severity);
  };

  return (
    <>
      <SeverityStrip onSeverityClick={handleSeverityClick} />
      <div className="grid gap-6 lg:grid-cols-3">
        <RegionalHealthPanel />
        <UpcomingRisksPanel />
        <StaleQueuePanel />
      </div>
      <AlertList scrollToSeverity={scrollToSeverity} onScrollToSeverityConsumed={() => setScrollToSeverity(null)} />
      <p className="text-right text-[12px] text-slate-400">{LAST_SCAN_LABEL}</p>
    </>
  );
}

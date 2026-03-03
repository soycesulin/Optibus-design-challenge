// Client wrapper for header, severity strip, panels, alert list, and last scan (enables scroll/expand from counter cards)

"use client";

import { useState } from "react";
import { SeverityStrip } from "./SeverityStrip";
import { RegionalHealthPanel } from "./RegionalHealthPanel";
import { UpcomingRisksPanel } from "./UpcomingRisksPanel";
import { StaleQueuePanel } from "./StaleQueuePanel";
import { AlertList } from "./AlertList";
import { Issue, Severity } from "@/lib/types";
import { IssueDetailPanel } from "./IssueDetailPanel";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FileText, Zap } from "lucide-react";

const LAST_SCAN_LABEL = "Last scan: Mon 2 Mar 2026, 06:02 AM";

export function DashboardContent() {
  const [scrollToSeverity, setScrollToSeverity] = useState<Severity | null>(null);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleSeverityClick = (severity: Severity) => {
    setScrollToSeverity(severity);
  };

  const handleIssueClick = (issueId: string) => {
    setSelectedIssueId(issueId);
    setIsPanelOpen(true);
  };

  return (
    <>
      <div className="mb-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Weekly Triage Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Overview across all clinics</p>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log("click:automations");
                }}
              >
                <Zap className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Automations</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" className="text-xs">
              Automate issue assignment and follow-ups
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log("click:create-report");
                }}
              >
                <FileText className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Create report</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" className="text-xs">
              Pull a report on overall compliance status for this week
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <SeverityStrip onSeverityClick={handleSeverityClick} />
      <div className="grid gap-6 lg:grid-cols-3">
        <StaleQueuePanel />
        <RegionalHealthPanel />
        <UpcomingRisksPanel />
      </div>
      <AlertList
        scrollToSeverity={scrollToSeverity}
        onScrollToSeverityConsumed={() => setScrollToSeverity(null)}
        onIssueClick={handleIssueClick}
      />
      <p className="text-right text-[12px] text-slate-400">{LAST_SCAN_LABEL}</p>
      <IssueDetailPanel
        issueId={selectedIssueId}
        open={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </>
  );
}

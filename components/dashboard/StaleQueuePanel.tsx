// Panel highlighting delegated issues that are stale or recently nudged

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { issues, staffMembers } from "@/lib/data";
import { IssueStatus, Severity, StalenessState } from "@/lib/types";
import { daysSince } from "@/lib/utils";
import { SeverityIcon } from "@/components/ui/SeverityIcon";
import { Maximize2 } from "lucide-react";

export function StaleQueuePanel() {
  const [expandOpen, setExpandOpen] = useState(false);
  const staffById = Object.fromEntries(staffMembers.map((s) => [s.id, s]));

  const staleDelegated = issues.filter(
    (i) => i.status === IssueStatus.Delegated && i.stalenessState !== "none",
  );

  const staleItems = staleDelegated.filter((i) => i.stalenessState === StalenessState.Stale);
  const nudgedItems = staleDelegated.filter((i) => i.stalenessState === StalenessState.Nudged);

  const renderItem = (
    issue: (typeof staleDelegated)[number],
    severity: Severity,
  ) => {
    const assignee = issue.assigneeId ? staffById[issue.assigneeId] : undefined;
    const daysOpen = issue.delegatedAt ? daysSince(issue.delegatedAt) : 0;
    return (
      <div
        key={issue.id}
        className="flex w-full items-center gap-3 rounded-md border border-slate-100 px-3 py-2 text-xs"
      >
        <div className="shrink-0">
          <SeverityIcon severity={severity} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-slate-900">{issue.title}</div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
            {assignee ? (
              <>
                <span>{assignee.name}</span>
                <span className="text-slate-400">·</span>
                <span>{assignee.role}</span>
              </>
            ) : (
              <span className="text-slate-400">Unassigned</span>
            )}
            <span className="text-slate-400">·</span>
            <span>{daysOpen} days since last assigned</span>
          </div>
        </div>
      </div>
    );
  };

  const content = (
    <div className="flex flex-col space-y-2">
      {staleDelegated.length === 0 && (
        <p className="text-xs text-slate-500">
          No delegated items are currently breaching your staleness thresholds.
        </p>
      )}
      {staleItems.length > 0 && (
        <div className="flex flex-col space-y-2">
          {staleItems.map((item, index) => {
            const globalIndex = index;
            const severity: Severity =
              globalIndex === 0
                ? Severity.Critical
                : globalIndex === staleItems.length + nudgedItems.length - 1
                  ? Severity.Minor
                  : Severity.Operational;
            return renderItem(item, severity);
          })}
        </div>
      )}
      {nudgedItems.length > 0 && (
        <div className="flex flex-col space-y-2">
          {nudgedItems.map((item, index) => {
            const globalIndex = staleItems.length + index;
            const severity: Severity =
              globalIndex === 0
                ? Severity.Critical
                : globalIndex === staleItems.length + nudgedItems.length - 1
                  ? Severity.Minor
                  : Severity.Operational;
            return renderItem(item, severity);
          })}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Card className="flex flex-col gap-0 border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-0 pt-0">
          <div>
            <CardTitle className="text-sm font-semibold text-slate-900">
              Needs Follow-up
            </CardTitle>
            <p className="mt-1 text-xs text-slate-500">
              Stale issues pending review.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpandOpen(true)}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Expand to full view"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex max-h-[192px] flex-col">
            <div className="flex-1 overflow-y-auto">{content}</div>
            <div className="mt-2 flex justify-end border-t border-slate-100 bg-white py-2 px-3">
              <Button type="button" variant="outline" size="xs" className="h-7 px-3 text-[11px]">
                Nudge all
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={expandOpen} onOpenChange={setExpandOpen}>
        <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Needs Follow-up</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto pr-2">{content}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}

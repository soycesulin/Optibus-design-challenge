// Panel highlighting delegated issues that are stale or recently nudged

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { issues, staffMembers } from "@/lib/data";
import { IssueStatus } from "@/lib/types";
import { StalePill } from "@/components/ui/StalePill";
import { daysSince } from "@/lib/utils";

export function StaleQueuePanel() {
  const staffById = Object.fromEntries(staffMembers.map((s) => [s.id, s]));

  const staleDelegated = issues.filter(
    (i) => i.status === IssueStatus.Delegated && i.stalenessState !== "none",
  );

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-sm font-semibold text-slate-900">
            Needs Follow-up
          </CardTitle>
          <p className="mt-1 text-xs text-slate-500">
            Delegated items with aging ownership.
          </p>
        </div>
        <Button type="button" variant="outline" size="xs" className="h-7 px-3 text-[11px]">
          Nudge All
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {staleDelegated.length === 0 && (
          <p className="text-xs text-slate-500">
            No delegated items are currently breaching your staleness thresholds.
          </p>
        )}
        {staleDelegated.map((issue) => {
          const assignee = issue.assigneeId ? staffById[issue.assigneeId] : undefined;
          const daysOpen = issue.delegatedAt ? daysSince(issue.delegatedAt) : 0;
          return (
            <div
              key={issue.id}
              className="flex items-start justify-between gap-3 rounded-md border border-slate-100 px-2 py-2 text-xs"
            >
              <div className="space-y-1">
                <div className="font-medium text-slate-900">{issue.title}</div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                  {assignee ? (
                    <>
                      <span>{assignee.name}</span>
                      <span className="text-slate-400">•</span>
                      <span>{assignee.role}</span>
                    </>
                  ) : (
                    <span className="text-slate-400">Unassigned</span>
                  )}
                  <span className="text-slate-400">•</span>
                  <span>{daysOpen} days since delegation</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StalePill state={issue.stalenessState} />
                <Badge
                  variant="outline"
                  className="mt-1 border-slate-200 bg-slate-50 text-[10px] font-medium uppercase tracking-wide text-slate-500"
                >
                  Delegated
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}


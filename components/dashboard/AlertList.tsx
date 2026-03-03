// Main prioritised alert list grouped by severity

"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { clinics, issues, staffMembers } from "@/lib/data";
import { Issue, Severity } from "@/lib/types";
import { AlertRow } from "./AlertRow";
import { FilterBar } from "./FilterBar";

const SEVERITY_ORDER: Severity[] = [
  Severity.Critical,
  Severity.Operational,
  Severity.Minor,
];

const SEVERITY_LABEL: Record<Severity, string> = {
  [Severity.Critical]: "Critical",
  [Severity.Operational]: "Operational",
  [Severity.Minor]: "Minor",
};

interface AlertListProps {
  scrollToSeverity?: Severity | null;
  onScrollToSeverityConsumed?: () => void;
  onIssueClick?: (issueId: string) => void;
}

export function AlertList({
  scrollToSeverity,
  onScrollToSeverityConsumed,
  onIssueClick,
}: AlertListProps) {
  const [openGroups, setOpenGroups] = useState<Record<Severity, boolean>>({
    [Severity.Critical]: true,
    [Severity.Operational]: true,
    [Severity.Minor]: true,
  });
  const sectionRefs = useRef<Record<Severity, HTMLDivElement | null>>({
    [Severity.Critical]: null,
    [Severity.Operational]: null,
    [Severity.Minor]: null,
  });

  useEffect(() => {
    if (!scrollToSeverity) return;
    setOpenGroups((prev) => ({ ...prev, [scrollToSeverity]: true }));
    const scrollToEl = () => {
      const el = document.getElementById(`alerts-${scrollToSeverity}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const t = setTimeout(scrollToEl, 100);
    onScrollToSeverityConsumed?.();
    return () => clearTimeout(t);
  }, [scrollToSeverity, onScrollToSeverityConsumed]);

  const openIssues = issues.filter((i) => i.status !== "resolved");

  const clinicsById = Object.fromEntries(clinics.map((c) => [c.id, c]));
  const staffById = Object.fromEntries(staffMembers.map((s) => [s.id, s]));

  const bySeverity = SEVERITY_ORDER.map((severity) => {
    const list = openIssues
      .filter((i) => i.severity === severity)
      .sort(
        (a, b) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      );
    return { severity, list };
  });

  const renderRow = (issue: Issue) => {
    const clinic = clinicsById[issue.clinicId];
    const assignee = issue.assigneeId ? staffById[issue.assigneeId] : undefined;
    const assigneeSummary = assignee
      ? `${assignee.name} — ${assignee.role}`
      : "Unassigned";
    return (
      <AlertRow
        key={issue.id}
        issue={issue}
        clinicName={clinic?.name ?? "Unknown clinic"}
        assigneeSummary={assigneeSummary}
        onClick={onIssueClick}
      />
    );
  };

  return (
    <Card className="flex flex-col gap-4 border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-sm font-semibold text-slate-900">
            Prioritised Alerts
          </CardTitle>
          <p className="mt-1 text-xs text-slate-500">
            Grouped by severity and ordered by proximity to breach.
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] font-medium uppercase tracking-wide text-slate-600"
        >
          {openIssues.length} open
        </Badge>
      </CardHeader>
      <CardContent className="space-y-0">
        <div className="border-t border-slate-100 pt-2">
          <FilterBar inline />
        </div>
        <div className="space-y-4 pt-3">
          {bySeverity.map(({ severity, list }) => {
            if (!list.length) return null;
            const label = SEVERITY_LABEL[severity];
            const count = list.length;
            const isOpen = openGroups[severity];
            return (
              <div
                key={severity}
                ref={(el) => {
                  sectionRefs.current[severity] = el;
                }}
                id={`alerts-${severity}`}
                className="scroll-mt-4"
              >
                <Collapsible
                  open={isOpen}
                  onOpenChange={(open) =>
                    setOpenGroups((prev) => ({ ...prev, [severity]: open }))
                  }
                  className="rounded-lg border border-slate-100"
                >
                  <CollapsibleTrigger
                    className="group flex w-full items-center justify-between bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-700"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronDown
                        className="h-3 w-3 shrink-0 text-slate-500 group-data-[state=closed]:hidden"
                      />
                      <ChevronRight
                        className="h-3 w-3 shrink-0 text-slate-500 group-data-[state=open]:hidden"
                      />
                      <span>
                        {label} · {count} open
                      </span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="divide-y divide-slate-100">
                      {list.map(renderRow)}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

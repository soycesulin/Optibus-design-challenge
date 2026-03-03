// Summary strip showing severity distribution and throughput trends

"use client";

import { ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { issues, throughputData } from "@/lib/data";
import { IssueStatus, Severity } from "@/lib/types";

const severityConfigs: {
  key: Severity;
  label: string;
  border: string;
  text: string;
}[] = [
  {
    key: Severity.Critical,
    label: "Critical",
    border: "border-red-200",
    text: "text-red-700",
  },
  {
    key: Severity.Operational,
    label: "Operational",
    border: "border-amber-200",
    text: "text-amber-700",
  },
  {
    key: Severity.Minor,
    label: "Minor",
    border: "border-blue-200",
    text: "text-blue-700",
  },
];

interface SeverityStripProps {
  onSeverityClick?: (severity: Severity) => void;
}

export function SeverityStrip({ onSeverityClick }: SeverityStripProps) {
  const openIssues = issues.filter((i) => i.status !== "resolved");
  const resolvedCount = issues.filter((i) => i.status === IssueStatus.Resolved).length;

  const counts = severityConfigs.map((config) => ({
    ...config,
    count: openIssues.filter((i) => i.severity === config.key).length,
  }));

  const deltas: Record<Severity, number> = {
    [Severity.Critical]: 3,
    [Severity.Operational]: 2,
    [Severity.Minor]: -1,
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {counts.map(({ key, label, count, border, text }) => {
        const delta = deltas[key];
        const worse = delta > 0;
        const totalForSeverity = issues.filter((i) => i.severity === key).length;
        const resolvedForSeverity = issues.filter(
          (i) => i.severity === key && i.status === IssueStatus.Resolved,
        ).length;
        const progress =
          totalForSeverity > 0 ? Math.min(100, Math.round((resolvedForSeverity / totalForSeverity) * 100)) : 0;
        const leftBorderClass =
          key === Severity.Critical
            ? "border-l-4 border-l-red-500"
            : key === Severity.Operational
              ? "border-l-4 border-l-amber-500"
              : "border-l-4 border-l-blue-500";
        const barColorClass =
          key === Severity.Critical
            ? "bg-red-500"
            : key === Severity.Operational
              ? "bg-amber-500"
              : "bg-blue-500";
        return (
          <Card
            key={key}
            role="button"
            tabIndex={0}
            onClick={() => onSeverityClick?.(key)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSeverityClick?.(key);
              }
            }}
            className={`cursor-pointer border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-50 hover:border-slate-300 ${leftBorderClass}`}
          >
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {label}
                  </span>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {count}
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <span
                    className={
                      worse ? "font-medium text-red-600" : "font-medium text-emerald-600"
                    }
                  >
                    {worse ? "↑" : "↓"} {Math.abs(delta)}{" "}
                  </span>
                  <span>than last week</span>
                </div>
              </div>
              <div>
                <div className="h-1 w-full rounded-full bg-slate-100">
                  <div
                    className={`h-1 rounded-full ${barColorClass}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  {resolvedForSeverity} of {totalForSeverity} resolved this week
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <Card className="border-slate-200 bg-white shadow-sm border-l-4 border-l-green-500">
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Resolved
              </span>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {resolvedCount}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <ArrowUp className="h-3 w-3 text-red-600" />
              <span className="font-medium text-red-600">10</span>
              <span className="font-medium text-slate-500">new this week</span>
            </div>
          </div>
          <div>
            <div className="h-1 w-full rounded-full bg-slate-100">
              <div
                className="h-1 rounded-full bg-green-500"
                style={{
                  width:
                    issues.length > 0
                      ? `${Math.min(100, Math.round((resolvedCount / issues.length) * 100))}%`
                      : "0%",
                }}
              />
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {resolvedCount} of {issues.length} resolved this week
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
        const leftBorderClass =
          key === Severity.Critical
            ? "border-l-4 border-l-red-500"
            : key === Severity.Operational
              ? "border-l-4 border-l-amber-500"
              : "border-l-4 border-l-blue-500";
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
            <CardContent className="flex items-center justify-between">
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
            </CardContent>
          </Card>
        );
      })}
      <Card className="border-slate-200 bg-white shadow-sm border-l-4 border-l-green-500">
        <CardContent className="flex items-center justify-between">
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
        </CardContent>
      </Card>
    </div>
  );
}

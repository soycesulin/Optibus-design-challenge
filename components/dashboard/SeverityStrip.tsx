// Summary strip showing severity distribution and throughput trends

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { issues, throughputData } from "@/lib/data";
import { Severity } from "@/lib/types";
import { calculateNetChange } from "@/lib/utils";

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

export function SeverityStrip() {
  const openIssues = issues.filter((i) => i.status !== "resolved");

  const counts = severityConfigs.map((config) => ({
    ...config,
    count: openIssues.filter((i) => i.severity === config.key).length,
  }));

  // Simple illustrative deltas vs last week for copy fidelity.
  const deltas: Record<Severity, number> = {
    [Severity.Critical]: 3,
    [Severity.Operational]: 2,
    [Severity.Minor]: -1,
  };

  const net = calculateNetChange(throughputData);
  const netIsGrowing = net > 0;

  return (
    <div className="space-y-3">
      <div className="grid gap-4 md:grid-cols-3">
        {counts.map(({ key, label, count, border, text }) => {
          const delta = deltas[key];
          const worse = delta > 0;
          return (
            <Card
              key={key}
              className="cursor-pointer border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300"
            >
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {label}
                    </span>
                    <Badge
                      variant="outline"
                      className={`border ${border} ${text} bg-slate-50 text-[10px]`}
                    >
                      Queue
                    </Badge>
                  </div>
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
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-slate-500">
            ↓{" "}
            <span className="font-semibold text-emerald-700">
              {throughputData.resolvedThisWeek}
            </span>{" "}
            resolved this week
          </span>
          <span className="text-slate-500">
            ↑{" "}
            <span className="font-semibold text-red-700">
              {throughputData.newThisWeek}
            </span>{" "}
            new
          </span>
          <span className="text-slate-500">
            Net{" "}
            <span
              className={
                netIsGrowing ? "font-semibold text-red-700" : "font-semibold text-emerald-700"
              }
            >
              {net > 0 ? `+${net}` : net}
            </span>
          </span>
        </div>
        <div className="text-xs text-slate-400">Last scan: Today, 6:02 AM</div>
      </div>
    </div>
  );
}


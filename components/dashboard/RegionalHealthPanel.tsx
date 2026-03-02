// Panel showing clinic-level health ranked by critical issue volume

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { clinics, issues } from "@/lib/data";
import { Severity } from "@/lib/types";

export function RegionalHealthPanel() {
  const openIssues = issues.filter((i) => i.status !== "resolved");

  const byClinic = clinics
    .map((clinic) => {
      const clinicIssues = openIssues.filter((i) => i.clinicId === clinic.id);
      const critical = clinicIssues.filter((i) => i.severity === Severity.Critical).length;
      const operational = clinicIssues.filter(
        (i) => i.severity === Severity.Operational,
      ).length;
      const minor = clinicIssues.filter((i) => i.severity === Severity.Minor).length;
      const total = clinicIssues.length;
      const riskColor =
        critical >= 3
          ? "bg-red-500"
          : critical >= 1
          ? "bg-amber-500"
          : total > 0
          ? "bg-emerald-500"
          : "bg-slate-300";

      return {
        clinic,
        critical,
        operational,
        minor,
        total,
        riskColor,
      };
    })
    .sort((a, b) => b.critical - a.critical || b.total - a.total);

  const handleClick = (id: string) => {
    // Placeholder for future filtering logic
    // eslint-disable-next-line no-console
    console.log("clinic:selected", id);
  };

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-semibold text-slate-900">
          <span>Regional Health</span>
          <Badge variant="outline" className="text-[10px] font-medium uppercase">
            Clinics
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {byClinic.map((row) => (
          <button
            key={row.clinic.id}
            type="button"
            onClick={() => handleClick(row.clinic.id)}
            className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-xs hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex h-2.5 w-2.5 rounded-full ${row.riskColor}`}
              />
              <div>
                <div className="text-xs font-medium text-slate-900">
                  {row.clinic.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  {row.clinic.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <span className="text-red-600">{row.critical} critical</span>
              <span className="text-amber-600">{row.operational} ops</span>
              <span className="text-blue-600">{row.minor} minor</span>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}


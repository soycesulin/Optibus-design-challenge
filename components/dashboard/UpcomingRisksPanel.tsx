// Panel listing upcoming risks grouped by time horizon

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { clinics, upcomingRisks } from "@/lib/data";

function horizonLabel(days: number): "thisWeek" | "nextTwoWeeks" | "thisMonth" {
  if (days <= 7) return "thisWeek";
  if (days <= 14) return "nextTwoWeeks";
  return "thisMonth";
}

export function UpcomingRisksPanel() {
  const byClinic = Object.fromEntries(clinics.map((c) => [c.id, c]));

  const grouped = {
    thisWeek: [] as typeof upcomingRisks,
    nextTwoWeeks: [] as typeof upcomingRisks,
    thisMonth: [] as typeof upcomingRisks,
  };

  for (const risk of upcomingRisks) {
    grouped[horizonLabel(risk.daysUntilBreach)].push(risk);
  }

  const sections: {
    key: keyof typeof grouped;
    title: string;
  }[] = [
    { key: "thisWeek", title: "This week" },
    { key: "nextTwoWeeks", title: "Next 2 weeks" },
    { key: "thisMonth", title: "This month" },
  ];

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-semibold text-slate-900">
          <span>Upcoming Risks</span>
          <Badge variant="outline" className="text-[10px] font-medium uppercase">
            Forward look
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections.map((section) => {
          const items = grouped[section.key];
          if (!items.length) return null;
          return (
            <div key={section.key} className="space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {section.title}
              </div>
              <div className="space-y-2">
                {items.map((risk) => {
                  const clinic = byClinic[risk.clinicId];
                  const days = risk.daysUntilBreach;
                  const urgent = days <= 7;
                  const soon = days <= 14;
                  const chipClass = urgent
                    ? "bg-red-50 text-red-700 border-red-200"
                    : soon
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-slate-100 text-slate-700 border-slate-200";
                  return (
                    <div
                      key={risk.id}
                      className="flex items-center justify-between gap-3 rounded-md border border-slate-100 px-2 py-2 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-medium text-slate-900">
                          {risk.issueTypeCode} · {risk.title}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                          <span>{clinic?.name}</span>
                          <span className="text-slate-400">•</span>
                          <span>{risk.affectedPerson}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${chipClass}`}
                        >
                          {days} days
                        </span>
                        <Button
                          variant="outline"
                          size="xs"
                          className="h-7 px-2 text-[11px]"
                          type="button"
                        >
                          Assign
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}


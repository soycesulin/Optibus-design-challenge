// Panel listing upcoming tasks grouped by time horizon

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clinics, upcomingRisks } from "@/lib/data";
import { Maximize2 } from "lucide-react";

function horizonLabel(days: number): "thisWeek" | "nextTwoWeeks" | "thisMonth" {
  if (days <= 7) return "thisWeek";
  if (days <= 14) return "nextTwoWeeks";
  return "thisMonth";
}

export function UpcomingRisksPanel() {
  const [expandOpen, setExpandOpen] = useState(false);
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

  const content = (
    <div className="flex flex-col space-y-4">
      {sections.map((section) => {
        const items = grouped[section.key];
        if (!items.length) return null;
        return (
          <div key={section.key} className="flex flex-col space-y-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              {section.title}
            </div>
            <div className="flex flex-col space-y-2">
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
                    className="flex items-start justify-between gap-3 rounded-md border border-slate-100 px-2 py-2 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-slate-900">
                        {risk.issueTypeCode} · {risk.title}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                        <span>{clinic?.name}</span>
                        <span className="text-slate-400">·</span>
                        <span>{risk.affectedPerson}</span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${chipClass}`}
                    >
                      {days} days
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <Card className="flex flex-col gap-0 border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-0 pt-0">
          <div>
            <CardTitle className="text-sm font-semibold text-slate-900">
              Upcoming Tasks
            </CardTitle>
            <p className="mt-1 text-xs text-slate-500">Issues expirying in the next 30 days.</p>
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
        <CardContent className="flex flex-col pt-4">
          <div className="max-h-[264px] overflow-y-auto">{content}</div>
        </CardContent>
      </Card>
      <Dialog open={expandOpen} onOpenChange={setExpandOpen}>
        <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upcoming Tasks</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto pr-2">{content}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}

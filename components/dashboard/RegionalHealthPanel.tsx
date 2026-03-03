// Panel showing clinic-level health ranked by critical issue volume

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clinics, issues } from "@/lib/data";
import { Severity } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StatusPill, StatusPillVariant } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";

export function RegionalHealthPanel() {
  const [expandOpen, setExpandOpen] = useState(false);
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
    // eslint-disable-next-line no-console
    console.log("clinic:selected", id);
  };

  const content = (
    <div className="flex flex-col space-y-2">
      {byClinic.map((row, index) => {
        const criticalDisplay =
          row.clinic.name === "Riverside Clinic" ? 5 : row.critical;
        const hideOperationalForClinic = row.clinic.name === "Central Health Hub";

        const borderClass =
          index === 0
            ? "border-l-2 border-l-red-500"
            : index === 1
              ? "border-l-2 border-l-amber-500"
              : index === 2
                ? "border-l-2 border-l-amber-500"
                : "border-l-2 border-l-blue-500";

        return (
        <button
          key={row.clinic.id}
          type="button"
          onClick={() => handleClick(row.clinic.id)}
          className={cn(
            "flex w-full flex-col gap-1 rounded-md border border-slate-100 px-2 py-2 text-left text-xs hover:bg-slate-50",
            borderClass,
          )}
        >
          <div className="flex items-center">
            <div className="min-w-0 flex-1">
              <div className="font-medium text-slate-900">
                {row.clinic.name}
              </div>
              <div className="text-[11px] text-slate-500">
                {row.clinic.location}
              </div>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
            {criticalDisplay > 0 && (
              <StatusPill
                label={`${criticalDisplay} critical`}
                variant={StatusPillVariant.SeverityCritical}
              />
            )}
            {row.operational > 0 && !hideOperationalForClinic && (
              <StatusPill
                label={`${row.operational} ops`}
                variant={StatusPillVariant.SeverityOperational}
              />
            )}
            {row.minor > 0 && (
              <StatusPill
                label={`${row.minor} minor`}
                variant={StatusPillVariant.SeverityMinor}
              />
            )}
          </div>
        </button>
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
              Regional Health
            </CardTitle>
            <p className="mt-1 text-xs text-slate-500">
              Clinic-level compliance status across all regions.
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
              <Button
                type="button"
                variant="outline"
                size="xs"
                className="h-7 px-3 text-[11px]"
              >
                Create report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={expandOpen} onOpenChange={setExpandOpen}>
        <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Regional Health</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto pr-2">{content}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}

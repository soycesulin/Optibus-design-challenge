// Dismissible AI-powered weekly summary briefing banner

"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Sparkles, X } from "lucide-react";

export function BriefingPanel() {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(true);

  if (dismissed) return null;

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardContent className="p-4">
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-violet-200 bg-violet-50 text-[10px] font-semibold uppercase tracking-wide text-violet-700"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  Weekly Summary
                </Badge>
              </div>
              <CollapsibleContent className="space-y-2">
                <p className="text-sm text-slate-700">
                  Your critical queue grew by 3 this week — primarily licence expirations at
                  North Point and Eastside. At the current resolution pace, 2 issues are
                  projected to breach before the end of next week.
                </p>
                <p className="text-sm text-slate-700">
                  Riverside Clinic has recorded 4 recurring equipment issues over the last
                  30 days, concentrated around defibrillator battery performance and infusion
                  pump maintenance windows.
                </p>
                <p className="text-sm text-slate-700">
                  Delegated work is aging fastest in North District clinics; 3 delegated
                  items have been open for more than 7 days without an update from assignees.
                </p>
              </CollapsibleContent>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  <span>{expanded ? "Collapse briefing" : "Expand briefing"}</span>
                  {expanded ? (
                    <ChevronUp className="h-3 w-3" aria-hidden />
                  ) : (
                    <ChevronDown className="h-3 w-3" aria-hidden />
                  )}
                </button>
              </CollapsibleTrigger>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Dismiss briefing"
              >
                <X className="h-4 w-4" />
              </button>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  <span>{expanded ? "Hide details" : "Show details"}</span>
                  {expanded ? (
                    <ChevronUp className="h-3 w-3" aria-hidden />
                  ) : (
                    <ChevronDown className="h-3 w-3" aria-hidden />
                  )}
                </button>
              </CollapsibleTrigger>
            </div>
          </div>
        </Collapsible>
      </CardContent>
    </Card>
  );
}


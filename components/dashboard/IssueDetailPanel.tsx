// Slide-in issue detail panel shown when an alert row is selected

"use client";

import { useMemo, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { clinics, issues, staffMembers } from "@/lib/data";
import { Issue, IssueStatus, Severity, StalenessState, VerificationType } from "@/lib/types";
import { cn, formatDateLabel, daysSince, daysUntil } from "@/lib/utils";
import { StatusPill, StatusPillVariant } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/button";
import { SeverityIcon } from "@/components/ui/SeverityIcon";

interface IssueDetailPanelProps {
  issueId: string | null;
  open: boolean;
  onClose: () => void;
}

export function IssueDetailPanel({ issueId, open, onClose }: IssueDetailPanelProps) {
  const [aiExpanded, setAiExpanded] = useState(true);

  const issue: Issue | undefined = useMemo(
    () => (issueId ? issues.find((i) => i.id === issueId) : undefined),
    [issueId],
  );

  const clinic = issue ? clinics.find((c) => c.id === issue.clinicId) : undefined;
  const assignee = issue && issue.assigneeId
    ? staffMembers.find((s) => s.id === issue.assigneeId)
    : undefined;

  if (!issue) {
    return null;
  }

  const verificationVariant =
    issue.verificationType === VerificationType.Auto
      ? StatusPillVariant.VerificationAuto
      : StatusPillVariant.VerificationManual;

  const stalenessLabel = (() => {
    if (issue.stalenessState === StalenessState.Stale && issue.delegatedAt) {
      const d = daysSince(issue.delegatedAt);
      return `Stale · ${d}d`;
    }
    if (issue.stalenessState === StalenessState.Nudged && issue.nudgedAt) {
      const d = daysSince(issue.nudgedAt);
      return `Nudged · ${d}d ago`;
    }
    return null;
  })();

  const dueLabelInfo = (() => {
    const diff = daysUntil(issue.dueDate);
    if (diff < 0) {
      const days = Math.abs(diff);
      return {
        text: `Overdue by ${days} day${days === 1 ? "" : "s"}`,
        className: "text-red-500",
      };
    }
    return {
      text: `Due in ${diff} day${diff === 1 ? "" : "s"}`,
      className: "text-slate-500",
    };
  })();

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex justify-end bg-black/20 transition-opacity",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative h-full w-[480px] bg-white shadow-xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Sticky header */}
          <div className="sticky top-0 z-10 bg-white px-5 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1 pr-8">
                {/* Line 1: title */}
                <div className="text-base font-semibold text-slate-900">{issue.title}</div>
                {/* Line 2: severity icon, code, status pill */}
                <div className="flex flex-wrap items-center gap-2">
                  <SeverityIcon severity={issue.severity} />
                  <span className="font-mono text-sm text-slate-500">{issue.typeCode}</span>
                  <StatusPill
                    label={issue.status.replace("_", " ")}
                    variant={
                      issue.status === IssueStatus.Flagged
                        ? StatusPillVariant.Flagged
                        : issue.status === IssueStatus.Delegated
                          ? StatusPillVariant.Delegated
                          : issue.status === IssueStatus.InReview
                            ? StatusPillVariant.InReview
                            : StatusPillVariant.Resolved
                    }
                  />
                </div>
                {/* Line 3: clinic + due date */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span>{clinic?.name ?? "Unknown clinic"}</span>
                  <span className="text-slate-400">·</span>
                  <span className={dueLabelInfo.className}>{dueLabelInfo.text}</span>
                </div>
                {/* Line 4: contextual actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {issue.status === IssueStatus.Delegated && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          // eslint-disable-next-line no-console
                          console.log("issue:send_nudge", { id: issue.id });
                        }}
                      >
                        Send nudge
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          // eslint-disable-next-line no-console
                          console.log("issue:reassign", { id: issue.id });
                        }}
                      >
                        Reassign
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-xs text-slate-400 hover:text-slate-600"
                        onClick={() => {
                          // eslint-disable-next-line no-console
                          console.log("issue:archive", { id: issue.id });
                        }}
                      >
                        Archive
                      </Button>
                    </>
                  )}
                  {issue.status === IssueStatus.Flagged && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          // eslint-disable-next-line no-console
                          console.log("issue:assign", { id: issue.id });
                        }}
                      >
                        Assign
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-xs text-slate-400 hover:text-slate-600"
                        onClick={() => {
                          // eslint-disable-next-line no-console
                          console.log("issue:archive", { id: issue.id });
                        }}
                      >
                        Archive
                      </Button>
                    </>
                  )}
                  {issue.status === IssueStatus.InReview && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          // eslint-disable-next-line no-console
                          console.log("issue:approve", { id: issue.id });
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          // eslint-disable-next-line no-console
                          console.log("issue:request_more_info", { id: issue.id });
                        }}
                      >
                        Request more info
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-xs text-slate-400 hover:text-slate-600"
                        onClick={() => {
                          // eslint-disable-next-line no-console
                          console.log("issue:archive", { id: issue.id });
                        }}
                      >
                        Archive
                      </Button>
                    </>
                  )}
                  {issue.status === IssueStatus.Resolved && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        // eslint-disable-next-line no-console
                        console.log("issue:view_proof", { id: issue.id });
                      }}
                    >
                      View proof
                    </Button>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-1 h-7 w-7 text-slate-500 hover:text-slate-700"
                onClick={onClose}
                aria-label="Close issue details"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 border-b border-slate-200" />
          </div>

          {/* Scrollable body */}
          <div className="flex-1 px-5 py-4 space-y-6">
            {/* AI Insights */}
            <div className="rounded-r-md border-l-2 border-purple-400 bg-purple-50 p-3">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left"
                onClick={() => setAiExpanded((prev) => !prev)}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700">AI Insights</span>
                </div>
                <span className="text-xs text-purple-600">
                  {aiExpanded ? "Hide" : "Show"}
                </span>
              </button>
              {aiExpanded && (
                <div className="mt-3 space-y-2">
                  <ul className="list-disc space-y-1 pl-4 text-sm text-slate-700">
                    <li>
                      Licence expiry is 4 days away — breach threshold for this issue type is 7
                      days.
                    </li>
                    <li>
                      No prior violations recorded for this clinic in the last 12 months.
                    </li>
                    <li>
                      Automated verification is configured — estimated 2–4 hours once proof is
                      submitted.
                    </li>
                  </ul>
                  <p className="text-[10px] text-slate-400">Generated by HealthGuard AI</p>
                </div>
              )}
            </div>

            {/* Issue details */}
            <section>
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Issue details
              </h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Issue type
                </div>
                <div className="text-sm text-slate-800">
                  Licence Expiry · {issue.typeCode}
                </div>

                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Clinic
                </div>
                <div className="text-sm text-slate-800">
                  {clinic?.name ?? "Unknown clinic"}
                </div>

                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Region
                </div>
                <div className="text-sm text-slate-800">
                  {clinic?.location ?? "Unknown"}
                </div>

                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Detected
                </div>
                <div className="text-sm text-slate-800">
                  {formatDateLabel(issue.createdAt)}
                </div>

                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Deadline
                </div>
                <div className="text-sm text-slate-800">
                  {formatDateLabel(issue.dueDate)}
                </div>

                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Verification
                </div>
                <div className="text-sm text-slate-800">
                  <StatusPill
                    label={issue.verificationType === VerificationType.Auto ? "Auto" : "Manual"}
                    variant={verificationVariant}
                  />
                </div>

                {stalenessLabel && (
                  <>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Staleness
                    </div>
                    <div className="text-sm text-slate-800">
                      <StatusPill
                        label={stalenessLabel}
                        variant={
                          issue.stalenessState === StalenessState.Stale
                            ? StatusPillVariant.Stale
                            : StatusPillVariant.Nudged
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Assigned to */}
            <section>
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Assigned to
              </h3>
              {assignee ? (
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{assignee.name}</div>
                    <div className="text-xs text-slate-500">
                      {assignee.role}
                      {clinic ? ` · ${clinic.name}` : null}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">{assignee.email}</div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log("issue:reassign", { id: issue.id });
                    }}
                  >
                    Reassign
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">Unassigned</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log("issue:assign", { id: issue.id });
                    }}
                  >
                    Assign
                  </Button>
                </div>
              )}
            </section>

            {/* Activity timeline */}
            <section>
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Activity
              </h3>
              <div className="space-y-3">
                <div className="border-b border-slate-100 pb-3">
                  <div className="text-sm text-slate-700">
                    <span className="font-semibold">System</span> flagged this issue during the
                    overnight compliance scan.
                  </div>
                  <div className="mt-1 text-xs text-slate-400">Today, 06:02 AM</div>
                </div>
                <div className="border-b border-slate-100 pb-3">
                  <div className="text-sm text-slate-700">
                    <span className="font-semibold">Alex Carter</span> reviewed the issue and
                    opened the detail panel.
                  </div>
                  <div className="mt-1 text-xs text-slate-400">Today, 08:14 AM</div>
                </div>
                <div className="border-b border-slate-100 pb-3">
                  <div className="text-sm text-slate-700">
                    <span className="font-semibold">Alex Carter</span> delegated the issue to{" "}
                    {assignee ? assignee.name : "an assignee"}.
                  </div>
                  <div className="mt-1 text-xs text-slate-400">Today, 08:17 AM</div>
                </div>
                {issue.stalenessState === StalenessState.Nudged && (
                  <div className="pb-1">
                    <div className="text-sm text-slate-700">
                      <span className="font-semibold">System</span> sent an automated nudge
                      reminder to the assignee.
                    </div>
                    <div className="mt-1 text-xs text-slate-400">Today, 11:30 AM</div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


// Floating weekly summary button and anchored panel

"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Sparkles, X } from "lucide-react";

const SUMMARY_TEXT = [
  "Your critical queue grew by 3 this week — primarily licence expirations at North Point and Eastside. At the current resolution pace, 2 issues are projected to breach before the end of next week.",
  "Riverside Clinic has recorded 4 recurring equipment issues over the last 30 days, concentrated around defibrillator battery performance and infusion pump maintenance windows.",
  "Delegated work is aging fastest in North District clinics; 3 delegated items have been open for more than 7 days without an update from assignees.",
].join(" ");

export function BriefingPanel() {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setHasUnread(false);
        setCopied(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
    setHasUnread(false);
    if (open) {
      setCopied(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setHasUnread(false);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SUMMARY_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // swallow clipboard errors for now
    }
  };

  const handleDismissThisWeek = () => {
    setHasUnread(false);
    setOpen(false);
    setCopied(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
    >
      {open && (
        <div className="w-[380px] max-h-[480px] overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl animate-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between border-b border-slate-100 px-4 py-3">
            <div className="text-sm font-semibold text-slate-900">Weekly Summary</div>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close weekly summary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="px-4 py-3">
            <ul className="list-disc space-y-2 pl-4 text-sm text-slate-700">
              <li>
                Your critical queue grew by 3 this week — primarily licence expirations at North
                Point and Eastside. At the current resolution pace, 2 issues are projected to
                breach before the end of next week.
              </li>
              <li>
                Riverside Clinic has recorded 4 recurring equipment issues over the last 30 days,
                concentrated around defibrillator battery performance and infusion pump
                maintenance windows.
              </li>
              <li>
                Delegated work is aging fastest in North District clinics; 3 delegated items have
                been open for more than 7 days without an update from assignees.
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-4 py-2">
            {copied && (
              <span className="text-[11px] text-emerald-600">Copied!</span>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Copy weekly summary"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleDismissThisWeek}
              className="text-[11px] font-medium text-slate-500 hover:text-slate-700"
            >
              Dismiss for this week
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className="group relative flex h-10 items-center rounded-full bg-purple-600 text-[11px] font-medium text-white shadow-md transition-all duration-200 hover:bg-purple-700"
      >
        <div className="flex h-10 w-10 items-center justify-center">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover:max-w-xs group-hover:px-2 group-hover:opacity-100">
          Weekly Summary
        </span>
        {hasUnread && (
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-purple-300" />
        )}
      </button>
    </div>
  );
}


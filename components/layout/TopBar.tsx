// Top application bar with page title and AI command bar trigger

"use client";

import { useState } from "react";
import { Search, Bell, Sparkles } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

export function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold tracking-tight text-slate-900">
            Compliance Triage
          </h1>
          <p className="text-xs text-slate-500">
            HealthGuard overview across all clinics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex w-80 items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <Search className="h-4 w-4 text-slate-500" />
            <span className="flex-1 text-left">Ask anything or search issues...</span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-slate-500">
              ⌘K
            </span>
          </button>
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </header>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Ask HealthGuard or search by clinic, issue code, or assignee..." />
        <CommandList>
          <CommandEmpty>No matching commands yet.</CommandEmpty>
          <CommandGroup heading="Quick actions">
            <CommandItem
              onSelect={() => {
                setOpen(false);
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Summarise critical queue</span>
              <CommandShortcut>⏎</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
              }}
            >
              <Search className="h-4 w-4" />
              <span>Find issues for Riverside Clinic</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}


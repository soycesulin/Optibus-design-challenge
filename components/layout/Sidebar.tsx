// Left navigation sidebar for the HealthGuard dashboard

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Settings,
  Stethoscope,
  BarChart3,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "issues", label: "Issues", icon: FileText, href: "/dashboard" },
  { id: "clinics", label: "Clinics", icon: Stethoscope, href: "/dashboard" },
  { id: "reports", label: "Reports", icon: BarChart3, href: "/dashboard/reports" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-0 z-40 flex h-screen flex-shrink-0 flex-col justify-between bg-slate-900 text-slate-100",
        collapsed ? "w-[72px]" : "w-60",
      )}
    >
      <div className="flex flex-col overflow-hidden">
        <div
          className={cn(
            "flex items-center gap-2 border-b border-slate-800 px-3 py-4",
            collapsed ? "justify-center px-0" : "px-5",
          )}
        >
          {!collapsed && (
            <>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-sm font-semibold">
                HG
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold tracking-tight">HealthGuard</div>
                <div className="text-xs text-slate-400">Compliance Triage</div>
              </div>
            </>
          )}
          {collapsed && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-sm font-semibold">
              HG
            </div>
          )}
        </div>
        <nav className="mt-2 space-y-1 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.id === "dashboard"
                ? pathname === "/dashboard"
                : item.href !== "/dashboard" && pathname.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800",
                  collapsed && "justify-center px-2",
                  isActive && "bg-slate-800 text-white",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-slate-800">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex w-full items-center justify-center gap-2 border-b border-slate-800 px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-4",
            collapsed && "justify-center px-2",
          )}
        >
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-emerald-500 text-xs font-semibold text-slate-950">
              AC
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">Alex Carter</span>
              <span className="block truncate text-xs text-slate-400">Compliance Director</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

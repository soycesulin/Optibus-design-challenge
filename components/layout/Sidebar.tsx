// Left navigation sidebar for the HealthGuard dashboard

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bell, FileText, LayoutDashboard, Settings, Stethoscope } from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
  { id: "issues", label: "Issues", icon: FileText, active: false },
  { id: "clinics", label: "Clinics", icon: Stethoscope, active: false },
  { id: "archive", label: "Archive", icon: Bell, active: false },
  { id: "settings", label: "Settings", icon: Settings, active: false },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-60 flex-col justify-between bg-slate-900 text-slate-100">
      <div>
        <div className="flex items-center gap-2 px-5 pt-5 pb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500 text-sm font-semibold">
            HG
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">HealthGuard</div>
            <div className="text-xs text-slate-400">Compliance Triage</div>
          </div>
        </div>
        <nav className="mt-2 space-y-1 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800",
                  item.active && "bg-slate-800 text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-3 border-t border-slate-800 px-4 py-4">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-emerald-500 text-xs font-semibold text-slate-950">
            AC
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Alex Carter</span>
          <span className="text-xs text-slate-400">Compliance Director</span>
        </div>
      </div>
    </aside>
  );
}


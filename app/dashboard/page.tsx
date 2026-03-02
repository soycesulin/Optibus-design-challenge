// Main HealthGuard triage dashboard composition

import { BriefingPanel } from "@/components/dashboard/BriefingPanel";
import { SeverityStrip } from "@/components/dashboard/SeverityStrip";
import { RegionalHealthPanel } from "@/components/dashboard/RegionalHealthPanel";
import { UpcomingRisksPanel } from "@/components/dashboard/UpcomingRisksPanel";
import { StaleQueuePanel } from "@/components/dashboard/StaleQueuePanel";
import { AlertList } from "@/components/dashboard/AlertList";
import { FilterBar } from "@/components/dashboard/FilterBar";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <BriefingPanel />
      <SeverityStrip />
      <div className="grid gap-6 lg:grid-cols-3">
        <RegionalHealthPanel />
        <UpcomingRisksPanel />
        <StaleQueuePanel />
      </div>
      <div className="space-y-4">
        <FilterBar />
        <AlertList />
      </div>
    </div>
  );
}


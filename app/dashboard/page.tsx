// Main HealthGuard triage dashboard composition

import { BriefingPanel } from "@/components/dashboard/BriefingPanel";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <BriefingPanel />
      <DashboardContent />
    </div>
  );
}

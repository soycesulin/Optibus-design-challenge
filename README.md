## HealthGuard — Compliance Triage Dashboard

HealthGuard is a triage dashboard for a medical facility management platform. It surfaces compliance issues across clinics, highlights upcoming risks, and helps operations leaders understand where to intervene first.

The project is built on **Next.js 14 (App Router)** with **TypeScript**, **Tailwind CSS v4**, and **ShadCN UI**.

---

## Running the project locally

### 1. Install dependencies

From the project root:

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.  
The root route redirects to `/dashboard`, which hosts the HealthGuard triage view.

---

## Component map

High-level structure:

- **`app/layout.tsx`**: Root layout. Wraps the app with the `TooltipProvider`, renders the persistent `Sidebar` and `TopBar`, and provides the main content shell.
- **`app/page.tsx`**: Redirect-only entry route that forwards to `/dashboard`.
- **`app/dashboard/page.tsx`**: Composes the entire HealthGuard dashboard in the requested layout:
  - `BriefingPanel`
  - `SeverityStrip`
  - `RegionalHealthPanel`, `UpcomingRisksPanel`, `StaleQueuePanel`
  - `FilterBar` + `AlertList`

Layout components:

- **`components/layout/Sidebar.tsx`**: 240px-wide left navigation rail with HealthGuard branding, primary nav items, and the current user avatar/name.
- **`components/layout/TopBar.tsx`**: Top bar for the main content area, including the page title, AI Command Bar pill, and notification bell.

Dashboard components:

- **`components/dashboard/BriefingPanel.tsx`**: Dismissible AI-style weekly summary using `Collapsible` and `Card`. Shows a brief narrative about queue changes and recurring patterns.
- **`components/dashboard/SeverityStrip.tsx`**: Three severity cards (Critical, Operational, Minor) with open counts, deltas vs last week, and a throughput strip (resolved vs new, net change, last scan time).
- **`components/dashboard/RegionalHealthPanel.tsx`**: Ranks clinics by critical issue count and total volume. Each row shows clinic name, location, a colour-coded health dot, and counts by severity. Clicking a row currently logs the clinic id.
- **`components/dashboard/UpcomingRisksPanel.tsx`**: Groups `UpcomingRisk` items into “This week”, “Next 2 weeks”, and “This month”. Each row shows the issue type, clinic, affected person, days-until-breach chip (colour-coded by urgency), and an “Assign” button (visual only).
- **`components/dashboard/StaleQueuePanel.tsx`**: “Needs Follow-up” panel listing delegated issues with `StalenessState` of `Stale` or `Nudged`. Displays issue title, assignee name + role, days since delegation, and a `StalePill`. Includes a visual “Nudge All” button.
- **`components/dashboard/FilterBar.tsx`**: Visual filter chip row for Region, Issue Type, Status, and Due Date. No filtering logic yet—purely UI.
- **`components/dashboard/AlertRow.tsx`**: Single issue row used inside the main list. Combines `SeverityBadge`, `StatusBadge`, `StalePill`, clinic name, assignee summary, relative due date, and an overflow menu button. Clicking the row logs the issue id.
- **`components/dashboard/AlertList.tsx`**: Main triage list. Groups open (non-resolved) issues by severity using `Collapsible` headers (e.g. “Critical · 3 open”) and sorts within each group by `dueDate` ascending.

UI atoms:

- **`components/ui/SeverityBadge.tsx`**: Severity pill with Critical/Operational/Minor semantics and the requested colour scheme.
- **`components/ui/StatusBadge.tsx`**: Status pill for `IssueStatus` (Flagged, Delegated, In Review, Resolved) with the specified palette.
- **`components/ui/StalePill.tsx`**: Staleness pill for `StalenessState` (Stale/Nudged) with clock/bell icons and matching colours.
- **ShadCN UI components** in `components/ui/*`: `Card`, `Badge`, `Button`, `Collapsible`, `Separator`, `Avatar`, `Tooltip`, and `Command` are installed and available for reuse across the dashboard.

Data and types:

- **`lib/types.ts`**: Central TypeScript enums and interfaces (`Severity`, `IssueStatus`, `VerificationType`, `StalenessState`, `Clinic`, `StaffMember`, `Issue`, `UpcomingRisk`, `ThroughputData`) with JSDoc on each.
- **`lib/data.ts`**: Seed data for 4 clinics, 8 staff members, 20 issues spanning all lifecycle states and severities, 5 upcoming risks, and weekly throughput data.
- **`lib/utils.ts`**: Shared helpers for date math (`daysUntil`, `daysSince`, `formatDueDateRelative`), severity sorting, staleness filtering, net throughput calculation, and the `cn` Tailwind class merger.

---

## Making adjustments

### Seed data

- **Where**: `lib/data.ts`
- **What**: Clinics, staff, issues, upcoming risks, and throughput.
- **How**:  
  - Add or modify `Clinic` entries in `clinics` to change the facilities shown in Regional Health and throughout the dashboard.  
  - Edit `staffMembers` to update names, roles, emails, and phone numbers.  
  - Adjust `issues` to tune the mix of severities/statuses and due dates; this will automatically affect SeverityStrip counts, RegionalHealthPanel, StaleQueuePanel, and AlertList.  
  - Update `upcomingRisks` and `throughputData` to change the Upcoming Risks panel and throughput strip.

### Colours and visual language

- **Where**: Primarily in Tailwind classes within components (e.g. `components/ui/SeverityBadge.tsx`, `components/ui/StatusBadge.tsx`, `components/ui/StalePill.tsx`, and the various dashboard panels).
- **How**:  
  - Update Tailwind colour tokens (e.g. `bg-red-50`, `text-amber-700`) inline to adjust severity/status/staleness palettes.  
  - Global design tokens and CSS variables live in `app/globals.css` and can be refined if you want to shift the base theme.

### Issue types and enums

- **Where**: `lib/types.ts` and `lib/data.ts`
- **How**:  
  - To add new issue type codes or statuses, extend the enums and update the seed data accordingly.  
  - The `AlertList`, `SeverityStrip`, and other panels respond automatically as long as new values map into the existing `Severity` and `IssueStatus` enums.

### Layout and responsiveness

- **Where**:  
  - Shell layout: `app/layout.tsx`, `components/layout/Sidebar.tsx`, `components/layout/TopBar.tsx`  
  - Dashboard grid: `app/dashboard/page.tsx`
- **How**:  
  - Adjust the sidebar width or background via Tailwind classes in `Sidebar.tsx`.  
  - Modify the three-column layout (`lg:grid-cols-3`, `gap-6`) in `app/dashboard/page.tsx` to change how panels stack at different breakpoints.  
  - The design is tuned for a minimum width of 1280px; you can refine breakpoints and padding via Tailwind utilities on the wrapper containers.

### Component content

- **Where**: Individual components under `components/dashboard` and `components/layout`.
- **How**:  
  - Edit copy in `BriefingPanel` to change the AI narrative.  
  - Update helper text, titles, and labels directly in the JSX.  
  - Extend `AlertRow` and related components to include new fields (e.g. verification type, estimated resolution days)—most of that data is already available on the `Issue` model.

With this structure, you can iteratively evolve HealthGuard’s behaviour (e.g. real filters, command palette actions, navigation between routes) without having to rework the basic dashboard layout or design system.


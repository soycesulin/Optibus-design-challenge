// Type definitions for HealthGuard compliance triage dashboard

/**
 * Represents the severity of a compliance issue.
 */
export enum Severity {
  Critical = "critical",
  Operational = "operational",
  Minor = "minor",
}

/**
 * Represents the current workflow status of an issue.
 */
export enum IssueStatus {
  Flagged = "flagged",
  Delegated = "delegated",
  InReview = "in_review",
  Resolved = "resolved",
}

/**
 * Indicates how an issue will be verified before closure.
 */
export enum VerificationType {
  Auto = "auto",
  Manual = "manual",
}

/**
 * Captures whether a delegated issue is becoming stale.
 */
export enum StalenessState {
  None = "none",
  Stale = "stale",
  Nudged = "nudged",
}

/**
 * Describes a medical clinic within the organisation.
 */
export interface Clinic {
  id: string;
  name: string;
  location: string;
}

/**
 * Describes a staff member who can be assigned compliance work.
 */
export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  clinicId: string;
}

/**
 * Represents a single compliance issue tracked in the triage queue.
 */
export interface Issue {
  id: string;
  typeCode: string;
  title: string;
  description: string;
  severity: Severity;
  status: IssueStatus;
  clinicId: string;
  assigneeId: string | null;
  verificationType: VerificationType;
  estimatedResolutionDays: number;
  dueDate: string;
  delegatedAt: string | null;
  nudgedAt: string | null;
  createdAt: string;
  stalenessState: StalenessState;
}

/**
 * Describes a forward-looking risk that has not yet breached.
 */
export interface UpcomingRisk {
  id: string;
  title: string;
  clinicId: string;
  affectedPerson: string;
  daysUntilBreach: number;
  issueTypeCode: string;
}

/**
 * Aggregated weekly throughput data for the issue pipeline.
 */
export interface ThroughputData {
  resolvedThisWeek: number;
  newThisWeek: number;
  resolvedLastWeek: number;
  newLastWeek: number;
}


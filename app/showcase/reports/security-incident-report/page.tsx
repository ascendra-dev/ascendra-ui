"use client";

import {
  BackLink,
  ReportPdfExportButton,
  Card,
  CardHeaderTitle,
  CardPanel,
  ReportHeaderBody,
  ReportHeaderContent,
  ReportHeaderField,
  StatusDot,
  ReportHeaderFooter,
  ReportTitle,
  ReportTitleHeader,
  SimpleBadge,
  SimpleAlert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
  TableWrapper,
  ReportDocumentFooter,
  ReportDocumentFooterLine,
  ReportDocumentFooterLineLeft,
  ReportDocumentFooterLineRight,
  ReportDocumentWrapper,
  ReportHeaderBodyWrap,
  ReportSectionHeader,
  ReportSummary,
} from "@/ascendra-ui";

// ─── Incident data ─────────────────────────────────────────────────────────────

const incident = {
  id: "INC-2024-0847",
  title: "Unauthorised Access via Compromised Account",
  severity: "Critical",
  classification: "TLP:AMBER",
  detected: "14 Aug 2024, 02:17 UTC",
  contained: "14 Aug 2024, 06:39 UTC",
  containmentTime: "4 h 22 min",
  reportDate: "16 August 2024",
  preparedBy: "Security Operations Centre (SOC)",
  reviewedBy: "CISO — Natasha Ivanova",
};

// ─── Timeline ─────────────────────────────────────────────────────────────────

type EventType = "Detection" | "Action" | "Escalation" | "Resolved";

const timeline: {
  time: string;
  type: EventType;
  description: string;
}[] = [
  {
    time: "02:17",
    type: "Detection",
    description:
      "SIEM alert fired on anomalous API call volume from service account svc-data-pipeline-prod.",
  },
  {
    time: "02:24",
    type: "Detection",
    description:
      "SOC analyst confirmed alert as true positive. Unusual geographic origin (Eastern Europe) for service account.",
  },
  {
    time: "02:31",
    type: "Action",
    description:
      "Service account access revoked. Authentication token immediately invalidated.",
  },
  {
    time: "02:45",
    type: "Escalation",
    description:
      "Incident escalated to Tier 2 SOC and notified the CISO via on-call pager.",
  },
  {
    time: "03:10",
    type: "Action",
    description:
      "Forensic snapshot taken of affected pipeline host. Network isolation applied to three downstream systems.",
  },
  {
    time: "03:42",
    type: "Action",
    description:
      "Threat hunting initiated across all service accounts. No additional compromise indicators found.",
  },
  {
    time: "04:15",
    type: "Escalation",
    description:
      "Legal and DPO notified as records potentially at risk. 72-hour GDPR notification window started.",
  },
  {
    time: "05:00",
    type: "Action",
    description:
      "Password rotation completed for all service accounts in the affected domain. MFA enforced.",
  },
  {
    time: "06:39",
    type: "Resolved",
    description:
      "Full containment confirmed. No further evidence of active attacker presence. Monitoring elevated to 24 h watch.",
  },
];

const eventTypeCls: Record<
  EventType,
  { dot: "amber" | "sky" | "rose" | "emerald"; label: string; badge: "amber" | "blue" | "red" | "green" }
> = {
  Detection: {
    dot: "amber",
    label: "Detection",
    badge: "amber",
  },
  Action: {
    dot: "sky",
    label: "Action",
    badge: "blue",
  },
  Escalation: {
    dot: "rose",
    label: "Escalation",
    badge: "red",
  },
  Resolved: {
    dot: "emerald",
    label: "Resolved",
    badge: "green",
  },
};

// ─── Affected systems ─────────────────────────────────────────────────────────

type SystemStatus = "Isolated" | "Restored" | "Under Review";

const systems: {
  system: string;
  role: string;
  exposure: string;
  sensitivity: string;
  status: SystemStatus;
}[] = [
  {
    system: "svc-data-pipeline-prod",
    role: "ETL orchestration service",
    exposure: "API credential theft",
    sensitivity: "High",
    status: "Isolated",
  },
  {
    system: "db-customer-analytics-01",
    role: "Customer analytics store",
    exposure: "Read access via svc acct",
    sensitivity: "Critical",
    status: "Under Review",
  },
  {
    system: "storage-export-bucket",
    role: "Temporary data export store",
    exposure: "File enumeration",
    sensitivity: "High",
    status: "Restored",
  },
];

const systemStatusCls: Record<SystemStatus, "red" | "green" | "amber"> = {
  Isolated: "red",
  Restored: "green",
  "Under Review": "amber",
};

// ─── Remediation ──────────────────────────────────────────────────────────────

type ActionStatus = "Completed" | "In Progress" | "Planned";

const remediations: {
  action: string;
  owner: string;
  priority: "Critical" | "High" | "Medium";
  due: string;
  status: ActionStatus;
}[] = [
  {
    action: "Rotate all service account credentials",
    owner: "IAM Team",
    priority: "Critical",
    due: "14 Aug",
    status: "Completed",
  },
  {
    action: "Enforce MFA on all service-to-service auth",
    owner: "Platform Eng",
    priority: "Critical",
    due: "21 Aug",
    status: "In Progress",
  },
  {
    action: "Implement just-in-time (JIT) access for pipeline accounts",
    owner: "Platform Eng",
    priority: "High",
    due: "30 Aug",
    status: "Planned",
  },
  {
    action: "Conduct full access review for all data pipeline accounts",
    owner: "IAM Team",
    priority: "High",
    due: "28 Aug",
    status: "In Progress",
  },
  {
    action: "Tune SIEM rules to reduce detection time",
    owner: "SOC",
    priority: "Medium",
    due: "15 Sep",
    status: "Planned",
  },
  {
    action: "Mandatory security awareness refresher for DevOps team",
    owner: "L&D / SOC",
    priority: "Medium",
    due: "30 Sep",
    status: "Planned",
  },
];

const actionStatusCls: Record<ActionStatus, "green" | "blue" | "secondary"> = {
  Completed: "green",
  "In Progress": "blue",
  Planned: "secondary",
};

const priorityCls = {
  Critical: "text-rose-600 dark:text-rose-400 font-semibold",
  High: "text-amber-600 dark:text-amber-400 font-medium",
  Medium: "text-muted-foreground",
};


// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SecurityIncidentReportPage() {
  return (
    <>
      <BackLink href="/showcase/reports">Report Gallery</BackLink>

      <ReportDocumentWrapper>
        {/* ── TLP Banner ───────────────────────────────────────────────────── */}
        <SimpleAlert variant="warning" icon={false} className="justify-between px-4">
          <div className="flex items-center gap-2 font-bold uppercase tracking-widest">
            <StatusDot variant="amber" />
            TLP:AMBER — Restricted Distribution
          </div>
          <span className="opacity-70">
            Share only with authorised stakeholders on a need-to-know basis
          </span>
        </SimpleAlert>

        {/* ── Document Header ──────────────────────────────────────────────── */}
        <Card>
          <CardPanel border={{ color: "red" }}>
            <ReportHeaderContent>
              <ReportHeaderBody>
                <ReportHeaderBodyWrap>
                  <ReportTitle>
                    Post-Incident Report · {incident.id}
                  </ReportTitle>
                  <ReportTitleHeader>{incident.title}</ReportTitleHeader>
                </ReportHeaderBodyWrap>
                <SimpleBadge variant={"red"}>{incident.severity}</SimpleBadge>
              </ReportHeaderBody>
              <ReportHeaderFooter stacked className="sm:grid-cols-4">
                {[
                  { label: "Detected", value: incident.detected },
                  { label: "Contained", value: incident.contained },
                  { label: "Time to Contain", value: incident.containmentTime },
                  { label: "Classification", value: incident.classification },
                  { label: "Report Date", value: incident.reportDate },
                  { label: "Prepared By", value: incident.preparedBy },
                  { label: "Reviewed By", value: incident.reviewedBy },
                  {
                    label: "Records at Risk",
                    value: "≈ 12,400 customer records",
                  },
                ].map((f) => (
                  <ReportHeaderField key={f.label} label={f.label}>
                    {f.value}
                  </ReportHeaderField>
                ))}
              </ReportHeaderFooter>
            </ReportHeaderContent>
          </CardPanel>
        </Card>

        {/* ── Executive Summary ────────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Executive Summary</CardHeaderTitle>
          </ReportSectionHeader>
          <ReportSummary>
            <p>
              On 14 August 2024 at 02:17 UTC, the Security Operations Centre
              detected anomalous activity originating from a production service
              account (
              <span className="font-mono text-foreground">
                svc-data-pipeline-prod
              </span>
              ). Investigation confirmed that the account credentials had been
              compromised through an undisclosed vector, enabling an external
              actor to authenticate to internal API endpoints and access data
              stored in the customer analytics database and a temporary export
              storage bucket.
            </p>
            <p>
              The account was revoked within 14 minutes of initial detection.
              Full containment was achieved within 4 hours and 22 minutes.
              Approximately 12,400 customer records were accessible during the
              exposure window; forensic analysis indicates partial enumeration
              of file names in the export bucket with no evidence of successful
              exfiltration of the analytics database at this time.
              Investigations are ongoing.
            </p>
            <p>
              The Data Protection Officer has been notified. Under GDPR Article
              33, the supervisory authority must be notified within 72 hours of
              becoming aware of the breach where there is a likely risk to
              individuals. A formal notification is being prepared. Six
              remediation actions have been identified, of which two are in
              progress and one is already complete.
            </p>
          </ReportSummary>
        </div>

        {/* ── Incident Timeline ────────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Incident Timeline (UTC, 14 Aug 2024)</CardHeaderTitle>
          </ReportSectionHeader>
          <div className="flex flex-col">
            {timeline.map((e, i) => {
              const cls = eventTypeCls[e.type];
              const isLast = i === timeline.length - 1;
              return (
                <div key={i} className="flex gap-4">
                  {/* Track + dot */}
                  <div className="flex flex-col items-center">
                    <StatusDot variant={cls.dot} className="mt-1.5" />
                    {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
                  </div>
                  {/* Content */}
                  <div className="pb-5">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {e.time}
                      </span>
                      <SimpleBadge variant={cls.badge}>
                        {cls.label}
                      </SimpleBadge>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {e.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Affected Systems ─────────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Affected Systems</CardHeaderTitle>
          </ReportSectionHeader>
          <TableWrapper>
            <Table horizontal vertical scrollable>
              <TableHeader>
                <TableHeaderRow>
                  <TableHead>System</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Exposure Type</TableHead>
                  <TableHead>Data Sensitivity</TableHead>
                  <TableHead>Status</TableHead>
                </TableHeaderRow>
              </TableHeader>
              <TableBody border={{}} bg={{}}>
                {systems.map((s) => (
                  <TableRow key={s.system}>
                    <TableCell className="font-mono text-xs font-medium text-foreground">
                      {s.system}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {s.role}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {s.exposure}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-foreground">
                      {s.sensitivity}
                    </TableCell>
                    <TableCell>
                      <SimpleBadge variant={systemStatusCls[s.status]}>
                        {s.status}
                      </SimpleBadge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </div>

        {/* ── Remediation ──────────────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Remediation Actions</CardHeaderTitle>
          </ReportSectionHeader>
          <TableWrapper>
            <Table horizontal vertical scrollable>
              <TableHeader>
                <TableHeaderRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableHeaderRow>
              </TableHeader>
              <TableBody border={{}} bg={{}}>
                {remediations.map((r) => (
                  <TableRow key={r.action}>
                    <TableCell className="font-medium text-sm">
                      {r.action}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.owner}
                    </TableCell>
                    <TableCell className={`text-sm ${priorityCls[r.priority]}`}>
                      {r.priority}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.due}
                    </TableCell>
                    <TableCell>
                      <SimpleBadge variant={actionStatusCls[r.status]}>
                        {r.status}
                      </SimpleBadge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </div>

        {/* ── Lessons Learned ──────────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Lessons Learned & Recommendations</CardHeaderTitle>
          </ReportSectionHeader>
          <ol className="flex flex-col gap-4 list-none">
            {[
              {
                n: "01",
                heading: "Service account hygiene",
                body: "Service accounts in production environments must have scoped, least-privilege access with automated rotation. The compromised account had not been rotated in 14 months — a policy gap that is being remediated immediately.",
              },
              {
                n: "02",
                heading: "MFA coverage gaps",
                body: "Machine-to-machine (M2M) accounts were excluded from the MFA enforcement rollout completed in Q1 2024. This exclusion will be removed. All service-to-service authentication must use short-lived tokens with mutual TLS.",
              },
              {
                n: "03",
                heading: "Detection capability",
                body: "The SIEM rule that fired took 7 minutes to page an analyst. MTTD (Mean Time to Detect) target is ≤ 3 minutes. Rule tuning and alert triage automation are scheduled for Q3.",
              },
              {
                n: "04",
                heading: "JIT access model",
                body: "Just-in-time access provisioning for pipeline accounts would eliminate standing access entirely. Implementation via HashiCorp Vault is planned for the next sprint.",
              },
            ].map((item) => (
              <li key={item.n} className="flex gap-4 text-sm leading-relaxed">
                <span className="mt-0.5 font-mono text-[0.6875rem] font-bold text-rose-500 shrink-0">
                  {item.n}
                </span>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {item.heading} —{" "}
                  </span>
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ── TLP Footer ───────────────────────────────────────────────────── */}
        <ReportDocumentFooter>
          <SimpleAlert variant="destructive" icon={false} className="justify-center font-bold uppercase tracking-widest">
            TLP:AMBER — DO NOT SHARE BEYOND AUTHORISED RECIPIENTS
          </SimpleAlert>
          <ReportDocumentFooterLine>
            <ReportDocumentFooterLineLeft>
              Ascendra Security Operations Centre
            </ReportDocumentFooterLineLeft>
            <ReportDocumentFooterLineRight>
              <span>{incident.id}</span>
              <span>·</span>
              <span>{incident.reportDate}</span>
              <span>·</span>
              <span>{incident.classification}</span>
            </ReportDocumentFooterLineRight>
          </ReportDocumentFooterLine>
        </ReportDocumentFooter>
      </ReportDocumentWrapper>
      <ReportPdfExportButton fileName="security-incident-report" />
    </>
  );
}

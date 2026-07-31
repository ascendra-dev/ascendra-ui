import Link from "next/link";
import { LuArrowLeft, LuArrowRight, LuFileText } from "react-icons/lu";
import { reportsConfig } from "@/lib/reports-config";
import type { ReportMeta } from "@/lib/types";

// ─── Styling maps ──────────────────────────────────────────────────────────────

const domainColor: Record<string, string> = {
  "Finance / Accounting":
    "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-400 dark:ring-emerald-500/30",
  "Corporate / C-Suite":
    "bg-slate-500/10 text-slate-600 ring-slate-500/20 dark:text-slate-400 dark:ring-slate-500/30",
  "Healthcare / Clinical":
    "bg-teal-500/10 text-teal-700 ring-teal-500/20 dark:text-teal-400 dark:ring-teal-500/30",
  "Project Management":
    "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-400 dark:ring-blue-500/30",
  "Sales / CRM":
    "bg-orange-500/10 text-orange-700 ring-orange-500/20 dark:text-orange-400 dark:ring-orange-500/30",
  "Marketing / Growth":
    "bg-purple-500/10 text-purple-700 ring-purple-500/20 dark:text-purple-400 dark:ring-purple-500/30",
  "Operations / Logistics":
    "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400 dark:ring-amber-500/30",
  "Human Resources":
    "bg-indigo-500/10 text-indigo-700 ring-indigo-500/20 dark:text-indigo-400 dark:ring-indigo-500/30",
  "IT / Security":
    "bg-red-500/10 text-red-700 ring-red-500/20 dark:text-red-400 dark:ring-red-500/30",
  "Corporate / ESG":
    "bg-green-500/10 text-green-700 ring-green-500/20 dark:text-green-400 dark:ring-green-500/30",
};

const domainAccent: Record<string, string> = {
  "Finance / Accounting": "bg-emerald-500",
  "Corporate / C-Suite": "bg-slate-500",
  "Healthcare / Clinical": "bg-teal-500",
  "Project Management": "bg-blue-500",
  "Sales / CRM": "bg-orange-500",
  "Marketing / Growth": "bg-purple-500",
  "Operations / Logistics": "bg-amber-500",
  "Human Resources": "bg-indigo-500",
  "IT / Security": "bg-red-500",
  "Corporate / ESG": "bg-green-500",
};

const complexityColor: Record<string, string> = {
  Simple: "bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-400 dark:ring-sky-500/30",
  Medium: "bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:text-violet-400 dark:ring-violet-500/30",
  Complex: "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-400 dark:ring-rose-500/30",
};

const layoutLabel: Record<string, string> = {
  Document: "Document",
  Wide: "Wide",
  Mixed: "Mixed",
};

// ─── Card ──────────────────────────────────────────────────────────────────────

function ReportCard({ report }: { report: ReportMeta }) {
  const accentCls = domainAccent[report.domain] ?? "bg-primary";
  const domainCls = domainColor[report.domain] ?? "bg-muted text-muted-foreground ring-border";
  const complexityCls = complexityColor[report.complexity] ?? "bg-muted text-muted-foreground ring-border";
  const isAvailable = report.status === "available";

  return (
    <Link
      href={`/showcase/reports/${report.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-muted/30 ring-1 ring-transparent transition-all hover:bg-muted/50 hover:ring-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className={`h-0.5 w-full ${accentCls} opacity-60`} />

      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <span className="font-medium leading-snug text-foreground">
            {report.name}
          </span>
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ring-1 ring-inset ${domainCls}`}
          >
            {report.domain}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {report.description}
        </p>

        {/* Key metrics */}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {report.keyMetrics.map((m) => (
            <span key={m} className="text-[0.6875rem] text-muted-foreground/70">
              {m}
            </span>
          ))}
        </div>

        {/* Tags row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ring-1 ring-inset ${complexityCls}`}
          >
            {report.complexity}
          </span>
          <span className="rounded-sm border bg-background px-1.5 py-0.5 text-[0.6875rem] text-muted-foreground">
            {layoutLabel[report.layout]}
          </span>
          <span className="rounded-sm border bg-background px-1.5 py-0.5 text-[0.6875rem] text-muted-foreground">
            {report.reportType}
          </span>
          {!isAvailable && (
            <span className="rounded-full border bg-muted/60 px-2 py-0.5 text-[0.6875rem] text-muted-foreground/60 italic">
              Coming soon
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center gap-1 pt-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          {isAvailable ? "View report" : "Preview structure"}
          <LuArrowRight className="size-3" />
        </div>
      </div>
    </Link>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

const domains = [...new Set(reportsConfig.map((r) => r.domain))];
const available = reportsConfig.filter((r) => r.status === "available").length;

export default function ReportsGalleryPage() {
  return (
    <>
      {/* Back */}
      <Link
        href="/showcase"
        className="text-muted-foreground hover:text-foreground mb-8 flex w-fit items-center gap-1.5 text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
      >
        <LuArrowLeft className="size-3 stroke-2" />
        Component Showcase
      </Link>

      {/* Hero */}
      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
          <LuFileText className="size-3" />
          Reports
        </div>
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          Report Gallery
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">
            {reportsConfig.length} sample reports
          </span>{" "}
          spanning {domains.length} business domains — covering document-style, wide, and mixed
          layouts with accounting tables, infographics, timelines, clinical layouts, and more.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 flex flex-wrap gap-8 border-y py-5">
        {[
          { label: "Reports", value: reportsConfig.length },
          { label: "Business Domains", value: domains.length },
          { label: "Layout Types", value: 3 },
          { label: "Available Now", value: available },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-2xl font-semibold text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reportsConfig.map((report) => (
          <ReportCard key={report.slug} report={report} />
        ))}
      </div>
    </>
  );
}

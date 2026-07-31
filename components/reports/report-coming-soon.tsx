import Link from "next/link";
import { LuArrowLeft, LuFileText } from "react-icons/lu";
import { Card, CardPanel } from "@/ascendra-ui";
import type { ReportMeta } from "@/lib/types";

// ─── Domain styling ────────────────────────────────────────────────────────────

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

const complexityColor: Record<string, string> = {
  Simple: "bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-400 dark:ring-sky-500/30",
  Medium: "bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:text-violet-400 dark:ring-violet-500/30",
  Complex: "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-400 dark:ring-rose-500/30",
};

// ─── Component ─────────────────────────────────────────────────────────────────

export function ReportComingSoon({ report }: { report: ReportMeta }) {
  const domainCls =
    domainColor[report.domain] ?? "bg-muted text-muted-foreground ring-border";
  const complexityCls =
    complexityColor[report.complexity] ?? "bg-muted text-muted-foreground ring-border";

  return (
    <>
      {/* Back */}
      <Link
        href="/showcase/reports"
        className="text-muted-foreground hover:text-foreground mb-10 flex w-fit items-center gap-1.5 text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
      >
        <LuArrowLeft className="size-3 stroke-2" />
        Report Gallery
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
            <LuFileText className="size-3" />
            Reports
          </div>
        </div>
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {report.name}
          </h1>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${domainCls}`}
          >
            {report.domain}
          </span>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {report.description}
        </p>
      </div>

      {/* Meta row */}
      <div className="mb-8 flex flex-wrap gap-8 border-y py-4 text-sm">
        <div className="flex flex-col gap-0.5">
          <span className="text-[0.6875rem] uppercase tracking-wide text-muted-foreground">Report Type</span>
          <span className="font-medium text-foreground">{report.reportType}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[0.6875rem] uppercase tracking-wide text-muted-foreground">Layout</span>
          <span className="font-medium text-foreground">{report.layout}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[0.6875rem] uppercase tracking-wide text-muted-foreground">Complexity</span>
          <span
            className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${complexityCls}`}
          >
            {report.complexity}
          </span>
        </div>
      </div>

      {/* Key metrics placeholders */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {report.keyMetrics.map((metric) => (
          <Card key={metric}>
            <CardPanel>
              <div className="p-5">
                <p className="text-xs text-muted-foreground">{metric}</p>
                <span className="mt-3 block text-2xl font-semibold tracking-tight text-muted-foreground/20">
                  —
                </span>
              </div>
            </CardPanel>
          </Card>
        ))}
      </div>

      {/* Coming-soon placeholder body */}
      <div className="flex h-48 items-center justify-center rounded-xl border border-dashed bg-muted/20">
        <div className="flex flex-col items-center gap-2 text-center">
          <LuFileText className="size-6 text-muted-foreground/25" />
          <p className="text-xs font-medium text-muted-foreground/40">
            Report implementation coming soon
          </p>
        </div>
      </div>

      {/* Design elements footer */}
      <div className="mt-8 flex flex-wrap items-center gap-1.5 border-t pt-6">
        <span className="mr-1 text-xs text-muted-foreground">Design elements:</span>
        {report.elements.map((el) => (
          <span
            key={el}
            className="rounded-sm border bg-background px-1.5 py-0.5 text-[0.6875rem] text-muted-foreground"
          >
            {el}
          </span>
        ))}
      </div>
    </>
  );
}

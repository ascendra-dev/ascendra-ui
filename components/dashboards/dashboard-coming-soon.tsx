import Link from "next/link";
import {
  LuArrowLeft,
  LuLayoutDashboard,
  LuChartLine,
  LuTable2,
} from "react-icons/lu";
import { Card, CardHeader, CardHeaderTitle, CardPanel } from "@/ascendra-ui";
import type { DashboardMeta, LayoutCell } from "@/lib/types";

// ─── Domain styling ────────────────────────────────────────────────────────────

const domainColor: Record<string, string> = {
  "SaaS / Startup":
    "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-400 dark:ring-blue-500/30",
  "Retail / E-commerce":
    "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400 dark:ring-amber-500/30",
  "Marketing / Growth":
    "bg-purple-500/10 text-purple-700 ring-purple-500/20 dark:text-purple-400 dark:ring-purple-500/30",
  "Finance / CFO":
    "bg-green-500/10 text-green-700 ring-green-500/20 dark:text-green-400 dark:ring-green-500/30",
  "Finance / Trading":
    "bg-red-500/10 text-red-700 ring-red-500/20 dark:text-red-400 dark:ring-red-500/30",
  "Healthcare / Clinical":
    "bg-teal-500/10 text-teal-700 ring-teal-500/20 dark:text-teal-400 dark:ring-teal-500/30",
  "People Operations":
    "bg-indigo-500/10 text-indigo-700 ring-indigo-500/20 dark:text-indigo-400 dark:ring-indigo-500/30",
  "Engineering / SRE":
    "bg-orange-500/10 text-orange-700 ring-orange-500/20 dark:text-orange-400 dark:ring-orange-500/30",
  "Operations / Logistics":
    "bg-slate-500/10 text-slate-600 ring-slate-500/20 dark:text-slate-400 dark:ring-slate-500/30",
  "Property Investment":
    "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-400 dark:ring-emerald-500/30",
};

const chartTypeLabel: Record<string, string> = {
  line: "Line",
  area: "Area",
  bar: "Bar",
  pie: "Pie & Donut",
  radial: "Radial & Gauge",
  radar: "Radar",
  scatter: "Scatter & Bubble",
  composed: "Composed",
  treemap: "Treemap",
  histogram: "Histogram",
  candlestick: "Candlestick",
};

// ─── Tailwind col-span map (dynamic values aren't picked up by JIT) ────────────

const colSpanClass: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

// ─── Height helper ─────────────────────────────────────────────────────────────

function cellHeightClass(cell: LayoutCell): string {
  const h =
    cell.height ?? (cell.cols === 12 ? "lg" : cell.cols <= 4 ? "sm" : "md");
  return { xl: "h-80", lg: "h-64", md: "h-52", sm: "h-40" }[h];
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function DashboardComingSoon({
  dashboard,
}: {
  dashboard: DashboardMeta;
}) {
  const domainCls =
    domainColor[dashboard.domain] ??
    "bg-muted text-muted-foreground ring-border";

  return (
    <>
      {/* Back */}
      <Link
        href="/showcase/dashboards"
        className="text-muted-foreground hover:text-foreground mb-10 flex w-fit items-center gap-1.5 text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
      >
        <LuArrowLeft className="size-3 stroke-2" />
        Dashboard Gallery
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
            <LuLayoutDashboard className="size-3" />
            Dashboards
          </div>
        </div>
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {dashboard.name}
          </h1>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${domainCls}`}
          >
            {dashboard.domain}
          </span>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {dashboard.description}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* KPI row — Card + CardPanel, no header/footer */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {dashboard.kpis.map((kpi) => (
            <Card key={kpi}>
              <CardPanel>
                <div className="p-5">
                  <p className="mb-3 text-xs text-muted-foreground">{kpi}</p>
                  <div className="flex items-end justify-between gap-2">
                    <span className="text-2xl font-semibold tracking-tight text-muted-foreground/25">
                      —
                    </span>
                    <span className="mb-0.5 rounded-full bg-muted px-2 py-0.5 text-[0.6875rem] text-muted-foreground/40">
                      — %
                    </span>
                  </div>
                </div>
              </CardPanel>
            </Card>
          ))}
        </div>

        {/* Chart / table rows — unique per dashboard, driven by layout config */}
        {dashboard.layout.map((row, ri) => (
          <div key={ri} className="grid grid-cols-12 gap-4">
            {row.map((cell) => (
              <div
                key={cell.title}
                className={`col-span-12 ${colSpanClass[cell.cols] ?? "md:col-span-12"}`}
              >
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>
                      {cell.title}
                    </CardHeaderTitle>
                  </CardHeader>
                  <CardPanel>
                    <div
                      className={`${cellHeightClass(cell)} flex items-center justify-center`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {cell.type === "table" ? (
                          <LuTable2 className="size-5 text-muted-foreground/25" />
                        ) : (
                          <LuChartLine className="size-5 text-muted-foreground/25" />
                        )}
                        <p className="text-[0.6875rem] text-muted-foreground/40">
                          {cell.type === "table"
                            ? "Table placeholder"
                            : "Chart placeholder"}
                        </p>
                      </div>
                    </div>
                  </CardPanel>
                </Card>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Meta footer */}
      <div className="mt-8 flex flex-wrap items-center gap-4 border-t pt-6 text-xs text-muted-foreground">
        <span>
          <span className="font-medium text-foreground">
            {dashboard.chartTypes.length}
          </span>{" "}
          chart types
        </span>
        <span className="text-border">·</span>
        <span>
          <span className="font-medium text-foreground">4</span> KPI metrics
        </span>
        <span className="text-border">·</span>
        <span>1 data table</span>
        <span className="text-border">·</span>
        <div className="flex flex-wrap gap-1.5">
          {dashboard.chartTypes.map((type) => (
            <Link
              key={type}
              href={`/showcase/charts/${type}`}
              className="rounded-sm border bg-background px-1.5 py-0.5 transition-colors hover:text-foreground hover:border-foreground/20"
            >
              {chartTypeLabel[type] ?? type}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

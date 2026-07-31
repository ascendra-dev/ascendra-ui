import Link from "next/link";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { dashboardsConfig } from "@/lib/dashboards-config";

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

const domainAccent: Record<string, string> = {
  "SaaS / Startup": "bg-blue-500",
  "Retail / E-commerce": "bg-amber-500",
  "Marketing / Growth": "bg-purple-500",
  "Finance / CFO": "bg-green-500",
  "Finance / Trading": "bg-red-500",
  "Healthcare / Clinical": "bg-teal-500",
  "People Operations": "bg-indigo-500",
  "Engineering / SRE": "bg-orange-500",
  "Operations / Logistics": "bg-slate-500",
  "Property Investment": "bg-emerald-500",
};

const chartTypeLabel: Record<string, string> = {
  line: "Line",
  area: "Area",
  bar: "Bar",
  pie: "Pie & Donut",
  radial: "Radial",
  radar: "Radar",
  scatter: "Scatter",
  composed: "Composed",
  treemap: "Treemap",
  histogram: "Histogram",
  candlestick: "Candlestick",
};

const totalChartInstances = dashboardsConfig.reduce((s, d) => s + d.chartTypes.length, 0);

export default function DashboardsGalleryPage() {
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
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Dashboards
        </div>
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          Dashboard Gallery
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{dashboardsConfig.length} production-quality dashboards</span>
          {" "}spanning {dashboardsConfig.length} distinct business domains — each with a responsive multi-column grid layout, KPI metric cards, data tables, and charts drawn from the full chart library.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 flex flex-wrap gap-8 border-y py-5">
        {[
          { label: "Dashboards", value: dashboardsConfig.length },
          { label: "Business Domains", value: dashboardsConfig.length },
          { label: "Chart Instances", value: `${totalChartInstances}+` },
          { label: "Built with", value: "recharts" },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-2xl font-semibold text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardsConfig.map((dashboard) => {
          const accentCls = domainAccent[dashboard.domain] ?? "bg-primary";
          const badgeCls = domainColor[dashboard.domain] ?? "bg-muted text-muted-foreground ring-border";

          return (
            <Link
              key={dashboard.slug}
              href={`/showcase/dashboards/${dashboard.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border bg-muted/30 ring-1 ring-transparent transition-all hover:bg-muted/50 hover:ring-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Colored top accent strip */}
              <div className={`h-0.5 w-full ${accentCls} opacity-60`} />

              <div className="flex flex-1 flex-col gap-4 p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <span className="font-medium leading-snug text-foreground">
                    {dashboard.name}
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ring-1 ring-inset ${badgeCls}`}
                  >
                    {dashboard.domain}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {dashboard.description}
                </p>

                {/* KPI labels */}
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {dashboard.kpis.map((kpi) => (
                    <span key={kpi} className="text-[0.6875rem] text-muted-foreground/70">
                      {kpi}
                    </span>
                  ))}
                </div>

                {/* Chart type tags */}
                <div className="flex flex-wrap gap-1.5">
                  {dashboard.chartTypes.map((type) => (
                    <span
                      key={type}
                      className="rounded-sm border bg-background px-1.5 py-0.5 text-[0.6875rem] text-muted-foreground"
                    >
                      {chartTypeLabel[type] ?? type}
                    </span>
                  ))}
                  <span className="rounded-full border bg-muted/60 px-2 py-0.5 text-[0.6875rem] text-muted-foreground/60 italic">
                    Coming soon
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-1 pt-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  View dashboard
                  <LuArrowRight className="size-3" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

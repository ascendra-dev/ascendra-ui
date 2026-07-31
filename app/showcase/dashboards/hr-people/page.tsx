"use client";

import { BackLink, Card, CardFooter, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, ChartLegend, DashboardContent, PageHeader, PageHeaderAction, PageHeaderGroup, PageSubtitle, PageTitle, SimpleBadge, Table, TableBody, TableCell, TableHead, TableHeader, TableHeaderRow, TableRow, TableWrapper } from "@/ascendra-ui";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/ascendra-ui/shadcn";
import { ChartSeriesLegend } from "@/components/charts/chart-series-legend";
import { makeTooltipFormatter } from "@/components/charts/make-tooltip-formatter";
import { useState } from "react";
import {
  LuTrendingDown,
  LuTrendingUp,
} from "react-icons/lu";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "Total Headcount",     value: "2,847",  delta: "+124",     up: true  },
  { label: "Attrition Rate",      value: "8.4%",   delta: "−1.2 pts", up: true  },
  { label: "Avg. Time to Hire",   value: "24 days", delta: "−3 days",  up: true  },
  { label: "eNPS Score",          value: "+42",    delta: "+8 pts",   up: true  },
] as const;

// ─── Hiring vs Attrition ──────────────────────────────────────────────────────

const hiringData = [
  { month: "Jun", hires: 38, separations: 18, net: 2812 },
  { month: "Jul", hires: 42, separations: 22, net: 2832 },
  { month: "Aug", hires: 36, separations: 19, net: 2849 },
  { month: "Sep", hires: 44, separations: 24, net: 2869 },
  { month: "Oct", hires: 52, separations: 21, net: 2900 },
  { month: "Nov", hires: 48, separations: 26, net: 2922 },
  { month: "Dec", hires: 28, separations: 32, net: 2918 },
  { month: "Jan", hires: 46, separations: 22, net: 2942 },
  { month: "Feb", hires: 54, separations: 24, net: 2972 },
  { month: "Mar", hires: 62, separations: 28, net: 3006 },
  { month: "Apr", hires: 58, separations: 26, net: 3038 },
  { month: "May", hires: 44, separations: 21, net: 3061 },
];

const hiringConfig: ChartConfig = {
  hires:       { label: "Hires",       color: "var(--chart-2)" },
  separations: { label: "Separations", color: "var(--chart-3)" },
  net:         { label: "Headcount",   color: "var(--chart-1)" },
};

// ─── Seniority Mix ────────────────────────────────────────────────────────────

const seniorityData = [
  { name: "IC-1",       value: 399, fill: "var(--chart-1)", variant: "chart-1" as const },
  { name: "IC-2",       value: 797, fill: "var(--chart-2)", variant: "chart-2" as const },
  { name: "IC-3",       value: 626, fill: "var(--chart-3)", variant: "chart-3" as const },
  { name: "Senior",     value: 512, fill: "var(--chart-4)", variant: "chart-4" as const },
  { name: "Staff+",     value: 285, fill: "var(--chart-1)", variant: "chart-1" as const },
  { name: "Management", value: 228, fill: "var(--chart-2)", variant: "chart-2" as const },
];

const totalHC = seniorityData.reduce((s, d) => s + d.value, 0);

// ─── Headcount by Department ──────────────────────────────────────────────────

const deptData = [
  { dept: "Engineering",  count: 684, delta: "+5.2%" },
  { dept: "Sales",        count: 412, delta: "+3.8%" },
  { dept: "Product",      count: 298, delta: "+7.1%" },
  { dept: "Marketing",    count: 224, delta: "+2.4%" },
  { dept: "Customer Ops", count: 318, delta: "+1.6%" },
  { dept: "Finance",      count: 186, delta: "+0.8%" },
  { dept: "HR & People",  count: 142, delta: "+3.2%" },
  { dept: "Legal",        count: 98,  delta: "+2.0%" },
  { dept: "Data & AI",    count: 312, delta: "+12.4%"},
  { dept: "Operations",   count: 173, delta: "+1.4%" },
].sort((a, b) => b.count - a.count);

const deptConfig: ChartConfig = {
  count: { label: "Headcount", color: "var(--chart-1)" },
};

// ─── Tenure vs Performance scatter ────────────────────────────────────────────

const tenureData = [
  { tenure: 0.4, perf: 2.8, z: 60 }, { tenure: 0.9, perf: 3.2, z: 65 },
  { tenure: 1.2, perf: 3.4, z: 70 }, { tenure: 1.5, perf: 3.6, z: 75 },
  { tenure: 1.8, perf: 3.1, z: 68 }, { tenure: 2.1, perf: 3.8, z: 80 },
  { tenure: 2.4, perf: 4.0, z: 85 }, { tenure: 2.7, perf: 3.7, z: 78 },
  { tenure: 3.0, perf: 4.2, z: 90 }, { tenure: 3.2, perf: 3.9, z: 82 },
  { tenure: 3.5, perf: 4.4, z: 95 }, { tenure: 3.8, perf: 4.1, z: 88 },
  { tenure: 4.0, perf: 4.5, z: 100 }, { tenure: 4.2, perf: 4.2, z: 90 },
  { tenure: 4.5, perf: 4.6, z: 105 }, { tenure: 4.8, perf: 4.3, z: 95 },
  { tenure: 5.0, perf: 4.7, z: 110 }, { tenure: 5.3, perf: 4.4, z: 98 },
  { tenure: 5.5, perf: 4.8, z: 115 }, { tenure: 5.8, perf: 4.5, z: 102 },
  { tenure: 6.0, perf: 4.9, z: 120 }, { tenure: 6.2, perf: 4.6, z: 108 },
  { tenure: 6.5, perf: 4.7, z: 112 }, { tenure: 6.8, perf: 4.8, z: 116 },
  { tenure: 7.0, perf: 4.9, z: 118 }, { tenure: 7.2, perf: 4.8, z: 114 },
  { tenure: 7.5, perf: 4.9, z: 120 }, { tenure: 7.8, perf: 4.7, z: 110 },
  { tenure: 8.0, perf: 4.8, z: 115 }, { tenure: 8.2, perf: 4.9, z: 118 },
  // some variance
  { tenure: 1.0, perf: 2.4, z: 55 }, { tenure: 2.5, perf: 3.2, z: 70 },
  { tenure: 3.5, perf: 3.6, z: 78 }, { tenure: 4.0, perf: 3.8, z: 82 },
  { tenure: 5.0, perf: 4.1, z: 88 }, { tenure: 6.0, perf: 4.4, z: 96 },
  { tenure: 0.6, perf: 3.6, z: 72 }, { tenure: 1.4, perf: 4.0, z: 84 },
  { tenure: 2.8, perf: 4.3, z: 92 }, { tenure: 3.6, perf: 4.5, z: 98 },
];

const scatterConfig: ChartConfig = {
  perf: { label: "Performance", color: "var(--chart-1)" },
};

// ─── Recent Hires ─────────────────────────────────────────────────────────────

const recentHires = [
  { initials: "AS", name: "Arjun Singh",    role: "Senior SWE",       dept: "Engineering",  level: "IC-3",  start: "May 27", recruiter: "Kim Park"    },
  { initials: "LM", name: "Laura Müller",   role: "Product Manager",  dept: "Product",      level: "Senior",start: "May 26", recruiter: "Tom Osei"    },
  { initials: "JC", name: "James Chen",     role: "ML Engineer",       dept: "Data & AI",    level: "IC-2",  start: "May 22", recruiter: "Sara Liu"     },
  { initials: "PO", name: "Priya Okafor",   role: "Account Executive", dept: "Sales",        level: "IC-2",  start: "May 20", recruiter: "Kim Park"    },
  { initials: "RN", name: "Ravi Nair",      role: "Staff Engineer",    dept: "Engineering",  level: "Staff+",start: "May 19", recruiter: "Tom Osei"    },
  { initials: "EW", name: "Emma Wilson",    role: "Data Analyst",      dept: "Finance",      level: "IC-1",  start: "May 15", recruiter: "Sara Liu"     },
  { initials: "MB", name: "Marcus Bello",   role: "Sn. Designer",      dept: "Product",      level: "IC-3",  start: "May 12", recruiter: "Kim Park"    },
  { initials: "YT", name: "Yuki Tanaka",    role: "DevOps Engineer",   dept: "Engineering",  level: "IC-2",  start: "May 8",  recruiter: "Tom Osei"    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HrPeoplePage() {
  const [hiddenHiring, setHiddenHiring] = useState<Record<string, boolean>>({});

  return (
    <>
      <BackLink href="/showcase/dashboards">Dashboard Gallery</BackLink>

      <PageHeader variant="dashboard">
        <PageHeaderGroup>
          <PageTitle>HR &amp; People Analytics</PageTitle>
          <PageSubtitle>
            Headcount trends, attrition, seniority mix, and tenure-performance
            patterns — the people dashboard for HR leaders.
          </PageSubtitle>
        </PageHeaderGroup>
        <PageHeaderAction className="w-fit">
          <span className="inline-flex items-center rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-500/20 dark:text-violet-400 dark:ring-violet-500/30">
            People Operations
          </span>
        </PageHeaderAction>
      </PageHeader>

      <DashboardContent>
        {/* ── KPI row ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  <div className="mt-auto flex flex-col items-start gap-1 pt-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-2">
                    <span className="text-2xl font-semibold tracking-tight">{kpi.value}</span>
                    <SimpleBadge variant={kpi.up ? "green" : "red"}>
                      {kpi.up ? <LuTrendingUp className="size-3" /> : <LuTrendingDown className="size-3" />}
                      {kpi.delta}
                    </SimpleBadge>
                  </div>
                </div>
              </CardPanel>
            </Card>
          ))}
        </div>

        {/* ── Row 1: Hiring vs Attrition | Seniority Mix ──────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Hiring vs Attrition — Composed Bar + Line */}
          <div className="col-span-12 md:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Hiring vs Attrition</CardHeaderTitle>
                <CardHeaderSubtitle>Monthly hires and separations · headcount trend (right axis)</CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer config={hiringConfig} className="h-64 w-full">
                    <ComposedChart data={hiringData} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} dy={6} />
                      <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} width={28} />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        width={44}
                        tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                        domain={[2700, 3200]}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(hiringConfig, (v, k) =>
                              k === "net" ? v.toLocaleString() : String(v)
                            )}
                          />
                        }
                      />
                      <Bar yAxisId="left" dataKey="hires"       fill="var(--chart-2)" fillOpacity={0.85} radius={[3, 3, 0, 0]} hide={hiddenHiring["hires"]}       />
                      <Bar yAxisId="left" dataKey="separations" fill="var(--chart-3)" fillOpacity={0.65} radius={[3, 3, 0, 0]} hide={hiddenHiring["separations"]} />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="net"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "var(--chart-1)" }}
                        activeDot={{ r: 5 }}
                        hide={hiddenHiring["net"]}
                      />
                    </ComposedChart>
                  </ChartContainer>
                  <ChartSeriesLegend
                    config={hiringConfig}
                    hidden={hiddenHiring}
                    onToggle={(k) => setHiddenHiring((p) => ({ ...p, [k]: !p[k] }))}
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Seniority Mix — Pie donut */}
          <div className="col-span-12 md:col-span-5">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-medium">Seniority Mix</p>
                  <div className="flex-1 min-h-0">
                  <ChartContainer config={{}} className="h-full w-full mt-2">
                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <Pie
                        data={seniorityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={44}
                        outerRadius={64}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(v) => [Number(v).toLocaleString(), ""]}
                            nameKey="name"
                          />
                        }
                      />
                    </PieChart>
                  </ChartContainer>
                  </div>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {seniorityData.map((d) => (
                      <div key={d.name} className="flex items-center justify-between gap-2 text-xs">
                        <ChartLegend variant={d.variant} shape="square">{d.name}</ChartLegend>
                        <div className="flex items-center gap-2 tabular-nums">
                          <span className="text-muted-foreground/60">{((d.value / totalHC) * 100).toFixed(0)}%</span>
                          <span className="font-medium">{d.value.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 2: Headcount by Department — full width ──────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">Headcount by Department</p>
                  <ChartContainer config={deptConfig} className="h-64 w-full">
                    <BarChart
                      layout="vertical"
                      data={deptData}
                      margin={{ top: 0, right: 80, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid horizontal={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                      <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                      <YAxis
                        type="category"
                        dataKey="dept"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        width={96}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(deptConfig, (v) => v.toLocaleString())}
                          />
                        }
                      />
                      <Bar dataKey="count" fill="var(--chart-1)" fillOpacity={0.8} radius={[0, 3, 3, 0]}>
                        <LabelList dataKey="delta" position="right" style={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 3: Tenure vs Performance | Recent Hires ──────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Tenure vs Performance scatter */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Tenure vs Performance</CardHeaderTitle>
                <CardHeaderSubtitle>X = years at company · Y = performance score (1–5) · dot size = comp band</CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex-1 min-h-0">
                  <ChartContainer config={scatterConfig} className="h-full w-full">
                    <ScatterChart margin={{ top: 4, right: 12, left: 0, bottom: 16 }}>
                      <CartesianGrid stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                      <XAxis
                        dataKey="tenure"
                        type="number"
                        name="Tenure"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10 }}
                        tickFormatter={(v) => `${v}y`}
                        domain={[0, 8.5]}
                        label={{ value: "Tenure (years)", position: "insideBottom", offset: -8, fontSize: 10, fill: "var(--muted-foreground)" }}
                      />
                      <YAxis
                        dataKey="perf"
                        type="number"
                        name="Performance"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10 }}
                        domain={[2, 5.2]}
                        width={28}
                      />
                      <ZAxis dataKey="z" range={[24, 120]} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0].payload as (typeof tenureData)[0];
                          return (
                            <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-md">
                              <div className="text-muted-foreground">Tenure: <span className="text-foreground font-medium">{d.tenure}y</span></div>
                              <div className="text-muted-foreground">Score: <span className="text-foreground font-medium">{d.perf}</span></div>
                            </div>
                          );
                        }}
                      />
                      <Scatter data={tenureData} fill="var(--chart-1)" fillOpacity={0.55} />
                    </ScatterChart>
                  </ChartContainer>
                  </div>
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Recent Hires table */}
          <div className="col-span-12 md:col-span-8">
            <CardHeader>
              <CardHeaderTitle>Recent Hires</CardHeaderTitle>
              <CardHeaderSubtitle>Last 8 hires across all departments</CardHeaderSubtitle>
            </CardHeader>
            <TableWrapper>
              <Table scrollable horizontal vertical height={300}>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Recruiter</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {recentHires.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                            {row.initials}
                          </span>
                          <span className="font-medium">{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{row.role}</TableCell>
                      <TableCell className="text-muted-foreground">{row.dept}</TableCell>
                      <TableCell>
                        <SimpleBadge variant="secondary">{row.level}</SimpleBadge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{row.start}</TableCell>
                      <TableCell className="text-muted-foreground">{row.recruiter}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <CardFooter className="border-t-0 pt-0" />
            </TableWrapper>
          </div>
        </div>
      </DashboardContent>
    </>
  );
}

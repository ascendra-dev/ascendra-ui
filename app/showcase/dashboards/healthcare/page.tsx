"use client";

import { BackLink, Card, CardFooter, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, DashboardContent, PageHeader, PageHeaderAction, PageHeaderGroup, PageSubtitle, PageTitle, SimpleBadge, Table, TableBody, TableCell, TableHead, TableHeader, TableHeaderRow, TableRow, TableWrapper } from "@/ascendra-ui";
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
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "Active Patients",  value: "1,284",  delta: "+4.2%",    up: true  },
  { label: "Avg. Wait Time",   value: "18 min", delta: "−3 min",   up: true  },
  { label: "Bed Occupancy",    value: "78.4%",  delta: "−1.8 pts", up: true  },
  { label: "Recovery Rate",    value: "87.2%",  delta: "+0.9 pts", up: true  },
] as const;

// ─── Admissions Trend ─────────────────────────────────────────────────────────

const admissionsData = [
  { month: "Jan", admissions: 198, discharges: 184, readmissions: 21 },
  { month: "Feb", admissions: 182, discharges: 174, readmissions: 19 },
  { month: "Mar", admissions: 204, discharges: 196, readmissions: 22 },
  { month: "Apr", admissions: 218, discharges: 206, readmissions: 24 },
  { month: "May", admissions: 212, discharges: 202, readmissions: 23 },
  { month: "Jun", admissions: 196, discharges: 188, readmissions: 20 },
  { month: "Jul", admissions: 188, discharges: 178, readmissions: 19 },
  { month: "Aug", admissions: 194, discharges: 186, readmissions: 21 },
  { month: "Sep", admissions: 208, discharges: 198, readmissions: 22 },
  { month: "Oct", admissions: 224, discharges: 212, readmissions: 25 },
  { month: "Nov", admissions: 216, discharges: 204, readmissions: 24 },
  { month: "Dec", admissions: 204, discharges: 194, readmissions: 22 },
];

const admissionsConfig: ChartConfig = {
  admissions:    { label: "Admissions",    color: "var(--chart-1)" },
  discharges:    { label: "Discharges",    color: "var(--chart-2)" },
  readmissions:  { label: "Readmissions",  color: "var(--chart-3)" },
};

// ─── Bed Occupancy Gauge ──────────────────────────────────────────────────────

const occupancyData = [{ name: "Occupancy", value: 78.4, fill: "var(--chart-3)" }];

// ─── Conditions by Department ─────────────────────────────────────────────────

const conditionsData = [
  { condition: "Cardiac",       current: 84, avg: 78 },
  { condition: "Respiratory",   current: 76, avg: 82 },
  { condition: "Neurological",  current: 68, avg: 64 },
  { condition: "Orthopedic",    current: 94, avg: 88 },
  { condition: "Oncology",      current: 58, avg: 62 },
  { condition: "Trauma",        current: 72, avg: 68 },
];

const conditionsConfig: ChartConfig = {
  current: { label: "This Month",    color: "var(--chart-1)" },
  avg:     { label: "3-Month Avg",   color: "var(--chart-2)" },
};

// ─── Department Scorecard (Radar) ────────────────────────────────────────────

const deptRadarData = [
  { axis: "Patient Sat.",        actual: 82, benchmark: 78 },
  { axis: "Wait Time",           actual: 74, benchmark: 80 },
  { axis: "Outcome Rate",        actual: 88, benchmark: 85 },
  { axis: "Readmission",         actual: 79, benchmark: 74 },
  { axis: "Capacity Util.",      actual: 72, benchmark: 76 },
  { axis: "Staff Ratio",         actual: 84, benchmark: 80 },
];

const radarConfig: ChartConfig = {
  actual:    { label: "Hospital",          color: "var(--chart-1)" },
  benchmark: { label: "National Avg",      color: "var(--chart-3)" },
};

// ─── Patient Age Distribution ─────────────────────────────────────────────────

const ageDistData = [
  { bin: "0–10",  count: 62  },
  { bin: "11–20", count: 84  },
  { bin: "21–30", count: 118 },
  { bin: "31–40", count: 156 },
  { bin: "41–50", count: 198 },
  { bin: "51–60", count: 248 },
  { bin: "61–70", count: 224 },
  { bin: "71–80", count: 168 },
  { bin: "80+",   count: 126 },
];

const ageConfig: ChartConfig = {
  count: { label: "Patients", color: "var(--chart-1)" },
};

// ─── Recent Cases ─────────────────────────────────────────────────────────────

const recentCases = [
  { id: "C-4821", dept: "Cardiology",    date: "May 28", condition: "Atrial Fibrillation",  status: "Recovering", los: 4  },
  { id: "C-4820", dept: "Neurology",     date: "May 28", condition: "Ischaemic Stroke",      status: "Critical",   los: 6  },
  { id: "C-4819", dept: "Orthopaedics",  date: "May 27", condition: "Hip Replacement",       status: "Stable",     los: 3  },
  { id: "C-4818", dept: "Oncology",      date: "May 27", condition: "Lung Cancer — Stage 3", status: "Stable",     los: 12 },
  { id: "C-4817", dept: "Respiratory",   date: "May 26", condition: "COPD Exacerbation",     status: "Improving",  los: 5  },
  { id: "C-4816", dept: "Trauma",        date: "May 26", condition: "Polytrauma",            status: "Critical",   los: 8  },
  { id: "C-4815", dept: "Cardiology",    date: "May 25", condition: "Myocardial Infarction", status: "Recovering", los: 7  },
  { id: "C-4814", dept: "Neurology",     date: "May 25", condition: "Epilepsy",              status: "Discharged", los: 2  },
];

const statusVariant: Record<string, "green" | "red" | "amber" | "secondary"> = {
  Recovering:  "green",
  Stable:      "secondary",
  Improving:   "green",
  Critical:    "red",
  Discharged:  "secondary",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HealthcarePage() {
  const [hiddenAdmissions, setHiddenAdmissions] = useState<Record<string, boolean>>({});
  const [hiddenConditions, setHiddenConditions] = useState<Record<string, boolean>>({});
  const [hiddenRadar,      setHiddenRadar]      = useState<Record<string, boolean>>({});

  return (
    <>
      <BackLink href="/showcase/dashboards">Dashboard Gallery</BackLink>

      <PageHeader variant="dashboard">
        <PageHeaderGroup>
          <PageTitle>Healthcare Analytics</PageTitle>
          <PageSubtitle>
            Admissions trends, bed occupancy, department performance, and
            patient demographics — clinical operations at a glance.
          </PageSubtitle>
        </PageHeaderGroup>
        <PageHeaderAction className="w-fit">
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400 dark:ring-emerald-500/30">
            Healthcare / Clinical
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

        {/* ── Row 1: Admissions Trend | Bed Occupancy ─────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Admissions Trend — Line 3 series */}
          <div className="col-span-12 md:col-span-8">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Admissions Trend</CardHeaderTitle>
                <CardHeaderSubtitle>12-month view · admissions, discharges, and readmissions</CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer config={admissionsConfig} className="h-64 w-full">
                    <LineChart data={admissionsData} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        dy={6}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        width={36}
                      />
                      <ReferenceLine y={220} stroke="var(--border)" strokeDasharray="4 4" strokeOpacity={0.7} label={{ value: "Capacity", position: "insideTopRight", fontSize: 10, fill: "var(--muted-foreground)" }} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(admissionsConfig, (v) => v.toLocaleString())}
                          />
                        }
                      />
                      {(["admissions", "discharges", "readmissions"] as const).map((key) => (
                        <Line
                          key={key}
                          type="monotone"
                          dataKey={key}
                          stroke={`var(--color-${key})`}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                          hide={hiddenAdmissions[key]}
                        />
                      ))}
                    </LineChart>
                  </ChartContainer>
                  <ChartSeriesLegend
                    config={admissionsConfig}
                    hidden={hiddenAdmissions}
                    onToggle={(k) => setHiddenAdmissions((p) => ({ ...p, [k]: !p[k] }))}
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Bed Occupancy — Radial gauge */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle className="text-md">Bed Occupancy</CardHeaderTitle>
              </CardHeader>
              <CardPanel>
                <div className="flex flex-1 flex-col items-center justify-center p-6">
                  <ChartContainer config={{}} className="h-44 w-44">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={84}
                      startAngle={90}
                      endAngle={-270}
                      data={occupancyData}
                      barSize={14}
                    >
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                      <RadialBar
                        dataKey="value"
                        cornerRadius={7}
                        background={{ fill: "var(--muted)" }}
                        fill="var(--chart-3)"
                      />
                      <text x="50%" y="44%" textAnchor="middle" dominantBaseline="middle" fontSize={22} fontWeight={700} className="fill-foreground">
                        78.4%
                      </text>
                      <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fontSize={9} className="fill-muted-foreground">
                        Bed Occupancy
                      </text>
                    </RadialBarChart>
                  </ChartContainer>
                  <div className="mt-1 flex flex-col items-center gap-1 text-xs text-muted-foreground">
                    <span className="font-medium text-amber-600 dark:text-amber-400">Below 85% target</span>
                    <span className="text-muted-foreground/60">Target: 85%</span>
                  </div>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 2: Conditions by Department | Department Scorecard ─────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Conditions grouped bar */}
          <div className="col-span-12 md:col-span-6">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">Conditions by Department</p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer config={conditionsConfig} className="h-52 w-full">
                      <BarChart data={conditionsData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                        <XAxis
                          dataKey="condition"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 10 }}
                          dy={6}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          width={28}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(conditionsConfig, (v) => v.toLocaleString())}
                            />
                          }
                        />
                        <Bar dataKey="current" fill="var(--chart-1)" fillOpacity={0.85} radius={[3, 3, 0, 0]} hide={hiddenConditions["current"]} />
                        <Bar dataKey="avg"     fill="var(--chart-2)" fillOpacity={0.65} radius={[3, 3, 0, 0]} hide={hiddenConditions["avg"]}     />
                      </BarChart>
                    </ChartContainer>
                  </div>
                  <ChartSeriesLegend
                    config={conditionsConfig}
                    hidden={hiddenConditions}
                    onToggle={(k) => setHiddenConditions((p) => ({ ...p, [k]: !p[k] }))}
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Department Scorecard — Radar */}
          <div className="col-span-12 md:col-span-6">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-2 text-sm font-medium">Department Scorecard</p>
                  <div className="flex-1 min-h-0">
                  <ChartContainer config={radarConfig} className="h-full w-full">
                    <RadarChart data={deptRadarData} cx="50%" cy="50%" outerRadius="72%">
                      <PolarGrid stroke="var(--border)" strokeOpacity={0.5} />
                      <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(radarConfig, (v) => String(v))}
                          />
                        }
                      />
                      <Radar dataKey="actual"    stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.2} strokeWidth={2} hide={hiddenRadar["actual"]}    />
                      <Radar dataKey="benchmark" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.1} strokeWidth={2} strokeDasharray="4 4" hide={hiddenRadar["benchmark"]} />
                    </RadarChart>
                  </ChartContainer>
                  </div>
                  <ChartSeriesLegend
                    config={radarConfig}
                    hidden={hiddenRadar}
                    onToggle={(k) => setHiddenRadar((p) => ({ ...p, [k]: !p[k] }))}
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 3: Age Distribution | Recent Cases ────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Age Distribution histogram */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">Patient Age Distribution</p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer config={ageConfig} className="h-full w-full">
                      <BarChart data={ageDistData} barCategoryGap="6%" margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                        <XAxis
                          dataKey="bin"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 10 }}
                          dy={6}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          width={32}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(ageConfig, (v) => v.toLocaleString())}
                            />
                          }
                        />
                        <Bar dataKey="count" fill="var(--chart-1)" fillOpacity={0.8} radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Recent Cases table */}
          <div className="col-span-12 md:col-span-8">
            <CardHeader>
              <CardHeaderTitle>Recent Cases</CardHeaderTitle>
              <CardHeaderSubtitle>Latest admissions across departments</CardHeaderSubtitle>
            </CardHeader>
            <TableWrapper>
              <Table scrollable horizontal vertical height={300}>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Admitted</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">LOS (d)</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {recentCases.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-muted-foreground">{row.id}</TableCell>
                      <TableCell className="font-medium">{row.dept}</TableCell>
                      <TableCell className="text-muted-foreground">{row.date}</TableCell>
                      <TableCell className="text-muted-foreground">{row.condition}</TableCell>
                      <TableCell>
                        <SimpleBadge variant={statusVariant[row.status] ?? "secondary"}>
                          {row.status}
                        </SimpleBadge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{row.los}</TableCell>
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

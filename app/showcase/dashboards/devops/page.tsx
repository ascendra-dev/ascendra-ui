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
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "Uptime (30d)", value: "99.94%", delta: "+0.04 pts", up: true },
  { label: "P99 Latency", value: "182ms", delta: "+8ms", up: false },
  { label: "Error Rate", value: "0.38%", delta: "−0.12 pts", up: true },
  { label: "Deploy Frequency", value: "4.2/day", delta: "+0.8/day", up: true },
] as const;

// ─── Request Volume (30-day daily totals, 4 services) ─────────────────────────

const requestVolumeData = [
  { d: "1", api: 1280, auth: 432, storage: 318, worker: 216 },
  { d: "2", api: 1340, auth: 448, storage: 332, worker: 224 },
  { d: "3", api: 820, auth: 278, storage: 198, worker: 142 },
  { d: "4", api: 760, auth: 258, storage: 182, worker: 128 },
  { d: "5", api: 1420, auth: 476, storage: 354, worker: 238 },
  { d: "6", api: 1480, auth: 492, storage: 368, worker: 248 },
  { d: "7", api: 1560, auth: 518, storage: 388, worker: 262 },
  { d: "8", api: 1520, auth: 504, storage: 378, worker: 254 },
  { d: "9", api: 1490, auth: 494, storage: 370, worker: 248 },
  { d: "10", api: 840, auth: 282, storage: 204, worker: 146 },
  { d: "11", api: 780, auth: 264, storage: 188, worker: 134 },
  { d: "12", api: 1820, auth: 612, storage: 482, worker: 328 },
  { d: "13", api: 2140, auth: 718, storage: 564, worker: 382 },
  { d: "14", api: 1680, auth: 562, storage: 418, worker: 282 },
  { d: "15", api: 1540, auth: 514, storage: 382, worker: 258 },
  { d: "16", api: 1420, auth: 474, storage: 352, worker: 238 },
  { d: "17", api: 860, auth: 288, storage: 208, worker: 148 },
  { d: "18", api: 800, auth: 272, storage: 194, worker: 138 },
  { d: "19", api: 1480, auth: 494, storage: 368, worker: 248 },
  { d: "20", api: 1540, auth: 514, storage: 382, worker: 258 },
  { d: "21", api: 1620, auth: 542, storage: 404, worker: 272 },
  { d: "22", api: 1580, auth: 528, storage: 392, worker: 264 },
  { d: "23", api: 1560, auth: 522, storage: 388, worker: 262 },
  { d: "24", api: 880, auth: 296, storage: 214, worker: 152 },
  { d: "25", api: 820, auth: 278, storage: 198, worker: 142 },
  { d: "26", api: 1640, auth: 548, storage: 408, worker: 276 },
  { d: "27", api: 1720, auth: 576, storage: 428, worker: 288 },
  { d: "28", api: 1780, auth: 596, storage: 444, worker: 298 },
  { d: "29", api: 1840, auth: 616, storage: 458, worker: 308 },
  { d: "30", api: 1910, auth: 638, storage: 474, worker: 318 },
];

const requestVolumeConfig: ChartConfig = {
  api: { label: "API", color: "var(--chart-1)" },
  auth: { label: "Auth", color: "var(--chart-2)" },
  storage: { label: "Storage", color: "var(--chart-3)" },
  worker: { label: "Worker", color: "var(--chart-4)" },
};

// ─── P99 Latency (30-day, 4 services, ms) ────────────────────────────────────

const latencyData = [
  { d: "1", api: 148, db: 92, cache: 18, worker: 172 },
  { d: "2", api: 152, db: 88, cache: 22, worker: 168 },
  { d: "3", api: 138, db: 84, cache: 19, worker: 162 },
  { d: "4", api: 134, db: 82, cache: 17, worker: 158 },
  { d: "5", api: 156, db: 96, cache: 21, worker: 178 },
  { d: "6", api: 162, db: 98, cache: 23, worker: 182 },
  { d: "7", api: 158, db: 94, cache: 20, worker: 176 },
  { d: "8", api: 164, db: 100, cache: 24, worker: 186 },
  { d: "9", api: 170, db: 104, cache: 26, worker: 192 },
  { d: "10", api: 144, db: 88, cache: 20, worker: 166 },
  { d: "11", api: 140, db: 86, cache: 18, worker: 162 },
  { d: "12", api: 196, db: 128, cache: 34, worker: 224 },
  { d: "13", api: 218, db: 148, cache: 42, worker: 248 },
  { d: "14", api: 188, db: 118, cache: 30, worker: 214 },
  { d: "15", api: 176, db: 108, cache: 28, worker: 202 },
  { d: "16", api: 168, db: 104, cache: 26, worker: 194 },
  { d: "17", api: 148, db: 90, cache: 20, worker: 170 },
  { d: "18", api: 144, db: 88, cache: 19, worker: 166 },
  { d: "19", api: 172, db: 106, cache: 27, worker: 196 },
  { d: "20", api: 178, db: 110, cache: 28, worker: 202 },
  { d: "21", api: 182, db: 112, cache: 29, worker: 208 },
  { d: "22", api: 176, db: 108, cache: 27, worker: 202 },
  { d: "23", api: 174, db: 106, cache: 26, worker: 198 },
  { d: "24", api: 154, db: 94, cache: 22, worker: 178 },
  { d: "25", api: 150, db: 92, cache: 21, worker: 174 },
  { d: "26", api: 184, db: 114, cache: 30, worker: 210 },
  { d: "27", api: 188, db: 116, cache: 31, worker: 214 },
  { d: "28", api: 186, db: 114, cache: 30, worker: 212 },
  { d: "29", api: 182, db: 112, cache: 29, worker: 208 },
  { d: "30", api: 182, db: 110, cache: 28, worker: 206 },
];

const latencyConfig: ChartConfig = {
  api: { label: "API", color: "var(--chart-1)" },
  db: { label: "Database", color: "var(--chart-2)" },
  cache: { label: "Cache", color: "var(--chart-3)" },
  worker: { label: "Worker", color: "var(--chart-4)" },
};

// ─── Errors by Service (this week) ───────────────────────────────────────────

const ERROR_THRESHOLD = 150;

const errorsByServiceData = [
  { service: "API Gateway", errors: 124 },
  { service: "Auth", errors: 45 },
  { service: "Data Pipeline", errors: 312 },
  { service: "Payments", errors: 28 },
  { service: "Notifications", errors: 189 },
  { service: "Search", errors: 67 },
  { service: "Storage", errors: 38 },
  { service: "Worker Queue", errors: 168 },
];

const errorsConfig: ChartConfig = {
  errors: { label: "Errors", color: "var(--chart-1)" },
};

// ─── Error Rate & Deploy Frequency (30-day) ───────────────────────────────────

const errorRateData = [
  { d: "1", deploys: 4, errorRate: 0.82 },
  { d: "2", deploys: 5, errorRate: 0.78 },
  { d: "3", deploys: 2, errorRate: 0.75 },
  { d: "4", deploys: 1, errorRate: 0.74 },
  { d: "5", deploys: 6, errorRate: 0.71 },
  { d: "6", deploys: 4, errorRate: 0.68 },
  { d: "7", deploys: 5, errorRate: 0.65 },
  { d: "8", deploys: 3, errorRate: 0.62 },
  { d: "9", deploys: 4, errorRate: 0.6 },
  { d: "10", deploys: 2, errorRate: 0.58 },
  { d: "11", deploys: 1, errorRate: 0.57 },
  { d: "12", deploys: 7, errorRate: 0.88 },
  { d: "13", deploys: 8, errorRate: 0.94 },
  { d: "14", deploys: 6, errorRate: 0.72 },
  { d: "15", deploys: 5, errorRate: 0.62 },
  { d: "16", deploys: 4, errorRate: 0.56 },
  { d: "17", deploys: 2, errorRate: 0.54 },
  { d: "18", deploys: 1, errorRate: 0.52 },
  { d: "19", deploys: 5, errorRate: 0.5 },
  { d: "20", deploys: 6, errorRate: 0.48 },
  { d: "21", deploys: 4, errorRate: 0.46 },
  { d: "22", deploys: 5, errorRate: 0.44 },
  { d: "23", deploys: 3, errorRate: 0.42 },
  { d: "24", deploys: 2, errorRate: 0.41 },
  { d: "25", deploys: 1, errorRate: 0.4 },
  { d: "26", deploys: 4, errorRate: 0.4 },
  { d: "27", deploys: 5, errorRate: 0.39 },
  { d: "28", deploys: 4, errorRate: 0.39 },
  { d: "29", deploys: 5, errorRate: 0.38 },
  { d: "30", deploys: 4, errorRate: 0.38 },
];

const errorRateConfig: ChartConfig = {
  deploys: { label: "Deploys", color: "var(--chart-1)" },
  errorRate: { label: "Error Rate", color: "var(--chart-3)" },
};

// ─── SLA Uptime gauge ─────────────────────────────────────────────────────────

const slaData = [{ name: "SLA", value: 99.94, fill: "var(--chart-2)" }];
const slaConfig: ChartConfig = {
  SLA: { label: "Uptime", color: "var(--chart-2)" },
};

// ─── Recent Incidents ─────────────────────────────────────────────────────────

const incidents = [
  {
    id: "INC-0412",
    service: "Data Pipeline",
    severity: "High",
    started: "May 13 02:14",
    duration: "2h 18m",
    status: "Resolved",
    responder: "jsmith",
  },
  {
    id: "INC-0411",
    service: "Notifications",
    severity: "Medium",
    started: "May 12 18:41",
    duration: "54m",
    status: "Resolved",
    responder: "amurray",
  },
  {
    id: "INC-0410",
    service: "API Gateway",
    severity: "Low",
    started: "May 10 09:22",
    duration: "12m",
    status: "Resolved",
    responder: "lchen",
  },
  {
    id: "INC-0409",
    service: "Worker Queue",
    severity: "Medium",
    started: "May 8 14:05",
    duration: "38m",
    status: "Resolved",
    responder: "jsmith",
  },
  {
    id: "INC-0408",
    service: "Payments",
    severity: "High",
    started: "May 6 11:33",
    duration: "1h 04m",
    status: "Resolved",
    responder: "dkowalski",
  },
  {
    id: "INC-0407",
    service: "Search",
    severity: "Low",
    started: "May 3 16:18",
    duration: "8m",
    status: "Resolved",
    responder: "amurray",
  },
  {
    id: "INC-0413",
    service: "Data Pipeline",
    severity: "Medium",
    started: "May 28 07:52",
    duration: "—",
    status: "Investigating",
    responder: "lchen",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DevopsPage() {
  const [hiddenVolume, setHiddenVolume] = useState<Record<string, boolean>>({});
  const [hiddenLatency, setHiddenLatency] = useState<Record<string, boolean>>(
    {},
  );
  const [hiddenErrRate, setHiddenErrRate] = useState<Record<string, boolean>>(
    {},
  );

  return (
    <>
      <BackLink href="/showcase/dashboards">Dashboard Gallery</BackLink>

      <PageHeader variant="dashboard">
        <PageHeaderGroup>
          <PageTitle>DevOps Monitoring</PageTitle>
          <PageSubtitle>
            Service health, latency, error rates, and deploy velocity — the
            reliability view for a platform engineering team.
          </PageSubtitle>
        </PageHeaderGroup>
        <PageHeaderAction className="w-fit">
          <span className="inline-flex items-center rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-500/20 dark:text-violet-400 dark:ring-violet-500/30">
            Engineering / SRE
          </span>
        </PageHeaderAction>
      </PageHeader>

      <DashboardContent>
        {/* ── KPI row ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5 ">
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  <div className="mt-auto flex flex-col items-start gap-1 pt-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-2">
                    <span className="text-2xl font-semibold tracking-tight">
                      {kpi.value}
                    </span>
                    <SimpleBadge variant={kpi.up ? "green" : "red"}>
                      {kpi.up ? (
                        <LuTrendingUp className="size-3" />
                      ) : (
                        <LuTrendingDown className="size-3" />
                      )}
                      {kpi.delta}
                    </SimpleBadge>
                  </div>
                </div>
              </CardPanel>
            </Card>
          ))}
        </div>

        {/* ── Row 1: Request Volume — full width ───────────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Request Volume</CardHeaderTitle>
                <CardHeaderSubtitle>
                  30-day daily totals by service · stacked area
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer
                    config={requestVolumeConfig}
                    className="h-64 w-full"
                  >
                    <AreaChart
                      data={requestVolumeData}
                      margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                      stackOffset="none"
                    >
                      <defs>
                        {(["api", "auth", "storage", "worker"] as const).map(
                          (key, i) => (
                            <linearGradient
                              key={key}
                              id={`grad-${key}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor={`var(--chart-${i + 1})`}
                                stopOpacity={0.35}
                              />
                              <stop
                                offset="95%"
                                stopColor={`var(--chart-${i + 1})`}
                                stopOpacity={0.05}
                              />
                            </linearGradient>
                          ),
                        )}
                      </defs>
                      <CartesianGrid
                        vertical={false}
                        stroke="var(--border)"
                        strokeOpacity={0.6}
                        strokeWidth={0.5}
                      />
                      <XAxis
                        dataKey="d"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        interval={4}
                        dy={6}
                        tickFormatter={(v: string) => `May ${v}`}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v: number) =>
                          `${(v / 1000).toFixed(0)}k`
                        }
                        width={40}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(
                              requestVolumeConfig,
                              (v) => v.toLocaleString(),
                            )}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="api"
                        stackId="1"
                        stroke="var(--chart-1)"
                        fill={`url(#grad-api)`}
                        strokeWidth={1.5}
                        hide={hiddenVolume["api"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="auth"
                        stackId="1"
                        stroke="var(--chart-2)"
                        fill={`url(#grad-auth)`}
                        strokeWidth={1.5}
                        hide={hiddenVolume["auth"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="storage"
                        stackId="1"
                        stroke="var(--chart-3)"
                        fill={`url(#grad-storage)`}
                        strokeWidth={1.5}
                        hide={hiddenVolume["storage"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="worker"
                        stackId="1"
                        stroke="var(--chart-4)"
                        fill={`url(#grad-worker)`}
                        strokeWidth={1.5}
                        hide={hiddenVolume["worker"]}
                      />
                    </AreaChart>
                  </ChartContainer>
                  <ChartSeriesLegend
                    config={requestVolumeConfig}
                    hidden={hiddenVolume}
                    onToggle={(k) =>
                      setHiddenVolume((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 2: P99 Latency | Errors by Service ───────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* P99 Latency */}
          <div className="col-span-12 md:col-span-6">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">P99 Latency</p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer
                      config={latencyConfig}
                      className="h-52 w-full"
                    >
                      <LineChart
                        data={latencyData}
                        margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid
                          vertical={false}
                          stroke="var(--border)"
                          strokeOpacity={0.6}
                          strokeWidth={0.5}
                        />
                        <XAxis
                          dataKey="d"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          interval={4}
                          dy={6}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          tickFormatter={(v: number) => `${v}ms`}
                          width={44}
                        />
                        <ReferenceLine
                          y={200}
                          stroke="var(--destructive)"
                          strokeDasharray="4 3"
                          strokeOpacity={0.6}
                          strokeWidth={0.5}
                          label={{
                            value: "SLA 200ms",
                            position: "insideTopRight",
                            fontSize: 10,
                            fill: "var(--destructive)",
                          }}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(
                                latencyConfig,
                                (v) => `${v}ms`,
                              )}
                            />
                          }
                        />
                        <Line
                          type="monotone"
                          dataKey="api"
                          stroke="var(--chart-1)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                          hide={hiddenLatency["api"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="db"
                          stroke="var(--chart-2)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                          hide={hiddenLatency["db"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="cache"
                          stroke="var(--chart-3)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                          hide={hiddenLatency["cache"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="worker"
                          stroke="var(--chart-4)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                          hide={hiddenLatency["worker"]}
                        />
                      </LineChart>
                    </ChartContainer>
                  </div>
                  <ChartSeriesLegend
                    config={latencyConfig}
                    hidden={hiddenLatency}
                    onToggle={(k) =>
                      setHiddenLatency((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Errors by Service */}
          <div className="col-span-12 md:col-span-6">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">Errors by Service</p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer
                      config={errorsConfig}
                      className="h-52 w-full"
                    >
                      <BarChart
                        data={errorsByServiceData}
                        layout="vertical"
                        margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
                      >
                        <CartesianGrid
                          horizontal={false}
                          stroke="var(--border)"
                          strokeOpacity={0.6}
                          strokeWidth={0.5}
                        />
                        <XAxis
                          type="number"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                        />
                        <YAxis
                          type="category"
                          dataKey="service"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          width={100}
                        />
                        <ReferenceLine
                          x={ERROR_THRESHOLD}
                          stroke="var(--destructive)"
                          strokeDasharray="4 3"
                          strokeOpacity={0.5}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(
                                errorsConfig,
                                (v) => v.toLocaleString(),
                              )}
                            />
                          }
                        />
                        <Bar dataKey="errors" radius={[0, 3, 3, 0]}>
                          {errorsByServiceData.map((entry, idx) => (
                            <Cell
                              key={`cell-${idx}`}
                              fill={
                                entry.errors > ERROR_THRESHOLD
                                  ? "var(--destructive)"
                                  : "var(--chart-1)"
                              }
                              fillOpacity={0.82}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Threshold: {ERROR_THRESHOLD} errors/week · red bars exceed
                    limit
                  </p>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 3: Error Rate & Throughput | SLA Uptime ──────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Error Rate & Deploy Frequency — Composed */}
          <div className="col-span-12 md:col-span-8">
            <Card className="h-full">
              <CardPanel>
                <div className="p-5">
                  <p className="mb-4 text-sm font-medium">
                    Error Rate & Deploy Frequency
                  </p>
                  <ChartContainer
                    config={errorRateConfig}
                    className="h-52 w-full"
                  >
                    <ComposedChart
                      data={errorRateData}
                      margin={{ top: 4, right: 36, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="var(--border)"
                        strokeOpacity={0.6}
                        strokeWidth={0.5}
                      />
                      <XAxis
                        dataKey="d"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        interval={4}
                        dy={6}
                      />
                      <YAxis
                        yAxisId="left"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v: number) => `${v}`}
                        width={32}
                        label={{
                          value: "Deploys",
                          angle: -90,
                          position: "insideLeft",
                          fontSize: 10,
                          fill: "var(--muted-foreground)",
                          dy: 30,
                        }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v: number) => `${v.toFixed(2)}%`}
                        width={48}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(
                              errorRateConfig,
                              (v, k) =>
                                k === "errorRate"
                                  ? `${(v as number).toFixed(2)}%`
                                  : v.toString(),
                            )}
                          />
                        }
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="deploys"
                        fill="var(--chart-1)"
                        fillOpacity={0.75}
                        radius={[3, 3, 0, 0]}
                        hide={hiddenErrRate["deploys"]}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="errorRate"
                        stroke="var(--chart-3)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                        hide={hiddenErrRate["errorRate"]}
                      />
                    </ComposedChart>
                  </ChartContainer>
                  <ChartSeriesLegend
                    config={errorRateConfig}
                    hidden={hiddenErrRate}
                    onToggle={(k) =>
                      setHiddenErrRate((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* SLA Uptime Gauge */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col items-center justify-center p-6">
                  <ChartContainer config={slaConfig} className="h-44 w-44">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={84}
                      startAngle={90}
                      endAngle={-270}
                      data={slaData}
                      barSize={14}
                    >
                      <PolarAngleAxis
                        type="number"
                        domain={[99.0, 100]}
                        tick={false}
                      />
                      <RadialBar
                        dataKey="value"
                        cornerRadius={7}
                        background={{ fill: "var(--muted)" }}
                      />
                      <text
                        x="50%"
                        y="44%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={20}
                        fontWeight={700}
                        className="fill-foreground"
                      >
                        99.94%
                      </text>
                      <text
                        x="50%"
                        y="60%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={9}
                        className="fill-muted-foreground"
                      >
                        SLA Uptime
                      </text>
                    </RadialBarChart>
                  </ChartContainer>
                  <div className="mt-1 flex flex-col items-center gap-1 text-xs text-muted-foreground">
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      Above 99.9% SLA target
                    </span>
                    <span className="text-muted-foreground/60">
                      26 min downtime in 30 days
                    </span>
                  </div>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 4: Recent Incidents — full width ─────────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <CardHeader>
              <CardHeaderTitle>Recent Incidents</CardHeaderTitle>
              <CardHeaderSubtitle>
                Last 30 days · sorted by recency
              </CardHeaderSubtitle>
            </CardHeader>
            <TableWrapper>
              <Table scrollable horizontal vertical height={280}>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Incident ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Responder</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-xs">
                        {row.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {row.service}
                      </TableCell>
                      <TableCell>
                        <SimpleBadge
                          variant={
                            row.severity === "High"
                              ? "red"
                              : row.severity === "Medium"
                                ? "amber"
                                : "secondary"
                          }
                        >
                          {row.severity}
                        </SimpleBadge>
                      </TableCell>
                      <TableCell className="text-muted-foreground tabular-nums">
                        {row.started}
                      </TableCell>
                      <TableCell className="tabular-nums">
                        {row.duration}
                      </TableCell>
                      <TableCell>
                        <SimpleBadge
                          variant={
                            row.status === "Resolved" ? "green" : "amber"
                          }
                        >
                          {row.status}
                        </SimpleBadge>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {row.responder}
                      </TableCell>
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

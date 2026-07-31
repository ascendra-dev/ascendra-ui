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
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "Attributed Revenue", value: "$2.14M", delta: "+18.3%", up: true },
  { label: "Blended ROAS", value: "4.2×", delta: "+0.4×", up: true },
  { label: "Customer Acq. Cost", value: "$48", delta: "−$6", up: true },
  { label: "Avg. CTR", value: "3.8%", delta: "+0.6 pts", up: true },
] as const;

// ─── Channel ROAS ─────────────────────────────────────────────────────────────

const ROAS_TARGET = 4.0;

const channelRoasData = [
  { channel: "Display", roas: 1.8 },
  { channel: "Paid Social", roas: 3.2 },
  { channel: "Affiliate", roas: 4.1 },
  { channel: "Paid Search", roas: 5.8 },
  { channel: "Email", roas: 7.4 },
  { channel: "Organic", roas: 9.2 },
];

const roasConfig: ChartConfig = {
  roas: { label: "ROAS", color: "var(--chart-1)" },
};

// ─── Channel Scorecard (Radar) ────────────────────────────────────────────────

const radarData = [
  { dim: "Volume", actual: 78, benchmark: 70 },
  { dim: "Cost Efficiency", actual: 82, benchmark: 70 },
  { dim: "Conv. Rate", actual: 65, benchmark: 70 },
  { dim: "Brand Fit", actual: 90, benchmark: 70 },
  { dim: "Scalability", actual: 55, benchmark: 70 },
  { dim: "Attribution", actual: 72, benchmark: 70 },
];

const radarConfig: ChartConfig = {
  actual: { label: "Actual", color: "var(--chart-1)" },
  benchmark: { label: "Benchmark", color: "var(--chart-3)" },
};

// ─── Traffic by Source ────────────────────────────────────────────────────────

const trafficData = [
  {
    month: "Jan",
    organic: 18200,
    paid: 9400,
    email: 4200,
    direct: 6800,
    referral: 2100,
  },
  {
    month: "Feb",
    organic: 17800,
    paid: 10200,
    email: 4400,
    direct: 6400,
    referral: 2200,
  },
  {
    month: "Mar",
    organic: 19400,
    paid: 11800,
    email: 4800,
    direct: 7200,
    referral: 2400,
  },
  {
    month: "Apr",
    organic: 20100,
    paid: 12400,
    email: 5000,
    direct: 7600,
    referral: 2600,
  },
  {
    month: "May",
    organic: 21200,
    paid: 13600,
    email: 5200,
    direct: 8100,
    referral: 2800,
  },
  {
    month: "Jun",
    organic: 22400,
    paid: 14800,
    email: 5600,
    direct: 8400,
    referral: 3000,
  },
  {
    month: "Jul",
    organic: 22800,
    paid: 15400,
    email: 5800,
    direct: 8600,
    referral: 3200,
  },
  {
    month: "Aug",
    organic: 23600,
    paid: 16200,
    email: 6000,
    direct: 9000,
    referral: 3400,
  },
  {
    month: "Sep",
    organic: 21800,
    paid: 15600,
    email: 5800,
    direct: 8400,
    referral: 3200,
  },
  {
    month: "Oct",
    organic: 24400,
    paid: 17400,
    email: 6200,
    direct: 9400,
    referral: 3600,
  },
  {
    month: "Nov",
    organic: 26200,
    paid: 19200,
    email: 6800,
    direct: 10200,
    referral: 3800,
  },
  {
    month: "Dec",
    organic: 24800,
    paid: 17600,
    email: 6400,
    direct: 9600,
    referral: 3600,
  },
];

const trafficConfig: ChartConfig = {
  organic: { label: "Organic", color: "var(--chart-1)" },
  paid: { label: "Paid", color: "var(--chart-2)" },
  email: { label: "Email", color: "var(--chart-3)" },
  direct: { label: "Direct", color: "var(--chart-4)" },
  referral: { label: "Referral", color: "var(--chart-1)" },
};

// ─── Spend Allocation ─────────────────────────────────────────────────────────

const spendAllocationData = [
  { name: "Paid Search", value: 35, fill: "var(--chart-1)", variant: "chart-1" as const },
  { name: "Paid Social", value: 28, fill: "var(--chart-2)", variant: "chart-2" as const },
  { name: "Display",     value: 12, fill: "var(--chart-3)", variant: "chart-3" as const },
  { name: "Affiliate",   value: 10, fill: "var(--chart-4)", variant: "chart-4" as const },
  { name: "Email",       value: 8,  fill: "var(--chart-1)", variant: "chart-1" as const },
  { name: "Influencer",  value: 7,  fill: "var(--chart-2)", variant: "chart-2" as const },
];

const TOTAL_SPEND = 128000;

// ─── Spend vs Revenue ─────────────────────────────────────────────────────────

const spendRevenueData = [
  { month: "Jan", spend: 38000, revenue: 124000 },
  { month: "Feb", spend: 42000, revenue: 136000 },
  { month: "Mar", spend: 48000, revenue: 148000 },
  { month: "Apr", spend: 52000, revenue: 158000 },
  { month: "May", spend: 56000, revenue: 168000 },
  { month: "Jun", spend: 60000, revenue: 178000 },
  { month: "Jul", spend: 64000, revenue: 185000 },
  { month: "Aug", spend: 70000, revenue: 192000 },
  { month: "Sep", spend: 66000, revenue: 182000 },
  { month: "Oct", spend: 74000, revenue: 205000 },
  { month: "Nov", spend: 86000, revenue: 228000 },
  { month: "Dec", spend: 78000, revenue: 210000 },
];

const spendRevConfig: ChartConfig = {
  spend: { label: "Ad Spend", color: "var(--chart-1)" },
  revenue: { label: "Attributed Revenue", color: "var(--chart-3)" },
};

// ─── Campaign Status ──────────────────────────────────────────────────────────

const campaignStatuses = [
  { status: "Active",    count: 5, fill: "var(--chart-2)", variant: "chart-2" as const },
  { status: "Paused",    count: 2, fill: "var(--chart-4)", variant: "chart-4" as const },
  { status: "Completed", count: 1, fill: "var(--chart-1)", variant: "chart-1" as const },
  { status: "Draft",     count: 3, fill: "var(--border)" },
];

const BUDGET_TOTAL = 128000;
const BUDGET_DEPLOYED = 87400;

// ─── Active Campaigns ─────────────────────────────────────────────────────────

const campaigns = [
  {
    name: "Spring Clearance",
    channel: "Paid Search",
    spend: 28400,
    revenue: 142000,
    roas: 5.0,
    ctr: 4.2,
    status: "Active",
  },
  {
    name: "Brand Awareness Q2",
    channel: "Display",
    spend: 18200,
    revenue: 32760,
    roas: 1.8,
    ctr: 0.8,
    status: "Active",
  },
  {
    name: "Email Re-engagement",
    channel: "Email",
    spend: 4800,
    revenue: 36480,
    roas: 7.6,
    ctr: 6.2,
    status: "Active",
  },
  {
    name: "Affiliate Spring",
    channel: "Affiliate",
    spend: 12600,
    revenue: 51660,
    roas: 4.1,
    ctr: 2.8,
    status: "Active",
  },
  {
    name: "Retargeting RLSA",
    channel: "Paid Search",
    spend: 16800,
    revenue: 98280,
    roas: 5.8,
    ctr: 5.4,
    status: "Active",
  },
  {
    name: "Social UGC Test",
    channel: "Paid Social",
    spend: 22400,
    revenue: 62720,
    roas: 2.8,
    ctr: 3.1,
    status: "Paused",
  },
  {
    name: "Influencer May",
    channel: "Influencer",
    spend: 9200,
    revenue: 18400,
    roas: 2.0,
    ctr: 1.4,
    status: "Paused",
  },
  {
    name: "Newsletter Q1 Recap",
    channel: "Email",
    spend: 2400,
    revenue: 20640,
    roas: 8.6,
    ctr: 7.8,
    status: "Completed",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const [hiddenRadar, setHiddenRadar] = useState<Record<string, boolean>>({});
  const [hiddenTraffic, setHiddenTraffic] = useState<Record<string, boolean>>(
    {},
  );
  const [hiddenSpendRev, setHiddenSpendRev] = useState<Record<string, boolean>>(
    {},
  );

  const budgetPct = Math.round((BUDGET_DEPLOYED / BUDGET_TOTAL) * 100);

  return (
    <>
      <BackLink href="/showcase/dashboards">Dashboard Gallery</BackLink>

      <PageHeader variant="dashboard">
        <PageHeaderGroup>
          <PageTitle>Marketing Performance</PageTitle>
          <PageSubtitle>
            Channel ROAS, traffic mix, spend efficiency, and campaign
            performance — the growth view for a performance marketing team.
          </PageSubtitle>
        </PageHeaderGroup>
        <PageHeaderAction className="w-fit">
          <span className="inline-flex items-center rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-500/20 dark:text-purple-400 dark:ring-purple-500/30">
            Marketing / Growth
          </span>
        </PageHeaderAction>
      </PageHeader>

      <DashboardContent>
        {/* ── KPI row ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
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

        {/* ── Row 1: Channel ROAS | Channel Scorecard ──────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Channel ROAS — horizontal bar */}
          <div className="col-span-12 md:col-span-5">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">Channel ROAS</p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer
                      config={roasConfig}
                      className="h-full w-full"
                    >
                      <BarChart
                        data={channelRoasData}
                        layout="vertical"
                        margin={{ top: 4, right: 40, left: 0, bottom: 4 }}
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
                          tickFormatter={(v: number) => `${v}×`}
                        />
                        <YAxis
                          type="category"
                          dataKey="channel"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          width={76}
                        />
                        <ReferenceLine
                          x={ROAS_TARGET}
                          stroke="var(--muted-foreground)"
                          strokeDasharray="4 2"
                          strokeOpacity={0.5}
                          label={{
                            value: "Target",
                            position: "insideTopRight",
                            fontSize: 10,
                            fill: "var(--muted-foreground)",
                          }}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(
                                roasConfig,
                                (v) => `${v}×`,
                              )}
                            />
                          }
                        />
                        <Bar dataKey="roas" radius={[0, 3, 3, 0]}>
                          {channelRoasData.map((entry, i) => (
                            <Cell
                              key={i}
                              fill={
                                entry.roas >= ROAS_TARGET
                                  ? "var(--chart-1)"
                                  : "var(--chart-4)"
                              }
                              fillOpacity={0.85}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>
              </CardPanel>
              <CardFooter>
                Coloured by target · green = above {ROAS_TARGET}× · orange =
                below
              </CardFooter>
            </Card>
          </div>

          {/* Channel Scorecard — Radar */}
          <div className="col-span-12 md:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Channel Scorecard</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Actual performance vs benchmark across 6 dimensions
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex-1 min-h-0">
                    <ChartContainer
                      config={radarConfig}
                      className="h-full w-full"
                    >
                      <RadarChart
                        data={radarData}
                        margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
                      >
                        <PolarGrid stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                        <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11 }} />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(
                                radarConfig,
                                (v) => `${v}`,
                              )}
                            />
                          }
                        />
                        <Radar
                          name="actual"
                          dataKey="actual"
                          stroke="var(--chart-1)"
                          fill="var(--chart-1)"
                          fillOpacity={0.2}
                          strokeWidth={2}
                          hide={hiddenRadar["actual"]}
                        />
                        <Radar
                          name="benchmark"
                          dataKey="benchmark"
                          stroke="var(--chart-3)"
                          fill="var(--chart-3)"
                          fillOpacity={0.08}
                          strokeWidth={1.5}
                          strokeDasharray="4 2"
                          hide={hiddenRadar["benchmark"]}
                        />
                      </RadarChart>
                    </ChartContainer>
                  </div>
                  <ChartSeriesLegend
                    config={radarConfig}
                    hidden={hiddenRadar}
                    onToggle={(k) =>
                      setHiddenRadar((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 2: Traffic by Source | Spend Allocation ──────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Traffic by Source — stacked area, normalised % */}
          <div className="col-span-12 md:col-span-8">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Traffic by Source</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Normalised channel mix · 12-month rolling share
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer
                    config={trafficConfig}
                    className="h-56 w-full"
                  >
                    <AreaChart
                      data={trafficData}
                      stackOffset="expand"
                      margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="var(--border)"
                        strokeOpacity={0.6}
                        strokeWidth={0.5}
                      />
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
                        tickFormatter={(v: number) =>
                          `${(v * 100).toFixed(0)}%`
                        }
                        width={38}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(
                              trafficConfig,
                              (v) => `${(Number(v) * 100).toFixed(1)}%`,
                            )}
                          />
                        }
                      />
                      {(
                        [
                          "organic",
                          "paid",
                          "email",
                          "direct",
                          "referral",
                        ] as const
                      ).map((key) => (
                        <Area
                          key={key}
                          type="monotone"
                          dataKey={key}
                          stackId="1"
                          stroke={trafficConfig[key].color}
                          fill={trafficConfig[key].color}
                          fillOpacity={0.75}
                          strokeWidth={0}
                          hide={hiddenTraffic[key]}
                        />
                      ))}
                    </AreaChart>
                  </ChartContainer>
                  <ChartSeriesLegend
                    config={trafficConfig}
                    hidden={hiddenTraffic}
                    onToggle={(k) =>
                      setHiddenTraffic((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Spend Allocation — Donut */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-medium">Spend Allocation</p>
                  <div className="mt-auto">
                    <ChartContainer config={{}} className="h-36 w-full">
                      <PieChart
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      >
                        <Pie
                          data={spendAllocationData}
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
                              formatter={(v) => [`${v}%`, ""]}
                              nameKey="name"
                            />
                          }
                        />
                      </PieChart>
                    </ChartContainer>
                    <div className="mt-4 flex flex-col gap-2">
                      {spendAllocationData.map((d) => (
                        <div
                          key={d.name}
                          className="flex items-center justify-between gap-2 text-xs"
                        >
                          <ChartLegend variant={d.variant} shape="square">{d.name}</ChartLegend>
                          <div className="flex items-center gap-2 tabular-nums">
                            <span className="text-muted-foreground/60">
                              {d.value}%
                            </span>
                            <span className="font-medium">
                              $
                              {(((d.value / 100) * TOTAL_SPEND) / 1000).toFixed(
                                1,
                              )}
                              k
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 3: Spend vs Revenue | Campaign Status ────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Spend vs Revenue — Composed Bar + Line, dual axis */}
          <div className="col-span-12 md:col-span-8">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Spend vs Revenue</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly ad spend vs attributed revenue · trailing 12 months
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer
                    config={spendRevConfig}
                    className="h-56 w-full"
                  >
                    <ComposedChart
                      data={spendRevenueData}
                      margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="var(--border)"
                        strokeOpacity={0.6}
                        strokeWidth={0.5}
                      />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        dy={6}
                      />
                      <YAxis
                        yAxisId="left"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v: number) =>
                          `$${(v / 1000).toFixed(0)}k`
                        }
                        width={44}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v: number) =>
                          `$${(v / 1000).toFixed(0)}k`
                        }
                        width={44}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(
                              spendRevConfig,
                              (v) => `$${(v / 1000).toFixed(1)}k`,
                            )}
                          />
                        }
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="spend"
                        fill="var(--chart-1)"
                        fillOpacity={0.85}
                        radius={[3, 3, 0, 0]}
                        hide={hiddenSpendRev["spend"]}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--chart-3)"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "var(--chart-3)" }}
                        activeDot={{ r: 5 }}
                        hide={hiddenSpendRev["revenue"]}
                      />
                    </ComposedChart>
                  </ChartContainer>
                  <ChartSeriesLegend
                    config={spendRevConfig}
                    hidden={hiddenSpendRev}
                    onToggle={(k) =>
                      setHiddenSpendRev((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Campaign Status */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">Campaign Status</p>

                  <div className="flex flex-col gap-3">
                    {campaignStatuses.map(({ status, count, fill, variant }) => (
                      <div
                        key={status}
                        className="flex items-center justify-between text-xs"
                      >
                        {variant ? (
                          <ChartLegend variant={variant} shape="round">{status}</ChartLegend>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: fill }} />
                            {status}
                          </div>
                        )}
                        <span className="font-medium tabular-nums">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="mb-2 flex items-baseline justify-between text-xs">
                      <span className="text-muted-foreground">
                        Monthly Budget
                      </span>
                      <span className="font-medium">
                        ${(BUDGET_TOTAL / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${budgetPct}%`,
                          background: "var(--chart-1)",
                        }}
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        ${(BUDGET_DEPLOYED / 1000).toFixed(1)}k deployed
                      </span>
                      <span>{budgetPct}%</span>
                    </div>
                  </div>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 4: Active Campaigns — full width ─────────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <CardHeader>
              <CardHeaderTitle>Active Campaigns</CardHeaderTitle>
              <CardHeaderSubtitle>
                All campaigns this month · sorted by spend
              </CardHeaderSubtitle>
            </CardHeader>
            <TableWrapper>
              <Table scrollable horizontal vertical height={300}>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead className="text-right">Spend</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">ROAS</TableHead>
                    <TableHead className="text-right">CTR</TableHead>
                    <TableHead>Status</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.channel}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        ${row.spend.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        ${row.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {row.roas}×
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {row.ctr}%
                      </TableCell>
                      <TableCell>
                        <SimpleBadge
                          variant={
                            row.status === "Active"
                              ? "green"
                              : row.status === "Paused"
                                ? "amber"
                                : "secondary"
                          }
                        >
                          {row.status}
                        </SimpleBadge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <CardFooter className="border-t-0 pt-0"></CardFooter>
            </TableWrapper>
          </div>
        </div>
      </DashboardContent>
    </>
  );
}

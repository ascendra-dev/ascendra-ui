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
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "Total Revenue", value: "$8.64M", delta: "+14.2%", up: true },
  { label: "EBITDA", value: "$1.92M", delta: "+28.6%", up: true },
  { label: "Monthly Burn Rate", value: "$680k", delta: "−$42k", up: true },
  { label: "Cash Runway", value: "18 mo", delta: "+3 mo", up: true },
] as const;

// ─── Costs & EBITDA Margin ────────────────────────────────────────────────────
//   Revenue = payroll + infra + marketing + EBITDA
//   ebitdaPct = EBITDA / revenue × 100

const costsData = [
  {
    month: "Jan",
    payroll: 332,
    infra: 51,
    marketing: 127,
    revenue: 600,
    ebitdaPct: 15,
  },
  {
    month: "Feb",
    payroll: 335,
    infra: 52,
    marketing: 128,
    revenue: 620,
    ebitdaPct: 17,
  },
  {
    month: "Mar",
    payroll: 346,
    infra: 56,
    marketing: 158,
    revenue: 700,
    ebitdaPct: 20,
  },
  {
    month: "Apr",
    payroll: 354,
    infra: 54,
    marketing: 137,
    revenue: 690,
    ebitdaPct: 21,
  },
  {
    month: "May",
    payroll: 360,
    infra: 55,
    marketing: 139,
    revenue: 710,
    ebitdaPct: 22,
  },
  {
    month: "Jun",
    payroll: 354,
    infra: 54,
    marketing: 136,
    revenue: 680,
    ebitdaPct: 20,
  },
  {
    month: "Jul",
    payroll: 361,
    infra: 56,
    marketing: 138,
    revenue: 730,
    ebitdaPct: 24,
  },
  {
    month: "Aug",
    payroll: 371,
    infra: 57,
    marketing: 142,
    revenue: 760,
    ebitdaPct: 25,
  },
  {
    month: "Sep",
    payroll: 356,
    infra: 55,
    marketing: 136,
    revenue: 710,
    ebitdaPct: 23,
  },
  {
    month: "Oct",
    payroll: 400,
    infra: 62,
    marketing: 153,
    revenue: 820,
    ebitdaPct: 25,
  },
  {
    month: "Nov",
    payroll: 408,
    infra: 63,
    marketing: 157,
    revenue: 860,
    ebitdaPct: 27,
  },
  {
    month: "Dec",
    payroll: 376,
    infra: 58,
    marketing: 144,
    revenue: 760,
    ebitdaPct: 24,
  },
];

const costsConfig: ChartConfig = {
  payroll: { label: "Payroll", color: "var(--chart-1)" },
  infra: { label: "Infrastructure", color: "var(--chart-2)" },
  marketing: { label: "Marketing", color: "var(--chart-3)" },
  ebitdaPct: { label: "EBITDA Margin", color: "var(--chart-4)" },
};

// ─── Budget Attainment Gauge ──────────────────────────────────────────────────

const budgetGaugeData = [
  { name: "Budget", value: 108, fill: "var(--chart-2)" },
];

const budgetGaugeConfig: ChartConfig = {
  Budget: { label: "Attainment", color: "var(--chart-2)" },
};

// ─── Revenue vs Expenses ──────────────────────────────────────────────────────

const revExpData = costsData.map((d) => ({
  month: d.month,
  revenue: d.revenue,
  expenses: d.payroll + d.infra + d.marketing,
}));

const revExpConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  expenses: { label: "Expenses", color: "var(--chart-3)" },
};

// ─── Cash Flow ────────────────────────────────────────────────────────────────
// net = monthly operating cash; balance = running total (opening $10.8M)

const cashFlowData = [
  { month: "Jan", net: 90, balance: 10890 },
  { month: "Feb", net: 105, balance: 10995 },
  { month: "Mar", net: 140, balance: 11135 },
  { month: "Apr", net: 145, balance: 11280 },
  { month: "May", net: 156, balance: 11436 },
  { month: "Jun", net: -62, balance: 11374 },
  { month: "Jul", net: 175, balance: 11549 },
  { month: "Aug", net: 190, balance: 11739 },
  { month: "Sep", net: -48, balance: 11691 },
  { month: "Oct", net: 205, balance: 11896 },
  { month: "Nov", net: 232, balance: 12128 },
  { month: "Dec", net: 182, balance: 12310 },
];

const cashFlowConfig: ChartConfig = {
  net: { label: "Net Cash Flow", color: "var(--chart-2)" },
  balance: { label: "Cash Balance", color: "var(--chart-1)" },
};

// ─── P&L Summary ──────────────────────────────────────────────────────────────

const pnlRows = [
  {
    item: "Revenue",
    q1: "$1.9M",
    q2: "$2.1M",
    q3: "$2.2M",
    q4: "$2.4M",
    fy: "$8.6M",
    yoy: "+14.2%",
    up: true,
  },
  {
    item: "Gross Profit",
    q1: "$1.3M",
    q2: "$1.5M",
    q3: "$1.5M",
    q4: "$1.7M",
    fy: "$6.0M",
    yoy: "+16.8%",
    up: true,
  },
  {
    item: "EBITDA",
    q1: "$335k",
    q2: "$437k",
    q3: "$528k",
    q4: "$619k",
    fy: "$1.9M",
    yoy: "+28.6%",
    up: true,
  },
  {
    item: "Net Income",
    q1: "$235k",
    q2: "$306k",
    q3: "$370k",
    q4: "$433k",
    fy: "$1.3M",
    yoy: "+22.4%",
    up: true,
  },
  {
    item: "Headcount",
    q1: "44",
    q2: "47",
    q3: "50",
    q4: "52",
    fy: "52",
    yoy: "+10",
    up: true,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FinancialPnlPage() {
  const [hiddenCosts, setHiddenCosts] = useState<Record<string, boolean>>({});
  const [hiddenRevExp, setHiddenRevExp] = useState<Record<string, boolean>>({});

  return (
    <>
      <BackLink href="/showcase/dashboards">Dashboard Gallery</BackLink>

      <PageHeader variant="dashboard">
        <PageHeaderGroup>
          <PageTitle>Financial P&amp;L</PageTitle>
          <PageSubtitle>
            Revenue, EBITDA, cost structure, and cash position — the CFO view
            for a scaling company.
          </PageSubtitle>
        </PageHeaderGroup>
        <PageHeaderAction className="w-fit">
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-500/20 dark:text-amber-400 dark:ring-amber-500/30">
            Finance / CFO
          </span>
        </PageHeaderAction>
      </PageHeader>

      <DashboardContent>
        {/* ── KPI row ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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

        {/* ── Row 1: Costs & EBITDA | Budget Attainment ───────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Costs & EBITDA Margin — Stacked Bar + Line */}
          <div className="col-span-12 md:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Costs &amp; EBITDA Margin</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly cost stack vs EBITDA margin % · trailing 12 months
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer config={costsConfig} className="h-64 w-full">
                    <ComposedChart
                      data={costsData}
                      margin={{ top: 4, right: 36, left: 0, bottom: 0 }}
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
                          `$${(v / 1000).toFixed(0)}M`
                        }
                        width={44}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v: number) => `${v}%`}
                        domain={[0, 40]}
                        width={36}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(
                              costsConfig,
                              (v, k) =>
                                k === "ebitdaPct"
                                  ? `${v}%`
                                  : `$${Number(v).toLocaleString()}k`,
                            )}
                          />
                        }
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="payroll"
                        stackId="costs"
                        fill="var(--chart-1)"
                        fillOpacity={0.85}
                        radius={[0, 0, 0, 0]}
                        hide={hiddenCosts["payroll"]}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="infra"
                        stackId="costs"
                        fill="var(--chart-2)"
                        fillOpacity={0.85}
                        radius={[0, 0, 0, 0]}
                        hide={hiddenCosts["infra"]}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="marketing"
                        stackId="costs"
                        fill="var(--chart-3)"
                        fillOpacity={0.85}
                        radius={[3, 3, 0, 0]}
                        hide={hiddenCosts["marketing"]}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="ebitdaPct"
                        stroke="var(--chart-4)"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "var(--chart-4)" }}
                        activeDot={{ r: 5 }}
                        hide={hiddenCosts["ebitdaPct"]}
                      />
                    </ComposedChart>
                  </ChartContainer>
                  <ChartSeriesLegend
                    config={costsConfig}
                    hidden={hiddenCosts}
                    onToggle={(k) =>
                      setHiddenCosts((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Budget Attainment — Radial gauge */}
          <div className="col-span-12 md:col-span-5">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col items-center justify-center p-6">
                  <ChartContainer
                    config={budgetGaugeConfig}
                    className="h-44 w-44"
                  >
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={84}
                      startAngle={90}
                      endAngle={-270}
                      data={budgetGaugeData}
                      barSize={14}
                    >
                      <PolarAngleAxis
                        type="number"
                        domain={[0, 150]}
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
                        fontSize={22}
                        fontWeight={700}
                        className="fill-foreground"
                      >
                        108%
                      </text>
                      <text
                        x="50%"
                        y="60%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={9}
                        className="fill-muted-foreground"
                      >
                        Budget Attainment
                      </text>
                    </RadialBarChart>
                  </ChartContainer>
                  <div className="mt-1 flex flex-col items-center gap-1 text-xs text-muted-foreground">
                    <span className="font-medium text-green-600 dark:text-green-400">
                      +$640k above target
                    </span>
                    <span className="text-muted-foreground/60">
                      Actual $8.64M vs $8.0M plan
                    </span>
                  </div>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 2: Revenue vs Expenses — full width ──────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Revenue vs Expenses</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly revenue and total expenses · the gap represents EBITDA
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer config={revExpConfig} className="h-64 w-full">
                    <AreaChart
                      data={revExpData}
                      margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="revGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="var(--chart-1)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--chart-1)"
                            stopOpacity={0.05}
                          />
                        </linearGradient>
                        <linearGradient
                          id="expGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="var(--chart-3)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--chart-3)"
                            stopOpacity={0.05}
                          />
                        </linearGradient>
                      </defs>
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
                          `$${(v / 1000).toFixed(0)}M`
                        }
                        width={44}
                        domain={[400, 900]}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(
                              revExpConfig,
                              (v) => `$${Number(v).toLocaleString()}k`,
                            )}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        fill="url(#revGradient)"
                        hide={hiddenRevExp["revenue"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="var(--chart-3)"
                        strokeWidth={2}
                        fill="url(#expGradient)"
                        hide={hiddenRevExp["expenses"]}
                      />
                    </AreaChart>
                  </ChartContainer>
                  <ChartSeriesLegend
                    config={revExpConfig}
                    hidden={hiddenRevExp}
                    onToggle={(k) =>
                      setHiddenRevExp((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 3: Cash Flow Waterfall | P&L Summary ─────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Cash Flow Waterfall */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">Cash Flow</p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer
                      config={cashFlowConfig}
                      className="h-full w-full"
                    >
                      <ComposedChart
                        data={cashFlowData}
                        margin={{ top: 4, right: 44, left: 0, bottom: 0 }}
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
                          tickFormatter={(v: number) => `$${v}k`}
                          width={48}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          tickFormatter={(v: number) =>
                            `$${(v / 1000).toFixed(1)}M`
                          }
                          width={44}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(
                                cashFlowConfig,
                                (v, k) =>
                                  k === "balance"
                                    ? `$${(Number(v) / 1000).toFixed(2)}M`
                                    : `$${Number(v)}k`,
                              )}
                            />
                          }
                        />
                        <Bar yAxisId="left" dataKey="net" radius={[3, 3, 0, 0]}>
                          {cashFlowData.map((entry, i) => (
                            <Cell
                              key={i}
                              fill={
                                entry.net >= 0
                                  ? "var(--chart-2)"
                                  : "var(--destructive)"
                              }
                              fillOpacity={0.85}
                            />
                          ))}
                        </Bar>
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="balance"
                          stroke="var(--chart-1)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      </ComposedChart>
                    </ChartContainer>
                  </div>
                </div>
              </CardPanel>
              <CardFooter>
                Bars = monthly net cash · green positive · red negative · line =
                running balance
              </CardFooter>
            </Card>
          </div>

          {/* P&L Summary — table */}
          <div className="col-span-12 md:col-span-8">
            <CardHeader>
              <CardHeaderTitle>P&amp;L Summary</CardHeaderTitle>
              <CardHeaderSubtitle>
                Quarterly and full-year · all figures in USD
              </CardHeaderSubtitle>
            </CardHeader>
            <TableWrapper>
              <Table scrollable horizontal>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Line Item</TableHead>
                    <TableHead className="text-right">Q1</TableHead>
                    <TableHead className="text-right">Q2</TableHead>
                    <TableHead className="text-right">Q3</TableHead>
                    <TableHead className="text-right">Q4</TableHead>
                    <TableHead className="text-right">Full Year</TableHead>
                    <TableHead className="text-right">YoY Δ</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {pnlRows.map((row) => (
                    <TableRow key={row.item}>
                      <TableCell className="font-medium">{row.item}</TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        {row.q1}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        {row.q2}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        {row.q3}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        {row.q4}
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-medium">
                        {row.fy}
                      </TableCell>
                      <TableCell className="text-right">
                        <SimpleBadge variant={row.up ? "green" : "red"}>
                          {row.yoy}
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

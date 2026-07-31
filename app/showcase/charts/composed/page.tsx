"use client";

import { useState } from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Scatter,
  ZAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/ascendra-ui/shadcn";
import { Card, CardFooter, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, SimpleBadge } from "@/ascendra-ui";
import { ChartSeriesLegend } from "@/components/charts/chart-series-legend";
import { makeTooltipFormatter } from "@/components/charts/make-tooltip-formatter";

// ─── Data ─────────────────────────────────────────────────────────────────────

const revenueGrowthData = [
  { month: "Jan", revenue: 42100, growthRate: 4.2 },
  { month: "Feb", revenue: 51800, growthRate: 6.8 },
  { month: "Mar", revenue: 48600, growthRate: -1.2 },
  { month: "Apr", revenue: 62400, growthRate: 8.4 },
  { month: "May", revenue: 71200, growthRate: 9.1 },
  { month: "Jun", revenue: 68900, growthRate: -1.8 },
  { month: "Jul", revenue: 79400, growthRate: 7.3 },
  { month: "Aug", revenue: 91100, growthRate: 10.2 },
  { month: "Sep", revenue: 85700, growthRate: -3.1 },
  { month: "Oct", revenue: 98400, growthRate: 8.9 },
  { month: "Nov", revenue: 94200, growthRate: -2.4 },
  { month: "Dec", revenue: 112600, growthRate: 12.1 },
];

const dualAxisData = [
  { month: "Jan", orders: 1840, avgOrderValue: 228 },
  { month: "Feb", orders: 2210, avgOrderValue: 234 },
  { month: "Mar", orders: 1980, avgOrderValue: 245 },
  { month: "Apr", orders: 2650, avgOrderValue: 236 },
  { month: "May", orders: 3120, avgOrderValue: 228 },
  { month: "Jun", orders: 2890, avgOrderValue: 238 },
  { month: "Jul", orders: 3410, avgOrderValue: 233 },
  { month: "Aug", orders: 3860, avgOrderValue: 236 },
  { month: "Sep", orders: 3520, avgOrderValue: 243 },
  { month: "Oct", orders: 4210, avgOrderValue: 234 },
  { month: "Nov", orders: 3980, avgOrderValue: 237 },
  { month: "Dec", orders: 4630, avgOrderValue: 243 },
];

const areaScatterData = [
  { month: "Jan", baseline: 18000, outlier: null },
  { month: "Feb", baseline: 22000, outlier: 28000 },
  { month: "Mar", baseline: 21000, outlier: null },
  { month: "Apr", baseline: 26000, outlier: null },
  { month: "May", baseline: 31000, outlier: 38000 },
  { month: "Jun", baseline: 29000, outlier: null },
  { month: "Jul", baseline: 34000, outlier: null },
  { month: "Aug", baseline: 39000, outlier: 47000 },
  { month: "Sep", baseline: 35000, outlier: null },
  { month: "Oct", baseline: 42000, outlier: null },
  { month: "Nov", baseline: 40000, outlier: 51000 },
  { month: "Dec", baseline: 46000, outlier: null },
];

const tripleData = [
  { month: "Jan", volume: 3200, rate: 2.1, cumulative: 3200 },
  { month: "Feb", volume: 4100, rate: 2.8, cumulative: 7300 },
  { month: "Mar", volume: 3800, rate: 2.4, cumulative: 11100 },
  { month: "Apr", volume: 5200, rate: 3.2, cumulative: 16300 },
  { month: "May", volume: 6100, rate: 3.9, cumulative: 22400 },
  { month: "Jun", volume: 5800, rate: 3.5, cumulative: 28200 },
  { month: "Jul", volume: 7400, rate: 4.1, cumulative: 35600 },
  { month: "Aug", volume: 8600, rate: 4.8, cumulative: 44200 },
  { month: "Sep", volume: 7900, rate: 4.3, cumulative: 52100 },
  { month: "Oct", volume: 9200, rate: 5.2, cumulative: 61300 },
  { month: "Nov", volume: 8700, rate: 4.9, cumulative: 70000 },
  { month: "Dec", volume: 10400, rate: 5.7, cumulative: 80400 },
];

const stackedCostData = [
  { month: "Jan", infra: 12400, payroll: 38200, marketing: 8100, margin: 18.2 },
  { month: "Feb", infra: 13100, payroll: 38200, marketing: 9400, margin: 22.4 },
  { month: "Mar", infra: 12800, payroll: 38200, marketing: 7600, margin: 20.8 },
  {
    month: "Apr",
    infra: 14200,
    payroll: 40100,
    marketing: 11200,
    margin: 24.1,
  },
  {
    month: "May",
    infra: 15600,
    payroll: 40100,
    marketing: 13800,
    margin: 27.3,
  },
  {
    month: "Jun",
    infra: 14900,
    payroll: 40100,
    marketing: 12400,
    margin: 25.6,
  },
  {
    month: "Jul",
    infra: 16800,
    payroll: 42000,
    marketing: 15200,
    margin: 28.9,
  },
  {
    month: "Aug",
    infra: 18400,
    payroll: 42000,
    marketing: 17600,
    margin: 31.2,
  },
  {
    month: "Sep",
    infra: 17200,
    payroll: 42000,
    marketing: 14900,
    margin: 29.4,
  },
  {
    month: "Oct",
    infra: 19600,
    payroll: 44200,
    marketing: 18800,
    margin: 32.8,
  },
  {
    month: "Nov",
    infra: 18900,
    payroll: 44200,
    marketing: 16400,
    margin: 30.1,
  },
  {
    month: "Dec",
    infra: 21400,
    payroll: 44200,
    marketing: 21200,
    margin: 35.4,
  },
];

const forecastData: Array<{
  month: string;
  lower: number;
  upper: number;
  actual?: number;
}> = [
  { month: "Jan", lower: 38000, upper: 48000, actual: 42100 },
  { month: "Feb", lower: 44000, upper: 58000, actual: 51800 },
  { month: "Mar", lower: 40000, upper: 55000, actual: 48600 },
  { month: "Apr", lower: 52000, upper: 70000, actual: 62400 },
  { month: "May", lower: 61000, upper: 80000, actual: 71200 },
  { month: "Jun", lower: 58000, upper: 79000, actual: 68900 },
  { month: "Jul", lower: 68000, upper: 90000, actual: 79400 },
  { month: "Aug", lower: 80000, upper: 102000, actual: 91100 },
  { month: "Sep", lower: 74000, upper: 97000, actual: 85700 },
  { month: "Oct", lower: 88000, upper: 110000, actual: 98400 },
  { month: "Nov", lower: 83000, upper: 106000 },
  { month: "Dec", lower: 98000, upper: 126000 },
];

const regionalData = [
  { month: "Jan", north: 28400, south: 19200, benchmark: 24000 },
  { month: "Feb", north: 34100, south: 23600, benchmark: 28000 },
  { month: "Mar", north: 31800, south: 21400, benchmark: 26000 },
  { month: "Apr", north: 41200, south: 28400, benchmark: 33000 },
  { month: "May", north: 47600, south: 32800, benchmark: 38000 },
  { month: "Jun", north: 44900, south: 30200, benchmark: 36000 },
  { month: "Jul", north: 52400, south: 36600, benchmark: 42000 },
  { month: "Aug", north: 61200, south: 42800, benchmark: 49000 },
  { month: "Sep", north: 56800, south: 38400, benchmark: 45000 },
  { month: "Oct", north: 66400, south: 46200, benchmark: 54000 },
  { month: "Nov", north: 62100, south: 43800, benchmark: 51000 },
  { month: "Dec", north: 74800, south: 52400, benchmark: 60000 },
];

const cashFlowBase = [
  { month: "Jan", inflows: 85000, outflows: 71000 },
  { month: "Feb", inflows: 94000, outflows: 78000 },
  { month: "Mar", inflows: 88000, outflows: 82000 },
  { month: "Apr", inflows: 112000, outflows: 89000 },
  { month: "May", inflows: 128000, outflows: 98000 },
  { month: "Jun", inflows: 119000, outflows: 104000 },
  { month: "Jul", inflows: 142000, outflows: 112000 },
  { month: "Aug", inflows: 163000, outflows: 124000 },
  { month: "Sep", inflows: 151000, outflows: 131000 },
  { month: "Oct", inflows: 178000, outflows: 142000 },
  { month: "Nov", inflows: 168000, outflows: 148000 },
  { month: "Dec", inflows: 196000, outflows: 158000 },
];

let _runningBalance = 0;
const cashFlowData = cashFlowBase.map((d) => {
  _runningBalance += d.inflows - d.outflows;
  return { ...d, balance: _runningBalance };
});

const budgetActualData = [
  { month: "Jan", budget: 45000, actual: 42100, variance: -6.4 },
  { month: "Feb", budget: 52000, actual: 51800, variance: -0.4 },
  { month: "Mar", budget: 54000, actual: 48600, variance: -10.0 },
  { month: "Apr", budget: 58000, actual: 62400, variance: 7.6 },
  { month: "May", budget: 65000, actual: 71200, variance: 9.5 },
  { month: "Jun", budget: 68000, actual: 68900, variance: 1.3 },
  { month: "Jul", budget: 74000, actual: 79400, variance: 7.3 },
  { month: "Aug", budget: 82000, actual: 91100, variance: 11.1 },
  { month: "Sep", budget: 88000, actual: 85700, variance: -2.6 },
  { month: "Oct", budget: 92000, actual: 98400, variance: 7.0 },
  { month: "Nov", budget: 96000, actual: 94200, variance: -1.9 },
  { month: "Dec", budget: 104000, actual: 112600, variance: 8.3 },
];

// ─── Chart configs ─────────────────────────────────────────────────────────────

const revenueGrowthConfig: ChartConfig = {
  revenue: { label: "Revenue ($)", color: "var(--chart-1)" },
  growthRate: { label: "Growth Rate (%)", color: "var(--chart-3)" },
};

const dualAxisConfig: ChartConfig = {
  orders: { label: "Orders", color: "var(--chart-1)" },
  avgOrderValue: { label: "Avg. Order Value ($)", color: "var(--chart-4)" },
};

const areaScatterConfig: ChartConfig = {
  baseline: { label: "Baseline Revenue", color: "var(--chart-1)" },
  outlier: { label: "Outlier Event", color: "var(--chart-4)" },
};

const tripleConfig: ChartConfig = {
  volume: { label: "Volume", color: "var(--chart-1)" },
  rate: { label: "Conv. Rate (%)", color: "var(--chart-3)" },
  cumulative: { label: "Cumulative", color: "var(--chart-2)" },
};

const stackedCostConfig: ChartConfig = {
  infra: { label: "Infrastructure", color: "var(--chart-1)" },
  payroll: { label: "Payroll", color: "var(--chart-2)" },
  marketing: { label: "Marketing", color: "var(--chart-3)" },
  margin: { label: "EBITDA Margin (%)", color: "var(--chart-4)" },
};

const forecastConfig: ChartConfig = {
  upper: { label: "Forecast High", color: "var(--chart-2)" },
  lower: { label: "Forecast Low", color: "var(--chart-3)" },
  actual: { label: "Actual", color: "var(--chart-1)" },
};

const regionalConfig: ChartConfig = {
  north: { label: "North Region", color: "var(--chart-1)" },
  south: { label: "South Region", color: "var(--chart-2)" },
  benchmark: { label: "Benchmark", color: "var(--chart-4)" },
};

const cashFlowConfig: ChartConfig = {
  inflows: { label: "Inflows", color: "var(--chart-2)" },
  outflows: { label: "Outflows", color: "var(--chart-3)" },
  balance: { label: "Running Balance", color: "var(--chart-1)" },
};

const budgetActualConfig: ChartConfig = {
  budget: { label: "Budget", color: "var(--chart-3)" },
  actual: { label: "Actual", color: "var(--chart-1)" },
  variance: { label: "Variance (%)", color: "var(--chart-4)" },
};

function fmtDollar(v: number) {
  return `$${(v / 1000).toFixed(0)}k`;
}

function fmtPct(v: number) {
  return `${v > 0 ? "+" : ""}${v.toFixed(1)}%`;
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ComposedChartsPage() {
  const [hiddenRevGrowth, setHiddenRevGrowth] = useState<
    Record<string, boolean>
  >({});
  const [hiddenDual, setHiddenDual] = useState<Record<string, boolean>>({});
  const [hiddenAreaScatter, setHiddenAreaScatter] = useState<
    Record<string, boolean>
  >({});
  const [hiddenTriple, setHiddenTriple] = useState<Record<string, boolean>>({});
  const [hiddenStackedCost, setHiddenStackedCost] = useState<
    Record<string, boolean>
  >({});
  const [hiddenForecast, setHiddenForecast] = useState<Record<string, boolean>>(
    {},
  );
  const [hiddenRegional, setHiddenRegional] = useState<Record<string, boolean>>(
    {},
  );
  const [hiddenCashFlow, setHiddenCashFlow] = useState<Record<string, boolean>>(
    {},
  );
  const [hiddenBudgetActual, setHiddenBudgetActual] = useState<
    Record<string, boolean>
  >({});

  return (
    <>
      <Link
        href="/showcase/charts"
        className="text-muted-foreground hover:text-foreground mb-8 flex w-fit items-center gap-1.5 text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
      >
        <LuArrowLeft className="size-3 stroke-2" />
        Chart Gallery
      </Link>

      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Charts
        </div>
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          Composed Charts
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Composed charts layer multiple mark types — bars, lines, areas, and
          scatter — on a single canvas. Use them when two related metrics have
          different units or scales.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1 — Bar + Line */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Bar + Line</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly revenue bars overlaid with a growth-rate line. The bar
                  shows absolute performance; the line shows momentum.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="default" className="shrink-0 mt-px">
                Bar + Line
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer
                config={revenueGrowthConfig}
                className="h-72 w-full"
              >
                <ComposedChart
                  data={revenueGrowthData}
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
                    tickFormatter={fmtDollar}
                    width={44}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={fmtPct}
                    width={44}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          revenueGrowthConfig,
                          (v, k) =>
                            k === "revenue" ? fmtDollar(v) : fmtPct(v),
                        )}
                      />
                    }
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    fill="var(--chart-1)"
                    fillOpacity={0.85}
                    radius={[3, 3, 0, 0]}
                    hide={hiddenRevGrowth["revenue"]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="growthRate"
                    stroke="var(--chart-3)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "var(--chart-3)" }}
                    activeDot={{ r: 5 }}
                    hide={hiddenRevGrowth["growthRate"]}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={revenueGrowthConfig}
              hidden={hiddenRevGrowth}
              onToggle={(k) =>
                setHiddenRevGrowth((p) => ({ ...p, [k]: !p[k] }))
              }
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 2 — Dual Y-Axis */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Dual Y-Axis</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Order volume (bars, left axis) against average order value
                  (line, right axis). Two scales that can&apos;t share an axis —
                  each reads correctly without distortion.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="blue" className="shrink-0 mt-px">
                Dual Axis
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={dualAxisConfig} className="h-72 w-full">
                <ComposedChart
                  data={dualAxisData}
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
                      v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                    }
                    width={42}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v: number) => `$${v}`}
                    width={44}
                    domain={[200, 260]}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          dualAxisConfig,
                          (v, k) =>
                            k === "orders" ? v.toLocaleString() : `$${v}`,
                        )}
                      />
                    }
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="orders"
                    fill="var(--chart-1)"
                    fillOpacity={0.85}
                    radius={[3, 3, 0, 0]}
                    hide={hiddenDual["orders"]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgOrderValue"
                    stroke="var(--chart-4)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    hide={hiddenDual["avgOrderValue"]}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={dualAxisConfig}
              hidden={hiddenDual}
              onToggle={(k) => setHiddenDual((p) => ({ ...p, [k]: !p[k] }))}
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 3 — Area + Scatter */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Area + Scatter</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Baseline revenue trend as a filled area with high-impact
                  outlier events plotted as scatter points — surface anomalies
                  without losing the trend.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="orange" className="shrink-0 mt-px">
                Area + Scatter
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer
                config={areaScatterConfig}
                className="h-72 w-full"
              >
                <ComposedChart
                  data={areaScatterData}
                  margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="grad-baseline"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0}
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
                    tickFormatter={fmtDollar}
                    width={42}
                  />
                  <ZAxis range={[60, 60]} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          areaScatterConfig,
                          fmtDollar,
                        )}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="baseline"
                    stroke="var(--chart-1)"
                    fill="url(#grad-baseline)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    hide={hiddenAreaScatter["baseline"]}
                  />
                  <Scatter
                    dataKey="outlier"
                    fill="var(--chart-4)"
                    hide={hiddenAreaScatter["outlier"]}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={areaScatterConfig}
              hidden={hiddenAreaScatter}
              onToggle={(k) =>
                setHiddenAreaScatter((p) => ({ ...p, [k]: !p[k] }))
              }
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 4 — Triple Metric */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Triple Metric</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly transaction volume (bars), conversion rate (line,
                  right axis), and cumulative total (area) on a single canvas —
                  three related metrics without clutter.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="green" className="shrink-0 mt-px">
                3-Series
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={tripleConfig} className="h-72 w-full">
                <ComposedChart
                  data={tripleData}
                  margin={{ top: 4, right: 48, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="grad-cumulative"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--chart-2)"
                        stopOpacity={0.15}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--chart-2)"
                        stopOpacity={0}
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
                    yAxisId="left"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v: number) =>
                      v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                    }
                    width={42}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v: number) => `${v}%`}
                    width={36}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(tripleConfig, (v, k) =>
                          k === "rate"
                            ? `${v}%`
                            : v >= 1000
                              ? `${(v / 1000).toFixed(1)}k`
                              : String(v),
                        )}
                      />
                    }
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="cumulative"
                    stroke="var(--chart-2)"
                    fill="url(#grad-cumulative)"
                    strokeWidth={1.5}
                    dot={false}
                    hide={hiddenTriple["cumulative"]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="volume"
                    fill="var(--chart-1)"
                    fillOpacity={0.85}
                    radius={[3, 3, 0, 0]}
                    hide={hiddenTriple["volume"]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="rate"
                    stroke="var(--chart-3)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    hide={hiddenTriple["rate"]}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={tripleConfig}
              hidden={hiddenTriple}
              onToggle={(k) => setHiddenTriple((p) => ({ ...p, [k]: !p[k] }))}
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 5 — Stacked Bar + Margin Line */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Stacked Cost + Margin
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly operating costs broken into three stacked categories,
                  overlaid with the EBITDA margin line on a right axis — see
                  where spending grows relative to profitability.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="default" className="shrink-0 mt-px">
                Stacked + Line
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer
                config={stackedCostConfig}
                className="h-72 w-full"
              >
                <ComposedChart
                  data={stackedCostData}
                  margin={{ top: 4, right: 48, left: 0, bottom: 0 }}
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
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                    width={46}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v: number) => `${v}%`}
                    width={36}
                    domain={[0, 50]}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          stackedCostConfig,
                          (v, k) =>
                            k === "margin"
                              ? `${v}%`
                              : `$${(v / 1000).toFixed(1)}k`,
                        )}
                      />
                    }
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="infra"
                    stackId="costs"
                    fill="var(--chart-1)"
                    fillOpacity={0.85}
                    radius={[0, 0, 0, 0]}
                    hide={hiddenStackedCost["infra"]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="payroll"
                    stackId="costs"
                    fill="var(--chart-2)"
                    fillOpacity={0.85}
                    radius={[0, 0, 0, 0]}
                    hide={hiddenStackedCost["payroll"]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="marketing"
                    stackId="costs"
                    fill="var(--chart-3)"
                    fillOpacity={0.85}
                    radius={[3, 3, 0, 0]}
                    hide={hiddenStackedCost["marketing"]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="margin"
                    stroke="var(--chart-4)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "var(--chart-4)" }}
                    activeDot={{ r: 5 }}
                    hide={hiddenStackedCost["margin"]}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={stackedCostConfig}
              hidden={hiddenStackedCost}
              onToggle={(k) =>
                setHiddenStackedCost((p) => ({ ...p, [k]: !p[k] }))
              }
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 6 — Forecast Band */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Forecast Band</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Forecast high and low bounds as dashed lines flanking a solid
                  actual-performance area — the gap between bounds narrows as
                  forecasts converge over the period.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="orange" className="shrink-0 mt-px">
                Forecast Band
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={forecastConfig} className="h-72 w-full">
                <ComposedChart
                  data={forecastData}
                  margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="grad-actual-forecast"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0}
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
                    tickFormatter={fmtDollar}
                    width={44}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          forecastConfig,
                          fmtDollar,
                        )}
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="upper"
                    stroke="var(--chart-2)"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                    dot={false}
                    hide={hiddenForecast["upper"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="lower"
                    stroke="var(--chart-3)"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                    dot={false}
                    hide={hiddenForecast["lower"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="var(--chart-1)"
                    fill="url(#grad-actual-forecast)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    connectNulls={false}
                    hide={hiddenForecast["actual"]}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={forecastConfig}
              hidden={hiddenForecast}
              onToggle={(k) => setHiddenForecast((p) => ({ ...p, [k]: !p[k] }))}
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 7 — Grouped Bar + Benchmark */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Regional vs Benchmark
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  North and South region revenue as grouped bars, with an
                  industry benchmark overlay as a dashed line — quickly identify
                  which region leads or lags the standard.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="blue" className="shrink-0 mt-px">
                Grouped + Line
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={regionalConfig} className="h-72 w-full">
                <ComposedChart
                  data={regionalData}
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
                    tickFormatter={fmtDollar}
                    width={44}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          regionalConfig,
                          fmtDollar,
                        )}
                      />
                    }
                  />
                  <Bar
                    dataKey="north"
                    fill="var(--chart-1)"
                    fillOpacity={0.85}
                    radius={[3, 3, 0, 0]}
                    hide={hiddenRegional["north"]}
                  />
                  <Bar
                    dataKey="south"
                    fill="var(--chart-2)"
                    fillOpacity={0.85}
                    radius={[3, 3, 0, 0]}
                    hide={hiddenRegional["south"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    stroke="var(--chart-4)"
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    dot={false}
                    activeDot={{ r: 4 }}
                    hide={hiddenRegional["benchmark"]}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={regionalConfig}
              hidden={hiddenRegional}
              onToggle={(k) => setHiddenRegional((p) => ({ ...p, [k]: !p[k] }))}
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 8 — Cash Flow + Running Balance */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Cash Flow + Running Balance
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly inflows and outflows as grouped bars (left axis) with
                  the cumulative cash balance as a filled area (right axis) —
                  see short-term gaps and long-term health together.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="green" className="shrink-0 mt-px">
                Inflow / Outflow
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={cashFlowConfig} className="h-72 w-full">
                <ComposedChart
                  data={cashFlowData}
                  margin={{ top: 4, right: 52, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="grad-balance"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0.18}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0}
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
                    yAxisId="left"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={fmtDollar}
                    width={44}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={fmtDollar}
                    width={44}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          cashFlowConfig,
                          fmtDollar,
                        )}
                      />
                    }
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="inflows"
                    fill="var(--chart-2)"
                    fillOpacity={0.85}
                    radius={[3, 3, 0, 0]}
                    hide={hiddenCashFlow["inflows"]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="outflows"
                    fill="var(--chart-3)"
                    fillOpacity={0.85}
                    radius={[3, 3, 0, 0]}
                    hide={hiddenCashFlow["outflows"]}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="balance"
                    stroke="var(--chart-1)"
                    fill="url(#grad-balance)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    hide={hiddenCashFlow["balance"]}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={cashFlowConfig}
              hidden={hiddenCashFlow}
              onToggle={(k) => setHiddenCashFlow((p) => ({ ...p, [k]: !p[k] }))}
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 9 — Budget vs Actual + Variance */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Budget vs Actual + Variance
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Side-by-side bars for budgeted and actual revenue, with a
                  variance percentage line on the right axis — months above zero
                  beat the plan; below miss it.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="default" className="shrink-0 mt-px">
                Budget vs Actual
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer
                config={budgetActualConfig}
                className="h-72 w-full"
              >
                <ComposedChart
                  data={budgetActualData}
                  margin={{ top: 4, right: 48, left: 0, bottom: 0 }}
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
                    tickFormatter={fmtDollar}
                    width={44}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={fmtPct}
                    width={44}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          budgetActualConfig,
                          (v, k) =>
                            k === "variance" ? fmtPct(v) : fmtDollar(v),
                        )}
                      />
                    }
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="budget"
                    fill="var(--chart-3)"
                    fillOpacity={0.6}
                    radius={[3, 3, 0, 0]}
                    hide={hiddenBudgetActual["budget"]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="actual"
                    fill="var(--chart-1)"
                    fillOpacity={0.85}
                    radius={[3, 3, 0, 0]}
                    hide={hiddenBudgetActual["actual"]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="variance"
                    stroke="var(--chart-4)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "var(--chart-4)" }}
                    activeDot={{ r: 5 }}
                    hide={hiddenBudgetActual["variance"]}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={budgetActualConfig}
              hidden={hiddenBudgetActual}
              onToggle={(k) =>
                setHiddenBudgetActual((p) => ({ ...p, [k]: !p[k] }))
              }
              className="w-full"
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

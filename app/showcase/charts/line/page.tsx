"use client";

import { useState } from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/ascendra-ui/shadcn";
import {
  Card,
  CardFooter,
  CardHeader,
  CardHeaderSubtitle,
  CardHeaderTitle,
  CardPanel,
  SimpleBadge,
} from "@/ascendra-ui";
import { ChartSeriesLegend } from "@/components/charts/chart-series-legend";
import { makeTooltipFormatter } from "@/components/charts/make-tooltip-formatter";

// ─── Data ─────────────────────────────────────────────────────────────────────

const monthlyData = [
  { month: "Jan", revenue: 18400, expenses: 12200, profit: 6200 },
  { month: "Feb", revenue: 22100, expenses: 13800, profit: 8300 },
  { month: "Mar", revenue: 19800, expenses: 14100, profit: 5700 },
  { month: "Apr", revenue: 26500, expenses: 15200, profit: 11300 },
  { month: "May", revenue: 31200, expenses: 16400, profit: 14800 },
  { month: "Jun", revenue: 28900, expenses: 15800, profit: 13100 },
  { month: "Jul", revenue: 34100, expenses: 17200, profit: 16900 },
  { month: "Aug", revenue: 38600, expenses: 18600, profit: 20000 },
  { month: "Sep", revenue: 35200, expenses: 17900, profit: 17300 },
  { month: "Oct", revenue: 42100, expenses: 19400, profit: 22700 },
  { month: "Nov", revenue: 39800, expenses: 18200, profit: 21600 },
  { month: "Dec", revenue: 46300, expenses: 20100, profit: 26200 },
];

const singleData = monthlyData.map((d) => ({
  month: d.month,
  revenue: d.revenue,
}));

const gradientData = [
  { month: "Jan", visitors: 4200 },
  { month: "Feb", visitors: 5800 },
  { month: "Mar", visitors: 5100 },
  { month: "Apr", visitors: 7300 },
  { month: "May", visitors: 8900 },
  { month: "Jun", visitors: 8100 },
  { month: "Jul", visitors: 10400 },
  { month: "Aug", visitors: 12100 },
  { month: "Sep", visitors: 11300 },
  { month: "Oct", visitors: 13800 },
  { month: "Nov", visitors: 12600 },
  { month: "Dec", visitors: 15200 },
];

// ─── Chart configs ─────────────────────────────────────────────────────────────

const singleConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
};

const multiConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  expenses: { label: "Expenses", color: "var(--chart-2)" },
  profit: { label: "Profit", color: "var(--chart-3)" },
};

const gradientConfig: ChartConfig = {
  visitors: { label: "Visitors", color: "var(--chart-1)" },
};

const stepData = [
  { week: "W1", tickets: 142 },
  { week: "W2", tickets: 118 },
  { week: "W3", tickets: 165 },
  { week: "W4", tickets: 131 },
  { week: "W5", tickets: 189 },
  { week: "W6", tickets: 204 },
  { week: "W7", tickets: 177 },
  { week: "W8", tickets: 221 },
  { week: "W9", tickets: 196 },
  { week: "W10", tickets: 238 },
  { week: "W11", tickets: 214 },
  { week: "W12", tickets: 251 },
];

const refData = [
  { month: "Jan", conversion: 2.1 },
  { month: "Feb", conversion: 2.8 },
  { month: "Mar", conversion: 2.4 },
  { month: "Apr", conversion: 3.2 },
  { month: "May", conversion: 3.9 },
  { month: "Jun", conversion: 3.5 },
  { month: "Jul", conversion: 4.1 },
  { month: "Aug", conversion: 4.8 },
  { month: "Sep", conversion: 4.3 },
  { month: "Oct", conversion: 5.2 },
  { month: "Nov", conversion: 4.9 },
  { month: "Dec", conversion: 5.7 },
];

const stepConfig: ChartConfig = {
  tickets: { label: "Tickets", color: "var(--chart-2)" },
};

const refConfig: ChartConfig = {
  conversion: { label: "Conversion %", color: "var(--chart-1)" },
};

function fmtDollar(v: number) {
  return `$${(v / 1000).toFixed(0)}k`;
}

function fmtNum(v: number) {
  return v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v);
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function LineChartsPage() {
  const [hidden, setHidden] = useState<Record<string, boolean>>({});

  function toggle(key: string) {
    setHidden((prev) => ({ ...prev, [key]: !prev[key] }));
  }

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
          Line Charts
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Line charts are ideal for continuous data over time — trends,
          comparisons, and cumulative growth. Click legend labels to toggle
          individual series.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1 — Single Line */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Single Line</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly revenue over a 12-month period. Clean baseline with
                  grid and tooltip.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="secondary" className="shrink-0 mt-px">
                Basic
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={singleConfig} className="h-65 w-full">
                <LineChart
                  data={singleData}
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
                    width={42}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          singleConfig,
                          fmtDollar,
                        )}
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>

        {/* 2 — Multi-Line with toggle */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Multi-Line</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Revenue, expenses, and profit compared across 12 months. Click
                  legend labels to toggle series visibility.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="default" className="shrink-0 mt-px">
                Interactive
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={multiConfig} className="h-65 w-full">
                <LineChart
                  data={monthlyData}
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
                    width={42}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(multiConfig, fmtDollar)}
                      />
                    }
                  />
                  {(["revenue", "expenses", "profit"] as const).map((key) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={`var(--color-${key})`}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                      hide={hidden[key]}
                    />
                  ))}
                </LineChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={multiConfig}
              hidden={hidden}
              onToggle={toggle}
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 3 — Gradient Area-Line */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Gradient Fill</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Line with a subtle gradient fill underneath — conveys volume
                  and momentum at a glance.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="blue" className="shrink-0 mt-px">
                Style
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={gradientConfig} className="h-65 w-full">
                <AreaChart
                  data={gradientData}
                  margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="gradVisitors"
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
                    tickFormatter={fmtNum}
                    width={42}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(gradientConfig, fmtNum)}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    fill="url(#gradVisitors)"
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>
        {/* 4 — Step Line */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Step Line</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Weekly support tickets rendered as a step function — each
                  value holds until the next data point, ideal for discrete
                  state changes or inventory counts.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="secondary" className="shrink-0 mt-px">
                Step
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={stepConfig} className="h-65 w-full">
                <LineChart
                  data={stepData}
                  margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="var(--border)"
                    strokeOpacity={0.6}
                    strokeWidth={0.5}
                  />
                  <XAxis
                    dataKey="week"
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
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(stepConfig, (v) =>
                          String(v),
                        )}
                      />
                    }
                  />
                  <Line
                    type="stepAfter"
                    dataKey="tickets"
                    stroke="var(--chart-2)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>

        {/* 5 — Line + Reference Band */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Line + Reference Band</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly conversion rate with a target line and a shaded
                  &quot;good&quot; zone — makes it immediately clear when
                  performance is above or below goal.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="orange" className="shrink-0 mt-px">
                Reference
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={refConfig} className="h-65 w-full">
                <LineChart
                  data={refData}
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
                    tickFormatter={(v) => `${v}%`}
                    width={36}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          refConfig,
                          (v) => `${v}%`,
                        )}
                      />
                    }
                  />
                  <ReferenceArea
                    y1={3.5}
                    y2={6}
                    fill="var(--chart-3)"
                    fillOpacity={0.08}
                  />
                  <ReferenceLine
                    y={3.5}
                    stroke="var(--chart-3)"
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                    label={{
                      value: "Target 3.5%",
                      position: "insideTopRight",
                      fontSize: 10,
                      fill: "var(--muted-foreground)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="conversion"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>
      </div>
    </>
  );
}

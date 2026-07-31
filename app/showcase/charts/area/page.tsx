"use client";

import { useState } from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
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

const stackedData = [
  { month: "Jan", mobile: 18400, desktop: 32100, tablet: 8200 },
  { month: "Feb", mobile: 22100, desktop: 35800, tablet: 9100 },
  { month: "Mar", mobile: 19800, desktop: 31200, tablet: 8700 },
  { month: "Apr", mobile: 26500, desktop: 38900, tablet: 10200 },
  { month: "May", mobile: 31200, desktop: 43100, tablet: 11400 },
  { month: "Jun", mobile: 28900, desktop: 40600, tablet: 10800 },
  { month: "Jul", mobile: 34100, desktop: 47300, tablet: 12100 },
  { month: "Aug", mobile: 38600, desktop: 52100, tablet: 13800 },
  { month: "Sep", mobile: 35200, desktop: 48700, tablet: 12600 },
  { month: "Oct", mobile: 42100, desktop: 56400, tablet: 14900 },
  { month: "Nov", mobile: 39800, desktop: 53200, tablet: 13700 },
  { month: "Dec", mobile: 46300, desktop: 61800, tablet: 16200 },
];

const percentData = stackedData.map((d) => {
  const total = d.mobile + d.desktop + d.tablet;
  return {
    month: d.month,
    mobile: +((d.mobile / total) * 100).toFixed(1),
    desktop: +((d.desktop / total) * 100).toFixed(1),
    tablet: +((d.tablet / total) * 100).toFixed(1),
  };
});

const targetData = [
  { month: "Jan", actual: 18400, target: 22000 },
  { month: "Feb", actual: 22100, target: 22000 },
  { month: "Mar", actual: 19800, target: 22000 },
  { month: "Apr", actual: 26500, target: 25000 },
  { month: "May", actual: 31200, target: 25000 },
  { month: "Jun", actual: 28900, target: 28000 },
  { month: "Jul", actual: 34100, target: 30000 },
  { month: "Aug", actual: 38600, target: 33000 },
  { month: "Sep", actual: 35200, target: 36000 },
  { month: "Oct", actual: 42100, target: 38000 },
  { month: "Nov", actual: 39800, target: 40000 },
  { month: "Dec", actual: 46300, target: 42000 },
];

// ─── Chart configs ─────────────────────────────────────────────────────────────

const deviceConfig: ChartConfig = {
  mobile: { label: "Mobile", color: "var(--chart-1)" },
  desktop: { label: "Desktop", color: "var(--chart-2)" },
  tablet: { label: "Tablet", color: "var(--chart-6)" },
};

const targetConfig: ChartConfig = {
  actual: { label: "Actual", color: "var(--chart-1)" },
  target: { label: "Target", color: "var(--chart-4)" },
};

const DEVICE_KEYS = ["mobile", "desktop", "tablet"] as const;
const DEVICE_CHART_NUMS = [1, 2, 6] as const;

const singleAreaData = [
  { month: "Jan", revenue: 18400 },
  { month: "Feb", revenue: 22100 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 26500 },
  { month: "May", revenue: 31200 },
  { month: "Jun", revenue: 28900 },
  { month: "Jul", revenue: 34100 },
  { month: "Aug", revenue: 38600 },
  { month: "Sep", revenue: 35200 },
  { month: "Oct", revenue: 42100 },
  { month: "Nov", revenue: 39800 },
  { month: "Dec", revenue: 46300 },
];

const divergingData = [
  { month: "Jan", delta: -3200 },
  { month: "Feb", delta: 1800 },
  { month: "Mar", delta: -900 },
  { month: "Apr", delta: 4100 },
  { month: "May", delta: 6800 },
  { month: "Jun", delta: 3200 },
  { month: "Jul", delta: 7500 },
  { month: "Aug", delta: 11200 },
  { month: "Sep", delta: -1800 },
  { month: "Oct", delta: 9400 },
  { month: "Nov", delta: 5700 },
  { month: "Dec", delta: 13100 },
];

const singleAreaConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
};

const divergingConfig: ChartConfig = {
  delta: { label: "vs. Target", color: "var(--chart-1)" },
};

function fmtDollar(v: number) {
  return `$${(v / 1000).toFixed(0)}k`;
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AreaChartsPage() {
  const [hiddenStacked, setHiddenStacked] = useState<Record<string, boolean>>(
    {},
  );
  const [hiddenPercent, setHiddenPercent] = useState<Record<string, boolean>>(
    {},
  );
  const [hiddenTarget, setHiddenTarget] = useState<Record<string, boolean>>({});

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
          Area Charts
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Area charts emphasise volume and composition over time. Stacking shows
          absolute contributions; percent-stacking reveals proportion shifts.
          Click legend labels to toggle series.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1 — Stacked Area */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Stacked Area</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Session counts by device type — absolute values stacked to
                  show both individual contribution and total volume.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="default" className="shrink-0 mt-px">
                Stacked
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={deviceConfig} className="h-72 w-full">
                <AreaChart
                  data={stackedData}
                  margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                >
                  <defs>
                    {DEVICE_KEYS.map((key, i) => (
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
                          stopColor={`var(--chart-${DEVICE_CHART_NUMS[i]})`}
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor={`var(--chart-${DEVICE_CHART_NUMS[i]})`}
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    ))}
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
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          deviceConfig,
                          fmtDollar,
                        )}
                      />
                    }
                  />
                  {DEVICE_KEYS.map((key, i) => (
                    <Area
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stackId="1"
                      stroke={`var(--chart-${DEVICE_CHART_NUMS[i]})`}
                      fill={`url(#grad-${key})`}
                      strokeWidth={1.5}
                      hide={hiddenStacked[key]}
                    />
                  ))}
                </AreaChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={deviceConfig}
              hidden={hiddenStacked}
              onToggle={(k) => setHiddenStacked((p) => ({ ...p, [k]: !p[k] }))}
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 2 — Percent-Stacked */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Percent-Stacked Area
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  The same data normalised to 100% — reveals how device-type
                  share shifts month by month, independent of volume.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="blue" className="shrink-0 mt-px">
                100%
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={deviceConfig} className="h-72 w-full">
                <AreaChart
                  data={percentData}
                  margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                >
                  <defs>
                    {DEVICE_KEYS.map((key, i) => (
                      <linearGradient
                        key={key}
                        id={`pgrad-${key}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={`var(--chart-${DEVICE_CHART_NUMS[i]})`}
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor={`var(--chart-${DEVICE_CHART_NUMS[i]})`}
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    ))}
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
                    tickFormatter={(v) => `${v}%`}
                    width={38}
                    domain={[0, 100]}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          deviceConfig,
                          (v) => `${v.toFixed(1)}%`,
                        )}
                      />
                    }
                  />
                  {DEVICE_KEYS.map((key, i) => (
                    <Area
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stackId="1"
                      stroke={`var(--chart-${DEVICE_CHART_NUMS[i]})`}
                      fill={`url(#pgrad-${key})`}
                      strokeWidth={1.5}
                      hide={hiddenPercent[key]}
                    />
                  ))}
                </AreaChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={deviceConfig}
              hidden={hiddenPercent}
              onToggle={(k) => setHiddenPercent((p) => ({ ...p, [k]: !p[k] }))}
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 3 — Area with Reference Line */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Area with Target Line
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly revenue against a rolling target. The dashed reference
                  line makes it immediately clear when performance is above or
                  below goal.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="orange" className="shrink-0 mt-px">
                Target
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={targetConfig} className="h-72 w-full">
                <AreaChart
                  data={targetData}
                  margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="grad-actual"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0.25}
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
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          targetConfig,
                          fmtDollar,
                        )}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="var(--chart-1)"
                    fill="url(#grad-actual)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    hide={hiddenTarget["actual"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="var(--chart-4)"
                    fill="none"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                    dot={false}
                    hide={hiddenTarget["target"]}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={targetConfig}
              hidden={hiddenTarget}
              onToggle={(k) => setHiddenTarget((p) => ({ ...p, [k]: !p[k] }))}
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 4 — Single Area */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Single Area</CardHeaderTitle>
                <CardHeaderSubtitle>
                  A single revenue series with gradient fill — the simplest area
                  chart, useful as a hero metric widget or sparkline
                  replacement.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="secondary" className="shrink-0 mt-px">
                Basic
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={singleAreaConfig} className="h-72 w-full">
                <AreaChart
                  data={singleAreaData}
                  margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="grad-single"
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
                        stopOpacity={0.02}
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
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          singleAreaConfig,
                          fmtDollar,
                        )}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--chart-1)"
                    fill="url(#grad-single)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>

        {/* 5 — Diverging Area */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Diverging Area</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly performance delta vs target — positive months fill
                  green above the baseline, negative months fill red below it.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="green" className="shrink-0 mt-px">
                Diverging
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={divergingConfig} className="h-72 w-full">
                <AreaChart
                  data={divergingData}
                  margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="grad-pos" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--chart-3)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--chart-3)"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                    <linearGradient id="grad-neg" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--chart-5)"
                        stopOpacity={0.02}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--chart-5)"
                        stopOpacity={0.35}
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
                    tickFormatter={(v) => `${v > 0 ? "+" : ""}${fmtDollar(v)}`}
                    width={52}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          divergingConfig,
                          (v) => `${v > 0 ? "+" : ""}${fmtDollar(v)}`,
                        )}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="delta"
                    stroke="var(--chart-3)"
                    fill="url(#grad-pos)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    baseValue={0}
                  />
                  <Area
                    type="monotone"
                    dataKey="delta"
                    stroke="var(--chart-5)"
                    fill="url(#grad-neg)"
                    strokeWidth={0}
                    dot={false}
                    baseValue={0}
                    fillOpacity={1}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>
      </div>
    </>
  );
}

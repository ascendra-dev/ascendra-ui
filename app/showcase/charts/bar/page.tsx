"use client";

import { useState } from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Cell,
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

const quarterlyData = [
  { quarter: "Q1", online: 42100, retail: 28600, wholesale: 18300 },
  { quarter: "Q2", online: 55800, retail: 31200, wholesale: 21700 },
  { quarter: "Q3", online: 61400, retail: 34800, wholesale: 24100 },
  { quarter: "Q4", online: 78200, retail: 41600, wholesale: 29400 },
];

const stackedData = [
  { month: "Jan", new: 340, returning: 820, churned: 120 },
  { month: "Feb", new: 410, returning: 890, churned: 95 },
  { month: "Mar", new: 380, returning: 860, churned: 140 },
  { month: "Apr", new: 520, returning: 940, churned: 80 },
  { month: "May", new: 610, returning: 1020, churned: 70 },
  { month: "Jun", new: 580, returning: 1100, churned: 90 },
];

const horizontalData = [
  { channel: "Organic Search", visits: 128400 },
  { channel: "Direct", visits: 94200 },
  { channel: "Social Media", visits: 73600 },
  { channel: "Email", visits: 58100 },
  { channel: "Referral", visits: 41300 },
  { channel: "Paid Ads", visits: 36900 },
];

const labelData = [
  { category: "Electronics", revenue: 82400 },
  { category: "Apparel", revenue: 61200 },
  { category: "Home", revenue: 54800 },
  { category: "Sports", revenue: 43100 },
  { category: "Books", revenue: 28600 },
];

// ─── Chart configs ─────────────────────────────────────────────────────────────

const groupedConfig: ChartConfig = {
  online: { label: "Online", color: "var(--chart-1)" },
  retail: { label: "Retail", color: "var(--chart-2)" },
  wholesale: { label: "Wholesale", color: "var(--chart-6)" },
};

const stackedConfig: ChartConfig = {
  new: { label: "New", color: "var(--chart-3)" },
  returning: { label: "Returning", color: "var(--chart-1)" },
  churned: { label: "Churned", color: "var(--chart-5)" },
};

const horizontalConfig: ChartConfig = {
  visits: { label: "Visits", color: "var(--chart-1)" },
};

const labelConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
};

const waterfallRaw = [
  { label: "Starting", value: 48000 },
  { label: "New Sales", value: 21000 },
  { label: "Upsell", value: 8400 },
  { label: "Churn", value: -6200 },
  { label: "Refunds", value: -3100 },
  { label: "Discounts", value: -4800 },
  { label: "Net Total", value: null },
];

const waterfallData = (() => {
  let running = 0;
  return waterfallRaw.map((d) => {
    if (d.value === null) {
      return {
        label: d.label,
        base: 0,
        bar: running,
        isTotal: true,
        total: running,
      };
    }
    const base = d.value < 0 ? running + d.value : running;
    const bar = Math.abs(d.value);
    running += d.value;
    return {
      label: d.label,
      base,
      bar,
      isTotal: false,
      total: running,
      raw: d.value,
    };
  });
})();

const divergingBarData = [
  { segment: "Promoters", score: 42 },
  { segment: "Satisfied", score: 28 },
  { segment: "Neutral", score: 8 },
  { segment: "Dissatisfied", score: -14 },
  { segment: "Detractors", score: -31 },
];

const waterfallConfig: ChartConfig = {
  bar: { label: "Amount", color: "var(--chart-1)" },
};

const divergingBarConfig: ChartConfig = {
  score: { label: "NPS Score", color: "var(--chart-1)" },
};

function fmtDollar(v: number) {
  return `$${(v / 1000).toFixed(0)}k`;
}

function fmtNum(v: number) {
  return v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v);
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function BarChartsPage() {
  const [hiddenGrouped, setHiddenGrouped] = useState<Record<string, boolean>>(
    {},
  );
  const [hiddenStacked, setHiddenStacked] = useState<Record<string, boolean>>(
    {},
  );

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
          Bar Charts
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Bar charts excel at categorical comparisons. Grouped bars highlight
          differences; stacked bars show composition; horizontal layout handles
          long labels gracefully.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1 — Grouped Vertical */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Grouped Vertical
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Sales by channel across four quarters — side-by-side bars make
                  within-period comparisons instant.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="default" className="shrink-0 mt-px">
                Grouped
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={groupedConfig} className="h-72 w-full">
                <BarChart
                  data={quarterlyData}
                  barGap={4}
                  margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="var(--border)"
                    strokeOpacity={0.6}
                    strokeWidth={0.5}
                  />
                  <XAxis
                    dataKey="quarter"
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
                          groupedConfig,
                          fmtDollar,
                        )}
                      />
                    }
                  />
                  <Bar
                    dataKey="online"
                    fill="var(--chart-1)"
                    radius={[3, 3, 0, 0]}
                    hide={hiddenGrouped["online"]}
                  />
                  <Bar
                    dataKey="retail"
                    fill="var(--chart-2)"
                    radius={[3, 3, 0, 0]}
                    hide={hiddenGrouped["retail"]}
                  />
                  <Bar
                    dataKey="wholesale"
                    fill="var(--chart-6)"
                    radius={[3, 3, 0, 0]}
                    hide={hiddenGrouped["wholesale"]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={groupedConfig}
              hidden={hiddenGrouped}
              onToggle={(k) => setHiddenGrouped((p) => ({ ...p, [k]: !p[k] }))}
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 2 — Stacked Vertical */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Stacked Vertical
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Monthly customer segments stacked — see total volume and how
                  new, returning, and churned customers shift over time.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="blue" className="shrink-0 mt-px">
                Stacked
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={stackedConfig} className="h-72 w-full">
                <BarChart
                  data={stackedData}
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
                    tickFormatter={fmtNum}
                    width={42}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(stackedConfig, fmtNum)}
                      />
                    }
                  />
                  <Bar
                    dataKey="new"
                    stackId="a"
                    fill="var(--chart-3)"
                    hide={hiddenStacked["new"]}
                  />
                  <Bar
                    dataKey="returning"
                    stackId="a"
                    fill="var(--chart-1)"
                    hide={hiddenStacked["returning"]}
                  />
                  <Bar
                    dataKey="churned"
                    stackId="a"
                    fill="var(--chart-5)"
                    radius={[3, 3, 0, 0]}
                    hide={hiddenStacked["churned"]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <ChartSeriesLegend
              config={stackedConfig}
              hidden={hiddenStacked}
              onToggle={(k) => setHiddenStacked((p) => ({ ...p, [k]: !p[k] }))}
              className="w-full"
            />
          </CardFooter>
        </Card>

        {/* 3 — Horizontal Single */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Horizontal Bar</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Traffic sources ranked by visit volume. Horizontal layout
                  gives room for long channel labels and makes ranking
                  immediately readable.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="secondary" className="shrink-0 mt-px">
                Ranked
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={horizontalConfig} className="h-64 w-full">
                <BarChart
                  layout="vertical"
                  data={horizontalData}
                  margin={{ top: 4, right: 40, left: 0, bottom: 0 }}
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
                    tickFormatter={fmtNum}
                  />
                  <YAxis
                    type="category"
                    dataKey="channel"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    width={100}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={makeTooltipFormatter(
                          horizontalConfig,
                          fmtNum,
                        )}
                      />
                    }
                  />
                  <Bar dataKey="visits" radius={[0, 3, 3, 0]}>
                    {horizontalData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill="var(--chart-1)"
                        fillOpacity={1 - index * 0.1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>

        {/* 4 — Bar with Value Labels */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Bar with Value Labels
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Revenue per product category with values displayed directly on
                  bars — no need to read the axis for exact figures.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="green" className="shrink-0 mt-px">
                Labels
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={labelConfig} className="h-60 w-full">
                <BarChart
                  data={labelData}
                  margin={{ top: 20, right: 12, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="var(--border)"
                    strokeOpacity={0.6}
                    strokeWidth={0.5}
                  />
                  <XAxis
                    dataKey="category"
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
                        formatter={makeTooltipFormatter(labelConfig, fmtDollar)}
                      />
                    }
                  />
                  <Bar
                    dataKey="revenue"
                    fill="var(--chart-1)"
                    radius={[3, 3, 0, 0]}
                  >
                    <LabelList
                      dataKey="revenue"
                      position="top"
                      formatter={(v) => fmtDollar(Number(v ?? 0))}
                      style={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>

        {/* 5 — Waterfall */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Waterfall</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Revenue bridge from opening balance through gains and losses
                  to net total — floating bars show each contributor in context.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="blue" className="shrink-0 mt-px">
                Waterfall
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={waterfallConfig} className="h-72 w-full">
                <BarChart
                  data={waterfallData}
                  margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="var(--border)"
                    strokeOpacity={0.6}
                    strokeWidth={0.5}
                  />
                  <XAxis
                    dataKey="label"
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
                    content={({ payload }) => {
                      if (!payload?.length) return null;
                      const d = payload[0].payload as {
                        label: string;
                        raw?: number;
                        total: number;
                        isTotal: boolean;
                      };
                      return (
                        <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-md">
                          <div className="font-medium text-foreground mb-1">
                            {d.label}
                          </div>
                          {!d.isTotal && d.raw !== undefined && (
                            <div className="text-muted-foreground">
                              Change:{" "}
                              <span className="text-foreground">
                                {d.raw > 0 ? "+" : ""}
                                {fmtDollar(d.raw)}
                              </span>
                            </div>
                          )}
                          <div className="text-muted-foreground">
                            Running total:{" "}
                            <span className="text-foreground">
                              {fmtDollar(d.total)}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="base"
                    stackId="w"
                    fill="transparent"
                    radius={0}
                  />
                  <Bar dataKey="bar" stackId="w" radius={[3, 3, 0, 0]}>
                    {waterfallData.map((d, i) => (
                      <Cell
                        key={i}
                        fill={
                          d.isTotal
                            ? "var(--chart-2)"
                            : (d as { raw?: number }).raw !== undefined &&
                                (d as { raw: number }).raw < 0
                              ? "var(--chart-5)"
                              : "var(--chart-3)"
                        }
                        fillOpacity={0.85}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <div className="flex justify-center gap-5 w-full text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-sm shrink-0"
                  style={{ background: "var(--chart-3)" }}
                />
                Increase
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-sm shrink-0"
                  style={{ background: "var(--chart-5)" }}
                />
                Decrease
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-sm shrink-0"
                  style={{ background: "var(--chart-2)" }}
                />
                Total
              </span>
            </div>
          </CardFooter>
        </Card>

        {/* 6 — Diverging Bars */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Diverging Bars</CardHeaderTitle>
                <CardHeaderSubtitle>
                  NPS segment scores on a centred axis — positive bars extend
                  right for promoters, negative bars extend left for detractors.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="orange" className="shrink-0 mt-px">
                ±Values
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer
                config={divergingBarConfig}
                className="h-64 w-full"
              >
                <BarChart
                  layout="vertical"
                  data={divergingBarData}
                  margin={{ top: 4, right: 40, left: 0, bottom: 0 }}
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
                    tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}`}
                  />
                  <YAxis
                    type="category"
                    dataKey="segment"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    width={96}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(v) => `${Number(v) > 0 ? "+" : ""}${v}`}
                      />
                    }
                  />
                  <Bar dataKey="score" radius={[0, 3, 3, 0]}>
                    {divergingBarData.map((d, i) => (
                      <Cell
                        key={i}
                        fill={
                          d.score >= 0 ? "var(--chart-3)" : "var(--chart-5)"
                        }
                        fillOpacity={0.85}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>
      </div>
    </>
  );
}

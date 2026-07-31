"use client";

import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/ascendra-ui/shadcn";
import { Card, CardFooter, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, SimpleBadge } from "@/ascendra-ui";

// ─── Data ─────────────────────────────────────────────────────────────────────

const correlationData = [
  { x: 12, y: 18400 },
  { x: 18, y: 24600 },
  { x: 9, y: 14200 },
  { x: 24, y: 31800 },
  { x: 15, y: 21300 },
  { x: 30, y: 38500 },
  { x: 7, y: 11900 },
  { x: 21, y: 29100 },
  { x: 27, y: 35200 },
  { x: 11, y: 16800 },
  { x: 33, y: 42700 },
  { x: 19, y: 26400 },
  { x: 6, y: 9800 },
  { x: 28, y: 36100 },
  { x: 14, y: 19700 },
  { x: 22, y: 30500 },
];

const bubbleData = [
  { x: 28, y: 72, z: 1840, label: "Campaign A" },
  { x: 41, y: 58, z: 3120, label: "Campaign B" },
  { x: 15, y: 88, z: 620, label: "Campaign C" },
  { x: 55, y: 43, z: 4680, label: "Campaign D" },
  { x: 33, y: 65, z: 2240, label: "Campaign E" },
  { x: 62, y: 31, z: 5900, label: "Campaign F" },
  { x: 20, y: 79, z: 980, label: "Campaign G" },
  { x: 48, y: 52, z: 3760, label: "Campaign H" },
];

const series1 = [
  { x: 8, y: 22100 },
  { x: 14, y: 31400 },
  { x: 20, y: 39800 },
  { x: 26, y: 48200 },
  { x: 11, y: 27600 },
  { x: 17, y: 35100 },
  { x: 23, y: 44300 },
  { x: 29, y: 53700 },
];

const series2 = [
  { x: 10, y: 14800 },
  { x: 16, y: 19200 },
  { x: 22, y: 24100 },
  { x: 28, y: 29600 },
  { x: 13, y: 17400 },
  { x: 19, y: 21800 },
  { x: 25, y: 26900 },
  { x: 31, y: 33200 },
];

const series3 = [
  { x: 9, y: 38200 },
  { x: 15, y: 51600 },
  { x: 21, y: 62100 },
  { x: 27, y: 74800 },
  { x: 12, y: 44700 },
  { x: 18, y: 57300 },
  { x: 24, y: 68900 },
  { x: 30, y: 82100 },
];

// ─── Chart configs ─────────────────────────────────────────────────────────────

const correlationConfig: ChartConfig = {
  scatter: { label: "Data point", color: "var(--chart-1)" },
};

const bubbleConfig: ChartConfig = {
  bubble: { label: "Campaign", color: "var(--chart-2)" },
};

const multiConfig: ChartConfig = {
  premium: { label: "Premium", color: "var(--chart-1)" },
  standard: { label: "Standard", color: "var(--chart-2)" },
  enterprise: { label: "Enterprise", color: "var(--chart-3)" },
};

function fmtDollar(v: number) {
  return `$${(v / 1000).toFixed(0)}k`;
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ScatterChartsPage() {
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
          Scatter & Bubble Charts
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Scatter charts reveal correlations between two continuous variables.
          Bubble charts add a third dimension via dot size — useful for
          surfacing trade-offs across multiple attributes simultaneously.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1 — Scatter Plot */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Scatter Plot</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Ad spend (hours) vs revenue generated. Each dot is one
                  campaign — the upward trend shows a clear positive
                  correlation.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="default" className="shrink-0 mt-px">
                Correlation
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer
                config={correlationConfig}
                className="h-72 w-full"
              >
                <ScatterChart
                  margin={{ top: 4, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Hours"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    label={{
                      value: "Ad spend (hrs)",
                      position: "insideBottom",
                      offset: -2,
                      fontSize: 10,
                      fill: "var(--muted-foreground)",
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Revenue"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={fmtDollar}
                    width={42}
                  />
                  <ChartTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ payload }) => {
                      if (!payload?.length) return null;
                      const d = payload[0].payload as { x: number; y: number };
                      return (
                        <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-md">
                          <div className="text-muted-foreground">
                            Ad spend:{" "}
                            <span className="text-foreground font-medium">
                              {d.x} hrs
                            </span>
                          </div>
                          <div className="text-muted-foreground">
                            Revenue:{" "}
                            <span className="text-foreground font-medium">
                              {fmtDollar(d.y)}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Scatter
                    data={correlationData}
                    fill="var(--chart-1)"
                    fillOpacity={0.75}
                  />
                </ScatterChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>

        {/* 2 — Bubble Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Bubble Chart</CardHeaderTitle>
                <CardHeaderSubtitle>
                  CTR vs conversion rate for 8 campaigns — bubble size encodes
                  total spend. Larger bubbles top-right are the highest-ROI
                  opportunities.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="blue" className="shrink-0 mt-px">
                Bubble
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={bubbleConfig} className="h-72 w-full">
                <ScatterChart
                  margin={{ top: 4, right: 20, left: 0, bottom: 16 }}
                >
                  <CartesianGrid stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="CTR"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`}
                    label={{
                      value: "Click-through rate (%)",
                      position: "insideBottom",
                      offset: -6,
                      fontSize: 10,
                      fill: "var(--muted-foreground)",
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Conv."
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`}
                    width={38}
                  />
                  <ZAxis type="number" dataKey="z" range={[40, 400]} />
                  <ChartTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ payload }) => {
                      if (!payload?.length) return null;
                      const d = payload[0].payload as {
                        x: number;
                        y: number;
                        z: number;
                        label: string;
                      };
                      return (
                        <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-md">
                          <div className="font-medium text-foreground mb-1">
                            {d.label}
                          </div>
                          <div className="text-muted-foreground">
                            CTR: <span className="text-foreground">{d.x}%</span>
                          </div>
                          <div className="text-muted-foreground">
                            Conversion:{" "}
                            <span className="text-foreground">{d.y}%</span>
                          </div>
                          <div className="text-muted-foreground">
                            Spend:{" "}
                            <span className="text-foreground">
                              ${d.z.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Scatter
                    data={bubbleData}
                    fill="var(--chart-2)"
                    fillOpacity={0.65}
                  />
                </ScatterChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>

        {/* 3 — Multi-Series Scatter */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Multi-Series Scatter
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Three customer segments plotted on the same axes — tenure
                  (months) vs lifetime value. Colour separation makes cluster
                  boundaries immediately visible.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="green" className="shrink-0 mt-px">
                Multi
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={multiConfig} className="h-72 w-full">
                <ScatterChart
                  margin={{ top: 4, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Tenure"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `${v}mo`}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="LTV"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={fmtDollar}
                    width={42}
                  />
                  <ZAxis range={[40, 40]} />
                  <ChartTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ payload }) => {
                      if (!payload?.length) return null;
                      const d = payload[0].payload as { x: number; y: number };
                      return (
                        <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-md">
                          <div className="text-muted-foreground">
                            Tenure:{" "}
                            <span className="text-foreground font-medium">
                              {d.x} mo
                            </span>
                          </div>
                          <div className="text-muted-foreground">
                            LTV:{" "}
                            <span className="text-foreground font-medium">
                              {fmtDollar(d.y)}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Scatter
                    name="premium"
                    data={series1}
                    fill="var(--chart-1)"
                    fillOpacity={0.8}
                  />
                  <Scatter
                    name="standard"
                    data={series2}
                    fill="var(--chart-2)"
                    fillOpacity={0.8}
                  />
                  <Scatter
                    name="enterprise"
                    data={series3}
                    fill="var(--chart-3)"
                    fillOpacity={0.8}
                  />
                </ScatterChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <div className="flex justify-center gap-6 w-full">
              {(["premium", "standard", "enterprise"] as const).map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ background: multiConfig[key].color }}
                  />
                  {multiConfig[key].label}
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

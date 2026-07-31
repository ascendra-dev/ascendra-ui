"use client";

import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/ascendra-ui/shadcn";
import { Card, CardFooter, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, SimpleBadge } from "@/ascendra-ui";

// ─── Data ─────────────────────────────────────────────────────────────────────

const basicBins = [
  { bin: "0–10", count: 12 },
  { bin: "10–20", count: 28 },
  { bin: "20–30", count: 47 },
  { bin: "30–40", count: 63 },
  { bin: "40–50", count: 55 },
  { bin: "50–60", count: 38 },
  { bin: "60–70", count: 24 },
  { bin: "70–80", count: 15 },
  { bin: "80–90", count: 8 },
  { bin: "90–100", count: 3 },
];

const total = basicBins.reduce((s, b) => s + b.count, 0);
const densityBins = basicBins.map((b) => ({
  ...b,
  pct: parseFloat(((b.count / total) * 100).toFixed(1)),
}));

const overlayBins = [
  { bin: "0–10", a: 8, b: 3 },
  { bin: "10–20", a: 18, b: 12 },
  { bin: "20–30", a: 32, b: 28 },
  { bin: "30–40", a: 48, b: 41 },
  { bin: "40–50", a: 41, b: 55 },
  { bin: "50–60", a: 27, b: 47 },
  { bin: "60–70", a: 16, b: 36 },
  { bin: "70–80", a: 9, b: 22 },
  { bin: "80–90", a: 4, b: 11 },
  { bin: "90–100", a: 1, b: 5 },
];

// ─── Chart configs ─────────────────────────────────────────────────────────────

const basicConfig: ChartConfig = {
  count: { label: "Count", color: "var(--chart-1)" },
};

const densityConfig: ChartConfig = {
  pct: { label: "Frequency %", color: "var(--chart-2)" },
};

const overlayConfig: ChartConfig = {
  a: { label: "Group A", color: "var(--chart-1)" },
  b: { label: "Group B", color: "var(--chart-3)" },
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HistogramChartsPage() {
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
          Histogram
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Frequency distributions across equal-width bins — built with a
          standard BarChart and pre-binned data. Density and overlay variants
          reveal shape, skew, and how two populations compare.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1 — Basic Histogram */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Basic Histogram</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Response time distribution across equal 10ms bins. The peak at
                  30–50ms indicates the most common latency range.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="default" className="shrink-0 mt-px">
                Basic
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={basicConfig} className="h-72 w-full">
                <BarChart
                  data={basicBins}
                  barCategoryGap="2%"
                  margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="var(--border)"
                    strokeOpacity={0.6}
                    strokeWidth={0.5}
                    vertical={false}
                  />
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
                    width={36}
                  />
                  <ChartTooltip
                    content={({ payload, label }) => {
                      if (!payload?.length) return null;
                      return (
                        <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-md">
                          <div className="text-muted-foreground mb-1">
                            {label}ms
                          </div>
                          <div className="text-muted-foreground">
                            Count:{" "}
                            <span className="text-foreground font-medium">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="var(--chart-1)"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>

        {/* 2 — Density Histogram */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Density Histogram
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Same distribution normalised to percentage of total — useful
                  when comparing two datasets of different sizes on the same
                  scale.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="blue" className="shrink-0 mt-px">
                Density
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={densityConfig} className="h-72 w-full">
                <BarChart
                  data={densityBins}
                  barCategoryGap="2%"
                  margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="var(--border)"
                    strokeOpacity={0.6}
                    strokeWidth={0.5}
                    vertical={false}
                  />
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
                    width={40}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <ChartTooltip
                    content={({ payload, label }) => {
                      if (!payload?.length) return null;
                      return (
                        <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-md">
                          <div className="text-muted-foreground mb-1">
                            {label}ms
                          </div>
                          <div className="text-muted-foreground">
                            Frequency:{" "}
                            <span className="text-foreground font-medium">
                              {payload[0].value}%
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="pct"
                    fill="var(--chart-2)"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>

        {/* 3 — Overlapping Histograms */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Overlapping Histograms
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Two user cohorts on the same axis with semi-transparent fills
                  — Group A peaks earlier while Group B skews toward higher
                  values.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="green" className="shrink-0 mt-px">
                Overlay
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <ChartContainer config={overlayConfig} className="h-72 w-full">
                <BarChart
                  data={overlayBins}
                  barCategoryGap="2%"
                  barGap={-24}
                  margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="var(--border)"
                    strokeOpacity={0.6}
                    strokeWidth={0.5}
                    vertical={false}
                  />
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
                    width={36}
                  />
                  <ChartTooltip
                    content={({ payload, label }) => {
                      if (!payload?.length) return null;
                      return (
                        <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-md">
                          <div className="text-muted-foreground mb-1 font-medium">
                            {label}ms
                          </div>
                          {payload.map((p) => (
                            <div
                              key={String(p.dataKey)}
                              className="flex items-center gap-2 text-muted-foreground"
                            >
                              <span
                                className="h-2 w-2 rounded-full shrink-0"
                                style={{ background: p.color }}
                              />
                              {p.name}:{" "}
                              <span className="text-foreground font-medium">
                                {p.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="a"
                    name="Group A"
                    fill="var(--chart-1)"
                    fillOpacity={0.6}
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="b"
                    name="Group B"
                    fill="var(--chart-3)"
                    fillOpacity={0.6}
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardPanel>
          <CardFooter>
            <div className="flex justify-center gap-6 w-full">
              {(["a", "b"] as const).map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-sm shrink-0"
                    style={{
                      background: overlayConfig[key].color,
                      opacity: 0.7,
                    }}
                  />
                  {overlayConfig[key].label}
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

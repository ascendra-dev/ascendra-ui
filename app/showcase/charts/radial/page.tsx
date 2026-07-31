"use client";

import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/ascendra-ui/shadcn";
import { Card, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, SimpleBadge } from "@/ascendra-ui";

// ─── Data ─────────────────────────────────────────────────────────────────────

const singleProgressData = [
  { name: "Progress", value: 73, fill: "var(--chart-1)" },
];

const multiKpiData = [
  { name: "Revenue", value: 88, fill: "var(--chart-1)" },
  { name: "Users", value: 74, fill: "var(--chart-2)" },
  { name: "Retention", value: 91, fill: "var(--chart-3)" },
  { name: "Satisfaction", value: 66, fill: "var(--chart-4)" },
];

const gaugeData = [{ name: "Score", value: 68, fill: "var(--chart-1)" }];

const comparisonKpis = [
  {
    name: "Revenue",
    actual: 84,
    target: 90,
    fillActual: "var(--chart-1)",
    fillTarget: "var(--chart-7)",
  },
  {
    name: "Users",
    actual: 71,
    target: 80,
    fillActual: "var(--chart-2)",
    fillTarget: "var(--chart-7)",
  },
  {
    name: "Retention",
    actual: 93,
    target: 85,
    fillActual: "var(--chart-3)",
    fillTarget: "var(--chart-7)",
  },
];

// ─── Chart configs ─────────────────────────────────────────────────────────────

const singleConfig: ChartConfig = {
  Progress: { label: "Progress", color: "var(--chart-1)" },
};

const multiConfig: ChartConfig = {
  Revenue: { label: "Revenue", color: "var(--chart-1)" },
  Users: { label: "Users", color: "var(--chart-2)" },
  Retention: { label: "Retention", color: "var(--chart-3)" },
  Satisfaction: { label: "Satisfaction", color: "var(--chart-4)" },
};

const gaugeConfig: ChartConfig = {
  Score: { label: "Score", color: "var(--chart-1)" },
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function RadialChartsPage() {
  const GAUGE_VALUE = 68;

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
          Radial & Gauge Charts
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Radial charts communicate progress and KPI attainment at a glance.
          Gauge charts add directional context for health or performance scores.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1 — Single Progress Ring */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Single Progress Ring
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  One KPI displayed as an arc fill against a track — ideal for
                  compact dashboard widgets showing goal completion.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="default" className="shrink-0 mt-px">
                Progress
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <div className="flex flex-col items-center">
                <ChartContainer config={singleConfig} className="h-55 w-55">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    startAngle={90}
                    endAngle={-270}
                    data={singleProgressData}
                    barSize={14}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      tick={false}
                    />
                    <RadialBar
                      dataKey="value"
                      cornerRadius={7}
                      background={{ fill: "var(--muted)" }}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent formatter={(v) => `${v}%`} />
                      }
                    />
                    <text
                      x="50%"
                      y="46%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={26}
                      fontWeight={700}
                      fill="currentColor"
                      className="fill-foreground"
                    >
                      73%
                    </text>
                    <text
                      x="50%"
                      y="60%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={10}
                      fill="currentColor"
                      className="fill-muted-foreground"
                    >
                      Goal attained
                    </text>
                  </RadialBarChart>
                </ChartContainer>
              </div>
            </div>
          </CardPanel>
        </Card>

        {/* 2 — Multi-Series Radial */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Multi-Series Radial
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Four KPIs on concentric arcs — Revenue, Users, Retention, and
                  Satisfaction scores compared in a compact layout.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="blue" className="shrink-0 mt-px">
                Multi-KPI
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ChartContainer
                  config={multiConfig}
                  className="h-65 w-65 shrink-0"
                >
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={110}
                    startAngle={90}
                    endAngle={-270}
                    data={multiKpiData}
                    barSize={12}
                    barGap={4}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      tick={false}
                    />
                    <RadialBar
                      dataKey="value"
                      cornerRadius={6}
                      background={{ fill: "var(--muted)" }}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(v) => `${v}%`}
                          nameKey="name"
                        />
                      }
                    />
                  </RadialBarChart>
                </ChartContainer>

                <div className="flex flex-col gap-3 w-full">
                  {multiKpiData.map((d) => (
                    <div key={d.name} className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ background: d.fill }}
                      />
                      <span className="text-xs text-foreground font-medium flex-1">
                        {d.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${d.value}%`, background: d.fill }}
                          />
                        </div>
                        <span className="text-muted-foreground w-8 text-right">
                          {d.value}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardPanel>
        </Card>

        {/* 3 — Gauge / Speedometer */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Gauge / Speedometer
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Health or performance score displayed on a 270° arc with
                  colour zones — green/yellow/red at a glance.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="orange" className="shrink-0 mt-px">
                Gauge
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <div className="flex flex-col items-center">
                <ChartContainer config={gaugeConfig} className="h-50 w-65">
                  <RadialBarChart
                    cx="50%"
                    cy="70%"
                    innerRadius={80}
                    outerRadius={115}
                    startAngle={225}
                    endAngle={-45}
                    data={gaugeData}
                    barSize={16}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      tick={false}
                    />
                    <RadialBar
                      dataKey={() => 100}
                      cornerRadius={8}
                      fill="var(--chart-5)"
                      fillOpacity={0.15}
                      background={false}
                      isAnimationActive={false}
                    />
                    <RadialBar
                      dataKey={() => 66}
                      cornerRadius={8}
                      fill="var(--chart-4)"
                      fillOpacity={0.18}
                      background={false}
                      isAnimationActive={false}
                    />
                    <RadialBar
                      dataKey={() => 33}
                      cornerRadius={8}
                      fill="var(--chart-3)"
                      fillOpacity={0.2}
                      background={false}
                      isAnimationActive={false}
                    />
                    <RadialBar
                      dataKey="value"
                      cornerRadius={8}
                      fill="var(--chart-1)"
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent formatter={(v) => `${v}/100`} />
                      }
                    />
                  </RadialBarChart>
                </ChartContainer>

                <div className="flex flex-col items-center -mt-6">
                  <span className="text-4xl font-bold text-foreground">
                    {GAUGE_VALUE}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Performance score
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                  {[
                    { label: "Poor", color: "var(--chart-5)" },
                    { label: "Fair", color: "var(--chart-4)" },
                    { label: "Good", color: "var(--chart-3)" },
                    { label: "Score", color: "var(--chart-1)" },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="flex items-center gap-1.5"
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ background: item.color }}
                      />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardPanel>
        </Card>

        {/* 4 — Comparison Ring */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Comparison Ring</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Actual vs target for three KPIs on paired concentric rings —
                  the inner track shows the target threshold, the outer arc
                  shows attainment.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="green" className="shrink-0 mt-px">
                vs Target
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex gap-4">
                  {comparisonKpis.map((kpi) => (
                    <div
                      key={kpi.name}
                      className="flex flex-col items-center gap-1"
                    >
                      <ChartContainer config={{}} className="h-36 w-36">
                        <RadialBarChart
                          cx="50%"
                          cy="50%"
                          innerRadius={38}
                          outerRadius={62}
                          startAngle={90}
                          endAngle={-270}
                          data={[
                            { value: kpi.target, fill: kpi.fillTarget },
                            { value: kpi.actual, fill: kpi.fillActual },
                          ]}
                          barSize={10}
                          barGap={2}
                        >
                          <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            tick={false}
                          />
                          <RadialBar
                            dataKey="value"
                            cornerRadius={5}
                            background={{ fill: "var(--muted)" }}
                          />
                          <text
                            x="50%"
                            y="46%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={16}
                            fontWeight={700}
                            fill="currentColor"
                          >
                            {kpi.actual}%
                          </text>
                          <text
                            x="50%"
                            y="62%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={9}
                            fill="var(--muted-foreground)"
                          >
                            of {kpi.target}%
                          </text>
                        </RadialBarChart>
                      </ChartContainer>
                      <span className="text-xs font-medium text-foreground">
                        {kpi.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  {comparisonKpis.map((kpi) => (
                    <div key={kpi.name} className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ background: kpi.fillActual }}
                      />
                      <span className="text-xs text-foreground font-medium flex-1">
                        {kpi.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${kpi.actual}%`,
                              background: kpi.fillActual,
                            }}
                          />
                        </div>
                        <span className="w-16 text-right">
                          {kpi.actual}% / {kpi.target}%
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
    </>
  );
}

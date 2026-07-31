"use client";

import { BackLink, Card, CardFooter, CardFooterIcon, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, ChartLegend, ChartLegendGroup, DashboardContent, PageHeader, PageHeaderAction, PageHeaderGroup, PageSubtitle, PageTitle, SimpleBadge, Table, TableBody, TableCell, TableHead, TableHeader, TableHeaderRow, TableRow, TableWrapper } from "@/ascendra-ui";
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
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  Treemap,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "Portfolio Value", value: "$24.8M", delta: "+$1.2M", up: true },
  { label: "Avg. Gross Yield", value: "6.4%", delta: "+0.3 pts", up: true },
  { label: "Occupancy Rate", value: "91.2%", delta: "+2.1 pts", up: true },
  { label: "Monthly Income", value: "$132,400", delta: "+$8,200", up: true },
] as const;

// ─── Portfolio by Type (Treemap) ──────────────────────────────────────────────

const portfolioTypeData = [
  { name: "Apartment", value: 8200000, fill: "var(--chart-1)" },
  { name: "House", value: 5600000, fill: "var(--chart-2)" },
  { name: "Office", value: 4800000, fill: "var(--chart-3)" },
  { name: "Retail", value: 3100000, fill: "var(--chart-4)" },
  { name: "Mixed-use", value: 3100000, fill: "var(--chart-1)" },
];

// ─── Geographic Allocation (Pie / Donut) ─────────────────────────────────────

const geoData = [
  { name: "City Centre",   value: 38, fill: "var(--chart-1)", variant: "chart-1" as const },
  { name: "Suburban",      value: 31, fill: "var(--chart-2)", variant: "chart-2" as const },
  { name: "Commuter Belt", value: 21, fill: "var(--chart-3)", variant: "chart-3" as const },
  { name: "Regional",      value: 10, fill: "var(--chart-4)", variant: "chart-4" as const },
];

// ─── Rental Income & Yield (Composed: Bar + Line) ────────────────────────────

const rentalIncomeData = [
  { month: "Jun", income: 112400, yield: 5.8 },
  { month: "Jul", income: 114800, yield: 5.9 },
  { month: "Aug", income: 116200, yield: 6.0 },
  { month: "Sep", income: 118400, yield: 6.0 },
  { month: "Oct", income: 119600, yield: 6.1 },
  { month: "Nov", income: 120800, yield: 6.1 },
  { month: "Dec", income: 122000, yield: 6.2 },
  { month: "Jan", income: 123400, yield: 6.2 },
  { month: "Feb", income: 126200, yield: 6.3 },
  { month: "Mar", income: 128600, yield: 6.3 },
  { month: "Apr", income: 130800, yield: 6.4 },
  { month: "May", income: 132400, yield: 6.4 },
];

const rentalIncomeConfig: ChartConfig = {
  income: { label: "Rental Income", color: "var(--chart-1)" },
  yield: { label: "Gross Yield", color: "var(--chart-3)" },
};

// ─── Properties by Value (Bar horizontal) ────────────────────────────────────

const propertiesByValueData = [
  { name: "Canary Wharf Office", value: 3800000, fill: "var(--chart-3)" },
  { name: "Shoreditch Apts", value: 3200000, fill: "var(--chart-1)" },
  { name: "Mayfair Retail", value: 2800000, fill: "var(--chart-4)" },
  { name: "Kensington House", value: 2400000, fill: "var(--chart-2)" },
  { name: "Camden Mixed-use", value: 2200000, fill: "var(--chart-1)" },
  { name: "Brixton Apts", value: 1960000, fill: "var(--chart-1)" },
  { name: "Islington House", value: 1640000, fill: "var(--chart-2)" },
  { name: "Hackney Apts", value: 1380000, fill: "var(--chart-1)" },
  { name: "Croydon Office", value: 1200000, fill: "var(--chart-3)" },
  { name: "Greenwich House", value: 1020000, fill: "var(--chart-2)" },
];

// ─── Price vs Area (Scatter) ──────────────────────────────────────────────────

const priceVsAreaData = [
  { area: 420, ppsf: 1840, annualYield: 6.2, type: "Apartment" },
  { area: 680, ppsf: 1620, annualYield: 5.8, type: "Apartment" },
  { area: 950, ppsf: 1480, annualYield: 6.8, type: "Apartment" },
  { area: 1200, ppsf: 1380, annualYield: 7.1, type: "Apartment" },
  { area: 1480, ppsf: 1240, annualYield: 7.4, type: "Apartment" },
  { area: 1840, ppsf: 1640, annualYield: 5.6, type: "House" },
  { area: 2200, ppsf: 1520, annualYield: 5.9, type: "House" },
  { area: 2800, ppsf: 1380, annualYield: 6.4, type: "House" },
  { area: 3200, ppsf: 1280, annualYield: 6.8, type: "House" },
  { area: 1600, ppsf: 920, annualYield: 8.2, type: "Office" },
  { area: 3800, ppsf: 780, annualYield: 8.6, type: "Office" },
  { area: 6200, ppsf: 640, annualYield: 9.1, type: "Office" },
  { area: 820, ppsf: 1120, annualYield: 7.8, type: "Retail" },
  { area: 1400, ppsf: 980, annualYield: 8.4, type: "Retail" },
  { area: 2400, ppsf: 720, annualYield: 6.6, type: "Mixed-use" },
  { area: 4200, ppsf: 640, annualYield: 6.9, type: "Mixed-use" },
];

const TYPE_COLORS: Record<string, string> = {
  Apartment: "var(--chart-1)",
  House: "var(--chart-2)",
  Office: "var(--chart-3)",
  Retail: "var(--chart-4)",
  "Mixed-use": "var(--chart-1)",
};

const TYPE_VARIANTS = {
  Apartment:  "chart-1",
  House:      "chart-2",
  Office:     "chart-3",
  Retail:     "chart-4",
  "Mixed-use":"chart-1",
} as const;

// ─── Properties table ─────────────────────────────────────────────────────────

const properties = [
  {
    name: "Shoreditch Apartments",
    type: "Apartment",
    location: "East London",
    value: 3200000,
    rental: 16400,
    yield: 6.2,
    occupancy: "100%",
    status: "Tenanted",
  },
  {
    name: "Canary Wharf Office",
    type: "Office",
    location: "East London",
    value: 3800000,
    rental: 28600,
    yield: 9.0,
    occupancy: "92%",
    status: "Tenanted",
  },
  {
    name: "Mayfair Retail Unit",
    type: "Retail",
    location: "West London",
    value: 2800000,
    rental: 19600,
    yield: 8.4,
    occupancy: "100%",
    status: "Tenanted",
  },
  {
    name: "Kensington House",
    type: "House",
    location: "West London",
    value: 2400000,
    rental: 11200,
    yield: 5.6,
    occupancy: "100%",
    status: "Tenanted",
  },
  {
    name: "Camden Mixed-use",
    type: "Mixed-use",
    location: "North London",
    value: 2200000,
    rental: 12100,
    yield: 6.6,
    occupancy: "85%",
    status: "Partial",
  },
  {
    name: "Brixton Apartments",
    type: "Apartment",
    location: "South London",
    value: 1960000,
    rental: 11400,
    yield: 7.0,
    occupancy: "100%",
    status: "Tenanted",
  },
  {
    name: "Islington House",
    type: "House",
    location: "North London",
    value: 1640000,
    rental: 8200,
    yield: 6.0,
    occupancy: "100%",
    status: "Tenanted",
  },
  {
    name: "Hackney Apartments",
    type: "Apartment",
    location: "East London",
    value: 1380000,
    rental: 8600,
    yield: 7.5,
    occupancy: "88%",
    status: "Partial",
  },
  {
    name: "Croydon Office",
    type: "Office",
    location: "South London",
    value: 1200000,
    rental: 8400,
    yield: 8.4,
    occupancy: "75%",
    status: "Partial",
  },
  {
    name: "Greenwich House",
    type: "House",
    location: "South-East",
    value: 1020000,
    rental: 5400,
    yield: 6.4,
    occupancy: "100%",
    status: "Tenanted",
  },
  {
    name: "Stratford Studios",
    type: "Apartment",
    location: "East London",
    value: 980000,
    rental: 6200,
    yield: 7.6,
    occupancy: "0%",
    status: "Vacant",
  },
  {
    name: "Lewisham Retail",
    type: "Retail",
    location: "South-East",
    value: 840000,
    rental: 5800,
    yield: 8.3,
    occupancy: "100%",
    status: "Tenanted",
  },
];

// ─── Treemap cell renderer ────────────────────────────────────────────────────

interface PortfolioCellProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  value?: number;
  fill?: string;
  depth?: number;
}

function PortfolioCell(props: PortfolioCellProps) {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    name,
    value,
    fill,
    depth,
  } = props;
  if (depth !== 1 || !name || width < 2 || height < 2) return null;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        fillOpacity={0.82}
        stroke="var(--background)"
        strokeWidth={2}
        rx={4}
      />
      {width > 60 && height > 26 && (
        <text x={x + 8} y={y + 16} fill="white" fontSize={11} fontWeight={600}>
          {name}
        </text>
      )}
      {width > 60 && height > 42 && (
        <text
          x={x + 8}
          y={y + 30}
          fill="white"
          fillOpacity={0.72}
          fontSize={10}
        >
          {`$${((value ?? 0) / 1000000).toFixed(1)}M`}
        </text>
      )}
    </g>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RealEstatePage() {
  const [hiddenRental, setHiddenRental] = useState<Record<string, boolean>>({});

  return (
    <>
      <BackLink href="/showcase/dashboards">Dashboard Gallery</BackLink>

      <PageHeader variant="dashboard">
        <PageHeaderGroup>
          <PageTitle>Real Estate Portfolio</PageTitle>
          <PageSubtitle>
            Portfolio value, rental yields, occupancy, and property performance
            — the investment view for a UK residential and commercial portfolio.
          </PageSubtitle>
        </PageHeaderGroup>
        <PageHeaderAction className="w-fit">
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400 dark:ring-emerald-500/30">
            Property Investment
          </span>
        </PageHeaderAction>
      </PageHeader>

      <DashboardContent>
        {/* ── KPI row ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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

        {/* ── Row 1: Portfolio by Type | Geographic Allocation ─────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Portfolio by Type — Treemap */}
          <div className="col-span-12 md:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle className="text-sm">
                  Portfolio by Type
                </CardHeaderTitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer config={{}} className="h-64 w-full">
                    <Treemap
                      data={portfolioTypeData}
                      dataKey="value"
                      content={<PortfolioCell />}
                    >
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0]
                            .payload as (typeof portfolioTypeData)[0];
                          return (
                            <div className="bg-background border shadow-md rounded-lg px-3 py-2 text-xs">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span
                                  className="h-2 w-2 rounded-[2px]"
                                  style={{ background: d.fill }}
                                />
                                <span className="font-medium">{d.name}</span>
                              </div>
                              <span className="font-mono tabular-nums text-foreground">
                                ${(d.value / 1000000).toFixed(1)}M
                              </span>
                            </div>
                          );
                        }}
                      />
                    </Treemap>
                  </ChartContainer>
                </div>
              </CardPanel>
              <CardFooter>
                <CardFooterIcon />
                Asset value split across property categories
              </CardFooter>
            </Card>
          </div>

          {/* Geographic Allocation — Pie Donut */}
          <div className="col-span-12 md:col-span-5">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-medium">Geographic Allocation</p>
                  <div className="mt-auto">
                    <ChartContainer config={{}} className="h-36 w-full">
                      <PieChart
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      >
                        <Pie
                          data={geoData}
                          cx="50%"
                          cy="50%"
                          innerRadius={44}
                          outerRadius={68}
                          dataKey="value"
                          paddingAngle={2}
                          strokeWidth={0}
                        />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (!active || !payload?.length) return null;
                            const d = payload[0].payload as (typeof geoData)[0];
                            return (
                              <div className="bg-background border shadow-md rounded-lg px-3 py-2 text-xs">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span
                                    className="h-2 w-2 rounded-[2px]"
                                    style={{ background: d.fill }}
                                  />
                                  <span className="font-medium">{d.name}</span>
                                </div>
                                <span className="font-mono tabular-nums text-foreground">
                                  {d.value}%
                                </span>
                              </div>
                            );
                          }}
                        />
                      </PieChart>
                    </ChartContainer>
                    <div className="mt-4 flex flex-col gap-2">
                      {geoData.map((d) => (
                        <div
                          key={d.name}
                          className="flex items-center justify-between gap-2 text-xs"
                        >
                          <ChartLegend variant={d.variant} shape="square">{d.name}</ChartLegend>
                          <span className="font-medium tabular-nums">
                            {d.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 2: Rental Income & Yield | Properties by Value ───────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Rental Income & Yield — Composed */}
          <div className="col-span-12 md:col-span-8">
            <Card className="h-full">
              <CardPanel>
                <div className="p-5">
                  <p className="mb-4 text-sm font-medium">
                    Rental Income & Yield
                  </p>
                  <ChartContainer
                    config={rentalIncomeConfig}
                    className="h-52 w-full"
                  >
                    <ComposedChart
                      data={rentalIncomeData}
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
                        tickFormatter={(v: number) => `${v.toFixed(1)}%`}
                        width={36}
                        domain={[5.0, 7.5]}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(
                              rentalIncomeConfig,
                              (v, k) =>
                                k === "yield"
                                  ? `${(v as number).toFixed(1)}%`
                                  : `$${(v as number).toLocaleString()}`,
                            )}
                          />
                        }
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="income"
                        fill="var(--chart-1)"
                        fillOpacity={0.8}
                        radius={[3, 3, 0, 0]}
                        hide={hiddenRental["income"]}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="yield"
                        stroke="var(--chart-3)"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "var(--chart-3)" }}
                        activeDot={{ r: 5 }}
                        hide={hiddenRental["yield"]}
                      />
                    </ComposedChart>
                  </ChartContainer>
                  <ChartSeriesLegend
                    config={rentalIncomeConfig}
                    hidden={hiddenRental}
                    onToggle={(k) =>
                      setHiddenRental((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Properties by Value — horizontal bar */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-medium">Properties by Value</p>
                  <div className="mt-auto">
                    <ChartContainer config={{}} className="h-52 w-full">
                      <BarChart
                        data={propertiesByValueData}
                        layout="vertical"
                        margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
                        barCategoryGap="20%"
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
                          tick={{ fontSize: 9 }}
                          tickFormatter={(v: number) =>
                            `$${(v / 1000000).toFixed(1)}M`
                          }
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 9 }}
                          width={108}
                        />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (!active || !payload?.length) return null;
                            const d = payload[0]
                              .payload as (typeof propertiesByValueData)[0];
                            return (
                              <div className="bg-background border shadow-md rounded-lg px-3 py-2 text-xs">
                                <p className="font-medium mb-1">{d.name}</p>
                                <span className="font-mono tabular-nums text-foreground">
                                  ${(d.value / 1000000).toFixed(2)}M
                                </span>
                              </div>
                            );
                          }}
                        />
                        <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                          {propertiesByValueData.map((entry, idx) => (
                            <Cell
                              key={`cell-${idx}`}
                              fill={entry.fill}
                              fillOpacity={0.82}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 3: Price vs Area | Properties table ───────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Price vs Area — Scatter */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">Price vs Area</p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer config={{}} className="h-64 w-full">
                      <ScatterChart
                        margin={{ top: 8, right: 16, left: 0, bottom: 16 }}
                      >
                        <CartesianGrid
                          stroke="var(--border)"
                          strokeOpacity={0.6}
                          strokeWidth={0.5}
                        />
                        <XAxis
                          type="number"
                          dataKey="area"
                          name="Floor Area"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 10 }}
                          tickFormatter={(v: number) =>
                            `${(v / 1000).toFixed(1)}k`
                          }
                          label={{
                            value: "Floor Area (ft²)",
                            position: "insideBottom",
                            offset: -8,
                            fontSize: 10,
                            fill: "var(--muted-foreground)",
                          }}
                        />
                        <YAxis
                          type="number"
                          dataKey="ppsf"
                          name="Price/sqft"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 10 }}
                          tickFormatter={(v: number) => `$${v}`}
                          width={44}
                        />
                        <ZAxis
                          type="number"
                          dataKey="annualYield"
                          range={[40, 200]}
                          name="Yield"
                        />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (!active || !payload?.length) return null;
                            const d = payload[0]
                              .payload as (typeof priceVsAreaData)[0];
                            return (
                              <div className="bg-background border shadow-md rounded-lg px-3 py-2 text-xs space-y-0.5">
                                <p className="font-medium">{d.type}</p>
                                <p className="text-muted-foreground">
                                  {d.area.toLocaleString()} ft² · ${d.ppsf}/sqft
                                </p>
                                <p className="text-muted-foreground">
                                  Yield: {d.annualYield}%
                                </p>
                              </div>
                            );
                          }}
                        />
                        {(
                          [
                            "Apartment",
                            "House",
                            "Office",
                            "Retail",
                            "Mixed-use",
                          ] as const
                        ).map((type) => (
                          <Scatter
                            key={type}
                            name={type}
                            data={priceVsAreaData.filter(
                              (d) => d.type === type,
                            )}
                            fill={TYPE_COLORS[type]}
                            fillOpacity={0.75}
                          />
                        ))}
                      </ScatterChart>
                    </ChartContainer>
                  </div>
                  <ChartLegendGroup align="left" className="mt-3">
                    {(Object.keys(TYPE_VARIANTS) as (keyof typeof TYPE_VARIANTS)[]).map((type) => (
                      <ChartLegend key={type} variant={TYPE_VARIANTS[type]} shape="round">
                        {type}
                      </ChartLegend>
                    ))}
                  </ChartLegendGroup>
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Properties — table */}
          <div className="col-span-12 md:col-span-8">
            <CardHeader>
              <CardHeaderTitle>Properties</CardHeaderTitle>
              <CardHeaderSubtitle>
                Full portfolio · 12 properties
              </CardHeaderSubtitle>
            </CardHeader>
            <TableWrapper>
              <Table scrollable horizontal vertical height={328}>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Rental/mo</TableHead>
                    <TableHead className="text-right">Yield</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Status</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {properties.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.type}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.location}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        ${(row.value / 1000000).toFixed(1)}M
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        ${row.rental.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {row.yield}%
                      </TableCell>
                      <TableCell className="tabular-nums text-muted-foreground">
                        {row.occupancy}
                      </TableCell>
                      <TableCell>
                        <SimpleBadge
                          variant={
                            row.status === "Tenanted"
                              ? "green"
                              : row.status === "Vacant"
                                ? "red"
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
              <CardFooter className="border-t-0 pt-0" />
            </TableWrapper>
          </div>
        </div>
      </DashboardContent>
    </>
  );
}

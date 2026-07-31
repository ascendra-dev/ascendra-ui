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
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Treemap,
  XAxis,
  YAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  {
    label: "Gross Merchandise Value",
    value: "$4.82M",
    delta: "+12.4%",
    up: true,
  },
  { label: "Orders Placed", value: "28,340", delta: "+9.1%", up: true },
  { label: "Avg. Order Value", value: "$170", delta: "−2.1%", up: false },
  { label: "Return Rate", value: "8.3%", delta: "−1.2 pts", up: true },
] as const;

// ─── Weekly Orders ─────────────────────────────────────────────────────────────

const weeklyOrdersData = [
  // Jan
  { w: 1, orders: 498, returns: 42 },
  { w: 2, orders: 512, returns: 44 },
  { w: 3, orders: 488, returns: 41 },
  { w: 4, orders: 476, returns: 40 },
  // Feb
  { w: 5, orders: 445, returns: 38 },
  { w: 6, orders: 432, returns: 37 },
  { w: 7, orders: 461, returns: 39 },
  { w: 8, orders: 453, returns: 38 },
  // Mar
  { w: 9, orders: 492, returns: 41 },
  { w: 10, orders: 518, returns: 43 },
  { w: 11, orders: 534, returns: 44 },
  { w: 12, orders: 528, returns: 44 },
  { w: 13, orders: 542, returns: 46 },
  // Apr
  { w: 14, orders: 548, returns: 46 },
  { w: 15, orders: 562, returns: 47 },
  { w: 16, orders: 571, returns: 48 },
  { w: 17, orders: 558, returns: 47 },
  // May
  { w: 18, orders: 574, returns: 48 },
  { w: 19, orders: 588, returns: 49 },
  { w: 20, orders: 596, returns: 50 },
  { w: 21, orders: 582, returns: 49 },
  // Jun
  { w: 22, orders: 605, returns: 51 },
  { w: 23, orders: 618, returns: 52 },
  { w: 24, orders: 624, returns: 52 },
  { w: 25, orders: 631, returns: 53 },
  { w: 26, orders: 619, returns: 52 },
  // Jul
  { w: 27, orders: 638, returns: 54 },
  { w: 28, orders: 652, returns: 55 },
  { w: 29, orders: 644, returns: 54 },
  { w: 30, orders: 628, returns: 53 },
  // Aug
  { w: 31, orders: 634, returns: 53 },
  { w: 32, orders: 641, returns: 54 },
  { w: 33, orders: 628, returns: 53 },
  { w: 34, orders: 619, returns: 52 },
  { w: 35, orders: 612, returns: 51 },
  // Sep
  { w: 36, orders: 648, returns: 54 },
  { w: 37, orders: 661, returns: 55 },
  { w: 38, orders: 654, returns: 55 },
  { w: 39, orders: 642, returns: 54 },
  // Oct
  { w: 40, orders: 672, returns: 56 },
  { w: 41, orders: 685, returns: 57 },
  { w: 42, orders: 698, returns: 58 },
  { w: 43, orders: 688, returns: 57 },
  // Nov — Black Friday spike at w46
  { w: 44, orders: 726, returns: 61 },
  { w: 45, orders: 752, returns: 63 },
  { w: 46, orders: 818, returns: 74 },
  { w: 47, orders: 792, returns: 71 },
  // Dec — holiday peak then wind-down
  { w: 48, orders: 834, returns: 78 },
  { w: 49, orders: 842, returns: 82 },
  { w: 50, orders: 814, returns: 75 },
  { w: 51, orders: 768, returns: 68 },
  { w: 52, orders: 698, returns: 62 },
];

const weeklyOrdersConfig: ChartConfig = {
  orders: { label: "Orders", color: "var(--chart-1)" },
  returns: { label: "Returns", color: "var(--chart-3)" },
};

const WEEK_MONTHS: Record<number, string> = {
  1: "Jan",
  5: "Feb",
  9: "Mar",
  13: "Apr",
  17: "May",
  21: "Jun",
  25: "Jul",
  29: "Aug",
  33: "Sep",
  37: "Oct",
  41: "Nov",
  45: "Dec",
};

// ─── Orders by Category ────────────────────────────────────────────────────────

const ordersByCatData = [
  { cat: "Electronics", current: 4820, prior: 4150 },
  { cat: "Clothing", current: 6340, prior: 5980 },
  { cat: "Home", current: 3960, prior: 3720 },
  { cat: "Sports", current: 3180, prior: 2890 },
  { cat: "Beauty", current: 2840, prior: 2650 },
  { cat: "Books", current: 1940, prior: 1820 },
];

const ordersByCatConfig: ChartConfig = {
  current: { label: "This Month", color: "var(--chart-1)" },
  prior: { label: "Prior Month", color: "var(--chart-2)" },
};

// ─── GMV by Category (Treemap) ─────────────────────────────────────────────────

// Values sum to $4,820k = $4.82M, matching the GMV KPI.
const gmvCatData = [
  { name: "Electronics", value: 1824000, fill: "var(--chart-1)" },
  { name: "Clothing", value: 1041000, fill: "var(--chart-2)" },
  { name: "Home", value: 742000, fill: "var(--chart-3)" },
  { name: "Sports", value: 481000, fill: "var(--chart-4)" },
  { name: "Beauty", value: 318000, fill: "var(--chart-1)" },
  { name: "Books", value: 196000, fill: "var(--chart-2)" },
  { name: "Toys", value: 142000, fill: "var(--chart-3)" },
  { name: "Grocery", value: 76000, fill: "var(--chart-4)" },
];

// ─── Order Value Distribution (Histogram) ──────────────────────────────────────

const orderValueDistData = [
  { bin: "$0", count: 680 },
  { bin: "$25", count: 1920 },
  { bin: "$50", count: 3140 },
  { bin: "$75", count: 4280 },
  { bin: "$100", count: 4820 },
  { bin: "$125", count: 4640 },
  { bin: "$150", count: 3980 },
  { bin: "$175", count: 3120 },
  { bin: "$200", count: 2480 },
  { bin: "$250", count: 1380 },
  { bin: "$300", count: 820 },
  { bin: "$400+", count: 280 },
];

const histConfig: ChartConfig = {
  count: { label: "Orders", color: "var(--chart-1)" },
};

// ─── Top Products ──────────────────────────────────────────────────────────────

const topProducts = [
  {
    name: "iPhone 15 Pro Case",
    cat: "Electronics",
    units: 2840,
    gmv: 85200,
    ret: 4.2,
    trend: "Up",
  },
  {
    name: "Running Shoes Pro",
    cat: "Sports",
    units: 1920,
    gmv: 192000,
    ret: 7.8,
    trend: "Up",
  },
  {
    name: "Wireless Earbuds Gen 3",
    cat: "Electronics",
    units: 1640,
    gmv: 246000,
    ret: 5.1,
    trend: "Stable",
  },
  {
    name: "Cotton Slim-Fit Tee",
    cat: "Clothing",
    units: 4280,
    gmv: 85600,
    ret: 12.4,
    trend: "Up",
  },
  {
    name: "Air Purifier X200",
    cat: "Home",
    units: 820,
    gmv: 213200,
    ret: 3.8,
    trend: "Up",
  },
  {
    name: "Yoga Mat Premium",
    cat: "Sports",
    units: 1380,
    gmv: 69000,
    ret: 6.2,
    trend: "Down",
  },
  {
    name: "Moisturiser SPF50",
    cat: "Beauty",
    units: 2140,
    gmv: 64200,
    ret: 9.1,
    trend: "Up",
  },
  {
    name: "Desk Lamp LED",
    cat: "Home",
    units: 960,
    gmv: 86400,
    ret: 4.5,
    trend: "Stable",
  },
];

// ─── Treemap cell renderer ────────────────────────────────────────────────────

interface GmvCellProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  value?: number;
  fill?: string;
  depth?: number;
}

function GmvCell(props: GmvCellProps) {
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
      {width > 54 && height > 26 && (
        <text x={x + 8} y={y + 16} fill="white" fontSize={11} fontWeight={600}>
          {name}
        </text>
      )}
      {width > 54 && height > 42 && (
        <text
          x={x + 8}
          y={y + 30}
          fill="white"
          fillOpacity={0.72}
          fontSize={10}
        >
          {`$${((value ?? 0) / 1000).toFixed(0)}k`}
        </text>
      )}
    </g>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EcommerceOpsPage() {
  const [hiddenOrders, setHiddenOrders] = useState<Record<string, boolean>>({});
  const [hiddenCat, setHiddenCat] = useState<Record<string, boolean>>({});

  return (
    <>
      <BackLink href="/showcase/dashboards">Dashboard Gallery</BackLink>

      <PageHeader variant="dashboard">
        <PageHeaderGroup>
          <PageTitle>E-commerce Operations</PageTitle>
          <PageSubtitle>
            Order volume, GMV, category performance, and return rates — the ops
            view for a mid-size online retailer.
          </PageSubtitle>
        </PageHeaderGroup>
        <PageHeaderAction className="w-fit">
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-500/20 dark:text-blue-400 dark:ring-blue-500/30">
            Retail / E-commerce
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

        {/* ── Row 1: Daily Orders — full width ─────────────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Daily Orders</CardHeaderTitle>
                <CardHeaderSubtitle>
                  52-week trend · orders placed with returns overlay
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer
                    config={weeklyOrdersConfig}
                    className="h-64 w-full"
                  >
                    <LineChart
                      data={weeklyOrdersData}
                      margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="var(--border)"
                        strokeOpacity={0.6}
                        strokeWidth={0.5}
                      />
                      <XAxis
                        dataKey="w"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        interval={3}
                        tickFormatter={(w: number) => WEEK_MONTHS[w] ?? ""}
                        dy={6}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        width={40}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(
                              weeklyOrdersConfig,
                              (v) => v.toLocaleString(),
                            )}
                          />
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                        hide={hiddenOrders["orders"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="returns"
                        stroke="var(--chart-3)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                        hide={hiddenOrders["returns"]}
                      />
                    </LineChart>
                  </ChartContainer>
                  <ChartSeriesLegend
                    config={weeklyOrdersConfig}
                    hidden={hiddenOrders}
                    onToggle={(k) =>
                      setHiddenOrders((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 2: Orders by Category | GMV by Category ───────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Orders by Category — grouped bar */}
          <div className="col-span-12 md:col-span-6">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">Orders by Category</p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer
                      config={ordersByCatConfig}
                      className="h-full w-full"
                    >
                      <BarChart
                        data={ordersByCatData}
                        margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid
                          vertical={false}
                          stroke="var(--border)"
                          strokeOpacity={0.6}
                          strokeWidth={0.5}
                        />
                        <XAxis
                          dataKey="cat"
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
                            `${(v / 1000).toFixed(0)}k`
                          }
                          width={36}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(
                                ordersByCatConfig,
                                (v) => v.toLocaleString(),
                              )}
                            />
                          }
                        />
                        <Bar
                          dataKey="current"
                          fill="var(--chart-1)"
                          fillOpacity={0.85}
                          radius={[3, 3, 0, 0]}
                          hide={hiddenCat["current"]}
                        />
                        <Bar
                          dataKey="prior"
                          fill="var(--chart-2)"
                          fillOpacity={0.65}
                          radius={[3, 3, 0, 0]}
                          hide={hiddenCat["prior"]}
                        />
                      </BarChart>
                    </ChartContainer>
                  </div>
                  <ChartSeriesLegend
                    config={ordersByCatConfig}
                    hidden={hiddenCat}
                    onToggle={(k) =>
                      setHiddenCat((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* GMV by Category — Treemap */}
          <div className="col-span-12 md:col-span-6">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle className="text-md">
                  GMV by Category
                </CardHeaderTitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer config={{}} className="h-64 w-full">
                    <Treemap
                      data={gmvCatData}
                      dataKey="value"
                      content={<GmvCell />}
                    >
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0]
                            .payload as (typeof gmvCatData)[0];
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
                                ${(d.value / 1000).toFixed(0)}k
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
                Gross merchandise value share · trailing 12 months
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* ── Row 3: Order Value Distribution | Top Products ────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Histogram */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">
                    Order Value Distribution
                  </p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer
                      config={histConfig}
                      className="h-full w-full"
                    >
                      <BarChart
                        data={orderValueDistData}
                        barCategoryGap="3%"
                        margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid
                          vertical={false}
                          stroke="var(--border)"
                          strokeOpacity={0.6}
                          strokeWidth={0.5}
                        />
                        <XAxis
                          dataKey="bin"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          dy={6}
                          interval={1}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          tickFormatter={(v: number) =>
                            `${(v / 1000).toFixed(0)}k`
                          }
                          width={36}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(histConfig, (v) =>
                                v.toLocaleString(),
                              )}
                            />
                          }
                        />
                        <Bar
                          dataKey="count"
                          fill="var(--chart-1)"
                          fillOpacity={0.85}
                          radius={[3, 3, 0, 0]}
                        />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Top Products — table */}
          <div className="col-span-12 md:col-span-8">
            <CardHeader>
              <CardHeaderTitle>Top Products</CardHeaderTitle>
              <CardHeaderSubtitle>
                Top 8 products by GMV · trailing 12 months
              </CardHeaderSubtitle>
            </CardHeader>
            <TableWrapper>
              <Table scrollable horizontal vertical height={300}>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Units</TableHead>
                    <TableHead className="text-right">GMV</TableHead>
                    <TableHead className="text-right">Return %</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.cat}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {row.units.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        ${row.gmv.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {row.ret}%
                      </TableCell>
                      <TableCell>
                        <SimpleBadge
                          variant={
                            row.trend === "Up"
                              ? "green"
                              : row.trend === "Down"
                                ? "red"
                                : "secondary"
                          }
                        >
                          {row.trend}
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

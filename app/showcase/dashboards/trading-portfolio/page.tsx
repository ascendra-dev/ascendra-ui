"use client";

import {
  BackLink,
  Card,
  CardFooter,
  CardHeader,
  CardHeaderSubtitle,
  CardHeaderTitle,
  CardPanel,
  ChartLegend,
  ChartLegendGroup,
  ChartTargetLegend,
  DashboardContent,
  PageHeader,
  PageHeaderAction,
  PageHeaderGroup,
  PageSubtitle,
  PageTitle,
  SimpleBadge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
  TableWrapper,
} from "@/ascendra-ui";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/ascendra-ui/shadcn";
import { ChartSeriesLegend } from "@/components/charts/chart-series-legend";
import { makeTooltipFormatter } from "@/components/charts/make-tooltip-formatter";
import { useState } from "react";
import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "Portfolio Value", value: "$1.48M", delta: "+$98.8k", up: true },
  { label: "Day P&L", value: "+$8,240", delta: "+0.56%", up: true },
  { label: "Beta", value: "1.12", delta: "−0.04", up: true },
  { label: "Sharpe Ratio", value: "1.84", delta: "+0.12", up: true },
] as const;

// ─── Candlestick helpers ───────────────────────────────────────────────────────

type Candle = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  bodyBase: number;
  bodyHeight: number;
  wickBase: number;
  wickTop: number;
  bullish: boolean;
  ma: number | null;
};

function makeCandle(
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
  ma: number | null = null,
): Candle {
  return {
    date,
    open,
    high,
    low,
    close,
    volume,
    bodyBase: Math.min(open, close),
    bodyHeight: Math.abs(close - open),
    wickBase: low,
    wickTop: high - low,
    bullish: close >= open,
    ma,
  };
}

// ─── 40-day Price Action ───────────────────────────────────────────────────────

const priceData: Candle[] = [
  makeCandle("Feb 2", 165.2, 167.8, 163.4, 167.1, 124000),
  makeCandle("Feb 3", 167.1, 169.4, 165.8, 166.2, 98000),
  makeCandle("Feb 4", 166.2, 168.2, 164.6, 168.0, 112000),
  makeCandle("Feb 5", 168.0, 170.6, 167.2, 169.8, 134000),
  makeCandle("Feb 6", 169.8, 172.4, 168.6, 171.4, 156000),
  makeCandle("Feb 9", 171.4, 174.2, 170.2, 173.8, 142000),
  makeCandle("Feb 10", 173.8, 175.0, 171.6, 172.4, 118000),
  makeCandle("Feb 11", 172.4, 174.8, 171.0, 174.2, 128000),
  makeCandle("Feb 12", 174.2, 176.8, 173.0, 175.6, 144000),
  makeCandle("Feb 13", 175.6, 177.4, 174.2, 176.8, 138000),
  makeCandle("Feb 16", 176.8, 186.4, 175.6, 185.2, 312000),
  makeCandle("Feb 17", 185.2, 188.6, 183.8, 186.8, 248000),
  makeCandle("Feb 18", 186.8, 189.2, 184.2, 184.8, 198000),
  makeCandle("Feb 19", 184.8, 186.4, 182.8, 185.6, 172000),
  makeCandle("Feb 20", 185.6, 187.2, 183.4, 184.2, 164000),
  makeCandle("Feb 23", 184.2, 185.8, 180.6, 181.4, 186000),
  makeCandle("Feb 24", 181.4, 183.2, 179.2, 180.2, 168000),
  makeCandle("Feb 25", 180.2, 182.4, 178.6, 181.8, 152000),
  makeCandle("Feb 26", 181.8, 183.6, 180.4, 182.4, 142000),
  makeCandle("Feb 27", 182.4, 184.2, 181.0, 183.6, 128000, 177.6),
  makeCandle("Mar 2", 183.6, 185.8, 182.4, 184.8, 118000, 179.4),
  makeCandle("Mar 3", 184.8, 186.4, 183.6, 185.2, 124000, 181.2),
  makeCandle("Mar 4", 185.2, 187.0, 184.0, 186.4, 136000, 182.8),
  makeCandle("Mar 5", 186.4, 187.8, 184.8, 185.6, 122000, 183.8),
  makeCandle("Mar 6", 185.6, 187.2, 184.2, 186.8, 118000, 184.6),
  makeCandle("Mar 9", 186.8, 192.4, 186.2, 191.6, 214000, 185.8),
  makeCandle("Mar 10", 191.6, 194.8, 190.2, 193.4, 188000, 187.2),
  makeCandle("Mar 11", 193.4, 196.2, 192.0, 195.2, 172000, 188.6),
  makeCandle("Mar 12", 195.2, 197.6, 193.8, 196.4, 162000, 190.2),
  makeCandle("Mar 13", 196.4, 198.4, 194.2, 197.8, 156000, 191.8),
  makeCandle("Mar 16", 197.8, 202.4, 196.8, 201.2, 196000, 193.2),
  makeCandle("Mar 17", 201.2, 205.8, 199.6, 204.4, 218000, 195.4),
  makeCandle("Mar 18", 204.4, 208.2, 203.2, 207.6, 234000, 197.8),
  makeCandle("Mar 19", 207.6, 210.4, 206.2, 209.8, 214000, 200.2),
  makeCandle("Mar 20", 209.8, 213.2, 208.4, 212.4, 228000, 202.6),
  makeCandle("Mar 23", 212.4, 216.0, 211.2, 214.8, 202000, 204.8),
  makeCandle("Mar 24", 214.8, 218.4, 213.2, 216.4, 186000, 206.2),
  makeCandle("Mar 25", 216.4, 218.8, 214.6, 215.2, 168000, 207.8),
  makeCandle("Mar 26", 215.2, 217.4, 213.8, 216.8, 154000, 209.4),
  makeCandle("Mar 27", 216.8, 219.2, 215.4, 218.2, 178000, 211.2),
];

const GREEN = "var(--chart-2)";
const BEAR = "var(--destructive)";

function OHLCTooltip({
  payload,
  label,
}: {
  payload?: Array<{ payload: Candle }>;
  label?: string;
}) {
  if (!payload?.length) return null;
  const d = payload[0].payload;
  const color = d.bullish ? GREEN : BEAR;
  return (
    <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-md min-w-32.5">
      <div className="font-medium text-foreground mb-1.5">{label}</div>
      {(
        [
          ["Open", d.open],
          ["High", d.high],
          ["Low", d.low],
          ["Close", d.close],
        ] as [string, number][]
      ).map(([k, v]) => (
        <div
          key={k}
          className="flex justify-between gap-4 text-muted-foreground"
        >
          {k}
          <span className="font-medium" style={{ color }}>
            ${v.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}

const priceConfig: ChartConfig = {
  ma: { label: "20-day MA", color: "var(--chart-4)" },
};

// ─── Return Distribution ───────────────────────────────────────────────────────

const returnDistData = [
  { bin: "−3%", count: 4, curve: 3.2 },
  { bin: "−2.5%", count: 8, curve: 8.4 },
  { bin: "−2%", count: 14, curve: 18.6 },
  { bin: "−1.5%", count: 22, curve: 34.2 },
  { bin: "−1%", count: 38, curve: 52.8 },
  { bin: "−0.5%", count: 54, curve: 62.4 },
  { bin: "0%", count: 62, curve: 64.2 },
  { bin: "0.5%", count: 58, curve: 60.8 },
  { bin: "1%", count: 44, curve: 50.4 },
  { bin: "1.5%", count: 28, curve: 34.6 },
  { bin: "2%", count: 16, curve: 19.2 },
  { bin: "2.5%", count: 10, curve: 9.4 },
  { bin: "3%", count: 7, curve: 4.2 },
  { bin: "3%+", count: 4, curve: 2.0 },
];

const returnConfig: ChartConfig = {
  count: { label: "Days", color: "var(--chart-1)" },
  curve: { label: "Normal", color: "var(--chart-3)" },
};

// ─── Risk vs Return Scatter ────────────────────────────────────────────────────

const riskReturnData = [
  { ticker: "AAPL", vol: 18.2, ret: 24.8, z: 120 },
  { ticker: "MSFT", vol: 16.8, ret: 22.4, z: 110 },
  { ticker: "NVDA", vol: 34.6, ret: 68.2, z: 80 },
  { ticker: "AMZN", vol: 24.2, ret: 18.4, z: 90 },
  { ticker: "GOOGL", vol: 19.8, ret: 20.6, z: 75 },
  { ticker: "META", vol: 28.4, ret: 42.8, z: 65 },
  { ticker: "TSLA", vol: 48.2, ret: 15.2, z: 55 },
  { ticker: "BRK", vol: 12.4, ret: 14.8, z: 130 },
  { ticker: "JPM", vol: 20.6, ret: 16.2, z: 85 },
  { ticker: "V", vol: 14.8, ret: 18.8, z: 80 },
  { ticker: "JNJ", vol: 11.2, ret: 8.4, z: 100 },
  { ticker: "XOM", vol: 22.4, ret: 12.6, z: 60 },
];

const scatterConfig: ChartConfig = {
  ret: { label: "YTD Return", color: "var(--chart-1)" },
};

// ─── Price + Volume (last 20 candles) ─────────────────────────────────────────

const miniData = priceData.slice(-20);

// ─── Positions Table ───────────────────────────────────────────────────────────

const positions = [
  {
    ticker: "JPM",
    name: "JPMorgan Chase",
    shares: 220,
    avgCost: 152.8,
    current: 196.8,
    pnl: 9680,
    pnlPct: 28.8,
    weight: 14.6,
    beta: 1.12,
  },
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    shares: 280,
    avgCost: 152.4,
    current: 218.2,
    pnl: 18424,
    pnlPct: 43.2,
    weight: 12.8,
    beta: 1.18,
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corp.",
    shares: 85,
    avgCost: 420.8,
    current: 824.16,
    pnl: 34286,
    pnlPct: 95.9,
    weight: 11.9,
    beta: 1.84,
  },
  {
    ticker: "BRK",
    name: "Berkshire Hathaway",
    shares: 55,
    avgCost: 512.6,
    current: 618.4,
    pnl: 5819,
    pnlPct: 20.6,
    weight: 11.5,
    beta: 0.64,
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corp.",
    shares: 150,
    avgCost: 298.2,
    current: 418.64,
    pnl: 18066,
    pnlPct: 40.4,
    weight: 11.3,
    beta: 0.92,
  },
  {
    ticker: "JNJ",
    name: "Johnson & Johnson",
    shares: 180,
    avgCost: 156.4,
    current: 168.8,
    pnl: 2232,
    pnlPct: 7.9,
    weight: 10.3,
    beta: 0.42,
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    shares: 200,
    avgCost: 138.4,
    current: 182.2,
    pnl: 8760,
    pnlPct: 31.7,
    weight: 9.8,
    beta: 1.22,
  },
  {
    ticker: "TSLA",
    name: "Tesla",
    shares: 95,
    avgCost: 248.6,
    current: 264.4,
    pnl: 1501,
    pnlPct: 6.4,
    weight: 8.5,
    beta: 2.08,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TradingPortfolioPage() {
  const [hiddenReturn, setHiddenReturn] = useState<Record<string, boolean>>({});

  return (
    <>
      <BackLink href="/showcase/dashboards">Dashboard Gallery</BackLink>

      <PageHeader variant="dashboard">
        <PageHeaderGroup>
          <PageTitle>Trading &amp; Portfolio</PageTitle>
          <PageSubtitle>
            OHLC price action, return distribution, risk-adjusted returns, and
            position-level P&amp;L — the core view for a quantitative equity
            portfolio.
          </PageSubtitle>
        </PageHeaderGroup>
        <PageHeaderAction className="w-fit">
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-500/20 dark:text-amber-400 dark:ring-amber-500/30">
            Finance / Trading
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

        {/* ── Row 1: Price Action — full width, h-80 ───────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Price Action</CardHeaderTitle>
                <CardHeaderSubtitle>
                  40 trading days · OHLC candlestick with 20-day moving average
                  overlay
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer config={priceConfig} className="h-80 w-full">
                    <ComposedChart
                      data={priceData}
                      margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="var(--border)"
                        strokeOpacity={0.6}
                        strokeWidth={0.5}
                      />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10 }}
                        dy={6}
                        interval={4}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        width={48}
                        domain={[158, 222]}
                        tickFormatter={(v) => `$${v}`}
                      />
                      <ChartTooltip
                        content={(props) => (
                          <OHLCTooltip
                            payload={
                              props.payload as unknown as Array<{
                                payload: Candle;
                              }>
                            }
                            label={props.label as string}
                          />
                        )}
                      />
                      {/* Wick: transparent base + thin full-range bar */}
                      <Bar
                        dataKey="wickBase"
                        stackId="candle"
                        fill="transparent"
                        legendType="none"
                        isAnimationActive={false}
                      />
                      <Bar
                        dataKey="wickTop"
                        stackId="candle"
                        barSize={2}
                        radius={0}
                        legendType="none"
                        isAnimationActive={false}
                      >
                        {priceData.map((d, i) => (
                          <Cell
                            key={i}
                            fill={d.bullish ? GREEN : BEAR}
                            fillOpacity={0.55}
                          />
                        ))}
                      </Bar>
                      {/* Body: transparent base + colored body */}
                      <Bar
                        dataKey="bodyBase"
                        stackId="body"
                        fill="transparent"
                        legendType="none"
                        isAnimationActive={false}
                      />
                      <Bar
                        dataKey="bodyHeight"
                        stackId="body"
                        barSize={10}
                        radius={[1, 1, 1, 1]}
                        legendType="none"
                        isAnimationActive={false}
                      >
                        {priceData.map((d, i) => (
                          <Cell key={i} fill={d.bullish ? GREEN : BEAR} />
                        ))}
                      </Bar>
                      {/* 20-day MA */}
                      <Line
                        type="monotone"
                        dataKey="ma"
                        stroke="var(--chart-4)"
                        strokeWidth={1.5}
                        dot={false}
                        connectNulls={false}
                        legendType="none"
                      />
                    </ComposedChart>
                  </ChartContainer>
                  <ChartLegendGroup className="mt-3">
                    <ChartLegend variant="chart-2" shape="round">
                      Bullish close
                    </ChartLegend>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: BEAR }}
                      />
                      Bearish close
                    </div>
                    <ChartTargetLegend variant="chart-4">
                      20-day MA
                    </ChartTargetLegend>
                  </ChartLegendGroup>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 2: Return Distribution | Risk vs Return | Price + Volume ─── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Return Distribution histogram */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">
                    Return Distribution
                  </p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer
                      config={returnConfig}
                      className="h-52 w-full"
                    >
                      <ComposedChart
                        data={returnDistData}
                        barCategoryGap="4%"
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
                          tick={{ fontSize: 9 }}
                          dy={6}
                          interval={1}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 10 }}
                          width={28}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(
                                returnConfig,
                                (v) => String(v),
                              )}
                            />
                          }
                        />
                        <Bar
                          dataKey="count"
                          fill="var(--chart-1)"
                          fillOpacity={0.75}
                          radius={[2, 2, 0, 0]}
                          hide={hiddenReturn["count"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="curve"
                          stroke="var(--chart-3)"
                          strokeWidth={2}
                          dot={false}
                          hide={hiddenReturn["curve"]}
                        />
                      </ComposedChart>
                    </ChartContainer>
                  </div>
                  <ChartSeriesLegend
                    config={returnConfig}
                    hidden={hiddenReturn}
                    onToggle={(k) =>
                      setHiddenReturn((p) => ({ ...p, [k]: !p[k] }))
                    }
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Risk vs Return Scatter */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Risk vs Return</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Annualised vol vs YTD return · bubble = position size
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer
                    config={scatterConfig}
                    className="h-52 w-full"
                  >
                    <ScatterChart
                      margin={{ top: 4, right: 12, left: 0, bottom: 16 }}
                    >
                      <CartesianGrid
                        stroke="var(--border)"
                        strokeOpacity={0.6}
                        strokeWidth={0.5}
                      />
                      <XAxis
                        dataKey="vol"
                        type="number"
                        name="Volatility"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10 }}
                        tickFormatter={(v) => `${v}%`}
                        domain={[8, 52]}
                        label={{
                          value: "Volatility %",
                          position: "insideBottom",
                          offset: -8,
                          fontSize: 10,
                          fill: "var(--muted-foreground)",
                        }}
                      />
                      <YAxis
                        dataKey="ret"
                        type="number"
                        name="Return"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10 }}
                        tickFormatter={(v) => `${v}%`}
                        width={36}
                      />
                      <ZAxis dataKey="z" range={[40, 300]} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0]
                            .payload as (typeof riskReturnData)[0];
                          return (
                            <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-md">
                              <div className="mb-1 font-semibold">
                                {d.ticker}
                              </div>
                              <div className="text-muted-foreground">
                                Vol:{" "}
                                <span className="text-foreground font-medium">
                                  {d.vol}%
                                </span>
                              </div>
                              <div className="text-muted-foreground">
                                YTD:{" "}
                                <span className="text-foreground font-medium">
                                  +{d.ret}%
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Scatter
                        data={riskReturnData}
                        fill="var(--chart-1)"
                        fillOpacity={0.7}
                      />
                    </ScatterChart>
                  </ChartContainer>
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Price + Volume (last 20 days) */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Price + Volume</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Last 20 sessions · candles with volume pane
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5 flex flex-col gap-1">
                  <ChartContainer config={{}} className="h-36 w-full">
                    <ComposedChart
                      data={miniData}
                      margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                    >
                      <XAxis dataKey="date" hide />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10 }}
                        width={44}
                        domain={[178, 222]}
                        tickFormatter={(v) => `$${v}`}
                      />
                      <ChartTooltip
                        content={(props) => (
                          <OHLCTooltip
                            payload={
                              props.payload as unknown as Array<{
                                payload: Candle;
                              }>
                            }
                            label={props.label as string}
                          />
                        )}
                      />
                      <Bar
                        dataKey="wickBase"
                        stackId="c"
                        fill="transparent"
                        legendType="none"
                        isAnimationActive={false}
                      />
                      <Bar
                        dataKey="wickTop"
                        stackId="c"
                        barSize={2}
                        legendType="none"
                        isAnimationActive={false}
                      >
                        {miniData.map((d, i) => (
                          <Cell
                            key={i}
                            fill={d.bullish ? GREEN : BEAR}
                            fillOpacity={0.5}
                          />
                        ))}
                      </Bar>
                      <Bar
                        dataKey="bodyBase"
                        stackId="b"
                        fill="transparent"
                        legendType="none"
                        isAnimationActive={false}
                      />
                      <Bar
                        dataKey="bodyHeight"
                        stackId="b"
                        barSize={8}
                        radius={[1, 1, 1, 1]}
                        legendType="none"
                        isAnimationActive={false}
                      >
                        {miniData.map((d, i) => (
                          <Cell key={i} fill={d.bullish ? GREEN : BEAR} />
                        ))}
                      </Bar>
                    </ComposedChart>
                  </ChartContainer>
                  <ChartContainer config={{}} className="h-16 w-full">
                    <BarChart
                      data={miniData}
                      margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
                    >
                      <XAxis dataKey="date" hide />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 9 }}
                        width={44}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                        tickCount={2}
                      />
                      <Bar
                        dataKey="volume"
                        radius={[2, 2, 0, 0]}
                        isAnimationActive={false}
                      >
                        {miniData.map((d, i) => (
                          <Cell
                            key={i}
                            fill={d.bullish ? GREEN : BEAR}
                            fillOpacity={0.45}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 3: Positions Table — full width ──────────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <CardHeader>
              <CardHeaderTitle>Positions</CardHeaderTitle>
              <CardHeaderSubtitle>
                8 holdings · sorted by portfolio weight
              </CardHeaderSubtitle>
            </CardHeader>
            <TableWrapper>
              <Table scrollable horizontal vertical height={340}>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Shares</TableHead>
                    <TableHead className="text-right">Avg Cost</TableHead>
                    <TableHead className="text-right">Current</TableHead>
                    <TableHead className="text-right">P&amp;L $</TableHead>
                    <TableHead className="text-right">P&amp;L %</TableHead>
                    <TableHead className="text-right">Weight</TableHead>
                    <TableHead className="text-right">Beta</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {positions.map((row) => (
                    <TableRow key={row.ticker}>
                      <TableCell className="font-mono font-semibold">
                        {row.ticker}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.name}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {row.shares}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        ${row.avgCost.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        ${row.current.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                        +${row.pnl.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        <SimpleBadge variant="green">
                          +{row.pnlPct}%
                        </SimpleBadge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {row.weight}%
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {row.beta}
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

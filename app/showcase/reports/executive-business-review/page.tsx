"use client";

import {
  BackLink,
  ReportPdfExportButton,
  Card,
  CardHeader,
  CardHeaderSubtitle,
  CardHeaderTitle,
  CardPanel,
  ReportHeaderBody,
  ReportHeaderContent,
  ReportHeaderField,
  ReportHeaderFooter,
  ReportSubTitle,
  ReportTitle,
  ReportTitleHeader,
  SimpleBadge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
  TableWrapper,
  ReportDocumentFooter,
  ReportDocumentFooterLine,
  ReportDocumentFooterLineLeft,
  ReportDocumentFooterLineRight,
  SimpleAlert,
  ReportDocumentWrapper,
  ReportHeaderBodyWrap,
  ReportSectionHeader,
  ChartLegend,
  ChartLegendGroup,
} from "@/ascendra-ui";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/ascendra-ui/shadcn";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  {
    label: "H1 Revenue",
    value: "$142.4M",
    delta: "+18.2%",
    py: "$120.5M",
    up: true,
  },
  {
    label: "Gross Profit",
    value: "$58.6M",
    delta: "+21.4%",
    py: "$48.3M",
    up: true,
  },
  { label: "EBITDA", value: "$28.1M", delta: "+24.8%", py: "$22.5M", up: true },
  {
    label: "Cash Position",
    value: "$44.2M",
    delta: "+22.8%",
    py: "$36.0M",
    up: true,
  },
] as const;

// ─── Monthly revenue ($M) ──────────────────────────────────────────────────────

const monthlyData = [
  { month: "Jan", fy2024: 21.4, fy2023: 18.2 },
  { month: "Feb", fy2024: 20.8, fy2023: 17.8 },
  { month: "Mar", fy2024: 23.6, fy2023: 19.8 },
  { month: "Apr", fy2024: 22.9, fy2023: 19.5 },
  { month: "May", fy2024: 24.8, fy2023: 21.4 },
  { month: "Jun", fy2024: 28.9, fy2023: 23.8 },
];

const revChartConfig: ChartConfig = {
  fy2024: { label: "H1 2024", color: "var(--chart-1)" },
  fy2023: { label: "H1 2023", color: "var(--chart-2)" },
};

// ─── Division performance ──────────────────────────────────────────────────────

const divisions = [
  {
    name: "North America",
    revenue: 68.4,
    pct: 48.0,
    vsTarget: +4.2,
    vsLY: +21.3,
  },
  { name: "Europe", revenue: 32.8, pct: 23.0, vsTarget: +1.8, vsLY: +14.6 },
  {
    name: "Asia-Pacific",
    revenue: 22.4,
    pct: 15.7,
    vsTarget: -2.1,
    vsLY: +18.9,
  },
  {
    name: "Enterprise Accounts",
    revenue: 13.2,
    pct: 9.3,
    vsTarget: +6.4,
    vsLY: +22.1,
  },
  { name: "SMB & Other", revenue: 5.6, pct: 3.9, vsTarget: -4.8, vsLY: +8.4 },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function pctCls(v: number) {
  return v >= 0
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-rose-600 dark:text-rose-400";
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ExecutiveBusinessReviewPage() {
  return (
    <>
      <BackLink href="/showcase/reports">Report Gallery</BackLink>

      <ReportDocumentWrapper>
        {/* ── Document Header ──────────────────────────────────────────────── */}
        <Card>
          <CardPanel border={{ color: "slate" }}>
            <ReportHeaderContent className="bg-slate-900 dark:bg-slate-900">
              <ReportHeaderBody>
                <ReportHeaderBodyWrap>
                  <ReportTitle className="text-slate-400">
                    Executive Business Review
                  </ReportTitle>
                  <ReportTitleHeader className="text-white">
                    Ascendra Holdings Ltd.
                  </ReportTitleHeader>
                  <ReportSubTitle className="text-slate-400">
                    First Half 2024 · January – June 2024
                  </ReportSubTitle>
                </ReportHeaderBodyWrap>
                <SimpleBadge variant={"secondary"}>
                  Board Confidential
                </SimpleBadge>
              </ReportHeaderBody>
              <ReportHeaderFooter className="border-slate-700/60 text-slate-400 [&_span:first-child]:text-slate-200">
                <ReportHeaderField label="Prepared for">
                  Board of Directors
                </ReportHeaderField>
                <ReportHeaderField label="Report Date">
                  July 12, 2024
                </ReportHeaderField>
                <ReportHeaderField label="Prepared by">
                  Office of the CFO
                </ReportHeaderField>
              </ReportHeaderFooter>
            </ReportHeaderContent>
          </CardPanel>
        </Card>

        {/* ── H1 KPIs (oversized) ──────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>H1 2024 Performance Highlights</CardHeaderTitle>
            <CardHeaderSubtitle>
              Key metrics for the six months ended June 30, 2024 vs. prior year
            </CardHeaderSubtitle>
          </ReportSectionHeader>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="flex flex-col gap-1.5">
                <p className="text-xs text-muted-foreground">{k.label}</p>
                <p className="text-4xl font-bold tracking-tight text-foreground">
                  {k.value}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`flex items-center gap-0.5 font-semibold ${k.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                  >
                    {k.up ? (
                      <LuTrendingUp className="size-3" />
                    ) : (
                      <LuTrendingDown className="size-3" />
                    )}
                    {k.delta}
                  </span>
                  <span className="text-muted-foreground">vs {k.py}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Monthly Revenue Chart ────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardHeaderTitle>
              Monthly Revenue — H1 2024 vs H1 2023
            </CardHeaderTitle>
            <CardHeaderSubtitle>
              Total revenue by month · in millions USD
            </CardHeaderSubtitle>
          </CardHeader>
          <CardPanel>
            <div className="p-6">
              <ChartContainer config={revChartConfig} className="h-56 w-full">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                  barCategoryGap="28%"
                  barGap={4}
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
                    tickFormatter={(v: number) => `$${v}M`}
                    width={40}
                    domain={[0, 35]}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(v, k) => [
                          `$${Number(v).toFixed(1)}M`,
                          revChartConfig[k as keyof typeof revChartConfig]
                            ?.label ?? k,
                        ]}
                      />
                    }
                  />
                  <Bar
                    dataKey="fy2024"
                    fill="var(--chart-1)"
                    fillOpacity={0.85}
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="fy2023"
                    fill="var(--chart-2)"
                    fillOpacity={0.6}
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
              <ChartLegendGroup align="left" className="mt-3">
                <ChartLegend variant="chart-1" shape="square">H1 2024</ChartLegend>
                <ChartLegend variant="chart-2" shape="square">H1 2023</ChartLegend>
              </ChartLegendGroup>
            </div>
          </CardPanel>
        </Card>

        {/* ── Division Performance ─────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Division Performance</CardHeaderTitle>
            <CardHeaderSubtitle>
              Revenue by business unit for H1 2024 — in millions USD
            </CardHeaderSubtitle>
          </ReportSectionHeader>
          <TableWrapper>
            <Table horizontal vertical scrollable>
              <TableHeader>
                <TableHeaderRow>
                  <TableHead>Division</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                  <TableHead className="text-right">vs. Target</TableHead>
                  <TableHead className="text-right">vs. Prior Year</TableHead>
                </TableHeaderRow>
              </TableHeader>
              <TableBody border={{}} bg={{}}>
                {divisions.map((d) => (
                  <TableRow key={d.name}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      ${d.revenue.toFixed(1)}M
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground tabular-nums">
                      {d.pct.toFixed(1)}%
                    </TableCell>
                    <TableCell
                      className={`text-right font-mono font-medium tabular-nums ${pctCls(d.vsTarget)}`}
                    >
                      {d.vsTarget >= 0 ? "+" : ""}
                      {d.vsTarget.toFixed(1)}%
                    </TableCell>
                    <TableCell
                      className={`text-right font-mono font-medium tabular-nums ${pctCls(d.vsLY)}`}
                    >
                      {d.vsLY >= 0 ? "+" : ""}
                      {d.vsLY.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
                {/* Total row */}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-mono font-bold tabular-nums">
                    $142.4M
                  </TableCell>
                  <TableCell className="text-right font-bold tabular-nums">
                    100.0%
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                    +2.8%
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                    +18.2%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableWrapper>
        </div>

        {/* ── Executive Highlights ─────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Executive Highlights</CardHeaderTitle>
          </ReportSectionHeader>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Achievements */}
            <SimpleAlert variant="success" icon={false} className="flex-col items-start gap-3 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide">
                Achievements
              </p>
              <ul className="flex flex-col gap-2.5 text-sm">
                {[
                  "H1 revenue exceeded board guidance by 2.8%, led by a strong close in June.",
                  "North America exceeded its quarterly target for the sixth consecutive quarter.",
                  "Cash position improved by $8.2M quarter-on-quarter, ahead of year-end target.",
                  "Enterprise segment delivered strongest growth at +22.1% year-over-year.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                    {item}
                  </li>
                ))}
              </ul>
            </SimpleAlert>

            {/* Focus areas */}
            <SimpleAlert variant="warning" icon={false} className="flex-col items-start gap-3 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide">
                Focus Areas
              </p>
              <ul className="flex flex-col gap-2.5 text-sm">
                {[
                  "Asia-Pacific finished 2.1% below target; recovery plan activated with updated go-to-market approach.",
                  "SMB segment faces continued pricing headwinds — full pricing review underway, results expected Q3.",
                  "Integration of Q4 2023 acquisition on track; $2.4M in synergies realized year-to-date.",
                  "H2 investment plan prioritises Asia-Pacific and product-led growth in SMB.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                    {item}
                  </li>
                ))}
              </ul>
            </SimpleAlert>
          </div>
        </div>

        {/* ── Report Footer ─────────────────────────────────────────────────── */}
        <ReportDocumentFooter>
          <ReportDocumentFooterLine>
            <ReportDocumentFooterLineLeft>
              Ascendra Holdings Ltd. — Board of Directors
            </ReportDocumentFooterLineLeft>
            <ReportDocumentFooterLineRight>
              <span>H1 FY2024 Executive Review</span>
              <span>·</span>
              <span>Board Confidential</span>
              <span>·</span>
              <span>July 12, 2024</span>
            </ReportDocumentFooterLineRight>
          </ReportDocumentFooterLine>
        </ReportDocumentFooter>
      </ReportDocumentWrapper>
      <ReportPdfExportButton fileName="executive-business-review" />
    </>
  );
}

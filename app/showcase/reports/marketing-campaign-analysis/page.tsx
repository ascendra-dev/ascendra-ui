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
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "Total Impressions",    value: "18.4M",  sub: "+24% vs prior campaign" },
  { label: "Conversions",          value: "14,820", sub: "2.8% blended conv. rate" },
  { label: "Blended ROAS",         value: "3.8×",   sub: "Target was 3.5×"         },
  { label: "Cost per Conversion",  value: "$28.40", sub: "–$4.10 vs target"        },
];

// ─── Channel performance ──────────────────────────────────────────────────────

const channels = [
  { channel: "Paid Search", impressions: 5_800, clicks: 248, conversions: 5_420, spend: 142_000, revenue: 648_000 },
  { channel: "Social",      impressions: 6_200, clicks: 184, conversions: 3_960, spend: 118_000, revenue: 382_000 },
  { channel: "Email",       impressions: 3_100, clicks: 320, conversions: 3_200, spend:  24_000, revenue: 298_000 },
  { channel: "Display",     impressions: 2_400, clicks:  62, conversions:  980,  spend:  68_000, revenue:  88_000 },
  { channel: "Affiliate",   impressions:   900, clicks:  94, conversions: 1_260, spend:  69_200, revenue: 131_000 },
];

const channelConfig: ChartConfig = {
  impressions: { label: "Impressions (000s)", color: "var(--chart-1)" },
  clicks:      { label: "Clicks (000s)",      color: "var(--chart-2)" },
  conversions: { label: "Conversions",        color: "var(--chart-3)" },
};

// ─── Conversion funnel ────────────────────────────────────────────────────────

const funnel = [
  { stage: "Impressions",  count: 18_400_000 },
  { stage: "Clicks",       count:    908_000 },
  { stage: "Landing Page", count:    620_000 },
  { stage: "Lead",         count:     52_000 },
  { stage: "Conversion",   count:     14_820 },
];

// ─── Audience donut ───────────────────────────────────────────────────────────

const audience = [
  { name: "25–34",  value: 34, color: "var(--chart-1)" },
  { name: "35–44",  value: 26, color: "var(--chart-2)" },
  { name: "18–24",  value: 19, color: "var(--chart-3)" },
  { name: "45–54",  value: 13, color: "var(--chart-4)" },
  { name: "55+",    value:  8, color: "var(--chart-5)" },
];

const audienceConfig: ChartConfig = Object.fromEntries(
  audience.map((a) => [a.name, { label: a.name, color: a.color }])
);

// ─── Campaign ROI table ───────────────────────────────────────────────────────

const campaigns = [
  { name: "Summer Sale — Search",    spend: 142_000, revenue: 648_000, cpc: 1.14, conversions: 5_420 },
  { name: "Brand Awareness — Social",spend: 118_000, revenue: 382_000, cpc: 1.28, conversions: 3_960 },
  { name: "Retention — Email",        spend:  24_000, revenue: 298_000, cpc: 0.19, conversions: 3_200 },
  { name: "Retargeting — Display",    spend:  68_000, revenue:  88_000, cpc: 2.18, conversions:   980 },
  { name: "Partner — Affiliate",      spend:  69_200, revenue: 131_000, cpc: 1.47, conversions: 1_260 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function roas(spend: number, revenue: number) {
  return (revenue / spend).toFixed(1);
}

function roasCls(r: string) {
  const n = parseFloat(r);
  if (n >= 4) return "text-emerald-600 dark:text-emerald-400 font-semibold";
  if (n >= 2.5) return "text-foreground";
  return "text-rose-600 dark:text-rose-400";
}

function fmtK(n: number) {
  return n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(0)}K`
    : String(n);
}


// ─── Conversion Funnel ────────────────────────────────────────────────────────

function ConversionFunnel() {
  const top = funnel[0].count;
  return (
    <div className="flex flex-col gap-1">
      {funnel.map((step, i) => {
        const pct = ((step.count / top) * 100).toFixed(1);
        const dropOff =
          i > 0
            ? (((funnel[i - 1].count - step.count) / funnel[i - 1].count) * 100).toFixed(0)
            : null;
        return (
          <div key={step.stage}>
            {dropOff !== null && (
              <div className="flex items-center justify-center gap-1.5 py-0.5 text-[0.6875rem] text-muted-foreground/60">
                <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current opacity-40">
                  <path d="M8 12L2 5h12z" />
                </svg>
                –{dropOff}% drop-off
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-right text-sm font-medium text-foreground">
                {step.stage}
              </span>
              <div className="relative flex-1">
                <div className="h-10 w-full rounded bg-muted/40" />
                <div
                  className="absolute inset-y-0 left-0 rounded bg-purple-500/75"
                  style={{ width: `${pct}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-3">
                  <span className="text-xs font-semibold text-white drop-shadow">
                    {fmtK(step.count)}
                  </span>
                  <span className="text-xs text-white/80 drop-shadow">{pct}%</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MarketingCampaignAnalysisPage() {
  return (
    <>
      <BackLink href="/showcase/reports">Report Gallery</BackLink>

      <ReportDocumentWrapper>

        {/* ── Document Header ──────────────────────────────────────────────── */}
        <Card>
          <CardPanel border={{ color: "purple" }}>
            <ReportHeaderContent>
              <ReportHeaderBody>
                <ReportHeaderBodyWrap>
                  <ReportTitle>Marketing Campaign Analysis</ReportTitle>
                  <ReportTitleHeader>Summer 2024 Multi-Channel Campaign</ReportTitleHeader>
                  <ReportSubTitle>Campaign period: June 1 – August 31, 2024</ReportSubTitle>
                </ReportHeaderBodyWrap>
                <SimpleBadge variant={"violet"}>Internal</SimpleBadge>
              </ReportHeaderBody>
              <ReportHeaderFooter>
                <ReportHeaderField label="Prepared by">Growth &amp; Demand Gen</ReportHeaderField>
                <ReportHeaderField label="Report Date">September 10, 2024</ReportHeaderField>
                <ReportHeaderField label="Total Campaign Spend">$421,200</ReportHeaderField>
              </ReportHeaderFooter>
            </ReportHeaderContent>
          </CardPanel>
        </Card>

        {/* ── KPIs ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {kpis.map((k) => (
            <Card key={k.label}>
              <CardPanel>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <p className="mt-1.5 text-3xl font-bold tracking-tight text-foreground">{k.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{k.sub}</p>
                </div>
              </CardPanel>
            </Card>
          ))}
        </div>

        {/* ── Channel Performance ──────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardHeaderTitle>Channel Performance Comparison</CardHeaderTitle>
            <CardHeaderSubtitle>Impressions (000s), clicks (000s), and conversions by channel</CardHeaderSubtitle>
          </CardHeader>
          <CardPanel>
            <div className="p-6">
              <ChartContainer config={channelConfig} className="h-56 w-full">
                <BarChart
                  data={channels.map((c) => ({
                    channel: c.channel,
                    impressions: Math.round(c.impressions / 100),
                    clicks: Math.round(c.clicks / 10),
                    conversions: Math.round(c.conversions / 100),
                  }))}
                  margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                  barCategoryGap="24%"
                  barGap={3}
                >
                  <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                  <XAxis dataKey="channel" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} dy={6} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} width={32} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="impressions" fill="var(--chart-1)" fillOpacity={0.85} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="clicks"      fill="var(--chart-2)" fillOpacity={0.85} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="conversions" fill="var(--chart-3)" fillOpacity={0.85} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ChartContainer>
              <p className="mt-2 text-[0.6875rem] text-muted-foreground/60">
                Impressions scaled ÷100 · Clicks scaled ÷10 · Conversions scaled ÷100 for readability
              </p>
            </div>
          </CardPanel>
        </Card>

        {/* ── Conversion Funnel + Audience side by side ────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Funnel */}
          <Card>
            <CardHeader>
              <CardHeaderTitle>Conversion Funnel</CardHeaderTitle>
              <CardHeaderSubtitle>Drop-off rates between each stage of the conversion path</CardHeaderSubtitle>
            </CardHeader>
            <CardPanel>
              <div className="p-6">
                <ConversionFunnel />
              </div>
            </CardPanel>
          </Card>

          {/* Audience donut */}
          <Card>
            <CardHeader>
              <CardHeaderTitle>Audience Age Breakdown</CardHeaderTitle>
              <CardHeaderSubtitle>Converted audience by age segment — all channels combined</CardHeaderSubtitle>
            </CardHeader>
            <CardPanel>
              <div className="flex flex-col items-center gap-4 p-6">
                <ChartContainer config={audienceConfig} className="h-48 w-48">
                  <PieChart>
                    <Pie
                      data={audience}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={72}
                      strokeWidth={2}
                      stroke="var(--background)"
                    >
                      {audience.map((a, i) => (
                        <Cell key={i} fill={a.color} fillOpacity={0.85} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(v) => [`${v}%`, "Share"]}
                        />
                      }
                    />
                  </PieChart>
                </ChartContainer>
                <ChartLegendGroup>
                  {audience.map((a, i) => (
                    <ChartLegend key={a.name} variant={(['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] as const)[i]} shape="round">
                      {a.name} · {a.value}%
                    </ChartLegend>
                  ))}
                </ChartLegendGroup>
              </div>
            </CardPanel>
          </Card>
        </div>

        {/* ── Campaign ROI Table ───────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Campaign ROI Summary</CardHeaderTitle>
            <CardHeaderSubtitle>Spend, revenue, ROAS, and CPC by campaign — sorted by ROAS descending</CardHeaderSubtitle>
          </ReportSectionHeader>
          <TableWrapper>
            <Table horizontal vertical scrollable>
              <TableHeader>
                <TableHeaderRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="text-right">Spend</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">ROAS</TableHead>
                  <TableHead className="text-right">CPC</TableHead>
                  <TableHead className="text-right">Conversions</TableHead>
                </TableHeaderRow>
              </TableHeader>
              <TableBody border={{}} bg={{}}>
                {campaigns
                  .slice()
                  .sort((a, b) => b.revenue / b.spend - a.revenue / a.spend)
                  .map((c) => {
                    const r = roas(c.spend, c.revenue);
                    return (
                      <TableRow key={c.name}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="text-right font-mono tabular-nums text-muted-foreground">
                          ${(c.spend / 1000).toFixed(0)}K
                        </TableCell>
                        <TableCell className="text-right font-mono tabular-nums">
                          ${(c.revenue / 1000).toFixed(0)}K
                        </TableCell>
                        <TableCell className={`text-right font-mono tabular-nums ${roasCls(r)}`}>
                          {r}×
                        </TableCell>
                        <TableCell className="text-right font-mono tabular-nums text-muted-foreground">
                          ${c.cpc.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">
                          {c.conversions.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {/* Total row */}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-mono font-bold tabular-nums">$421K</TableCell>
                  <TableCell className="text-right font-mono font-bold tabular-nums">$1,547K</TableCell>
                  <TableCell className="text-right font-mono font-bold tabular-nums text-emerald-600 dark:text-emerald-400">3.7×</TableCell>
                  <TableCell className="text-right font-mono tabular-nums text-muted-foreground">—</TableCell>
                  <TableCell className="text-right font-bold tabular-nums">14,820</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableWrapper>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <ReportDocumentFooter>
          <ReportDocumentFooterLine>
            <ReportDocumentFooterLineLeft>Ascendra — Growth & Demand Generation</ReportDocumentFooterLineLeft>
            <ReportDocumentFooterLineRight>
              <span>Summer 2024 Campaign Analysis</span>
              <span>·</span>
              <span>Internal</span>
              <span>·</span>
              <span>September 10, 2024</span>
            </ReportDocumentFooterLineRight>
          </ReportDocumentFooterLine>
        </ReportDocumentFooter>

      </ReportDocumentWrapper>
      <ReportPdfExportButton fileName="marketing-campaign-analysis" />
    </>
  );
}

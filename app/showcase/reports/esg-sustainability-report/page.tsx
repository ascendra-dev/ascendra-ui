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
  SimpleAlert,
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
  ReportDocumentFooterNote,
  ReportDocumentWrapper,
  ReportHeaderBodyWrap,
  ColorTile,
  ColorTileTitle,
  ColorTileSubTitle,
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
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "Carbon Emissions",      value: "48,200 tCO2e", delta: "–12% YoY", toward: "2030 Net Zero",    positive: true  },
  { label: "Renewable Energy",      value: "64%",          delta: "+8 pp YoY",toward: "Target: 100%",     positive: true  },
  { label: "Workforce Diversity",   value: "43% women",    delta: "+2 pp YoY", toward: "Target: 50%",     positive: true  },
  { label: "Board Independence",    value: "78%",          delta: "stable",    toward: "Policy: ≥ 75%",   positive: true  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ENVIRONMENTAL
// ─────────────────────────────────────────────────────────────────────────────

const emissionsTrend = [
  { year: "2019", scope1: 28_400, scope2: 18_200, scope3: 41_000 },
  { year: "2020", scope1: 25_800, scope2: 16_400, scope3: 37_200 },
  { year: "2021", scope1: 24_200, scope2: 15_100, scope3: 35_800 },
  { year: "2022", scope1: 22_600, scope2: 13_800, scope3: 33_400 },
  { year: "2023", scope1: 19_800, scope2: 12_200, scope3: 16_200 },
];

const emissionsConfig: ChartConfig = {
  scope1: { label: "Scope 1 (Direct)",   color: "var(--chart-1)" },
  scope2: { label: "Scope 2 (Energy)",   color: "var(--chart-2)" },
  scope3: { label: "Scope 3 (Value chain)", color: "var(--chart-3)" },
};

const energyMix = [
  { name: "Solar",    value: 28, color: "var(--chart-1)" },
  { name: "Wind",     value: 22, color: "var(--chart-2)" },
  { name: "Hydro",    value: 14, color: "var(--chart-3)" },
  { name: "Gas",      value: 24, color: "var(--chart-4)" },
  { name: "Coal",     value: 12, color: "var(--chart-5)" },
];

const energyConfig: ChartConfig = Object.fromEntries(
  energyMix.map((e) => [e.name, { label: e.name, color: e.color }])
);

const envTargets = [
  { label: "Net Zero Emissions by 2030",      current: 52, target: 100, note: "48% reduction remaining" },
  { label: "100% Renewable Energy by 2027",   current: 64, target: 100, note: "36 pp remaining"         },
  { label: "Zero Waste to Landfill by 2025",  current: 81, target: 100, note: "19% remaining"            },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL
// ─────────────────────────────────────────────────────────────────────────────

const diversityData = [
  { level: "Exec",       women: 36, men: 64 },
  { level: "Sr. Mgmt",   women: 41, men: 59 },
  { level: "Mid Mgmt",   women: 46, men: 54 },
  { level: "Individual", women: 49, men: 51 },
];

const diversityConfig: ChartConfig = {
  women: { label: "Women %", color: "var(--chart-1)" },
  men:   { label: "Men %",   color: "var(--chart-2)" },
};

const safetyMetrics = [
  { metric: "Total Recordable Incident Rate (TRIR)",  value: "0.42",  benchmark: "< 0.75",  status: "Good"   },
  { metric: "Lost Time Injury Frequency (LTIF)",      value: "0.18",  benchmark: "< 0.30",  status: "Good"   },
  { metric: "Near Miss Reports",                       value: "214",   benchmark: "Tracked", status: "Tracked"},
  { metric: "Safety Training Completion",              value: "98.4%", benchmark: "≥ 95%",   status: "Good"   },
];

// ─────────────────────────────────────────────────────────────────────────────
// GOVERNANCE
// ─────────────────────────────────────────────────────────────────────────────

const boardComposition = [
  { member: "Dr. Lena Fischer",    role: "Chair",                 independent: true,  tenure: "8 yrs",  committees: "Nom. & Gov." },
  { member: "Marcus Okafor",       role: "CEO (Non-Exec.)",       independent: false, tenure: "4 yrs",  committees: "—"           },
  { member: "Priya Mehta",         role: "Independent NED",       independent: true,  tenure: "3 yrs",  committees: "Audit"       },
  { member: "James Whitmore",      role: "Independent NED",       independent: true,  tenure: "5 yrs",  committees: "Remun."      },
  { member: "Sara Lindqvist",      role: "Independent NED",       independent: true,  tenure: "2 yrs",  committees: "Audit"       },
  { member: "Tobias Braun",        role: "Non-Independent NED",   independent: false, tenure: "6 yrs",  committees: "Remun."      },
  { member: "Amara Nwosu",         role: "Independent NED",       independent: true,  tenure: "1 yr",   committees: "Nom. & Gov." },
];

// ─── Industry benchmark radar ─────────────────────────────────────────────────

const benchmark = [
  { axis: "Emissions",   ascendra: 72, industry: 55 },
  { axis: "Energy",      ascendra: 64, industry: 48 },
  { axis: "Diversity",   ascendra: 68, industry: 52 },
  { axis: "Safety",      ascendra: 82, industry: 61 },
  { axis: "Governance",  ascendra: 78, industry: 65 },
  { axis: "Reporting",   ascendra: 85, industry: 58 },
];

const benchmarkConfig: ChartConfig = {
  ascendra: { label: "Ascendra",       color: "var(--chart-1)" },
  industry: { label: "Industry Avg.",  color: "var(--chart-3)" },
};

// ─── SDG alignment ───────────────────────────────────────────────────────────

const sdgs: { num: string; label: string; variant: React.ComponentProps<typeof ColorTile>['variant'] }[] = [
  { num: "SDG 3",  label: "Good Health",        variant: "green"   },
  { num: "SDG 5",  label: "Gender Equality",    variant: "orange"  },
  { num: "SDG 7",  label: "Clean Energy",       variant: "yellow"  },
  { num: "SDG 8",  label: "Decent Work",        variant: "rose"    },
  { num: "SDG 10", label: "Reduced Inequality", variant: "pink"    },
  { num: "SDG 12", label: "Responsible Cons.",  variant: "amber"   },
  { num: "SDG 13", label: "Climate Action",     variant: "emerald" },
  { num: "SDG 16", label: "Strong Institutions",variant: "blue"    },
  { num: "SDG 17", label: "Partnerships",       variant: "sky"     },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ProgressBar({
  label,
  current,
  target,
  note,
  color,
}: {
  label: string;
  current: number;
  target: number;
  note: string;
  color: string;
}) {
  const pct = Math.round((current / target) * 100);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{note}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted/50">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-[0.6875rem] text-muted-foreground">
        <span>{current}% of target</span>
        <span>Target: {target}%</span>
      </div>
    </div>
  );
}


// ─── Page ──────────────────────────────────────────────────────────────────────

export default function EsgSustainabilityReportPage() {
  return (
    <>
      <BackLink href="/showcase/reports">Report Gallery</BackLink>
      <ReportDocumentWrapper>
        {/* ── Document Header ──────────────────────────────────────────────── */}
        <Card>
          <CardPanel>
            <div className="h-1.5 w-full rounded-t-lg" style={{ background: "linear-gradient(to right, #22c55e 33%, #3b82f6 66%, #a855f7 100%)" }} />
            <ReportHeaderContent>
              <ReportHeaderBody>
                <ReportHeaderBodyWrap>
                  <ReportTitle>ESG Sustainability Report</ReportTitle>
                  <ReportTitleHeader>Ascendra Holdings Ltd. — FY2023</ReportTitleHeader>
                  <ReportSubTitle>Environmental, Social &amp; Governance Progress Report</ReportSubTitle>
                </ReportHeaderBodyWrap>
                <SimpleBadge variant={"green"}>Public Disclosure</SimpleBadge>
              </ReportHeaderBody>
              <ReportHeaderFooter>
                <ReportHeaderField label="Reporting Period">January – December 2023</ReportHeaderField>
                <ReportHeaderField label="Published">March 15, 2024</ReportHeaderField>
                <ReportHeaderField label="Framework">GRI Standards · TCFD · UN SDGs</ReportHeaderField>
              </ReportHeaderFooter>
            </ReportHeaderContent>
          </CardPanel>
        </Card>

        {/* ── Year Highlights ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {kpis.map((k) => (
            <Card key={k.label}>
              <CardPanel>
                <div className="flex h-full flex-col p-5">
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <p className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">{k.value}</p>
                  <p className="mt-auto text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-2">{k.delta}</p>
                  <p className="mt-0.5 text-[0.6875rem] text-muted-foreground/70">{k.toward}</p>
                </div>
              </CardPanel>
            </Card>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* E · ENVIRONMENTAL */}
        {/* ══════════════════════════════════════════════════════════════════ */}

        <div className="flex flex-col gap-6">
          <SimpleAlert variant="success" icon={false} className="flex-col p-5">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Environmental</p>
            <h2 className="mt-0.5 text-base font-bold tracking-tight">Climate &amp; Resource Management</h2>
            <p className="mt-0.5 text-xs opacity-70">Scope 1, 2 &amp; 3 emissions, energy mix, and 2030 target progress</p>
          </SimpleAlert>

          {/* Emissions trend */}
          <Card>
            <CardHeader>
              <CardHeaderTitle>GHG Emissions Trend (tCO2e)</CardHeaderTitle>
              <CardHeaderSubtitle>Scope 1, 2 & 3 combined — five-year history</CardHeaderSubtitle>
            </CardHeader>
            <CardPanel>
              <div className="p-6">
                <ChartContainer config={emissionsConfig} className="h-52 w-full">
                  <AreaChart data={emissionsTrend} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <defs>
                      {(["scope1","scope2","scope3"] as const).map((k, i) => (
                        <linearGradient key={k} id={`esg-grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={`var(--chart-${i+1})`} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={`var(--chart-${i+1})`} stopOpacity={0.02} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                    <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} dy={6} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} tickFormatter={(v: number) => `${(v/1000).toFixed(0)}K`} width={36} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(v, k) => [
                            `${Number(v).toLocaleString()} tCO2e`,
                            emissionsConfig[k as keyof typeof emissionsConfig]?.label ?? k,
                          ]}
                        />
                      }
                    />
                    <Area dataKey="scope1" stroke="var(--chart-1)" fill="url(#esg-grad-scope1)" strokeWidth={2} dot={false} />
                    <Area dataKey="scope2" stroke="var(--chart-2)" fill="url(#esg-grad-scope2)" strokeWidth={2} dot={false} />
                    <Area dataKey="scope3" stroke="var(--chart-3)" fill="url(#esg-grad-scope3)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ChartContainer>
                <ChartLegendGroup align="left" className="mt-3">
                  {(["scope1", "scope2", "scope3"] as const).map((k, i) => (
                    <ChartLegend key={k} variant={(['chart-1', 'chart-2', 'chart-3'] as const)[i]} shape="square">
                      {emissionsConfig[k].label}
                    </ChartLegend>
                  ))}
                </ChartLegendGroup>
              </div>
            </CardPanel>
          </Card>

          {/* Energy mix + targets */}
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Energy mix donut */}
            <Card>
              <CardHeader>
                <CardHeaderTitle>Energy Mix FY2023</CardHeaderTitle>
                <CardHeaderSubtitle>64% renewable — Solar, Wind & Hydro</CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="flex flex-col items-center gap-4 p-6">
                  <ChartContainer config={energyConfig} className="h-44 w-44">
                    <PieChart>
                      <Pie dataKey="value" nameKey="name" data={energyMix} cx="50%" cy="50%" innerRadius={44} outerRadius={68} strokeWidth={2} stroke="var(--background)">
                        {energyMix.map((e, i) => (
                          <Cell key={i} fill={e.color} fillOpacity={0.85} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent formatter={(v) => [`${v}%`, "Share"]} />} />
                    </PieChart>
                  </ChartContainer>
                  <ChartLegendGroup>
                    {energyMix.map((e, i) => (
                      <ChartLegend key={e.name} variant={(['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] as const)[i]} shape="round">
                        {e.name} · {e.value}%
                      </ChartLegend>
                    ))}
                  </ChartLegendGroup>
                </div>
              </CardPanel>
            </Card>

            {/* 2030 targets */}
            <Card>
              <CardHeader>
                <CardHeaderTitle>2030 Environmental Targets</CardHeaderTitle>
                <CardHeaderSubtitle>Progress toward stated commitments</CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="flex flex-col gap-5 p-6">
                  {envTargets.map((t) => (
                    <ProgressBar
                      key={t.label}
                      label={t.label}
                      current={t.current}
                      target={t.target}
                      note={t.note}
                      color="bg-emerald-500"
                    />
                  ))}
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* S · SOCIAL */}
        {/* ══════════════════════════════════════════════════════════════════ */}

        <div className="flex flex-col gap-6">
          <SimpleAlert variant="default" icon={false} className="flex-col p-5">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Social</p>
            <h2 className="mt-0.5 text-base font-bold tracking-tight">People, Safety &amp; Community</h2>
            <p className="mt-0.5 text-xs opacity-70">Workforce diversity, safety performance, and community investment</p>
          </SimpleAlert>

          {/* Diversity by level */}
          <Card>
            <CardHeader>
              <CardHeaderTitle>Workforce Gender Diversity by Level</CardHeaderTitle>
              <CardHeaderSubtitle>Women vs. men representation across seniority levels — FY2023</CardHeaderSubtitle>
            </CardHeader>
            <CardPanel>
              <div className="p-6">
                <ChartContainer config={diversityConfig} className="h-44 w-full">
                  <BarChart
                    data={diversityData}
                    layout="vertical"
                    margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                    barCategoryGap="28%"
                    barGap={3}
                  >
                    <CartesianGrid horizontal={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                    <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} tickFormatter={(v: number) => `${v}%`} domain={[0, 100]} />
                    <YAxis type="category" dataKey="level" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} width={72} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(v) => [`${v}%`, ""]} />} />
                    <Bar dataKey="women" fill="var(--chart-1)" fillOpacity={0.85} radius={[0, 3, 3, 0]} stackId="a" />
                    <Bar dataKey="men"   fill="var(--chart-2)" fillOpacity={0.5}  radius={[0, 3, 3, 0]} stackId="a" />
                  </BarChart>
                </ChartContainer>
                <ChartLegendGroup align="left" className="mt-3">
                  <ChartLegend variant="chart-1" shape="square">Women</ChartLegend>
                  <ChartLegend variant="chart-2" shape="square">Men</ChartLegend>
                </ChartLegendGroup>
              </div>
            </CardPanel>
          </Card>

          {/* Safety metrics */}
          <div>
            <div className="mb-5 border-b pb-3">
              <h3 className="text-base font-semibold text-foreground">Workplace Safety Metrics</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">FY2023 actuals vs. industry benchmark thresholds</p>
            </div>
            <TableWrapper>
              <Table horizontal vertical scrollable>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">FY2023 Value</TableHead>
                    <TableHead className="text-right">Benchmark</TableHead>
                    <TableHead>Status</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody border={{}} bg={{}}>
                  {safetyMetrics.map((s) => (
                    <TableRow key={s.metric}>
                      <TableCell className="font-medium">{s.metric}</TableCell>
                      <TableCell className="text-right font-mono font-semibold tabular-nums text-foreground">{s.value}</TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">{s.benchmark}</TableCell>
                      <TableCell>
                        <SimpleBadge variant={s.status === "Good" ? "green" : "secondary"}>
                          {s.status}
                        </SimpleBadge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>
          </div>

          {/* Community investment stat */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Community Investment",   value: "$2.1M", sub: "FY2023 total" },
              { label: "Volunteering Hours",      value: "8,400", sub: "+18% vs FY2022" },
              { label: "Education Partnerships",  value: "14",    sub: "Active programmes" },
            ].map((s) => (
              <Card key={s.label}>
                <CardPanel>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">{s.value}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
                  </div>
                </CardPanel>
              </Card>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* G · GOVERNANCE */}
        {/* ══════════════════════════════════════════════════════════════════ */}

        <div className="flex flex-col gap-6">
          <SimpleAlert variant="primary" icon={false} className="flex-col p-5">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Governance</p>
            <h2 className="mt-0.5 text-base font-bold tracking-tight">Board, Ethics &amp; Compliance</h2>
            <p className="mt-0.5 text-xs opacity-70">Board composition, policy compliance indicators, and audit findings summary</p>
          </SimpleAlert>

          {/* Board composition */}
          <div>
            <div className="mb-5 border-b pb-3">
              <h3 className="text-base font-semibold text-foreground">Board Composition</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">78% independent · 43% women · Average tenure 4.1 years</p>
            </div>
            <TableWrapper>
              <Table horizontal vertical scrollable>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Independent</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>Committee(s)</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody border={{}} bg={{}}>
                  {boardComposition.map((b) => (
                    <TableRow key={b.member}>
                      <TableCell className="font-medium">{b.member}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{b.role}</TableCell>
                      <TableCell>
                        <SimpleBadge variant={b.independent ? "green" : "secondary"}>
                          {b.independent ? "Yes" : "No"}
                        </SimpleBadge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{b.tenure}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{b.committees}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>
          </div>

          {/* Policy compliance indicators */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Anti-Bribery & Corruption Training", value: "99.2%", status: "Compliant" },
              { label: "Code of Conduct Acknowledgement",    value: "100%",  status: "Compliant" },
              { label: "Data Privacy Compliance (GDPR)",     value: "96.8%", status: "Compliant" },
              { label: "Audit Findings Resolved",            value: "87.5%", status: "In Progress" },
            ].map((p) => (
              <Card key={p.label}>
                <CardPanel>
                  <div className="flex h-full flex-col p-4">
                    <p className="text-[0.6875rem] text-muted-foreground mb-2">{p.label}</p>
                    <p className="mt-auto text-xl font-bold tracking-tight text-foreground mb-2">{p.value}</p>
                    <SimpleBadge className="self-start" variant={p.status === "Compliant" ? "green" : "amber"}>
                      {p.status}
                    </SimpleBadge>
                  </div>
                </CardPanel>
              </Card>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* OVERALL — Benchmark Radar + SDG Grid */}
        {/* ══════════════════════════════════════════════════════════════════ */}

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Industry benchmark radar */}
          <Card>
            <CardHeader>
              <CardHeaderTitle>ESG Industry Benchmark</CardHeaderTitle>
              <CardHeaderSubtitle>Ascendra vs. sector average across six ESG dimensions (0–100 score)</CardHeaderSubtitle>
            </CardHeader>
            <CardPanel>
              <div className="flex justify-center p-6">
                <ChartContainer config={benchmarkConfig} className="h-64 w-full max-w-xs">
                  <RadarChart data={benchmark}>
                    <PolarGrid stroke="var(--border)" strokeOpacity={0.6} />
                    <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(v) => [`${v}/100`, ""]} />} />
                    <Radar dataKey="ascendra" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.25} strokeWidth={2} dot={{ r: 3, fill: "var(--chart-1)" }} />
                    <Radar dataKey="industry"  stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.12} strokeWidth={1.5} strokeDasharray="4 3" dot={false} />
                  </RadarChart>
                </ChartContainer>
              </div>
              <ChartLegendGroup className="pb-4">
                <ChartLegend variant="chart-1" shape="square">Ascendra</ChartLegend>
                <ChartLegend variant="chart-3" shape="square">Industry Avg.</ChartLegend>
              </ChartLegendGroup>
            </CardPanel>
          </Card>

          {/* SDG alignment grid */}
          <Card>
            <CardHeader>
              <CardHeaderTitle>UN SDG Alignment</CardHeaderTitle>
              <CardHeaderSubtitle>Sustainable Development Goals materially supported by Ascendra&apos;s operations</CardHeaderSubtitle>
            </CardHeader>
            <CardPanel>
              <div className="grid grid-cols-3 gap-3 p-6">
                {sdgs.map((s) => (
                  <ColorTile key={s.num} variant={s.variant}>
                    <ColorTileTitle>{s.num}</ColorTileTitle>
                    <ColorTileSubTitle>{s.label}</ColorTileSubTitle>
                  </ColorTile>
                ))}
              </div>
            </CardPanel>
          </Card>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <ReportDocumentFooter>
          <ReportDocumentFooterNote>
            This report has been prepared in accordance with the GRI Standards (Core option), the
            Task Force on Climate-related Financial Disclosures (TCFD) framework, and aligns with
            the United Nations Sustainable Development Goals. Data covers the period 1 January –
            31 December 2023 unless otherwise stated. Independent assurance provided by
            Ascendra Audit LLP.
          </ReportDocumentFooterNote>
          <ReportDocumentFooterLine>
            <ReportDocumentFooterLineLeft>Ascendra Holdings Ltd.</ReportDocumentFooterLineLeft>
            <ReportDocumentFooterLineRight>
              <span>FY2023 ESG Report</span>
              <span>·</span>
              <span>GRI · TCFD · UN SDGs</span>
              <span>·</span>
              <span>March 15, 2024</span>
            </ReportDocumentFooterLineRight>
          </ReportDocumentFooterLine>
        </ReportDocumentFooter>

      </ReportDocumentWrapper>
      <ReportPdfExportButton fileName="esg-sustainability-report" />
    </>
  );
}

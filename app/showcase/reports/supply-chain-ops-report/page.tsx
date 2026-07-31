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
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "On-time Delivery",  value: "91.4%",  sub: "–1.8 pp vs target 93%",  warn: true  },
  { label: "Inventory Value",   value: "$12.8M", sub: "+$0.4M vs prior month",   warn: false },
  { label: "Stockout Events",   value: "7",      sub: "+3 vs prior month",       warn: true  },
  { label: "Avg. Lead Time",    value: "11.2d",  sub: "–0.6 days vs prior month",warn: false },
];

// ─── Inventory trend ──────────────────────────────────────────────────────────

const inventoryTrend = [
  { month: "Mar", rawMaterials: 3.2, wip: 1.8, finished: 4.1 },
  { month: "Apr", rawMaterials: 3.6, wip: 1.6, finished: 4.4 },
  { month: "May", rawMaterials: 3.1, wip: 2.0, finished: 4.8 },
  { month: "Jun", rawMaterials: 3.4, wip: 1.9, finished: 5.2 },
  { month: "Jul", rawMaterials: 3.8, wip: 2.2, finished: 5.0 },
  { month: "Aug", rawMaterials: 3.5, wip: 2.1, finished: 5.6 },
];

const inventoryConfig: ChartConfig = {
  rawMaterials: { label: "Raw Materials ($M)", color: "var(--chart-1)" },
  wip:          { label: "Work-in-Progress ($M)", color: "var(--chart-2)" },
  finished:     { label: "Finished Goods ($M)",   color: "var(--chart-3)" },
};

// ─── Supplier scorecard ───────────────────────────────────────────────────────

type PerfLevel = "good" | "warn" | "poor";

function scoreLevel(v: number, thresholds: [number, number]): PerfLevel {
  if (v >= thresholds[0]) return "good";
  if (v >= thresholds[1]) return "warn";
  return "poor";
}

const scoreCell: Record<PerfLevel, string> = {
  good: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  warn: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  poor: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

const suppliers = [
  { name: "Apex Components Ltd.",     onTime: 96.2, quality: 4.7, leadTime: 8,  defectRate: 0.4  },
  { name: "Meridian Plastics Co.",    onTime: 91.8, quality: 4.2, leadTime: 12, defectRate: 1.1  },
  { name: "Northgate Steel Works",    onTime: 88.4, quality: 3.9, leadTime: 14, defectRate: 1.8  },
  { name: "Pacific Logistics Hub",    onTime: 93.5, quality: 4.4, leadTime: 10, defectRate: 0.7  },
  { name: "Vertex Electronics Corp.", onTime: 85.1, quality: 3.6, leadTime: 18, defectRate: 2.4  },
  { name: "Solaris Raw Materials",    onTime: 97.0, quality: 4.8, leadTime: 7,  defectRate: 0.3  },
];

// ─── Regional shipment ────────────────────────────────────────────────────────

const regions = [
  { region: "North America", shipments: 1_840 },
  { region: "Europe",        shipments: 1_220 },
  { region: "Asia-Pacific",  shipments:   980 },
  { region: "Middle East",   shipments:   440 },
  { region: "Latin America", shipments:   320 },
];

const regionConfig: ChartConfig = {
  shipments: { label: "Shipments", color: "var(--chart-1)" },
};

// ─── Critical orders ──────────────────────────────────────────────────────────

type OrderStatus = "Critical" | "At Risk" | "On Track";

const criticalOrders: {
  orderId: string;
  product: string;
  qty: number;
  supplier: string;
  dueDate: string;
  delayDays: number | null;
  status: OrderStatus;
}[] = [
  { orderId: "PO-2024-4812", product: "Drive Assembly Unit A",     qty: 240,  supplier: "Vertex Electronics", dueDate: "Sep 2",  delayDays: 6,    status: "Critical"  },
  { orderId: "PO-2024-4901", product: "Structural Steel Frame",    qty: 80,   supplier: "Northgate Steel",    dueDate: "Sep 5",  delayDays: 3,    status: "At Risk"   },
  { orderId: "PO-2024-5014", product: "Housing Polymer Kit",       qty: 1_200,supplier: "Meridian Plastics",  dueDate: "Sep 8",  delayDays: null, status: "On Track"  },
  { orderId: "PO-2024-4788", product: "Sensor Array Module",       qty: 600,  supplier: "Apex Components",    dueDate: "Sep 10", delayDays: 8,    status: "Critical"  },
  { orderId: "PO-2024-5102", product: "Capacitor Bundle (2200µF)", qty: 5_000,supplier: "Solaris Raw Mat.",   dueDate: "Sep 15", delayDays: null, status: "On Track"  },
];

const orderStatusCls: Record<OrderStatus, string> = {
  Critical: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20 dark:text-rose-400",
  "At Risk":"bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-400",
  "On Track":"bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400",
};


// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SupplyChainOpsReportPage() {
  return (
    <>
      <BackLink href="/showcase/reports">Report Gallery</BackLink>

      <ReportDocumentWrapper>

        {/* ── Document Header ──────────────────────────────────────────────── */}
        <Card>
          <CardPanel border={{ color: "amber" }}>
            <ReportHeaderContent>
              <ReportHeaderBody>
                <ReportHeaderBodyWrap>
                  <ReportTitle>Supply Chain Operations Report</ReportTitle>
                  <ReportTitleHeader>Ascendra Manufacturing — August 2024</ReportTitleHeader>
                  <ReportSubTitle>Monthly operations review · Reporting period: August 2024</ReportSubTitle>
                </ReportHeaderBodyWrap>
                <SimpleBadge variant={"amber"}>Operations Internal</SimpleBadge>
              </ReportHeaderBody>
              <ReportHeaderFooter>
                <ReportHeaderField label="Prepared by">Supply Chain COE</ReportHeaderField>
                <ReportHeaderField label="Report Date">September 3, 2024</ReportHeaderField>
                <ReportHeaderField label="Reviewed by">VP Operations</ReportHeaderField>
              </ReportHeaderFooter>
            </ReportHeaderContent>
          </CardPanel>
        </Card>

        {/* ── KPIs ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {kpis.map((k) => (
            <div
              key={k.label}
              className={`rounded-lg border bg-card p-5 ${k.warn ? "border-amber-300/60 dark:border-amber-700/40" : ""}`}
            >
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className={`mt-1.5 text-3xl font-bold tracking-tight ${k.warn ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}>
                {k.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Inventory Trend ──────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardHeaderTitle>Inventory Level Trend by Category</CardHeaderTitle>
            <CardHeaderSubtitle>Monthly inventory value in $M — Raw Materials, WIP, Finished Goods</CardHeaderSubtitle>
          </CardHeader>
          <CardPanel>
            <div className="p-6">
              <ChartContainer config={inventoryConfig} className="h-56 w-full">
                <AreaChart
                  data={inventoryTrend}
                  margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                >
                  <defs>
                    {(["rawMaterials", "wip", "finished"] as const).map((key, i) => (
                      <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={`var(--chart-${i + 1})`} stopOpacity={0.35} />
                        <stop offset="95%" stopColor={`var(--chart-${i + 1})`} stopOpacity={0.04} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} dy={6} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}M`} width={40} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(v, k) => [
                          `$${Number(v).toFixed(1)}M`,
                          inventoryConfig[k as keyof typeof inventoryConfig]?.label ?? k,
                        ]}
                      />
                    }
                  />
                  <Area dataKey="rawMaterials" stroke="var(--chart-1)" fill="url(#grad-rawMaterials)" strokeWidth={2} dot={false} />
                  <Area dataKey="wip"          stroke="var(--chart-2)" fill="url(#grad-wip)"          strokeWidth={2} dot={false} />
                  <Area dataKey="finished"     stroke="var(--chart-3)" fill="url(#grad-finished)"     strokeWidth={2} dot={false} />
                </AreaChart>
              </ChartContainer>
              <ChartLegendGroup align="left" className="mt-3">
                {(["rawMaterials", "wip", "finished"] as const).map((key, i) => (
                  <ChartLegend key={key} variant={(['chart-1', 'chart-2', 'chart-3'] as const)[i]} shape="square">
                    {inventoryConfig[key].label}
                  </ChartLegend>
                ))}
              </ChartLegendGroup>
            </div>
          </CardPanel>
        </Card>

        {/* ── Supplier Scorecard ───────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Supplier Performance Scorecard</CardHeaderTitle>
            <CardHeaderSubtitle>Color-coded by threshold — Green ≥ target · Amber approaching · Red below threshold</CardHeaderSubtitle>
          </ReportSectionHeader>
          <TableWrapper>
            <Table horizontal vertical scrollable>
              <TableHeader>
                <TableHeaderRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">On-time %</TableHead>
                  <TableHead className="text-right">Quality Score</TableHead>
                  <TableHead className="text-right">Lead Time (days)</TableHead>
                  <TableHead className="text-right">Defect Rate %</TableHead>
                </TableHeaderRow>
              </TableHeader>
              <TableBody border={{}} bg={{}}>
                {suppliers.map((s) => {
                  const otLevel   = scoreLevel(s.onTime,    [93, 88]);
                  const qLevel    = scoreLevel(s.quality,   [4.3, 3.8]);
                  const ltLevel   = scoreLevel(18 - s.leadTime, [6, 2]);
                  const defLevel  = scoreLevel(3 - s.defectRate, [2, 0.5]);
                  return (
                    <TableRow key={s.name}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold tabular-nums ${scoreCell[otLevel]}`}>
                          {s.onTime.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold tabular-nums ${scoreCell[qLevel]}`}>
                          {s.quality.toFixed(1)}/5
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold tabular-nums ${scoreCell[ltLevel]}`}>
                          {s.leadTime}d
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold tabular-nums ${scoreCell[defLevel]}`}>
                          {s.defectRate.toFixed(1)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableWrapper>
        </div>

        {/* ── Regional Shipments ───────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardHeaderTitle>Regional Shipment Breakdown</CardHeaderTitle>
            <CardHeaderSubtitle>Total outbound shipments by destination region — August 2024</CardHeaderSubtitle>
          </CardHeader>
          <CardPanel>
            <div className="p-6">
              <ChartContainer config={regionConfig} className="h-44 w-full">
                <BarChart
                  data={regions}
                  layout="vertical"
                  margin={{ top: 0, right: 32, left: 0, bottom: 0 }}
                  barCategoryGap="28%"
                >
                  <CartesianGrid horizontal={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                  <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="region"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    width={110}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="shipments" fill="var(--chart-1)" fillOpacity={0.85} radius={[0, 3, 3, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardPanel>
        </Card>

        {/* ── Critical Open Orders ─────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Critical Open Orders</CardHeaderTitle>
            <CardHeaderSubtitle>Orders flagged as Critical or At Risk — requiring immediate attention</CardHeaderSubtitle>
          </ReportSectionHeader>
          <TableWrapper>
            <Table horizontal vertical scrollable>
              <TableHeader>
                <TableHeaderRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Delay</TableHead>
                  <TableHead>Status</TableHead>
                </TableHeaderRow>
              </TableHeader>
              <TableBody border={{}} bg={{}}>
                {criticalOrders.map((o) => (
                  <TableRow
                    key={o.orderId}
                    className={o.status === "Critical" ? "bg-rose-500/5 dark:bg-rose-500/5" : ""}
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">{o.orderId}</TableCell>
                    <TableCell className="font-medium">{o.product}</TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">{o.qty.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{o.supplier}</TableCell>
                    <TableCell className="text-sm">{o.dueDate}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {o.delayDays !== null ? (
                        <span className="font-semibold text-rose-600 dark:text-rose-400">+{o.delayDays}d</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ${orderStatusCls[o.status]}`}>
                        {o.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <ReportDocumentFooter>
          <ReportDocumentFooterLine>
            <ReportDocumentFooterLineLeft>Ascendra Manufacturing — Supply Chain COE</ReportDocumentFooterLineLeft>
            <ReportDocumentFooterLineRight>
              <span>August 2024 Operations Report</span>
              <span>·</span>
              <span>Operations Internal</span>
              <span>·</span>
              <span>September 3, 2024</span>
            </ReportDocumentFooterLineRight>
          </ReportDocumentFooterLine>
        </ReportDocumentFooter>

      </ReportDocumentWrapper>
      <ReportPdfExportButton fileName="supply-chain-ops-report" />
    </>
  );
}

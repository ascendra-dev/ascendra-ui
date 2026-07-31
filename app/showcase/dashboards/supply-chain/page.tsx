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
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Treemap,
  XAxis,
  YAxis,
} from "recharts";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "On-time Delivery",      value: "94.2%",   delta: "+1.8 pts", up: true  },
  { label: "Inventory Fill Rate",   value: "97.1%",   delta: "+0.4 pts", up: true  },
  { label: "Inventory Turns",       value: "8.3×",    delta: "+0.6×",    up: true  },
  { label: "Avg. Lead Time",        value: "4.8 days", delta: "−0.5d",   up: true  },
] as const;

// ─── Inventory Flow (Composed: grouped bar + area) ────────────────────────────

const inventoryFlowData = [
  { month: "Jun", received: 4820, dispatched: 4210, balance: 18400 },
  { month: "Jul", received: 5140, dispatched: 4680, balance: 18860 },
  { month: "Aug", received: 4960, dispatched: 5120, balance: 18700 },
  { month: "Sep", received: 5380, dispatched: 4940, balance: 19140 },
  { month: "Oct", received: 5720, dispatched: 5280, balance: 19580 },
  { month: "Nov", received: 6840, dispatched: 6420, balance: 20000 },
  { month: "Dec", received: 7120, dispatched: 7480, balance: 19640 },
  { month: "Jan", received: 4480, dispatched: 4820, balance: 19300 },
  { month: "Feb", received: 4640, dispatched: 4560, balance: 19380 },
  { month: "Mar", received: 5080, dispatched: 4920, balance: 19540 },
  { month: "Apr", received: 5340, dispatched: 5160, balance: 19720 },
  { month: "May", received: 5680, dispatched: 5420, balance: 19980 },
];

const inventoryFlowConfig: ChartConfig = {
  received:   { label: "Received",   color: "var(--chart-2)" },
  dispatched: { label: "Dispatched", color: "var(--chart-1)" },
  balance:    { label: "Balance",    color: "var(--chart-3)" },
};

// ─── Shipments by Region ──────────────────────────────────────────────────────

const shipmentsData = [
  { region: "North",         current: 1840, prior: 1620 },
  { region: "South",         current: 2160, prior: 1980 },
  { region: "East",          current: 1720, prior: 1580 },
  { region: "West",          current: 1480, prior: 1340 },
  { region: "International", current: 980,  prior: 820  },
];

const shipmentsConfig: ChartConfig = {
  current: { label: "This Month",  color: "var(--chart-1)" },
  prior:   { label: "Prior Month", color: "var(--chart-2)" },
};

// ─── Supplier Spend Share (Treemap) ───────────────────────────────────────────

const supplierSpendData = [
  { name: "GlobalParts Co",   value: 2840000, fill: "var(--chart-1)" },
  { name: "FastLogix",        value: 2180000, fill: "var(--chart-2)" },
  { name: "MegaSupply",       value: 1960000, fill: "var(--chart-3)" },
  { name: "TechComponents",   value: 1640000, fill: "var(--chart-4)" },
  { name: "PrimeMaterials",   value: 1380000, fill: "var(--chart-1)" },
  { name: "QuickShip",        value: 1120000, fill: "var(--chart-2)" },
  { name: "Apex Industries",  value: 980000,  fill: "var(--chart-3)" },
  { name: "NordicSupplies",   value: 820000,  fill: "var(--chart-4)" },
  { name: "SouthernGoods",    value: 740000,  fill: "var(--chart-1)" },
  { name: "EastProcure",      value: 620000,  fill: "var(--chart-2)" },
  { name: "FlexiSource",      value: 480000,  fill: "var(--chart-3)" },
  { name: "UniVendor",        value: 340000,  fill: "var(--chart-4)" },
];

// ─── Supplier Scorecard (Radar) ───────────────────────────────────────────────

const scorecardData = [
  { metric: "Price",         globalparts: 78, fastlogix: 85, megasupply: 72 },
  { metric: "Quality",       globalparts: 92, fastlogix: 88, megasupply: 94 },
  { metric: "Lead Time",     globalparts: 84, fastlogix: 91, megasupply: 76 },
  { metric: "Reliability",   globalparts: 88, fastlogix: 82, megasupply: 90 },
  { metric: "Flexibility",   globalparts: 74, fastlogix: 88, megasupply: 68 },
  { metric: "Communication", globalparts: 90, fastlogix: 76, megasupply: 86 },
];

const scorecardConfig: ChartConfig = {
  globalparts: { label: "GlobalParts Co", color: "var(--chart-1)" },
  fastlogix:   { label: "FastLogix",      color: "var(--chart-2)" },
  megasupply:  { label: "MegaSupply",     color: "var(--chart-3)" },
};

// ─── Open Orders ──────────────────────────────────────────────────────────────

const openOrders = [
  { po: "PO-8841", supplier: "GlobalParts Co",  items: 240, value: 128400, ordered: "May 18", expected: "Jun 4",  status: "In Transit"  },
  { po: "PO-8840", supplier: "FastLogix",        items: 84,  value: 42600,  ordered: "May 20", expected: "Jun 2",  status: "In Transit"  },
  { po: "PO-8839", supplier: "TechComponents",   items: 56,  value: 84200,  ordered: "May 15", expected: "Jun 8",  status: "Processing"  },
  { po: "PO-8838", supplier: "MegaSupply",        items: 380, value: 61800,  ordered: "May 12", expected: "May 30", status: "Delayed"     },
  { po: "PO-8837", supplier: "PrimeMaterials",    items: 120, value: 36400,  ordered: "May 22", expected: "Jun 10", status: "Confirmed"   },
  { po: "PO-8836", supplier: "QuickShip",         items: 28,  value: 18200,  ordered: "May 24", expected: "Jun 1",  status: "Confirmed"   },
  { po: "PO-8835", supplier: "Apex Industries",   items: 64,  value: 54800,  ordered: "May 10", expected: "May 28", status: "Delayed"     },
  { po: "PO-8834", supplier: "NordicSupplies",    items: 192, value: 29600,  ordered: "May 26", expected: "Jun 14", status: "Confirmed"   },
];

// ─── Treemap cell renderer ────────────────────────────────────────────────────

interface SpendCellProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  value?: number;
  fill?: string;
  depth?: number;
}

function SpendCell(props: SpendCellProps) {
  const { x = 0, y = 0, width = 0, height = 0, name, value, fill, depth } = props;
  if (depth !== 1 || !name || width < 2 || height < 2) return null;
  return (
    <g>
      <rect
        x={x} y={y} width={width} height={height}
        fill={fill} fillOpacity={0.82}
        stroke="var(--background)" strokeWidth={2}
        rx={4}
      />
      {width > 60 && height > 26 && (
        <text x={x + 8} y={y + 16} fill="white" fontSize={11} fontWeight={600}>
          {name}
        </text>
      )}
      {width > 60 && height > 42 && (
        <text x={x + 8} y={y + 30} fill="white" fillOpacity={0.72} fontSize={10}>
          {`$${((value ?? 0) / 1000).toFixed(0)}k`}
        </text>
      )}
    </g>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SupplyChainPage() {
  const [hiddenFlow, setHiddenFlow] = useState<Record<string, boolean>>({});
  const [hiddenShipments, setHiddenShipments] = useState<Record<string, boolean>>({});
  const [hiddenScorecard, setHiddenScorecard] = useState<Record<string, boolean>>({});

  return (
    <>
      <BackLink href="/showcase/dashboards">Dashboard Gallery</BackLink>

      <PageHeader variant="dashboard">
        <PageHeaderGroup>
          <PageTitle>Supply Chain</PageTitle>
          <PageSubtitle>
            Inventory flow, supplier performance, shipment visibility, and open
            orders — the ops view for a multi-region distribution network.
          </PageSubtitle>
        </PageHeaderGroup>
        <PageHeaderAction className="w-fit">
          <span className="inline-flex items-center rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-500/20 dark:text-orange-400 dark:ring-orange-500/30">
            Operations / Logistics
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

        {/* ── Row 1: Inventory Flow | Shipments by Region ──────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Inventory Flow — Composed */}
          <div className="col-span-12 md:col-span-7">
            <Card className="h-full">
              <CardPanel>
                <div className="p-5">
                  <p className="mb-4 text-sm font-medium">Inventory Flow</p>
                  <ChartContainer config={inventoryFlowConfig} className="h-64 w-full">
                    <ComposedChart
                      data={inventoryFlowData}
                      margin={{ top: 4, right: 36, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
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
                        tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                        width={36}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                        width={40}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={makeTooltipFormatter(
                              inventoryFlowConfig,
                              (v) => v.toLocaleString(),
                            )}
                          />
                        }
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="received"
                        fill="var(--chart-2)"
                        fillOpacity={0.8}
                        radius={[3, 3, 0, 0]}
                        hide={hiddenFlow["received"]}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="dispatched"
                        fill="var(--chart-1)"
                        fillOpacity={0.8}
                        radius={[3, 3, 0, 0]}
                        hide={hiddenFlow["dispatched"]}
                      />
                      <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="balance"
                        stroke="var(--chart-3)"
                        fill="var(--chart-3)"
                        fillOpacity={0.12}
                        strokeWidth={2}
                        hide={hiddenFlow["balance"]}
                      />
                    </ComposedChart>
                  </ChartContainer>
                  <ChartSeriesLegend
                    config={inventoryFlowConfig}
                    hidden={hiddenFlow}
                    onToggle={(k) => setHiddenFlow((p) => ({ ...p, [k]: !p[k] }))}
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Shipments by Region */}
          <div className="col-span-12 md:col-span-5">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">Shipments by Region</p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer config={shipmentsConfig} className="h-full w-full">
                      <BarChart
                        data={shipmentsData}
                        margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5} />
                        <XAxis
                          dataKey="region"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          dy={6}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`}
                          width={36}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(
                                shipmentsConfig,
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
                          hide={hiddenShipments["current"]}
                        />
                        <Bar
                          dataKey="prior"
                          fill="var(--chart-2)"
                          fillOpacity={0.65}
                          radius={[3, 3, 0, 0]}
                          hide={hiddenShipments["prior"]}
                        />
                      </BarChart>
                    </ChartContainer>
                  </div>
                  <ChartSeriesLegend
                    config={shipmentsConfig}
                    hidden={hiddenShipments}
                    onToggle={(k) => setHiddenShipments((p) => ({ ...p, [k]: !p[k] }))}
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>

        {/* ── Row 2: Supplier Spend Share — full width ──────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Card className="h-full">
              <CardHeader>
                <CardHeaderTitle>Supplier Spend Share</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Annual procurement spend · 12 suppliers · trailing 12 months
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <div className="p-5">
                  <ChartContainer config={{}} className="h-64 w-full">
                    <Treemap
                      data={supplierSpendData}
                      dataKey="value"
                      content={<SpendCell />}
                    >
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0].payload as (typeof supplierSpendData)[0];
                          return (
                            <div className="bg-background border shadow-md rounded-lg px-3 py-2 text-xs">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="h-2 w-2 rounded-[2px]" style={{ background: d.fill }} />
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
            </Card>
          </div>
        </div>

        {/* ── Row 3: Supplier Scorecard | Open Orders ───────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Supplier Scorecard — Radar */}
          <div className="col-span-12 md:col-span-4">
            <Card className="h-full">
              <CardPanel>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm font-medium">Supplier Scorecard</p>
                  <div className="flex-1 min-h-0">
                    <ChartContainer config={scorecardConfig} className="h-64 w-full">
                      <RadarChart
                        data={scorecardData}
                        margin={{ top: 8, right: 24, left: 24, bottom: 8 }}
                      >
                        <PolarGrid stroke="var(--border)" strokeOpacity={0.5} />
                        <PolarAngleAxis
                          dataKey="metric"
                          tick={{ fontSize: 11 }}
                          tickLine={false}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={makeTooltipFormatter(
                                scorecardConfig,
                                (v) => `${v}/100`,
                              )}
                            />
                          }
                        />
                        <Radar
                          dataKey="globalparts"
                          stroke="var(--chart-1)"
                          fill="var(--chart-1)"
                          fillOpacity={0.15}
                          strokeWidth={2}
                          hide={hiddenScorecard["globalparts"]}
                        />
                        <Radar
                          dataKey="fastlogix"
                          stroke="var(--chart-2)"
                          fill="var(--chart-2)"
                          fillOpacity={0.15}
                          strokeWidth={2}
                          hide={hiddenScorecard["fastlogix"]}
                        />
                        <Radar
                          dataKey="megasupply"
                          stroke="var(--chart-3)"
                          fill="var(--chart-3)"
                          fillOpacity={0.15}
                          strokeWidth={2}
                          hide={hiddenScorecard["megasupply"]}
                        />
                      </RadarChart>
                    </ChartContainer>
                  </div>
                  <ChartSeriesLegend
                    config={scorecardConfig}
                    hidden={hiddenScorecard}
                    onToggle={(k) => setHiddenScorecard((p) => ({ ...p, [k]: !p[k] }))}
                    className="mt-3 w-full"
                  />
                </div>
              </CardPanel>
            </Card>
          </div>

          {/* Open Orders — table */}
          <div className="col-span-12 md:col-span-8">
            <CardHeader>
              <CardHeaderTitle>Open Orders</CardHeaderTitle>
              <CardHeaderSubtitle>
                Active purchase orders · sorted by expected delivery
              </CardHeaderSubtitle>
            </CardHeader>
            <TableWrapper>
              <Table scrollable horizontal vertical height={300}>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Expected</TableHead>
                    <TableHead>Status</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {openOrders.map((row) => (
                    <TableRow key={row.po}>
                      <TableCell className="font-mono text-xs">{row.po}</TableCell>
                      <TableCell className="font-medium">{row.supplier}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.items}</TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        ${row.value.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{row.ordered}</TableCell>
                      <TableCell className="text-muted-foreground">{row.expected}</TableCell>
                      <TableCell>
                        <SimpleBadge
                          variant={
                            row.status === "In Transit"
                              ? "blue"
                              : row.status === "Delayed"
                                ? "red"
                                : row.status === "Processing"
                                  ? "amber"
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

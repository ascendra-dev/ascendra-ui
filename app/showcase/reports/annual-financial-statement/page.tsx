"use client";

import {
  BackLink,
  ReportPdfExportButton,
  Card,
  CardHeader,
  CardHeaderSubtitle,
  CardHeaderTitle,
  CardPanel,
  ReportDocumentFooter,
  ReportDocumentFooterNote,
  ReportDocumentFooterLine,
  ReportDocumentFooterLineLeft,
  ReportDocumentFooterLineRight,
  ReportHeaderContent,
  ReportHeaderBody,
  ReportTitle,
  ReportTitleHeader,
  ReportSubTitle,
  ReportHeaderFooter,
  ReportHeaderField,
  ReportNotes,
  ReportNote,
  ReportNoteHeader,
  ReportNoteText,
  SimpleBadge,
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

// ─── Data ──────────────────────────────────────────────────────────────────────

const highlights = [
  {
    label: "Total Revenue",
    fy24: "$42.8M",
    fy23: "$37.2M",
    delta: "+15.1%",
    up: true,
  },
  {
    label: "Net Income",
    fy24: "$6.4M",
    fy23: "$5.5M",
    delta: "+16.4%",
    up: true,
  },
  {
    label: "Total Assets",
    fy24: "$89.2M",
    fy23: "$81.4M",
    delta: "+9.6%",
    up: true,
  },
  {
    label: "Operating Cash Flow",
    fy24: "$9.1M",
    fy23: "$7.8M",
    delta: "+16.7%",
    up: true,
  },
];

const quarterlyRevData = [
  { quarter: "Q1", fy2024: 9800, fy2023: 8400 },
  { quarter: "Q2", fy2024: 10200, fy2023: 9100 },
  { quarter: "Q3", fy2024: 10900, fy2023: 9800 },
  { quarter: "Q4", fy2024: 11900, fy2023: 9880 },
];

const revChartConfig: ChartConfig = {
  fy2024: { label: "FY 2024", color: "var(--chart-1)" },
  fy2023: { label: "FY 2023", color: "var(--chart-2)" },
};

// ─── Statement table types ─────────────────────────────────────────────────────

type RowKind =
  | "section"
  | "data"
  | "subtotal"
  | "total"
  | "spacer"
  | "margin-pct";

type StatRow = {
  kind: RowKind;
  label: string;
  indent?: 0 | 1;
  fy2024?: number | string | null;
  fy2023?: number | string | null;
  note?: string;
};

// ─── Income Statement rows (amounts in $000s) ──────────────────────────────────

const incomeRows: StatRow[] = [
  { kind: "section", label: "Revenue" },
  {
    kind: "data",
    label: "Product Revenue",
    indent: 1,
    fy2024: 31200,
    fy2023: 27100,
  },
  {
    kind: "data",
    label: "Service Revenue",
    indent: 1,
    fy2024: 10400,
    fy2023: 9100,
  },
  {
    kind: "data",
    label: "Other Revenue",
    indent: 1,
    fy2024: 1200,
    fy2023: 980,
  },
  { kind: "subtotal", label: "Total Revenue", fy2024: 42800, fy2023: 37180 },

  { kind: "spacer", label: "" },

  { kind: "section", label: "Cost of Revenue" },
  {
    kind: "data",
    label: "Product Cost of Goods Sold",
    indent: 1,
    fy2024: 11200,
    fy2023: 9780,
  },
  {
    kind: "data",
    label: "Service Delivery Cost",
    indent: 1,
    fy2024: 4200,
    fy2023: 3660,
  },
  { kind: "subtotal", label: "Gross Profit", fy2024: 27400, fy2023: 23740 },
  {
    kind: "margin-pct",
    label: "Gross Margin",
    fy2024: "64.0%",
    fy2023: "63.8%",
  },

  { kind: "spacer", label: "" },

  { kind: "section", label: "Operating Expenses" },
  {
    kind: "data",
    label: "Research & Development",
    indent: 1,
    fy2024: 5800,
    fy2023: 5040,
  },
  {
    kind: "data",
    label: "Sales & Marketing",
    indent: 1,
    fy2024: 7600,
    fy2023: 6600,
  },
  {
    kind: "data",
    label: "General & Administrative",
    indent: 1,
    fy2024: 2600,
    fy2023: 2260,
  },
  {
    kind: "subtotal",
    label: "Total Operating Expenses",
    fy2024: 16000,
    fy2023: 13900,
  },

  { kind: "spacer", label: "" },

  { kind: "subtotal", label: "EBITDA", fy2024: 11400, fy2023: 9840 },
  {
    kind: "margin-pct",
    label: "EBITDA Margin",
    fy2024: "26.6%",
    fy2023: "26.5%",
  },
  {
    kind: "data",
    label: "Depreciation & Amortization",
    indent: 1,
    fy2024: -1600,
    fy2023: -1380,
  },
  { kind: "data", label: "EBIT", indent: 0, fy2024: 9800, fy2023: 8460 },
  {
    kind: "data",
    label: "Interest Expense",
    indent: 1,
    fy2024: -800,
    fy2023: -700,
  },
  {
    kind: "data",
    label: "Pre-tax Income",
    indent: 0,
    fy2024: 9000,
    fy2023: 7760,
  },
  {
    kind: "data",
    label: "Income Tax Expense",
    indent: 1,
    fy2024: -2600,
    fy2023: -2260,
  },

  { kind: "spacer", label: "" },
  { kind: "total", label: "Net Income", fy2024: 6400, fy2023: 5500 },
];

// ─── Balance Sheet rows ────────────────────────────────────────────────────────

const balanceSheetRows: StatRow[] = [
  { kind: "section", label: "Assets" },
  {
    kind: "data",
    label: "Cash & Cash Equivalents",
    indent: 1,
    fy2024: 18400,
    fy2023: 14300,
  },
  {
    kind: "data",
    label: "Accounts Receivable",
    indent: 1,
    fy2024: 6200,
    fy2023: 5400,
  },
  {
    kind: "data",
    label: "Inventory & Prepaid Assets",
    indent: 1,
    fy2024: 3100,
    fy2023: 2900,
  },
  {
    kind: "subtotal",
    label: "Total Current Assets",
    fy2024: 27700,
    fy2023: 22600,
  },
  {
    kind: "data",
    label: "Property, Plant & Equipment",
    indent: 1,
    fy2024: 14800,
    fy2023: 13200,
  },
  {
    kind: "data",
    label: "Intangibles & Goodwill",
    indent: 1,
    fy2024: 24600,
    fy2023: 24600,
  },
  {
    kind: "data",
    label: "Other Long-term Assets",
    indent: 1,
    fy2024: 22100,
    fy2023: 21000,
  },
  { kind: "total", label: "Total Assets", fy2024: 89200, fy2023: 81400 },

  { kind: "spacer", label: "" },

  { kind: "section", label: "Liabilities & Equity" },
  {
    kind: "data",
    label: "Accounts Payable",
    indent: 1,
    fy2024: 3400,
    fy2023: 3100,
  },
  {
    kind: "data",
    label: "Accrued Liabilities",
    indent: 1,
    fy2024: 4200,
    fy2023: 3700,
  },
  {
    kind: "data",
    label: "Current Portion of Debt",
    indent: 1,
    fy2024: 2800,
    fy2023: 2800,
  },
  {
    kind: "subtotal",
    label: "Total Current Liabilities",
    fy2024: 10400,
    fy2023: 9600,
  },
  {
    kind: "data",
    label: "Long-term Debt",
    indent: 1,
    fy2024: 18600,
    fy2023: 20400,
  },
  {
    kind: "data",
    label: "Deferred Revenue & Other",
    indent: 1,
    fy2024: 4400,
    fy2023: 3800,
  },
  {
    kind: "subtotal",
    label: "Total Liabilities",
    fy2024: 33400,
    fy2023: 33800,
  },
  {
    kind: "data",
    label: "Shareholders' Equity",
    indent: 1,
    fy2024: 55800,
    fy2023: 47600,
  },
  {
    kind: "total",
    label: "Total Liabilities & Equity",
    fy2024: 89200,
    fy2023: 81400,
  },
];

// ─── Cash Flow rows ────────────────────────────────────────────────────────────

const cashFlowRows: StatRow[] = [
  { kind: "section", label: "Operating Activities" },
  { kind: "data", label: "Net Income", indent: 1, fy2024: 6400, fy2023: 5500 },
  {
    kind: "data",
    label: "Depreciation & Amortization",
    indent: 1,
    fy2024: 1600,
    fy2023: 1380,
  },
  {
    kind: "data",
    label: "Changes in Working Capital",
    indent: 1,
    fy2024: 1100,
    fy2023: 920,
  },
  {
    kind: "subtotal",
    label: "Net Cash from Operations",
    fy2024: 9100,
    fy2023: 7800,
  },

  { kind: "spacer", label: "" },

  { kind: "section", label: "Investing Activities" },
  {
    kind: "data",
    label: "Capital Expenditures",
    indent: 1,
    fy2024: -2400,
    fy2023: -2100,
  },
  {
    kind: "data",
    label: "Acquisitions & Investments",
    indent: 1,
    fy2024: -800,
    fy2023: -600,
  },
  {
    kind: "subtotal",
    label: "Net Cash used in Investing",
    fy2024: -3200,
    fy2023: -2700,
  },

  { kind: "spacer", label: "" },

  { kind: "section", label: "Financing Activities" },
  {
    kind: "data",
    label: "Debt Repayments",
    indent: 1,
    fy2024: -2200,
    fy2023: -2000,
  },
  {
    kind: "data",
    label: "Stock Issuances & Buybacks",
    indent: 1,
    fy2024: 400,
    fy2023: 600,
  },
  {
    kind: "subtotal",
    label: "Net Cash from Financing",
    fy2024: -1800,
    fy2023: -1400,
  },

  { kind: "spacer", label: "" },

  { kind: "data", label: "Opening Cash Balance", fy2024: 14300, fy2023: 10600 },
  {
    kind: "total",
    label: "Closing Cash Balance",
    fy2024: 18400,
    fy2023: 14300,
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function fmtNum(v: number | string | null | undefined): string {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "string") return v;
  if (v < 0) return `(${Math.abs(v).toLocaleString()})`;
  return v.toLocaleString();
}

function fmtVariance(
  fy24: number | string | null | undefined,
  fy23: number | string | null | undefined,
) {
  if (typeof fy24 !== "number" || typeof fy23 !== "number")
    return { amt: "—", pct: "—", positive: true };
  const amt = fy24 - fy23;
  const pct = fy23 !== 0 ? ((amt / Math.abs(fy23)) * 100).toFixed(1) : "—";
  return {
    amt:
      amt >= 0
        ? `+${amt.toLocaleString()}`
        : `(${Math.abs(amt).toLocaleString()})`,
    pct: pct !== "—" ? `${amt >= 0 ? "+" : ""}${pct}%` : "—",
    positive: amt >= 0,
  };
}

// ─── Statement Table ───────────────────────────────────────────────────────────

function StatementTable({ rows }: { rows: StatRow[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-130 w-full text-sm">
        {/* Header row */}
        <div className="mb-1 grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-4 border-b pb-2 text-[0.6875rem] uppercase tracking-wide text-muted-foreground">
          <span>Line Item</span>
          <span className="w-24 text-right">FY 2024</span>
          <span className="w-24 text-right">FY 2023</span>
          <span className="w-24 text-right">Variance</span>
          <span className="w-16 text-right">%</span>
        </div>

        {rows.map((row, i) => {
          if (row.kind === "spacer") {
            return <div key={i} className="h-3" />;
          }

          if (row.kind === "section") {
            return (
              <div
                key={i}
                className="mt-1 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {row.label}
              </div>
            );
          }

          const variance =
            row.kind !== "margin-pct"
              ? fmtVariance(row.fy2024, row.fy2023)
              : null;
          const indent = row.indent === 1 ? "pl-4" : "";

          const rowCls =
            {
              data: `grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-4 py-1.5 text-sm border-b border-border/40 last:border-0 ${indent}`,
              subtotal:
                "grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-4 py-2 font-semibold text-sm border-t border-border",
              total:
                "grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-4 py-2 font-bold border-t-2 border-border text-sm",
              "margin-pct": `grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-4 py-1 text-xs text-muted-foreground ${indent}`,
            }[row.kind] ?? "";

          return (
            <div key={i} className={rowCls}>
              <span
                className={
                  row.kind === "total" || row.kind === "subtotal"
                    ? ""
                    : "text-foreground"
                }
              >
                {row.label}
              </span>
              <span className="w-24 text-right font-mono tabular-nums">
                {fmtNum(row.fy2024)}
              </span>
              <span className="w-24 text-right font-mono tabular-nums text-muted-foreground">
                {fmtNum(row.fy2023)}
              </span>
              <span
                className={`w-24 text-right font-mono tabular-nums text-xs ${variance ? (variance.positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400") : "text-muted-foreground"}`}
              >
                {variance ? variance.amt : "—"}
              </span>
              <span
                className={`w-16 text-right font-mono tabular-nums text-xs ${variance ? (variance.positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400") : "text-muted-foreground"}`}
              >
                {variance ? variance.pct : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AnnualFinancialStatementPage() {
  return (
    <>
      <BackLink href="/showcase/reports">Report Gallery</BackLink>
      {/* Document wrapper */}
      <ReportDocumentWrapper>
        {/* ── Document Header ──────────────────────────────────────────────── */}
        <Card>
          <CardPanel border={{ color: "teal" }}>
            <ReportHeaderContent>
              <ReportHeaderBody>
                <ReportHeaderBodyWrap>
                  <ReportTitle>Annual Financial Report</ReportTitle>
                  <ReportTitleHeader>Ascendra Holdings Ltd.</ReportTitleHeader>
                  <ReportSubTitle>
                    Fiscal Year Ended December 31, 2024
                  </ReportSubTitle>
                </ReportHeaderBodyWrap>
                <SimpleBadge variant={"red"}>Confidential</SimpleBadge>
              </ReportHeaderBody>
              <ReportHeaderFooter>
                <ReportHeaderField label="Prepared by">
                  Finance &amp; Accounting Team
                </ReportHeaderField>
                <ReportHeaderField label="Report Date">
                  March 15, 2025
                </ReportHeaderField>
                <ReportHeaderField label="Reviewed by">
                  Grant &amp; Associates LLP (External Auditors)
                </ReportHeaderField>
                <ReportHeaderField label="Currency">
                  USD (amounts in thousands, unless noted)
                </ReportHeaderField>
              </ReportHeaderFooter>
            </ReportHeaderContent>
          </CardPanel>
        </Card>

        {/* ── Financial Highlights ─────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Financial Highlights</CardHeaderTitle>
            <CardHeaderSubtitle>
              Key performance indicators for FY 2024 compared to prior year
            </CardHeaderSubtitle>
          </ReportSectionHeader>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {highlights.map((h) => (
              <Card key={h.label}>
                <CardPanel>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground">{h.label}</p>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                      {h.fy24}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`text-xs font-medium ${h.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                      >
                        {h.delta}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        vs {h.fy23}
                      </span>
                    </div>
                  </div>
                </CardPanel>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Income Statement ─────────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Consolidated Income Statement</CardHeaderTitle>
            <CardHeaderSubtitle>
              In thousands USD ($000s) · Fiscal year ended December 31
            </CardHeaderSubtitle>
          </ReportSectionHeader>
          <StatementTable rows={incomeRows} />
        </div>

        {/* ── Quarterly Revenue Trend ──────────────────────────────────────── */}
        <div>
          <Card>
            <CardHeader>
              <CardHeaderTitle>
                Quarterly Revenue — FY 2024 vs FY 2023
              </CardHeaderTitle>
              <CardHeaderSubtitle>
                Total revenue by quarter · in thousands USD ($000s)
              </CardHeaderSubtitle>
            </CardHeader>
            <CardPanel>
              <div className="p-6">
                <ChartContainer config={revChartConfig} className="h-56 w-full">
                  <BarChart
                    data={quarterlyRevData}
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
                      dataKey="quarter"
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
                        `$${(v / 1000).toFixed(0)}M`
                      }
                      width={44}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(v, k) => [
                            `$${Number(v).toLocaleString()}K`,
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
                  <ChartLegend variant="chart-1" shape="square">FY 2024</ChartLegend>
                  <ChartLegend variant="chart-2" shape="square">FY 2023</ChartLegend>
                </ChartLegendGroup>
              </div>
            </CardPanel>
          </Card>
        </div>

        {/* ── Balance Sheet ────────────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Balance Sheet Summary</CardHeaderTitle>
            <CardHeaderSubtitle>
              As at December 31 · in thousands USD ($000s)
            </CardHeaderSubtitle>
          </ReportSectionHeader>
          <StatementTable rows={balanceSheetRows} />
        </div>

        {/* ── Cash Flow ────────────────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Cash Flow Summary</CardHeaderTitle>
            <CardHeaderSubtitle>
              For the fiscal year ended December 31 · in thousands USD ($000s)
            </CardHeaderSubtitle>
          </ReportSectionHeader>
          <StatementTable rows={cashFlowRows} />
        </div>

        {/* ── Notes ────────────────────────────────────────────────────────── */}
        <div>
          <ReportSectionHeader>
            <CardHeaderTitle>Notes to Financial Statements</CardHeaderTitle>
          </ReportSectionHeader>
          <ReportNotes>
            <ReportNote>
              <ReportNoteHeader>1. Basis of Preparation</ReportNoteHeader>
              <ReportNoteText>
                These consolidated financial statements have been prepared in
                accordance with Generally Accepted Accounting Principles (GAAP)
                on a going-concern basis. All amounts are presented in thousands
                of United States Dollars (USD) unless otherwise indicated.
              </ReportNoteText>
            </ReportNote>
            <ReportNote>
              <ReportNoteHeader>2. Revenue Recognition</ReportNoteHeader>
              <ReportNoteText>
                Product revenue is recognized at the point of delivery when
                control transfers to the customer. Service revenue is recognized
                over the term of the service agreement in accordance with ASC
                606. Deferred revenue relating to multi-year contracts is
                included in current and non-current liabilities as appropriate.
              </ReportNoteText>
            </ReportNote>
            <ReportNote>
              <ReportNoteHeader>
                3. Significant Accounting Policies
              </ReportNoteHeader>
              <ReportNoteText>
                Property, plant and equipment are carried at cost less
                accumulated depreciation. Depreciation is calculated on a
                straight-line basis over estimated useful lives ranging from 3
                to 15 years. Goodwill is tested annually for impairment. No
                impairment was recognized in FY 2024 or FY 2023.
              </ReportNoteText>
            </ReportNote>
          </ReportNotes>
        </div>

        {/* ── Document Footer ──────────────────────────────────────────────── */}
        <ReportDocumentFooter>
          <ReportDocumentFooterNote>
            These financial statements have been prepared in accordance with
            Generally Accepted Accounting Principles (GAAP). This document is
            confidential and intended solely for the use of the Board of
            Directors and authorized parties of Ascendra Holdings Ltd.
            Unauthorized distribution or reproduction is strictly prohibited.
          </ReportDocumentFooterNote>
          <ReportDocumentFooterLine>
            <ReportDocumentFooterLineLeft>
              Ascendra Holdings Ltd.
            </ReportDocumentFooterLineLeft>
            <ReportDocumentFooterLineRight>
              <span>Page 1 of 1</span>
              <span>·</span>
              <span>Confidential</span>
              <span>·</span>
              <span>FY 2024 Annual Report</span>
            </ReportDocumentFooterLineRight>
          </ReportDocumentFooterLine>
        </ReportDocumentFooter>
      </ReportDocumentWrapper>
      <ReportPdfExportButton fileName="annual-financial-statement" />
    </>
  );
}

"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { CodeBlock } from "../code-block";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { registry } from "@/lib/registry";
import { cn } from "@/ascendra-ui/shadcn";
import { type AccentColor, type BgStyle, type BgTo, type BorderSide, type BorderStroke, Button, type ColumnDef, DataTable, DataTableBar, DataTableBarAction, DataTableBarContent, DataTableBody, DataTableCell, DataTableColumnManager, DataTableEmptyBody, DataTableFilterBar, DataTableFilterDropdown, DataTableFoot, DataTableHead, DataTableHeader, DataTableHeaderRow, DataTableHighlight, DataTableLoadingBody, DataTableProvider, DataTableRow, DataTableSearchInput, DataTableSortDropdown, DataTableWrapper, SimpleBadge } from "@/ascendra-ui";

// ─── Entity & mock data ───────────────────────────────────────────────────────

type InvoiceStatus = "paid" | "pending" | "overdue" | "cancelled";

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  issuedAt: string;
}

const statusBadgeVariant: Record<InvoiceStatus, "green" | "amber" | "red"> = {
  paid: "green",
  pending: "amber",
  overdue: "red",
  cancelled: "red",
};

const statusLabel: Record<InvoiceStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
  cancelled: "Cancelled",
};

const MOCK_INVOICES: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    clientName: "Ahmed Khan",
    amount: 12000,
    dueDate: "2024-02-15",
    status: "paid",
    issuedAt: "2024-01-15",
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    clientName: "Sara Ali",
    amount: 8500,
    dueDate: "2024-02-20",
    status: "pending",
    issuedAt: "2024-01-20",
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    clientName: "Usman Raza",
    amount: 15000,
    dueDate: "2024-01-30",
    status: "overdue",
    issuedAt: "2024-01-01",
  },
  {
    id: "4",
    invoiceNumber: "INV-004",
    clientName: "Fatima Malik",
    amount: 9200,
    dueDate: "2024-02-28",
    status: "paid",
    issuedAt: "2024-01-28",
  },
  {
    id: "5",
    invoiceNumber: "INV-005",
    clientName: "Bilal Sheikh",
    amount: 22000,
    dueDate: "2024-02-10",
    status: "cancelled",
    issuedAt: "2024-01-10",
  },
  {
    id: "6",
    invoiceNumber: "INV-006",
    clientName: "Ayesha Noor",
    amount: 5500,
    dueDate: "2024-03-01",
    status: "pending",
    issuedAt: "2024-02-01",
  },
  {
    id: "7",
    invoiceNumber: "INV-007",
    clientName: "Hassan Tariq",
    amount: 18500,
    dueDate: "2024-01-25",
    status: "overdue",
    issuedAt: "2023-12-25",
  },
  {
    id: "8",
    invoiceNumber: "INV-008",
    clientName: "Zara Qureshi",
    amount: 11000,
    dueDate: "2024-03-15",
    status: "paid",
    issuedAt: "2024-02-15",
  },
];

// ─── Column definitions ───────────────────────────────────────────────────────

const INVOICE_COLUMNS: ColumnDef<Invoice>[] = [
  { key: "invoiceNumber", label: "Invoice #", freeze: true },
  { key: "clientName", label: "Client", freeze: true, filter: true },
  { key: "amount", label: "Amount", type: "number" },
  { key: "dueDate", label: "Due Date", type: "date" },
  {
    key: "status",
    label: "Status",
    sortable: false,
    filter: true,
  },
  { key: "issuedAt", label: "Issued", type: "date", active: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatAmount(n: number) {
  return `PKR ${n.toLocaleString()}`;
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Reusable live table ──────────────────────────────────────────────────────

function InvoiceDataTable({
  isLoading = false,
  data = MOCK_INVOICES,
}: {
  isLoading?: boolean;
  data?: Invoice[];
}) {
  return (
    <DataTableProvider
      data={data}
      columns={INVOICE_COLUMNS}
      isLoading={isLoading}
    >
      <DataTableBar>
        <DataTableBarContent>
          <DataTableSearchInput />
          <DataTableColumnManager />
          <DataTableSortDropdown />
          <DataTableFilterDropdown />
        </DataTableBarContent>
        <DataTableBarAction>
          <Button size="sm">+ Add Invoice</Button>
        </DataTableBarAction>
      </DataTableBar>
      <DataTableFilterBar />
      <DataTableWrapper>
        <DataTable scrollable horizontal height={340}>
          <DataTableHeader>
            <DataTableHeaderRow>
              <DataTableHead column="invoiceNumber" />
              <DataTableHead column="clientName" />
              <DataTableHead column="amount" />
              <DataTableHead column="dueDate" />
              <DataTableHead column="status" />
              <DataTableHead column="issuedAt" />
            </DataTableHeaderRow>
          </DataTableHeader>
          <DataTableBody>
            {(row: Invoice) => (
              <DataTableRow key={row.id}>
                <DataTableCell column="invoiceNumber">
                  <DataTableHighlight
                    text={row.invoiceNumber}
                    item={row}
                    itemKey="invoiceNumber"
                  />
                </DataTableCell>
                <DataTableCell column="clientName">
                  <DataTableHighlight
                    text={row.clientName}
                    item={row}
                    itemKey="clientName"
                  />
                </DataTableCell>
                <DataTableCell column="amount">
                  <DataTableHighlight
                    text={formatAmount(row.amount)}
                    item={row}
                    itemKey="amount"
                  />
                </DataTableCell>
                <DataTableCell column="dueDate">
                  <DataTableHighlight
                    text={formatDate(row.dueDate)}
                    item={row}
                    itemKey="dueDate"
                  />
                </DataTableCell>
                <DataTableCell column="status">
                  <SimpleBadge variant={statusBadgeVariant[row.status]}>
                    {statusLabel[row.status]}
                  </SimpleBadge>
                </DataTableCell>
                <DataTableCell column="issuedAt">
                  <DataTableHighlight
                    text={formatDate(row.issuedAt)}
                    item={row}
                    itemKey="issuedAt"
                  />
                </DataTableCell>
              </DataTableRow>
            )}
          </DataTableBody>
        </DataTable>
        <DataTableLoadingBody />
        <DataTableEmptyBody />
        <DataTableFoot />
      </DataTableWrapper>
    </DataTableProvider>
  );
}

// ─── Playground helpers ───────────────────────────────────────────────────────

const ACCENT_COLORS: AccentColor[] = [
  "orange",
  "blue",
  "amber",
  "teal",
  "indigo",
  "purple",
  "red",
  "slate",
];
const COLOR_SWATCH: Record<AccentColor, string> = {
  orange: "bg-orange-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  teal: "bg-teal-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  slate: "bg-slate-500",
};

const BORDER_SIDES: BorderSide[] = ["t", "l", "r", "b", "all"];
const BORDER_SIDE_LABEL: Record<BorderSide, string> = {
  t: "Top",
  l: "Left",
  r: "Right",
  b: "Bottom",
  all: "All",
};
const BORDER_STROKES: BorderStroke[] = [1, 2, 3];
const BG_STYLES: BgStyle[] = ["linear", "radial", "conic", "solid"];
const BG_TOS: BgTo[] = ["transparent", "white", "black", ...ACCENT_COLORS];

type BorderState = {
  enabled: boolean;
  side: BorderSide;
  stroke: BorderStroke;
  color: AccentColor;
};
type BgState = {
  enabled: boolean;
  style: BgStyle;
  side: BorderSide;
  color: AccentColor;
  to: BgTo;
};


function Pill({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-md px-2.5 py-1 text-xs font-medium transition-colors border",
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-background text-muted-foreground border-border hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

function ControlRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* <span className="w-12 shrink-0 text-xs text-muted-foreground">
        {label}
      </span> */}
      {children}
    </div>
  );
}

function generateCode(
  wrapperBorder: BorderState,
  bodyBorder: BorderState,
  bodyBg: BgState,
): string {
  const wb = wrapperBorder.enabled
    ? ` border={{ side: "${wrapperBorder.side}", stroke: ${wrapperBorder.stroke}, color: "${wrapperBorder.color}" }}`
    : "";
  const bb = bodyBorder.enabled
    ? `border={{ side: "${bodyBorder.side}", stroke: ${bodyBorder.stroke}, color: "${bodyBorder.color}" }}`
    : "";
  const bg = bodyBg.enabled
    ? `bg={{ style: "${bodyBg.style}", side: "${bodyBg.side}", color: "${bodyBg.color}", to: "${bodyBg.to}" }}`
    : "";
  const bodyAttrs = [bb, bg].filter(Boolean).join("\n      ");
  const bodyLine = bodyAttrs ? `\n      ${bodyAttrs}` : "";

  return `<DataTableWrapper${wb}>
  <DataTable>
    <DataTableHeader>...</DataTableHeader>
    <DataTableBody${bodyLine}${bodyAttrs ? "\n    " : ""}>
      {(row) => <DataTableRow key={row.id}>...</DataTableRow>}
    </DataTableBody>
  </DataTable>
  <DataTableLoadingBody />
  <DataTableEmptyBody />
  <DataTableFoot />
</DataTableWrapper>`;
}

function PlaygroundDataTable({
  wrapperBorder,
  bodyBorder,
  bodyBg,
}: {
  wrapperBorder: BorderState;
  bodyBorder: BorderState;
  bodyBg: BgState;
}) {
  return (
    <DataTableProvider data={MOCK_INVOICES} columns={INVOICE_COLUMNS}>
      <DataTableWrapper
        border={wrapperBorder.enabled ? wrapperBorder : undefined}
      >
        <DataTable scrollable horizontal height={320}>
          <DataTableHeader>
            <DataTableHeaderRow>
              <DataTableHead column="invoiceNumber" />
              <DataTableHead column="clientName" />
              <DataTableHead column="amount" />
              <DataTableHead column="dueDate" />
              <DataTableHead column="status" />
              <DataTableHead column="issuedAt" />
            </DataTableHeaderRow>
          </DataTableHeader>
          <DataTableBody
            border={bodyBorder.enabled ? bodyBorder : undefined}
            bg={bodyBg.enabled ? bodyBg : undefined}
          >
            {(row: Invoice) => (
              <DataTableRow key={row.id}>
                <DataTableCell column="invoiceNumber">
                  <DataTableHighlight
                    text={row.invoiceNumber}
                    item={row}
                    itemKey="invoiceNumber"
                  />
                </DataTableCell>
                <DataTableCell column="clientName">
                  <DataTableHighlight
                    text={row.clientName}
                    item={row}
                    itemKey="clientName"
                  />
                </DataTableCell>
                <DataTableCell column="amount">
                  <DataTableHighlight
                    text={formatAmount(row.amount)}
                    item={row}
                    itemKey="amount"
                  />
                </DataTableCell>
                <DataTableCell column="dueDate">
                  <DataTableHighlight
                    text={formatDate(row.dueDate)}
                    item={row}
                    itemKey="dueDate"
                  />
                </DataTableCell>
                <DataTableCell column="status">
                  <SimpleBadge variant={statusBadgeVariant[row.status]}>
                    {statusLabel[row.status]}
                  </SimpleBadge>
                </DataTableCell>
                <DataTableCell column="issuedAt">
                  <DataTableHighlight
                    text={formatDate(row.issuedAt)}
                    item={row}
                    itemKey="issuedAt"
                  />
                </DataTableCell>
              </DataTableRow>
            )}
          </DataTableBody>
        </DataTable>
        <DataTableLoadingBody />
        <DataTableEmptyBody />
        <DataTableFoot />
      </DataTableWrapper>
    </DataTableProvider>
  );
}

function DataTableAccentPlayground() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [wrapperBorder, setWrapperBorder] = useState<BorderState>({
    enabled: true,
    side: "t",
    stroke: 3,
    color: "orange",
  });
  const [bodyBorder, setBodyBorder] = useState<BorderState>({
    enabled: false,
    side: "t",
    stroke: 3,
    color: "blue",
  });
  const [bodyBg, setBodyBg] = useState<BgState>({
    enabled: true,
    style: "linear",
    side: "b",
    color: "blue",
    to: "transparent",
  });

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b bg-muted/60">
        {(["preview", "code"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-xs font-medium capitalize transition-colors",
              activeTab === tab
                ? "text-foreground border-b-2 border-foreground -mb-px bg-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Preview tab: controls sidebar + live table side-by-side */}
      {activeTab === "preview" && (
        <div className="flex flex-col lg:flex-row">
          {/* Controls — full width on small, fixed sidebar on large */}
          <div className="w-full lg:w-63 shrink-0 border-b lg:border-b-0 lg:border-r divide-y bg-muted/10">
            {/* Wrapper Border */}
            <div className="p-3 space-y-3">
              <Pill
                active={wrapperBorder.enabled}
                onClick={() =>
                  setWrapperBorder((s) => ({ ...s, enabled: !s.enabled }))
                }
              >
                {wrapperBorder.enabled ? "✓ " : ""}Wrapper Border
              </Pill>
              {wrapperBorder.enabled && (
                <div className="space-y-2">
                  <ControlRow label="Side">
                    {BORDER_SIDES.map((s) => (
                      <Pill
                        key={s}
                        active={wrapperBorder.side === s}
                        onClick={() =>
                          setWrapperBorder((st) => ({ ...st, side: s }))
                        }
                      >
                        {BORDER_SIDE_LABEL[s]}
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Stroke">
                    {BORDER_STROKES.map((n) => (
                      <Pill
                        key={n}
                        active={wrapperBorder.stroke === n}
                        onClick={() =>
                          setWrapperBorder((st) => ({ ...st, stroke: n }))
                        }
                      >
                        {n}px
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Color">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c}
                        title={c}
                        onClick={() =>
                          setWrapperBorder((st) => ({ ...st, color: c }))
                        }
                        className={cn(
                          "h-5 w-5 rounded border-2 transition-all",
                          COLOR_SWATCH[c],
                          wrapperBorder.color === c
                            ? "border-foreground scale-110"
                            : "border-transparent",
                        )}
                      />
                    ))}
                  </ControlRow>
                </div>
              )}
            </div>

            {/* Body Border */}
            <div className="p-3 space-y-3">
              <Pill
                active={bodyBorder.enabled}
                onClick={() =>
                  setBodyBorder((s) => ({ ...s, enabled: !s.enabled }))
                }
              >
                {bodyBorder.enabled ? "✓ " : ""}Body Border
              </Pill>
              {bodyBorder.enabled && (
                <div className="space-y-2">
                  <ControlRow label="Side">
                    {BORDER_SIDES.map((s) => (
                      <Pill
                        key={s}
                        active={bodyBorder.side === s}
                        onClick={() =>
                          setBodyBorder((st) => ({ ...st, side: s }))
                        }
                      >
                        {BORDER_SIDE_LABEL[s]}
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Stroke">
                    {BORDER_STROKES.map((n) => (
                      <Pill
                        key={n}
                        active={bodyBorder.stroke === n}
                        onClick={() =>
                          setBodyBorder((st) => ({ ...st, stroke: n }))
                        }
                      >
                        {n}px
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Color">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c}
                        title={c}
                        onClick={() =>
                          setBodyBorder((st) => ({ ...st, color: c }))
                        }
                        className={cn(
                          "h-5 w-5 rounded border-2 transition-all",
                          COLOR_SWATCH[c],
                          bodyBorder.color === c
                            ? "border-foreground scale-110"
                            : "border-transparent",
                        )}
                      />
                    ))}
                  </ControlRow>
                </div>
              )}
            </div>

            {/* Body Background */}
            <div className="p-3 space-y-3">
              <Pill
                active={bodyBg.enabled}
                onClick={() =>
                  setBodyBg((s) => ({ ...s, enabled: !s.enabled }))
                }
              >
                {bodyBg.enabled ? "✓ " : ""}Body Background
              </Pill>
              {bodyBg.enabled && (
                <div className="space-y-2">
                  <ControlRow label="Style">
                    {BG_STYLES.map((s) => (
                      <Pill
                        key={s}
                        active={bodyBg.style === s}
                        onClick={() =>
                          setBodyBg((st) => ({ ...st, style: s }))
                        }
                      >
                        {s}
                      </Pill>
                    ))}
                  </ControlRow>
                  {bodyBg.style === "linear" && (
                    <ControlRow label="Side">
                      {BORDER_SIDES.map((s) => (
                        <Pill
                          key={s}
                          active={bodyBg.side === s}
                          onClick={() =>
                            setBodyBg((st) => ({ ...st, side: s }))
                          }
                        >
                          {BORDER_SIDE_LABEL[s]}
                        </Pill>
                      ))}
                    </ControlRow>
                  )}
                  <ControlRow label="Color">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c}
                        title={c}
                        onClick={() =>
                          setBodyBg((st) => ({ ...st, color: c }))
                        }
                        className={cn(
                          "h-5 w-5 rounded border-2 transition-all",
                          COLOR_SWATCH[c],
                          bodyBg.color === c
                            ? "border-foreground scale-110"
                            : "border-transparent",
                        )}
                      />
                    ))}
                  </ControlRow>
                  <ControlRow label="To">
                    <div className="flex flex-wrap gap-1">
                      {BG_TOS.map((t) => (
                        <button
                          key={t}
                          onClick={() => setBodyBg((st) => ({ ...st, to: t }))}
                          className={cn(
                            "flex h-5 items-center rounded border-2 px-1 text-[9px] font-medium transition-all",
                            t === "transparent" &&
                              "bg-transparent text-muted-foreground",
                            t === "white" && "bg-white text-black",
                            t === "black" && "bg-black text-white",
                            t !== "transparent" &&
                              t !== "white" &&
                              t !== "black" &&
                              cn(COLOR_SWATCH[t as AccentColor], "text-white"),
                            bodyBg.to === t
                              ? "border-foreground scale-110"
                              : "border-transparent",
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </ControlRow>
                </div>
              )}
            </div>
          </div>

          {/* Live preview */}
          <div className="flex-1 min-w-0 p-4">
            <PlaygroundDataTable
              wrapperBorder={wrapperBorder}
              bodyBorder={bodyBorder}
              bodyBg={bodyBg}
            />
          </div>
        </div>
      )}

      {/* Code tab */}
      {activeTab === "code" && (
        <div className="p-4">
          <CodeBlock
            label="Generated code"
            code={generateCode(wrapperBorder, bodyBorder, bodyBg)}
          />
        </div>
      )}
    </div>
  );
}

// ─── Doc content ──────────────────────────────────────────────────────────────

const meta = registry["data-table"];

export function DataTableDocContent() {
  return (
    <div className="space-y-10">
      {/* ── Hero ── */}
      <ComponentPreview
        align="start"
        minHeight={460}
        code={`import { ColumnDef } from '@/ascendra-ui';

// 1. Define columns
const INVOICE_COLUMNS: ColumnDef<Invoice>[] = [
  { key: 'invoiceNumber', label: 'Invoice #', freeze: true },
  { key: 'clientName',    label: 'Client',    freeze: true, filter: true },
  { key: 'amount',        label: 'Amount',    type: 'number' },
  { key: 'dueDate',       label: 'Due Date',  type: 'date' },
  {
    key: 'status',
    label: 'Status',
    sortable: false,
    filter: true,
    displayValue: (raw) => statusLabel[raw as InvoiceStatus] ?? raw,
  },
  { key: 'issuedAt', label: 'Issued', type: 'date', active: false },
];

// 2. Compose the table
<DataTableProvider data={invoices} columns={INVOICE_COLUMNS} isLoading={isLoading}>

  {/* Toolbar */}
  <DataTableBar>
      <DataTableBarContent>
        <DataTableSearchInput />
        <DataTableColumnManager />
        <DataTableSortDropdown />
        <DataTableFilterDropdown />
      </DataTableBarContent>
      <DataTableBarAction>
        <Button size="sm">+ Add Invoice</Button>
      </DataTableBarAction>
    </DataTableBar>

    {/* Active filter chips */}
    <DataTableFilterBar />

    {/* Table */}
    <DataTableWrapper>
      <DataTable scrollable horizontal height={340}>
        <DataTableHeader>
          <DataTableHeaderRow>
            <DataTableHead column="invoiceNumber" />
            <DataTableHead column="clientName" />
            <DataTableHead column="amount" />
            <DataTableHead column="dueDate" />
            <DataTableHead column="status" />
            <DataTableHead column="issuedAt" />
          </DataTableHeaderRow>
        </DataTableHeader>
        <DataTableBody>
          {(row: Invoice) => (
            <DataTableRow key={row.id}>
              <DataTableCell column="invoiceNumber">
                <DataTableHighlight text={row.invoiceNumber} item={row} itemKey="invoiceNumber" />
              </DataTableCell>
              <DataTableCell column="clientName">
                <DataTableHighlight text={row.clientName} item={row} itemKey="clientName" />
              </DataTableCell>
              <DataTableCell column="amount">
                <DataTableHighlight text={formatAmount(row.amount)} item={row} itemKey="amount" />
              </DataTableCell>
              <DataTableCell column="dueDate">
                <DataTableHighlight text={formatDate(row.dueDate)} item={row} itemKey="dueDate" />
              </DataTableCell>
              <DataTableCell column="status">
                <SimpleBadge variant={statusBadgeVariant[row.status]}>
                  {statusLabel[row.status]}
                </SimpleBadge>
              </DataTableCell>
              <DataTableCell column="issuedAt">
                <DataTableHighlight text={formatDate(row.issuedAt)} item={row} itemKey="issuedAt" />
              </DataTableCell>
            </DataTableRow>
          )}
        </DataTableBody>
      </DataTable>
      <DataTableLoadingBody />
      <DataTableEmptyBody />
      <DataTableFoot />
    </DataTableWrapper>

</DataTableProvider>`}
      >
        <div className="w-full space-y-3">
          <InvoiceDataTable />
        </div>
      </ComponentPreview>

      {/* ── Examples ── */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Loading state */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Loading State</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              isLoading
            </code>{" "}
            to{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableProvider
            </code>
            .{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableLoadingBody
            </code>{" "}
            renders automatically;{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableBody
            </code>{" "}
            hides itself.
          </p>
          <ComponentPreview
            align="start"
            minHeight={200}
            code={`<DataTableProvider data={[]} columns={INVOICE_COLUMNS} isLoading={true}>
  <DataTableWrapper>
    <DataTable scrollable horizontal>
      <DataTableHeader>
        <DataTableHeaderRow>
          <DataTableHead column="invoiceNumber" />
          <DataTableHead column="clientName" />
          <DataTableHead column="status" />
        </DataTableHeaderRow>
      </DataTableHeader>
      <DataTableBody>{(row) => <DataTableRow key={row.id}>...</DataTableRow>}</DataTableBody>
    </DataTable>
    <DataTableLoadingBody />
    <DataTableEmptyBody />
    <DataTableFoot />
  </DataTableWrapper>
</DataTableProvider>`}
          >
            <div className="w-full">
              <DataTableProvider
                data={[]}
                columns={INVOICE_COLUMNS}
                isLoading={true}
              >
                <DataTableWrapper>
                  <DataTable scrollable horizontal>
                    <DataTableHeader>
                      <DataTableHeaderRow>
                        <DataTableHead column="invoiceNumber" />
                        <DataTableHead column="clientName" />
                        <DataTableHead column="status" />
                      </DataTableHeaderRow>
                    </DataTableHeader>
                    <DataTableBody>{() => null}</DataTableBody>
                  </DataTable>
                  <DataTableLoadingBody />
                  <DataTableEmptyBody />
                  <DataTableFoot />
                </DataTableWrapper>
              </DataTableProvider>
            </div>
          </ComponentPreview>
        </div>

        {/* Empty state */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Empty State</h3>
          <p className="text-xs text-muted-foreground">
            When{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              data
            </code>{" "}
            is empty and not loading,{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableEmptyBody
            </code>{" "}
            renders automatically. Customize the message with{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              title
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              description
            </code>{" "}
            props.
          </p>
          <ComponentPreview
            align="start"
            minHeight={200}
            code={`<DataTableProvider data={[]} columns={INVOICE_COLUMNS} isLoading={false}>
  <DataTableWrapper>
    <DataTable scrollable horizontal>
      <DataTableHeader>
        <DataTableHeaderRow>
          <DataTableHead column="invoiceNumber" />
          <DataTableHead column="clientName" />
          <DataTableHead column="status" />
        </DataTableHeaderRow>
      </DataTableHeader>
      <DataTableBody>{(row) => <DataTableRow key={row.id}>...</DataTableRow>}</DataTableBody>
    </DataTable>
    <DataTableLoadingBody />
    <DataTableEmptyBody
      title="No invoices found"
      description="Add a new invoice to get started."
    />
    <DataTableFoot />
  </DataTableWrapper>
</DataTableProvider>`}
          >
            <div className="w-full">
              <DataTableProvider
                data={[]}
                columns={INVOICE_COLUMNS}
                isLoading={false}
              >
                <DataTableWrapper>
                  <DataTable scrollable horizontal>
                    <DataTableHeader>
                      <DataTableHeaderRow>
                        <DataTableHead column="invoiceNumber" />
                        <DataTableHead column="clientName" />
                        <DataTableHead column="status" />
                      </DataTableHeaderRow>
                    </DataTableHeader>
                    <DataTableBody>{() => null}</DataTableBody>
                  </DataTable>
                  <DataTableLoadingBody />
                  <DataTableEmptyBody
                    title="No invoices found"
                    description="Add a new invoice to get started."
                  />
                  <DataTableFoot />
                </DataTableWrapper>
              </DataTableProvider>
            </div>
          </ComponentPreview>
        </div>

        {/* Column definition options */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Column Definition
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              ColumnDef&lt;T&gt;
            </code>{" "}
            controls visibility, sorting, filtering, and display for each
            column. Define once; the providers and all toolbar components derive
            their behaviour from it.
          </p>
          <ComponentPreview
            align="start"
            minHeight={100}
            code={`import { ColumnDef } from '@/ascendra-ui';

const INVOICE_COLUMNS: ColumnDef<Invoice>[] = [
  // freeze: always visible; cannot be hidden via the column manager
  { key: 'invoiceNumber', label: 'Invoice #', freeze: true },

  // filter: true → appears in the filter picker dropdown
  { key: 'clientName', label: 'Client', freeze: true, filter: true },

  // type: 'number' | 'date' — drives sort order and search formatting
  { key: 'amount',  label: 'Amount',   type: 'number' },
  { key: 'dueDate', label: 'Due Date', type: 'date' },

  // sortable: false — removes sort icon and click handler for this column
  // displayValue: maps raw data values to human-readable filter chip labels
  {
    key: 'status',
    label: 'Status',
    sortable: false,
    filter: true,
    displayValue: (raw) => statusLabel[raw as InvoiceStatus] ?? raw,
  },

  // active: false — column is hidden by default but toggleable via column manager
  { key: 'issuedAt', label: 'Issued', type: 'date', active: false },
];`}
          >
            <div className="w-full rounded-lg border bg-muted/30 px-5 py-4">
              <p className="text-xs text-muted-foreground">
                View the{" "}
                <span className="font-medium text-foreground">Code</span> tab to
                see the full{" "}
                <code className="rounded bg-muted px-1 font-mono">
                  ColumnDef&lt;T&gt;[]
                </code>{" "}
                configuration.
              </p>
            </div>
          </ComponentPreview>
        </div>

        {/* Toolbar composition */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Toolbar Composition
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableBar
            </code>{" "}
            is a flex row split into{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableBarContent
            </code>{" "}
            (left tools) and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableBarAction
            </code>{" "}
            (right actions). Each tool inside reads state from{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableProvider
            </code>{" "}
            — include only what you need.
          </p>
          <ComponentPreview
            align="start"
            code={`<DataTableBar>
  <DataTableBarContent>
    {/* Text + fuzzy search */}
    <DataTableSearchInput />

    {/* Show/hide & reorder columns */}
    <DataTableColumnManager />

    {/* Sort by any sortable column */}
    <DataTableSortDropdown />

    {/* Filter by columns with filter: true */}
    <DataTableFilterDropdown />
  </DataTableBarContent>

  {/* Primary page action — sits on the right */}
  <DataTableBarAction>
    <Button size="sm">+ Add Invoice</Button>
  </DataTableBarAction>
</DataTableBar>

{/* Renders active filter chips below the bar */}
<DataTableFilterBar />`}
          >
            <div className="w-full space-y-3">
              <DataTableProvider data={MOCK_INVOICES} columns={INVOICE_COLUMNS}>
                <DataTableBar>
                  <DataTableBarContent>
                    <DataTableSearchInput />
                    <DataTableColumnManager />
                    <DataTableSortDropdown />
                    <DataTableFilterDropdown />
                  </DataTableBarContent>
                  <DataTableBarAction>
                    <Button size="sm">+ Add Invoice</Button>
                  </DataTableBarAction>
                </DataTableBar>
                <DataTableFilterBar />
              </DataTableProvider>
            </div>
          </ComponentPreview>
        </div>

        {/* DataTableHighlight */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Search Highlighting
          </h3>
          <p className="text-xs text-muted-foreground">
            Wrap any cell text with{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableHighlight
            </code>{" "}
            to automatically highlight matched search terms. Pass the raw string
            value, the row object, and the column key — the component reads the
            active search term from context.
          </p>
          <ComponentPreview
            align="start"
            code={`<DataTableCell column="clientName">
  {/* Highlights any portion of clientName that matches the search term */}
  <DataTableHighlight
    text={row.clientName}
    item={row}
    itemKey="clientName"
  />
</DataTableCell>

{/* For cells with a custom display value (e.g. formatted currency),
    pass the formatted string as text but keep itemKey pointing to the
    original data key so the highlight ranges align correctly. */}
<DataTableCell column="amount">
  <DataTableHighlight
    text={formatAmount(row.amount)}
    item={row}
    itemKey="amount"
  />
</DataTableCell>`}
          >
            <div className="w-full rounded-lg border bg-muted/30 px-5 py-4">
              <p className="text-xs text-muted-foreground">
                Type in the search box in the hero example above to see
                highlighting in action.
              </p>
            </div>
          </ComponentPreview>
        </div>

        {/* Accent styles playground */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Accent Styles — Border &amp; Background
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableWrapper
            </code>{" "}
            accepts a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              border
            </code>{" "}
            prop.{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableBody
            </code>{" "}
            accepts both{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              border
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">bg</code>.
            Toggle each option below and see the result live.
          </p>
          <DataTableAccentPlayground />
        </div>
      </div>

      {/* ── Props ── */}
      <div className="space-y-8">
        <SectionHeader>Props</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            ColumnDef&lt;T&gt;
          </h3>
          <PropsTable props={meta.props ?? []} />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            DataTableWrapper
          </h3>
          <PropsTable
            props={[
              {
                name: "border",
                type: "BorderConfig",
                description:
                  "Optional accent border on the outer wrapper. Omit to render without a border.",
              },
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">DataTableBody</h3>
          <PropsTable
            props={[
              {
                name: "border",
                type: "BorderConfig",
                description:
                  "Optional accent border on the ::before panel element.",
              },
              {
                name: "bg",
                type: "BgConfig",
                description:
                  "Optional gradient background on the ::before panel. Removes solid bg-background when set.",
              },
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">BorderConfig</h3>
          <PropsTable
            props={[
              {
                name: "side",
                type: "'t' | 'l' | 'r' | 'b'",
                default: "'t'",
                description: "Which side the border appears on.",
              },
              {
                name: "stroke",
                type: "1 | 2 | 3",
                default: "3",
                description: "Border thickness in px.",
              },
              {
                name: "color",
                type: "'blue' | 'amber' | 'purple' | 'red' | 'teal' | 'orange' | 'indigo' | 'slate'",
                default: "'orange'",
                description: "Accent color at 60% opacity.",
              },
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">BgConfig</h3>
          <PropsTable
            props={[
              {
                name: "style",
                type: "'linear' | 'radial' | 'conic'",
                default: "'linear'",
                description: "CSS gradient type.",
              },
              {
                name: "side",
                type: "'t' | 'l' | 'r' | 'b'",
                default: "'b'",
                description: "Gradient direction for linear gradients.",
              },
              {
                name: "color",
                type: "'blue' | 'amber' | 'purple' | 'red' | 'teal' | 'orange' | 'indigo' | 'slate'",
                default: "'orange'",
                description: "Start color at 7% opacity.",
              },
              {
                name: "to",
                type: "'transparent' | 'white' | 'black' | AccentColor",
                default: "'transparent'",
                description: "End stop color. Accent colors resolve to 500/60.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

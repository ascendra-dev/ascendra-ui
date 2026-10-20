"use client";

import Link from "next/link";
import { useState } from "react";

import {
  buildQuerySearch,
  Button,
  type ColumnDef,
  createPageQueryFn,
  DataTable,
  DataTableBar,
  DataTableBarAction,
  DataTableBarContent,
  DataTableBody,
  DataTableBulkDeleteHeadAction,
  DataTableBulkExportHeadAction,
  DataTableCell,
  DataTableCheckboxCell,
  DataTableCheckboxHead,
  DataTableColumnManager,
  DataTableCopyValueAction,
  DataTableRunQueryAction,
  DataTableDeleteRowAction,
  DataTableDuplicateRowAction,
  DataTableEditRowAction,
  DataTableEmptyBody,
  DataTableErrorBody,
  DataTableExportButton,
  DataTableFilterBar,
  DataTableFilterDropdown,
  DataTableFoot,
  DataTableHead,
  DataTableHeadAction,
  DataTableHeader,
  DataTableHeaderRow,
  DataTableHighlight,
  DataTableLoadingBody,
  DataTableRow,
  DataTableRowAction,
  DataTableRowActionItem,
  DataTableSearchInput,
  DataTableSheetNavigator,
  DataTableSortDropdown,
  DataTableViewRowAction,
  DataTableWithQueryProvider,
  DataTableWrapper,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  type FieldOptionsMap,
  MainContent,
  PageHeader,
  PageHeaderGroup,
  PageMain,
  PageSubtitle,
  PageTitle,
  QueryBar,
  type QueryFunctionMap,
  QueryParamPanel,
  IdText,
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetKey,
  SheetProperties,
  SheetSection,
  SheetTitle,
  SheetValue,
  SimpleBadge,
  TabContent,
  TabList,
  Tabs,
  TabTrigger,
} from "@/ascendra-ui";
import {
  PRESET_QUERIES,
  exportMockInvoices,
  fetchMockInvoices,
  type Invoice,
  type InvoiceStatus,
} from "@/lib/mock/invoice-mock";

import { formatAmount, formatDate } from "@/ascendra-ui/utils/common.util";
import { DataTableGuide } from "./_guide";
import {
  LuCalendarClock,
  LuNotebookPen,
  LuTicketCheck,
  LuTrash2,
} from "react-icons/lu";

const statusVariant: Record<InvoiceStatus, "green" | "amber" | "red"> = {
  Paid: "green",
  Pending: "amber",
  Overdue: "red",
  Cancelled: "red",
};

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

const INVOICE_QUERY_FUNCTIONS: QueryFunctionMap<Invoice> = Object.fromEntries(
  PRESET_QUERIES.map((q) => [
    q.id,
    createPageQueryFn((params, page) => fetchMockInvoices(q.id, page, params)),
  ]),
);

// Demonstrates dynamic fieldOptions — overrides static options in PRESET_QUERIES
const INVOICE_FIELD_OPTIONS: FieldOptionsMap = {
  // Static override: simulates options fetched from a server (adds "Draft" status)
  "by-status": {
    statuses: [
      { value: "Paid", label: "Paid" },
      { value: "Pending", label: "Pending" },
      { value: "Overdue", label: "Overdue" },
      { value: "Cancelled", label: "Cancelled" },
      { value: "Draft", label: "Draft" },
    ],
  },
  // Reactive resolver: paymentStatus options depend on the selected gradeLevel
  "by-client": {
    paymentStatus: (values) => {
      const base = [
        { value: "Paid", label: "Paid" },
        { value: "Pending", label: "Pending" },
        { value: "Overdue", label: "Overdue" },
      ];
      // Class 12 students have no Overdue invoices — remove it when that grade is selected
      if (values.gradeLevel === "class-12") {
        return base.filter((o) => o.value !== "Overdue");
      }
      return base;
    },
  },
};

// Same-page links that trigger a query through the URL — a link from another page works the same way.
const URL_TRIGGER_LINKS = [
  { label: "Overdue invoices", search: buildQuerySearch("by-status", { statuses: ["Overdue"] }) },
  { label: "Due by Feb 15, 2024", search: buildQuerySearch("due-by", { dueBy: "2024-02-15" }) },
  { label: "Broken link (unknown param)", search: buildQuerySearch("by-status", { colour: "red" }) },
];

export default function DataTableLabPage() {
  const [selected, setSelected] = useState<Invoice | null>(null);

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageTitle>Data Table Lab</PageTitle>
          <PageSubtitle>
            Fully-featured sandbox — switch queries, test filters, and verify
            behaviour during refactoring.
          </PageSubtitle>
        </PageHeaderGroup>
      </PageHeader>
      <PageMain>
        <Tabs defaultValue="table-usage">
          <TabList>
            <TabTrigger value="table-usage">Table usage</TabTrigger>
            <TabTrigger value="developer-guide">Developer guide</TabTrigger>
          </TabList>
          <TabContent value="table-usage">
            <MainContent>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground text-xs">
                  Open by link:
                </span>
                {URL_TRIGGER_LINKS.map((link) => (
                  <Button key={link.label} variant="secondary" size="sm" asChild>
                    <Link href={`?${link.search}`}>{link.label}</Link>
                  </Button>
                ))}
              </div>
              <DataTableWithQueryProvider
                queries={PRESET_QUERIES}
                queryFunctions={INVOICE_QUERY_FUNCTIONS}
                fieldOptions={INVOICE_FIELD_OPTIONS}
                columns={INVOICE_COLUMNS}
                getRowId={(row) => String(row.id)}
                selectable
                tableId="data-table-lab-table"
              >
                <QueryBar />
                <QueryParamPanel />
                <DataTableBar>
                  <DataTableBarContent>
                    <DataTableSearchInput />
                    <DataTableColumnManager />
                    <DataTableSortDropdown />
                    <DataTableFilterDropdown />
                  </DataTableBarContent>
                  <DataTableBarAction>
                    <DataTableExportButton
                      exportFn={(_params, queryId) =>
                        exportMockInvoices(queryId)
                      }
                    />
                  </DataTableBarAction>
                </DataTableBar>
                <DataTableFilterBar />
                <DataTableWrapper>
                  <DataTable scrollable horizontal height={200}>
                    <DataTableHeader>
                      <DataTableHeaderRow>
                        <DataTableCheckboxHead />
                        <DataTableHead column="invoiceNumber">
                          Invoice #
                        </DataTableHead>
                        <DataTableHead column="clientName">
                          Client
                        </DataTableHead>
                        <DataTableHead column="status" />
                        <DataTableHead column="amount" />
                        <DataTableHead column="dueDate" />
                        <DataTableHead column="issuedAt" />
                        <DataTableHeadAction
                          variant="visible"
                          onAction={(id, selectedRowIds) =>
                            console.log("head action:", id, selectedRowIds)
                          }
                        >
                          <DataTableBulkExportHeadAction />
                          <DropdownMenuSeparator />
                          <DataTableBulkDeleteHeadAction />
                        </DataTableHeadAction>
                      </DataTableHeaderRow>
                    </DataTableHeader>
                    <DataTableBody>
                      {(row: Invoice) => (
                        <DataTableRow key={row.id} active={row.id === selected?.id}>
                          <DataTableCheckboxCell rowId={String(row.id)} />
                          <DataTableCell column="invoiceNumber">
                            <div>
                              <DataTableHighlight
                                text={row.invoiceNumber}
                                item={row}
                                itemKey="invoiceNumber"
                              />
                              <div className="text-muted-foreground text-xs">
                                <DataTableHighlight
                                  text={row.title}
                                  item={row}
                                  itemKey="title"
                                />
                              </div>
                            </div>
                          </DataTableCell>
                          <DataTableCell column="clientName">
                            <DataTableHighlight
                              text={row.clientName}
                              item={row}
                              itemKey="clientName"
                            />
                          </DataTableCell>
                          <DataTableCell column="status">
                            <SimpleBadge variant={statusVariant[row.status]}>
                              {row.status}
                            </SimpleBadge>
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
                          <DataTableCell column="issuedAt">
                            <DataTableHighlight
                              text={formatDate(row.issuedAt)}
                              item={row}
                              itemKey="issuedAt"
                            />
                          </DataTableCell>
                          <DataTableRowAction
                            variant="visible"
                            onAction={(id) =>
                              id === "view"
                                ? setSelected(row)
                                : console.log("row action:", id, row.id)
                            }
                          >
                            <DropdownMenuLabel>
                              Default row actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DataTableViewRowAction />
                            <DataTableEditRowAction />
                            <DataTableDuplicateRowAction />
                            <DataTableCopyValueAction
                              title="Copy invoice number"
                              value={row.invoiceNumber}
                            />
                            <DataTableDeleteRowAction />
                            <DropdownMenuSeparator />
                            <DataTableRunQueryAction
                              title={`All ${row.status} invoices`}
                              queryId="by-status"
                              params={{ statuses: [row.status] }}
                            />
                            <DataTableRunQueryAction
                              title={`Due by ${formatDate(row.dueDate)}`}
                              queryId="due-by"
                              params={{ dueBy: row.dueDate }}
                              icon={<LuCalendarClock />}
                            />
                            <DropdownMenuSeparator />
                            <DataTableRowActionItem
                              id="set-default"
                              icon={<LuTicketCheck />}
                            >
                              Set as default role set
                            </DataTableRowActionItem>
                            <DataTableRowActionItem
                              id="edit"
                              icon={<LuNotebookPen />}
                            >
                              Edit role set
                            </DataTableRowActionItem>
                            <DropdownMenuSeparator />
                            <DataTableRowActionItem
                              id="delete"
                              icon={<LuTrash2 />}
                              variant="destructive"
                            >
                              Delete role set
                            </DataTableRowActionItem>
                          </DataTableRowAction>
                        </DataTableRow>
                      )}
                    </DataTableBody>
                  </DataTable>
                  <DataTableLoadingBody />
                  <DataTableErrorBody />
                  <DataTableEmptyBody />
                  <DataTableFoot />
                </DataTableWrapper>
                {selected && (
                  <Sheet open lockScroll={false} onOpenChange={(open) => !open && setSelected(null)}>
                    <SheetContent>
                      <DataTableSheetNavigator<Invoice>
                        selectedId={String(selected.id)}
                        onSelect={setSelected}
                      />
                      <SheetHeader>
                        <SheetTitle>{selected.invoiceNumber}</SheetTitle>
                        <SheetDescription>{selected.title}</SheetDescription>
                      </SheetHeader>
                      <SheetBody>
                        <SheetSection>
                          <SheetProperties>
                            <SheetKey>Invoice id</SheetKey>
                            <SheetValue>
                              <IdText value={selected.id} size="md" />
                            </SheetValue>
                            <SheetKey>Client</SheetKey>
                            <SheetValue>{selected.clientName}</SheetValue>
                            <SheetKey>Amount</SheetKey>
                            <SheetValue>{formatAmount(selected.amount)}</SheetValue>
                            <SheetKey>Status</SheetKey>
                            <SheetValue>{selected.status}</SheetValue>
                            <SheetKey>Due</SheetKey>
                            <SheetValue>{formatDate(selected.dueDate)}</SheetValue>
                          </SheetProperties>
                        </SheetSection>
                      </SheetBody>
                    </SheetContent>
                  </Sheet>
                )}
              </DataTableWithQueryProvider>
            </MainContent>
          </TabContent>
          <TabContent value="developer-guide">
            <MainContent>
              <DataTableGuide />
            </MainContent>
          </TabContent>
        </Tabs>
      </PageMain>
    </>
  );
}

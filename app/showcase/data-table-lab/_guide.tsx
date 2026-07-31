"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SectionHeader } from "@/components/section-header";

// ─── Shared primitives ────────────────────────────────────────────────────────

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
      {children}
    </code>
  );
}

function CodeBlock({ children, lang = "tsx" }: { children: string; lang?: string }) {
  const { resolvedTheme } = useTheme();
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let active = true;
    const theme = resolvedTheme === "dark" ? "github-dark" : "github-light";
    import("shiki").then(({ codeToHtml }) => {
      if (!active) return;
      codeToHtml(children, { lang, theme }).then((result) => {
        if (active) setHtml(result);
      });
    });
    return () => { active = false; };
  }, [children, lang, resolvedTheme]);

  if (!html) {
    return (
      <div className="overflow-x-auto rounded-lg border bg-muted/40 p-4">
        <pre className="whitespace-pre font-mono text-xs leading-relaxed text-foreground">
          {children}
        </pre>
      </div>
    );
  }

  return (
    <div
      className="overflow-x-auto rounded-lg border text-xs [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-xs [&_pre]:leading-relaxed [&_pre]:whitespace-pre [&_pre]:rounded-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-xs text-foreground leading-relaxed">
      {children}
    </div>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-foreground leading-relaxed">
      {children}
    </div>
  );
}

interface PropRowProps {
  name: string;
  type: string;
  required?: boolean;
  defaultVal?: string;
  description: string;
}

function PropRow({ name, type, required, defaultVal, description }: PropRowProps) {
  return (
    <div className="flex flex-col gap-1 border-t px-4 py-3 first:border-t-0 sm:flex-row sm:gap-4">
      <div className="flex items-start gap-2 shrink-0 sm:w-56">
        <code className="font-mono text-xs text-foreground">{name}</code>
        {required && (
          <span className="rounded bg-primary/10 px-1 py-0.5 font-mono text-[0.6rem] text-primary">
            required
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <code className="font-mono text-[0.6875rem] text-muted-foreground">{type}</code>
        {defaultVal && (
          <span className="font-mono text-[0.6rem] text-muted-foreground/60">
            default: {defaultVal}
          </span>
        )}
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function PropTable({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border">{children}</div>;
}

// ─── Guide sections ───────────────────────────────────────────────────────────

function ArchitectureSection() {
  return (
    <div className="space-y-4">
      <SectionHeader>Architecture Overview</SectionHeader>
      <p className="text-sm text-muted-foreground leading-relaxed">
        The data table system is split into two independent layers. The{" "}
        <strong className="text-foreground">provider layer</strong> owns all
        state — data, search, filters, sort, pagination, and selection. The{" "}
        <strong className="text-foreground">component layer</strong> reads from
        context and renders. Components self-exclude when their column is hidden;
        there is no prop-drilling.
      </p>

      <CodeBlock lang="text">{`Data flow (top → bottom)
────────────────────────────────────────────────────
Raw data (prop or query result)
  └─ useSearch      →  searchFilteredData
       └─ useFilter →  filteredData        (also drives getOptionsFor)
            └─ useSort    →  sortedData
                 └─ usePagination  →  pagedData   (displayed in <DataTableBody>)
                      └─ useSelection  →  selectedRows

Context split (6 independent slices — subscribe only to what you need)
────────────────────────────────────────────────────
DataTableColumnContext   — columns, toggleColumnActive, reorderColumns
DataTableSearchContext   — searchTerm, fuzzy, getRanges
DataTableFilterContext   — filters, addFilter, getOptionsFor
DataTableSortContext     — sortConfig, handleSort
DataTableDataContext     — pagedData, totalFiltered, pagination, isLoading
DataTableSelectionContext — selectedRows, isAllSelected, toggleRow …`}</CodeBlock>

      <p className="text-xs text-muted-foreground leading-relaxed">
        The query layer (<Code>DataTableQueryProvider</Code>) sits above{" "}
        <Code>DataTableProvider</Code> and feeds it data + loading state via{" "}
        <Code>useOptionalQueryContext()</Code>. The convenience wrapper{" "}
        <Code>DataTableWithQueryProvider</Code> combines both into one component.
      </p>
    </div>
  );
}

function QuickStartSection() {
  return (
    <div className="space-y-4">
      <SectionHeader>Quick Start — Static Data</SectionHeader>
      <p className="text-sm text-muted-foreground leading-relaxed">
        The smallest working table: pass <Code>data</Code> and{" "}
        <Code>columns</Code> to <Code>DataTableProvider</Code>, then render the
        compound components inside.
      </p>

      <CodeBlock>{`import { DataTableProvider } from "@/ascendra-ui";
import { type ColumnDef, DataTable, DataTableBody, DataTableCell, DataTableDeleteRowAction, DataTableEditRowAction, DataTableFoot, DataTableHead, DataTableHeader, DataTableHeaderRow, DataTableRow, DataTableRowAction } from "@/ascendra-ui";

type User = { id: number; name: string; email: string };

const COLUMNS: ColumnDef<User>[] = [
  { key: "name",  label: "Name" },
  { key: "email", label: "Email" },
];

const USERS: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob",   email: "bob@example.com" },
];

export function UsersTable() {
  return (
    <DataTableProvider columns={COLUMNS} data={USERS}>
      <DataTable>
        <DataTableHeader>
          <DataTableHeaderRow>
            <DataTableHead column="name" />
            <DataTableHead column="email" />
          </DataTableHeaderRow>
        </DataTableHeader>
        <DataTableBody>
          {(row: User) => (
            <DataTableRow key={row.id}>
              <DataTableCell column="name">{row.name}</DataTableCell>
              <DataTableCell column="email">{row.email}</DataTableCell>
            </DataTableRow>
          )}
        </DataTableBody>
      </DataTable>
      <DataTableFoot />
    </DataTableProvider>
  );
}`}</CodeBlock>

      <Note>
        <strong>Column order in JSX matches column order on screen.</strong>{" "}
        The <Code>DataTableHeaderRow</Code> and <Code>DataTableRow</Code>{" "}
        automatically re-order their children to match the active column order
        (which may change when the user reorders via <Code>DataTableColumnManager</Code>).
        Always render cells in the same JSX order as your column definitions for predictability.
      </Note>
    </div>
  );
}

function ColumnDefsSection() {
  return (
    <div className="space-y-4">
      <SectionHeader>Column Definitions — ColumnDef&lt;T&gt;</SectionHeader>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Passed as the <Code>columns</Code> prop on any provider. Each entry
        describes one column — its key, display label, and behavioural flags.
      </p>

      <PropTable>
        <PropRow
          name="key"
          type="keyof T"
          required
          description="Maps this column to a field on your data object. Used for sorting, filtering, and cell routing."
        />
        <PropRow
          name="label"
          type="string"
          required
          description="Display name shown in column headers, sort dropdown, filter picker, and column manager."
        />
        <PropRow
          name="type"
          type="'string' | 'number' | 'date'"
          defaultVal="'string'"
          description="Affects sort comparison logic. 'number' uses numeric comparison; 'date' parses as Date before comparing."
        />
        <PropRow
          name="sortable"
          type="boolean"
          defaultVal="true"
          description="Set to false to prevent sort on click. The column will not appear in the sort dropdown."
        />
        <PropRow
          name="filter"
          type="boolean"
          defaultVal="false"
          description="Set to true to make this column available in the filter picker (DataTableFilterDropdown)."
        />
        <PropRow
          name="active"
          type="boolean"
          defaultVal="true"
          description="Controls visibility. Inactive columns are hidden from the table. Users can toggle via DataTableColumnManager."
        />
        <PropRow
          name="freeze"
          type="boolean"
          defaultVal="false"
          description="Always visible — users cannot hide it. The checkbox in DataTableColumnManager is disabled for frozen columns. Implies active: true."
        />
        <PropRow
          name="locked"
          type="boolean"
          defaultVal="false"
          description="Always visible and cannot be reordered. Shows a lock icon in DataTableColumnManager. Implies freeze: true."
        />
      </PropTable>

      <CodeBlock>{`const COLUMNS: ColumnDef<Invoice>[] = [
  { key: "invoiceNumber", label: "Invoice #", freeze: true },    // always visible
  { key: "clientName",    label: "Client",    freeze: true, filter: true },
  { key: "amount",        label: "Amount",    type: "number" },
  { key: "dueDate",       label: "Due Date",  type: "date" },
  { key: "status",        label: "Status",    sortable: false, filter: true },
  { key: "issuedAt",      label: "Issued",    type: "date",   active: false }, // hidden by default
];`}</CodeBlock>
    </div>
  );
}

function ProviderSection() {
  return (
    <div className="space-y-6">
      <SectionHeader>Provider Setup</SectionHeader>

      {/* DataTableProvider */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">DataTableProvider</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Use when you already have data in scope (fetched by SWR, React Query,
          or passed from a server component). The table manages search, filter,
          sort, and pagination internally.
        </p>
        <PropTable>
          <PropRow name="columns" type="ColumnDef<T>[]" required description="Column definitions array." />
          <PropRow name="data" type="T[]" description="Array of items. Omit when using DataTableQueryProvider as the parent (it injects data automatically)." />
          <PropRow name="isLoading" type="boolean" description="Forces the loading skeleton. Pass your external loading state here if not using the query provider." />
          <PropRow name="getRowId" type="(row: T) => string" description="Required to enable row selection. Must return a stable unique string per row. If omitted, DataTableCheckboxHead/Cell render as no-ops." />
        </PropTable>
      </div>

      {/* DataTableWithQueryProvider */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">DataTableWithQueryProvider</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The all-in-one wrapper for query-driven tables. Combines{" "}
          <Code>DataTableQueryProvider</Code> (manages query state, React Query
          fetch, param panel) with <Code>DataTableProvider</Code> (manages
          search, filter, sort, pagination, selection).
        </p>
        <PropTable>
          <PropRow name="queries" type="QueryDef[]" required description="All available query definitions. See Query System section for QueryDef shape." />
          <PropRow name="queryFunctions" type="QueryFunctionMap<T>" required description="Map of queryId → async fetch function. Each function receives the confirmed params and must return T[]." />
          <PropRow name="columns" type="ColumnDef<T>[]" required description="Column definitions." />
          <PropRow name="fieldOptions" type="FieldOptionsMap" description="Optional dynamic field options for QueryParamPanel. Overrides static options defined in QueryDef.params." />
          <PropRow name="data" type="T[]" description="Override data (e.g. SSR-prefetched or optimistic). Takes precedence over query results." />
          <PropRow name="isLoading" type="boolean" description="Override loading state." />
          <PropRow name="getRowId" type="(row: T) => string" description="Enable row selection. See Row Selection section." />
        </PropTable>

        <CodeBlock>{`<DataTableWithQueryProvider
  queries={PRESET_QUERIES}
  queryFunctions={QUERY_FUNCTIONS}
  fieldOptions={FIELD_OPTIONS}      // optional
  columns={COLUMNS}
  getRowId={(row) => String(row.id)} // enables selection
>
  {/* All toolbar and table components go here */}
</DataTableWithQueryProvider>`}</CodeBlock>
      </div>

      {/* QueryFunctionMap */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">QueryFunctionMap</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          A plain object mapping each query ID to an async function. The
          function receives the confirmed param values and must resolve to{" "}
          <Code>T[]</Code>.
        </p>
        <CodeBlock>{`const QUERY_FUNCTIONS: QueryFunctionMap<Invoice> = {
  "all-invoices": () => fetchInvoices(),
  "by-status":    (params) => fetchInvoicesByStatus(params.status as string),
  "by-client":    (params) => fetchInvoicesByClient(params),
};`}</CodeBlock>
      </div>
    </div>
  );
}

function TableStructureSection() {
  return (
    <div className="space-y-6">
      <SectionHeader>Table Structure</SectionHeader>
      <p className="text-sm text-muted-foreground leading-relaxed">
        The table is composed of semantic compound components that mirror the
        HTML table structure. Each component reads its state from the nearest
        provider — no explicit prop-threading needed.
      </p>

      <CodeBlock lang="tsx">{`<DataTableWrapper>               ← hides content while QueryParamPanel is open
  <DataTable scrollable horizontal height={400}>
    <DataTableHeader sticky>
      <DataTableHeaderRow>
        <DataTableCheckboxHead />     ← select-all (opt-in, no-op without getRowId)
        <DataTableHead column="name" />
        <DataTableHead column="email">Custom label</DataTableHead>
      </DataTableHeaderRow>
    </DataTableHeader>

    <DataTableBody>
      {(row: User) => (
        <DataTableRow key={row.id}>
          <DataTableCheckboxCell rowId={String(row.id)} />
          <DataTableCell column="name">{row.name}</DataTableCell>
          <DataTableCell column="email">{row.email}</DataTableCell>
        </DataTableRow>
      )}
    </DataTableBody>
  </DataTable>

  <DataTableLoadingBody />   ← shown when isLoading === true
  <DataTableErrorBody  />   ← shown when query fails
  <DataTableEmptyBody  />   ← shown when pagedData is empty and not loading
  <DataTableFoot       />   ← pagination bar
</DataTableWrapper>`}</CodeBlock>

      {/* DataTable props */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground">DataTable props</p>
        <PropTable>
          <PropRow name="scrollable" type="boolean" description="Enables a scroll container. Required for sticky headers or fixed height." />
          <PropRow name="horizontal" type="boolean" description="Enables horizontal overflow scroll (useful for wide tables)." />
          <PropRow name="vertical" type="boolean" description="Enables vertical overflow scroll. Combine with height." />
          <PropRow name="height" type="number" description="Max-height of the scroll container in px." />
        </PropTable>
      </div>

      {/* DataTableHead props */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground">DataTableHead props</p>
        <PropTable>
          <PropRow name="column" type="string" required description="Column key (must match a key in your ColumnDef array). Controls visibility toggling and sort." />
          <PropRow name="children" type="React.ReactNode" description="Override the column label from ColumnDef. If omitted, the label from ColumnDef is used." />
        </PropTable>
      </div>

      {/* DataTableCell props */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground">DataTableCell props</p>
        <PropTable>
          <PropRow name="column" type="string" required description="Column key. The cell self-hides when the column is inactive — no conditional rendering needed." />
          <PropRow name="children" type="React.ReactNode" description="Cell content. Use DataTableHighlight inside for search match highlighting." />
        </PropTable>
      </div>

      <Warn>
        <strong>Do not wrap DataTableCell or DataTableHead</strong> in custom
        components, <Code>React.memo</Code>, or fragments when passing them as
        direct children of <Code>DataTableRow</Code> /{" "}
        <Code>DataTableHeaderRow</Code>. Those components inspect the{" "}
        <Code>column</Code> prop of their immediate children to handle ordering.
        Wrapping hides the prop and causes cells to be silently dropped.
      </Warn>
    </div>
  );
}

function ToolbarSection() {
  return (
    <div className="space-y-6">
      <SectionHeader>Toolbar Components</SectionHeader>
      <p className="text-sm text-muted-foreground leading-relaxed">
        <Code>DataTableBar</Code> is the layout wrapper for the toolbar row. It
        splits into a content slot (left) and an action slot (right). When the
        query param panel is open, the bar hides automatically.
      </p>

      <CodeBlock lang="tsx">{`<DataTableBar>
  <DataTableBarContent>
    <DataTableSearchInput />      ← search + fuzzy toggle
    <DataTableColumnManager />    ← show/hide/reorder columns
    <DataTableSortDropdown />     ← sort column picker
    <DataTableFilterDropdown />   ← add filter chips
  </DataTableBarContent>
  <DataTableBarAction>
    <Button size="sm">+ Add Item</Button>
  </DataTableBarAction>
</DataTableBar>
<DataTableFilterBar />            ← active filter chips (hides when empty)`}</CodeBlock>

      <div className="space-y-4">
        {[
          {
            name: "DataTableSearchInput",
            description:
              "Controlled search field. Includes a fuzzy-mode toggle (switches between substring and Fuse.js matching) and a clear button that appears on hover.",
          },
          {
            name: "DataTableColumnManager",
            description:
              "Dropdown listing all columns. Frozen columns show a lock icon and cannot be hidden. Active, non-frozen columns have a drag handle for reordering. Accepts an optional icon prop for a compact icon-only trigger.",
          },
          {
            name: "DataTableSortDropdown",
            description:
              "Dropdown listing sortable columns plus a 'None' option. Shows the current sort column and direction. For inline sort, clicking a DataTableHead also works.",
          },
          {
            name: "DataTableFilterDropdown",
            description:
              "Dropdown listing filterable columns (filter: true in ColumnDef). Clicking a column adds a filter chip. Already-active columns are disabled in the list.",
          },
          {
            name: "DataTableFilterBar",
            description:
              "Renders one chip per active filter. Each chip is a dashed-border button that opens a value picker. Includes a 'Clear filters' link. Hides itself when there are no active filters.",
          },
        ].map(({ name, description }) => (
          <div key={name} className="flex flex-col gap-1">
            <code className="text-xs font-mono font-medium text-foreground">
              {name}
            </code>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectionSection() {
  return (
    <div className="space-y-4">
      <SectionHeader>Row Selection</SectionHeader>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Row selection is opt-in. Pass <Code>getRowId</Code> to the provider to
        enable it. Without it, the checkbox components are no-ops (render
        nothing), so existing tables are unaffected.
      </p>

      <CodeBlock>{`// 1. Enable selection — pass getRowId to the provider
<DataTableProvider
  columns={COLUMNS}
  data={data}
  getRowId={(row) => String(row.id)}
>

  // 2. Add checkboxes + bulk actions in the header
  <DataTableHeaderRow>
    <DataTableCheckboxHead />
    <DataTableHead column="name" />
    {/* 3. DataTableHeadAction reads selection internally and shows
           "X rows selected" at the top of its dropdown when rows are selected.
           Items are auto-disabled when selectedRows is empty. */}
    <DataTableHeadAction
      onAction={(id, selectedRowIds) => {
        if (id === "bulk-export") exportRows(selectedRowIds);
        if (id === "bulk-delete") deleteRows(selectedRowIds);
      }}
    >
      <DataTableBulkExportHeadAction />
      <DataTableBulkDeleteHeadAction />
    </DataTableHeadAction>
  </DataTableHeaderRow>

  <DataTableBody>
    {(row) => (
      <DataTableRow key={row.id}>
        <DataTableCheckboxCell rowId={String(row.id)} />
        <DataTableCell column="name">{row.name}</DataTableCell>
      </DataTableRow>
    )}
  </DataTableBody>

</DataTableProvider>`}</CodeBlock>

      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground">
          useDataTableSelection() — returned values
        </p>
        <PropTable>
          <PropRow name="selectedRows" type="Set<string>" description="IDs of all currently selected rows. Use .size to count, spread to get an array." />
          <PropRow name="selectionEnabled" type="boolean" description="True when getRowId was provided to the provider." />
          <PropRow name="isAllSelected" type="boolean" description="True when every row on the current page is selected." />
          <PropRow name="isIndeterminate" type="boolean" description="True when some but not all current-page rows are selected. Used to show the indeterminate checkbox state." />
          <PropRow name="isRowSelected" type="(id: string) => boolean" description="Check if a specific row ID is selected." />
          <PropRow name="toggleRow" type="(id: string) => void" description="Add or remove a row from the selection." />
          <PropRow name="selectAll" type="() => void" description="Select all rows on the current page." />
          <PropRow name="clearSelection" type="() => void" description="Clear the entire selection." />
        </PropTable>
      </div>

      <Note>
        <strong>Select-all scope is the current page only.</strong> Selecting
        all pages simultaneously requires collecting IDs outside the provider
        and calling a separate action — this is intentional to avoid loading all
        data client-side. If you need cross-page select-all, fetch all IDs from
        the server and populate <Code>selectedRows</Code> via a custom context
        wrapper.
      </Note>
    </div>
  );
}

function ActionsSection() {
  return (
    <div className="space-y-6">
      <SectionHeader>Row & Head Actions</SectionHeader>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Two action column components slot into the table header and body. Each
        renders a three-dot button that opens a dropdown of items.{" "}
        <Code>DataTableHeadAction</Code> sits in the header and is
        selection-aware; <Code>DataTableRowAction</Code> sits in each body row
        and operates on that single row.
      </p>

      {/* DataTableHeadAction */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">DataTableHeadAction</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Renders a <Code>&lt;th&gt;</Code> with a dropdown trigger. Internally
          calls <Code>useDataTableSelection()</Code> — no props needed to wire up
          selection. When rows are selected, a <em>&quot;X rows selected&quot;</em> label
          appears at the top of the dropdown. The column is automatically placed
          last by <Code>orderChildrenByColumn</Code>.
        </p>
        <PropTable>
          <PropRow
            name="onAction"
            type="(actionId: string, selectedRowIds: string[]) => void"
            description="Called when a menu item is selected. Receives the item's id and the array of currently selected row IDs at click time."
          />
          <PropRow
            name="variant"
            type="'ghost' | 'visible'"
            defaultVal="'ghost'"
            description="'ghost' hides the trigger button until the row is hovered. 'visible' always shows it."
          />
          <PropRow
            name="children"
            type="React.ReactNode"
            description="DataTableHeadActionItem elements (or preset components) to show in the dropdown."
          />
        </PropTable>
      </div>

      {/* DataTableHeadActionItem */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">DataTableHeadActionItem</h3>
        <PropTable>
          <PropRow name="id" type="string" required description="Passed as the first argument to onAction when this item is selected." />
          <PropRow name="icon" type="React.ReactNode" description="Optional icon rendered before the label." />
          <PropRow name="variant" type="'default' | 'destructive'" defaultVal="'default'" description="'destructive' renders the item in red." />
          <PropRow name="disabled" type="boolean" description="Explicitly disable the item. Takes precedence over the auto-disable behaviour." />
          <PropRow
            name="selectionIndependent"
            type="boolean"
            defaultVal="false"
            description="When false (default), the item is automatically disabled when no rows are selected. Set to true for actions that don't operate on the selection (e.g. Refresh, Manage columns)."
          />
        </PropTable>
      </div>

      {/* Head action presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Head action presets</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          All presets accept the same props as <Code>DataTableHeadActionItem</Code> and forward them via spread, so you can override any default.
        </p>
        <div className="rounded-lg border divide-y">
          {[
            { name: "DataTableBulkExportHeadAction", id: "bulk-export", label: "Export selected rows", note: "Disabled when no rows selected." },
            { name: "DataTableBulkDeleteHeadAction", id: "bulk-delete", label: "Delete selected rows", note: "Destructive. Disabled when no rows selected." },
            { name: "DataTableExportHeadAction", id: "export", label: "Export", note: "Selection-independent — always enabled." },
            { name: "DataTableRefreshHeadAction", id: "refresh", label: "Refresh", note: "Selection-independent — always enabled." },
            { name: "DataTableManageColumnsHeadAction", id: "manage-columns", label: "Manage columns", note: "Selection-independent — always enabled." },
          ].map(({ name, id, label, note }) => (
            <div key={name} className="px-4 py-3 space-y-0.5">
              <code className="font-mono text-xs font-medium text-foreground">{name}</code>
              <p className="text-xs text-muted-foreground">
                id: <Code>{id}</Code> · default label: <em>{label}</em> · {note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* DataTableRowAction */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">DataTableRowAction</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Renders a <Code>&lt;td&gt;</Code> with a dropdown trigger. Operates on
          a single row — the caller closes over the row in <Code>onAction</Code>.
          Place it as the last child of <Code>DataTableRow</Code>; it carries the
          same <Code>isLastColumn</Code> marker as <Code>DataTableHeadAction</Code>.
        </p>
        <PropTable>
          <PropRow
            name="onAction"
            type="(actionId: string) => void"
            description="Called when a menu item is selected. Close over the row to get its data."
          />
          <PropRow
            name="variant"
            type="'ghost' | 'visible'"
            defaultVal="'ghost'"
            description="Controls trigger button visibility."
          />
        </PropTable>
      </div>

      {/* Row action presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Row action presets</h3>
        <div className="rounded-lg border divide-y">
          {[
            { name: "DataTableViewRowAction", id: "view", label: "View details" },
            { name: "DataTableEditRowAction", id: "edit", label: "Edit" },
            { name: "DataTableDuplicateRowAction", id: "duplicate", label: "Duplicate" },
            { name: "DataTableDeleteRowAction", id: "delete", label: "Delete", note: "Destructive." },
          ].map(({ name, id, label, note }) => (
            <div key={name} className="px-4 py-3 space-y-0.5">
              <code className="font-mono text-xs font-medium text-foreground">{name}</code>
              <p className="text-xs text-muted-foreground">
                id: <Code>{id}</Code> · default label: <em>{label}</em>
                {note && <> · {note}</>}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Full example */}
      <CodeBlock>{`import {
  DataTableHeadAction,
  DataTableBulkExportHeadAction,
  DataTableBulkDeleteHeadAction,
  DataTableRefreshHeadAction,
} from "@/ascendra-ui";

// In the header row:
<DataTableHeadAction
  variant="visible"
  onAction={(id, selectedRowIds) => {
    if (id === "bulk-export") exportRows(selectedRowIds);
    if (id === "bulk-delete") deleteRows(selectedRowIds);
    if (id === "refresh") refetch();
  }}
>
  <DataTableBulkExportHeadAction />
  <DataTableBulkDeleteHeadAction />
  <DropdownMenuSeparator />
  {/* selectionIndependent — enabled even with no rows selected */}
  <DataTableRefreshHeadAction selectionIndependent />
</DataTableHeadAction>

// In each body row:
<DataTableRowAction onAction={(id) => handleRowAction(id, row)}>
  <DataTableEditRowAction />
  <DataTableDeleteRowAction />
</DataTableRowAction>`}</CodeBlock>
    </div>
  );
}

function HighlightSection() {
  return (
    <div className="space-y-4">
      <SectionHeader>Search Highlighting</SectionHeader>
      <p className="text-sm text-muted-foreground leading-relaxed">
        <Code>DataTableHighlight</Code> wraps a text string and highlights the
        portion that matches the current search term. In fuzzy mode it uses the
        exact match ranges from Fuse.js; in exact mode it falls back to
        substring matching.
      </p>

      <PropTable>
        <PropRow name="text" type="string" required description="The full string to display (e.g. row.clientName formatted as a string)." />
        <PropRow name="item" type="unknown" required description="The row object. Passed to getRanges to look up pre-computed match indices." />
        <PropRow name="itemKey" type="PropertyKey" required description="The field key on the row (e.g. 'clientName'). Must match the column key." />
      </PropTable>

      <CodeBlock>{`<DataTableCell column="clientName">
  <DataTableHighlight
    text={row.clientName}
    item={row}
    itemKey="clientName"
  />
</DataTableCell>

// For formatted values, pass the display string — not the raw value
<DataTableCell column="amount">
  <DataTableHighlight
    text={formatAmount(row.amount)}   // e.g. "$1,234.00"
    item={row}
    itemKey="amount"
  />
</DataTableCell>`}</CodeBlock>

      <Note>
        Match highlighting only works when the search term is non-empty. When
        there is no active search, <Code>DataTableHighlight</Code> renders the
        text as-is with no wrapper elements.
      </Note>
    </div>
  );
}

function StateDisplaySection() {
  return (
    <div className="space-y-4">
      <SectionHeader>State Display Components</SectionHeader>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Place these sibling to <Code>DataTable</Code> inside{" "}
        <Code>DataTableWrapper</Code>. Each component reads from context and
        self-shows or self-hides — no conditional rendering required.
      </p>

      <div className="space-y-4">
        <div className="rounded-lg border divide-y">
          <div className="px-4 py-3 space-y-1">
            <code className="font-mono text-xs font-medium text-foreground">DataTableLoadingBody</code>
            <p className="text-xs text-muted-foreground">
              Shows a centered spinner + &quot;Loading …&quot; message. Visible when{" "}
              <Code>isLoading === true</Code>. No props.
            </p>
          </div>
          <div className="px-4 py-3 space-y-1">
            <code className="font-mono text-xs font-medium text-foreground">DataTableEmptyBody</code>
            <p className="text-xs text-muted-foreground">
              Shown when loading is done and <Code>pagedData</Code> is empty.
              Accepts optional <Code>icon</Code>, <Code>title</Code>, and{" "}
              <Code>description</Code> props to customise the message.
            </p>
          </div>
          <div className="px-4 py-3 space-y-1">
            <code className="font-mono text-xs font-medium text-foreground">DataTableErrorBody</code>
            <p className="text-xs text-muted-foreground">
              Shown when the query provider reports an error. Displays the error
              message and a Retry button. Accepts optional <Code>title</Code>{" "}
              and <Code>description</Code> props to override defaults. Only
              meaningful when using the query layer.
            </p>
          </div>
        </div>
      </div>

      <CodeBlock>{`<DataTableWrapper>
  <DataTable scrollable horizontal height={400}>
    { /* ... header / body ... */ }
  </DataTable>
  <DataTableLoadingBody />
  <DataTableErrorBody title="Could not load invoices" />
  <DataTableEmptyBody
    title="No invoices yet"
    description="Create your first invoice to get started."
  />
  <DataTableFoot />
</DataTableWrapper>`}</CodeBlock>
    </div>
  );
}

function QuerySystemSection() {
  return (
    <div className="space-y-6">
      <SectionHeader>Query System</SectionHeader>
      <p className="text-sm text-muted-foreground leading-relaxed">
        The query layer extends the table with a switchable query interface.
        Users pick a query from <Code>QueryBar</Code>, fill in parameters in{" "}
        <Code>QueryParamPanel</Code>, and run it. Results flow into the table
        automatically. Queries can be grouped and have optional batch navigation.
      </p>

      {/* QueryDef shape */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">QueryDef</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Each object in the <Code>queries</Code> array defines one available
          query.
        </p>
        <PropTable>
          <PropRow name="id" type="string" required description="Unique identifier. Used as the key in queryFunctions and fieldOptions maps." />
          <PropRow name="title" type="string" required description="Short display name shown in QueryBar and the param panel header." />
          <PropRow name="description" type="string" required description="One-line description shown below the title in QueryBar." />
          <PropRow name="group" type="'query' | 'user-query' | 'filter'" required description="Groups queries into sections in the QueryBar dropdown. 'filter' queries require param confirmation before running." />
          <PropRow name="params" type="ParamItem[]" description="Form fields rendered in QueryParamPanel. If omitted, the panel is skipped and the query runs immediately." />
          <PropRow name="info" type="string" description="Informational text shown in the panel footer." />
          <PropRow name="columns" type="ColumnsConfig" description="Grid column layout for the param form. E.g. { sm: 1, md: 2, lg: 3 }." />
          <PropRow name="queryOptions" type="QueryOptions" description="React Query options — staleTime, retry, gcTime, refetchOnWindowFocus." />
        </PropTable>
      </div>

      {/* FieldDef shape */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">FieldDef (params items)</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Each item in <Code>params</Code> is either a <Code>FieldDef</Code>{" "}
          (an input) or a <Code>SectionBreak</Code> (a visual divider with an
          optional floating label).
        </p>
        <PropTable>
          <PropRow name="name" type="string" required description="Field name — key under which the value appears in QueryParamValues." />
          <PropRow name="label" type="string" required description="Human-readable label rendered above the input." />
          <PropRow name="type" type="'text' | 'number' | 'select' | 'multiselect' | 'date' | 'daterange' | 'checkbox' | 'radio'" required description="Controls which input component is rendered." />
          <PropRow name="options" type="SelectOption[]" description="Static options for select / multiselect / radio fields." />
          <PropRow name="required" type="boolean" description="Marks the field required in the Zod schema — validation fails on submit if empty." />
          <PropRow name="mandatory" type="boolean" description="Shows a red 'Mandatory' badge (visual only — combine with required for actual validation)." />
          <PropRow name="optional" type="boolean" description="Shows a grey 'Optional' badge." />
          <PropRow name="span" type="1 | 2 | 'full'" description="Grid column span for the field within the form layout." />
          <PropRow name="placeholder" type="string" description="Placeholder text for text/number inputs." />
          <PropRow name="description" type="string" description="Helper text rendered below the input." />
          <PropRow name="info" type="string" description="Subtitle shown above the input (used for contextual hints)." />
          <PropRow name="min / max" type="number" description="Min/max constraints for number inputs." />
          <PropRow name="minLength / maxLength" type="number" description="Length constraints for text inputs." />
        </PropTable>
      </div>

      {/* SectionBreak */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">SectionBreak</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Insert a visual separator between groups of fields. Set{" "}
          <Code>showTitle: true</Code> to render the title as a floating pill
          label.
        </p>
        <CodeBlock>{`{ _type: "section", title: "Date Range", showTitle: true }`}</CodeBlock>
      </div>

      {/* Full example */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Full QueryDef example</h3>
        <CodeBlock>{`const QUERIES: QueryDef[] = [
  {
    id: "all-invoices",
    title: "All Invoices",
    description: "Returns every invoice without filters",
    group: "query",
    // no params → query runs immediately when selected
  },
  {
    id: "by-status",
    title: "By Status",
    description: "Filter invoices by payment status",
    group: "filter",
    columns: { sm: 1, md: 2 },
    params: [
      {
        name: "status",
        label: "Status",
        type: "multiselect",
        options: [
          { value: "Paid",    label: "Paid"    },
          { value: "Pending", label: "Pending" },
          { value: "Overdue", label: "Overdue" },
        ],
        required: true,
        mandatory: true,
      },
    ],
  },
];`}</CodeBlock>
      </div>

      {/* Dynamic field options */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Dynamic field options (FieldOptionsMap)</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Override static <Code>options</Code> in a FieldDef at runtime.
          Provide a <Code>FieldOptionsMap</Code> to the provider. Each entry can
          be a static array (e.g. server-fetched) or a resolver function that
          receives the current form values and returns options dynamically.
        </p>
        <CodeBlock>{`const FIELD_OPTIONS: FieldOptionsMap = {
  // "by-status" query, "statuses" field — static override (e.g. loaded from API)
  "by-status": {
    statuses: [
      { value: "Paid",    label: "Paid"    },
      { value: "Draft",   label: "Draft"   }, // extra option not in QueryDef
    ],
  },

  // "by-client" query, "paymentStatus" field — reactive resolver
  "by-client": {
    paymentStatus: (values) => {
      const base = [
        { value: "Paid",    label: "Paid"    },
        { value: "Pending", label: "Pending" },
      ];
      // Narrow options based on another field's value
      if (values.gradeLevel === "class-12") return base;
      return [...base, { value: "Overdue", label: "Overdue" }];
    },
  },
};`}</CodeBlock>
      </div>

      {/* Query components */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Query UI components</h3>
        <div className="rounded-lg border divide-y">
          <div className="px-4 py-3 space-y-1">
            <code className="font-mono text-xs font-medium text-foreground">QueryBar</code>
            <p className="text-xs text-muted-foreground">
              Dropdown button showing the active query title and description.
              Lists all queries grouped by their <Code>group</Code>. Shows a
              loading spinner while fetching. No props.
            </p>
          </div>
          <div className="px-4 py-3 space-y-1">
            <code className="font-mono text-xs font-medium text-foreground">QueryParamPanel</code>
            <p className="text-xs text-muted-foreground">
              Rendered automatically when the active query has{" "}
              <Code>params</Code> and no confirmed values yet. Shows a
              react-hook-form grid form with a &quot;Run Query&quot; button. Disappears
              after submission; reappears when the user resets. No props.
            </p>
          </div>
          <div className="px-4 py-3 space-y-1">
            <code className="font-mono text-xs font-medium text-foreground">BatchNavigator</code>
            <p className="text-xs text-muted-foreground">
              Shows &quot;Batch X of Y&quot; navigation when the query has multiple
              batches. Hides itself when <Code>confirmedParams</Code> is null
              (panel still open). No props.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HooksSection() {
  return (
    <div className="space-y-4">
      <SectionHeader>Hooks Reference</SectionHeader>
      <p className="text-sm text-muted-foreground leading-relaxed">
        All hooks must be called inside a component that is a descendant of the
        relevant provider. The granular hooks (e.g.{" "}
        <Code>useDataTableSearch</Code>) only trigger re-renders when their
        specific slice changes. Use <Code>useDataTableContext()</Code> only when
        you need multiple slices in one component.
      </p>

      <div className="rounded-lg border divide-y">
        {[
          {
            name: "useDataTableColumns()",
            returns: "DataTableColumnContextValue",
            description: "columns, filterableColumns, toggleColumnActive, reorderColumns, isColSortable",
          },
          {
            name: "useDataTableSearch()",
            returns: "DataTableSearchContextValue",
            description: "searchTerm, setSearchTerm, fuzzy, setFuzzy, getRanges",
          },
          {
            name: "useDataTableFilter()",
            returns: "DataTableFilterContextValue",
            description: "filters, addFilter, setFilterValue, removeFilter, clearFilters, getOptionsFor",
          },
          {
            name: "useDataTableSort()",
            returns: "DataTableSortContextValue",
            description: "sortConfig, handleSort, clearSort",
          },
          {
            name: "useDataTableData()",
            returns: "DataTableDataContextValue",
            description: "pagedData, totalFiltered, pagination (currentPage, totalPages, goNext, goPrev …), isLoading",
          },
          {
            name: "useDataTableSelection()",
            returns: "DataTableSelectionContextValue",
            description: "selectedRows, isAllSelected, isIndeterminate, isRowSelected, toggleRow, selectAll, clearSelection, selectionEnabled",
          },
          {
            name: "useDataTableContext()",
            returns: "DataTableContextValue",
            description: "All of the above merged. Re-renders on any context change. Prefer granular hooks in components.",
          },
          {
            name: "useDataTable<T>()",
            returns: "DataTableState<T>",
            description: "Generic typed version of useDataTableContext. columns and sortConfig are typed to T — use this in consumer pages that need typed access.",
          },
          {
            name: "useQueryContext()",
            returns: "QueryContextValue",
            description: "Query provider state: activeQuery, confirmedParams, isLoading, isError, refetch, currentBatch, goNextBatch, goPrevBatch …",
          },
        ].map(({ name, returns, description }) => (
          <div key={name} className="flex flex-col gap-0.5 px-4 py-3">
            <div className="flex items-center gap-3">
              <code className="font-mono text-xs font-medium text-foreground">{name}</code>
              <code className="font-mono text-[0.6rem] text-muted-foreground">→ {returns}</code>
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GotchasSection() {
  return (
    <div className="space-y-4">
      <SectionHeader>Common Gotchas</SectionHeader>

      <div className="space-y-3">
        {[
          {
            title: "Wrapping cells breaks column ordering",
            body: (
              <>
                <Code>DataTableRow</Code> and <Code>DataTableHeaderRow</Code>{" "}
                inspect the <Code>column</Code> prop of their immediate React
                children to order them correctly. If you wrap a{" "}
                <Code>DataTableCell</Code> in a fragment, <Code>React.memo</Code>
                , or a custom component, the prop is invisible and the cell is
                silently dropped. Pass cells as direct children only.
              </>
            ),
          },
          {
            title: "Selection is disabled without getRowId",
            body: (
              <>
                <Code>DataTableCheckboxHead</Code> and{" "}
                <Code>DataTableCheckboxCell</Code> render nothing when{" "}
                <Code>getRowId</Code> is not provided — no error, just empty
                space (actually zero width). Always pass{" "}
                <Code>getRowId</Code> when you add checkbox components.
              </>
            ),
          },
          {
            title: "DataTableWrapper hides the table during param entry",
            body: (
              <>
                Wrap the table and all its state-display siblings inside{" "}
                <Code>DataTableWrapper</Code>. It hides everything while{" "}
                <Code>QueryParamPanel</Code> is open. If you place{" "}
                <Code>DataTableWrapper</Code> too narrowly (e.g. around only the
                table but not <Code>DataTableFoot</Code>), the footer will
                remain visible during param entry.
              </>
            ),
          },
          {
            title: "Filter group queries require explicit confirmation",
            body: (
              <>
                Queries with <Code>group: &quot;filter&quot;</Code> are not fetched until
                the user clicks &quot;Run Query&quot; in <Code>QueryParamPanel</Code>.
                This is intentional — filter queries often send expensive
                requests. Use <Code>group: &quot;query&quot;</Code> for queries that
                should run immediately on selection.
              </>
            ),
          },
          {
            title: "pagedData, not data, drives the table",
            body: (
              <>
                <Code>DataTableBody</Code> renders <Code>pagedData</Code> — the
                current page slice after search → filter → sort → paginate.
                If you build a custom body using <Code>useDataTableData()</Code>
                , use <Code>pagedData</Code>. Using the raw{" "}
                <Code>data</Code> prop directly bypasses all processing.
              </>
            ),
          },
          {
            title: "DataTableHighlight needs the row object, not just the text",
            body: (
              <>
                In fuzzy mode, match ranges are keyed by{" "}
                <Code>(item reference, key)</Code> in a WeakMap. Pass the
                original row object as <Code>item</Code>. If you transform or
                copy the row before passing it, the WeakMap lookup will miss and
                highlighting will silently fall back to substring matching.
              </>
            ),
          },
        ].map(({ title, body }) => (
          <div
            key={title}
            className="rounded-lg border bg-muted/20 px-4 py-3 space-y-1"
          >
            <p className="text-xs font-medium text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function DataTableGuide() {
  return (
    <div className="space-y-12 py-2">
      <ArchitectureSection />
      <QuickStartSection />
      <ColumnDefsSection />
      <ProviderSection />
      <TableStructureSection />
      <ToolbarSection />
      <SelectionSection />
      <ActionsSection />
      <HighlightSection />
      <StateDisplaySection />
      <QuerySystemSection />
      <HooksSection />
      <GotchasSection />
      <p className="border-t pt-6 text-xs text-muted-foreground">
        All provider code lives in{" "}
        <Code>ascendra-ui/providers/data-table/</Code> and{" "}
        <Code>ascendra-ui/providers/data-table-query/</Code>. Components live
        in <Code>ascendra-ui/components/data-table/</Code>. The interactive lab
        on the Table Usage tab is the canonical reference implementation.
      </p>
    </div>
  );
}

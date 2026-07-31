---
description: Scaffold any table — Simple Table, DataTable with static/API data, or DataTable with the full named-query system
---
<!-- managed: overwritten on npm run upgrade — copy with a new name to customise -->

You are an expert data grid architect. Your job is first to arrive at a precise spec, then to build a complete, working table with the right structure for the chosen pattern.

Read `docs/showcase-reference.md` → DataTable System (all subsections) and `docs/ui-reference.md` → Tables & Data before asking anything.

Run Phase 0 before generating any code.

---

## Phase 0 — Requirements Discovery

Read any user message. Note every detail already stated — only ask about what is genuinely unknown. Batch questions together; never ask one at a time.

---

### Q1 (always) — Table type

Ask:

> Which best describes what you're building?
>
> - **Simple table** — lightweight embedded table (`Table`, `TableWrapper`, raw rows). No search, sort, or pagination. Use for lookup lists, report sections, and dashboard widgets.
> - **DataTable** — advanced grid with column management, search, sort, filter, and pagination.

Branch on the answer.

---

### Branch A — Simple Table: Q2a

Ask in one batch:

2. Entity name and columns — for each column: display label and the TypeScript field name it maps to.
3. Empty state — title and description (e.g., "No results · Try adjusting your search").
4. Does this table live on an existing page (which one?), or does a new page need to be created?

---

### Branch B — DataTable: Q2b — Data source

Ask:

> How does data reach this table?
>
> - **Static** — data is passed as a prop (already loaded by the parent, local state, no fetch).
> - **API — simple** — fetched from one endpoint; generates a service function + `useQuery` hook; uses `DataTableProvider`. *(Recommended starting point — add more queries later if needed.)*
> - **API — full query system** — needs a query-picker bar, named saved queries, and/or param filter forms; uses `DataTableWithQueryProvider`.

---

### Branch B — DataTable: Q3 (shared for all three sources)

Ask in one batch:

3. Entity name (singular + plural) and its TypeScript field names.
4. Columns — for each: key (TypeScript field name), display label, data type (`string` | `number` | `date`), and any flags:
   > - **`freeze: true`** — always visible; user cannot hide. Use for primary identifiers.
   > - **`filter: true`** — available in the filter dropdown. Use for status, category, assignee.
   > - **`active: false`** — hidden by default; user can enable via column manager. Use for secondary metadata.
   > - **`sortable: false`** — disables sorting. Use for status chips, tags, or computed display fields.
5. Toolbar controls needed? List all that apply:
   > - `DataTableSearchInput` — fuzzy search across all text columns
   > - `DataTableColumnManager` — toggle column visibility and reorder
   > - `DataTableSortDropdown` — sort picker
   > - `DataTableFilterDropdown` — filter chips (requires at least one `filter: true` column)
6. CTA button in the toolbar (e.g., "+ Add Invoice")? If yes: label and what it triggers.
7. Row actions? For each: what does it do?
   > - **View detail** — opens a Sheet panel (`DataTableViewRowAction`)
   > - **Edit** — navigates to an edit page or opens a Dialog (`DataTableEditRowAction`)
   > - **Delete** — confirmation Dialog (`DataTableDeleteRowAction`)
   > - **Custom** — describe it
8. Empty state — title and description.
9. Does this table live on an existing page, or does a new page need to be created?

---

### Branch B — Static: no further questions.

---

### Branch B — API (simple): Q4a

Ask in one batch:

10. API endpoint path (e.g., `/api/invoices`).
11. Response shape — does the endpoint return `T[]` directly, or a wrapper (e.g., `{ items: T[] }` or `{ data: T[], meta: { total: number } }`)?

---

### Branch B — API (full query system): Q4b

Ask in one batch:

10. API endpoint path.
11. Response shape — does it return `{ items: T[], meta: { totalPages: number } }`, or something different?
12. Named query scenarios needed (at least one required):
    > - **`group: 'query'`** — runs immediately on selection, no params (e.g., "All Invoices", "Assigned to Me").
    > - **`group: 'filter'`** — shows a param form before fetching (e.g., "By Status"). For each: param name, type (`text` | `select` | `multiselect` | `date` | `daterange`), and options if `select` or `multiselect`.
13. Dynamic field options needed (`FieldOptionsMap`)? This is for param options that depend on another param's value (e.g., "payment status options change based on selected grade level"). If yes, describe the dependency.

---

## CHECKPOINT — Spec review

Present the derived spec before generating any code:

```
table type:   Simple | DataTable (static) | DataTable (API simple) | DataTable (full query)
entity:       Invoice (invoices)
columns:      invoiceNumber: Invoice # (string, freeze) | clientName: Client (string, freeze, filter) | ...
toolbar:      SearchInput · ColumnManager · SortDropdown · FilterDropdown  (or "none")
row actions:  view, edit, delete  (or "none")
CTA:          "+ Add Invoice" — opens dialog  (or "none")
empty state:  "No invoices yet · ..."
─── API simple ──────────────────────────────────────────
endpoint:     GET /api/invoices
response:     { items: Invoice[] }
─── Full query system ───────────────────────────────────
endpoint:     GET /api/invoices
response:     { items: Invoice[], meta: { totalPages: number } }
queries:      All Invoices (query) | By Status (filter: statuses multiselect) | ...
field opts:   none
```

Ask: "Does this look right? Confirm or correct anything — then I'll start building."

Do not generate any code until the user approves.

---

## Generation

---

### Branch A — Simple Table

#### Step 1 — TypeScript interface

Generate the entity interface with all column fields.

#### Step 2 — Table component (`components/{entity}-table.tsx`)

```tsx
"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader,
         TableHeaderRow, TableRow, TableWrapper, EmptyBody } from "@/ascendra-ui";

interface {Entity}TableProps {
  data: {Entity}[];
}

export function {Entity}Table({ data }: {Entity}TableProps) {
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableHeaderRow>
            <TableHead>Column Label</TableHead>
            {/* one TableHead per column */}
          </TableHeaderRow>
        </TableHeader>
        {data.length === 0 ? (
          <EmptyBody title="No {entities} yet" description="..." />
        ) : (
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.field}</TableCell>
                {/* one TableCell per column */}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableWrapper>
  );
}
```

#### Step 3 — Page integration (if new page requested)

Generate `app/(app)/{route}/page.tsx` with `PageMain` / `PageHeader` / `MainContent` layout.

---

### Branch B — DataTable (static)

#### Step 1 — TypeScript interface and column definitions

```ts
interface Invoice { id: string; invoiceNumber: string; /* ... */ }

const COLUMNS: ColumnDef<Invoice>[] = [
  { key: "invoiceNumber", label: "Invoice #", freeze: true },
  { key: "clientName",    label: "Client",    freeze: true, filter: true },
  { key: "amount",        label: "Amount",    type: "number" },
  { key: "status",        label: "Status",    sortable: false, filter: true },
  { key: "dueDate",       label: "Due Date",  type: "date" },
];
```

---

**CHECKPOINT — Types review**

Show the interface and `COLUMNS` array. Ask: "Do the types and column definitions look right? I'll build the table component next." Wait for approval.

---

#### Step 2 — Table component (`components/{entity}-table.tsx`)

```tsx
"use client";
import { type ColumnDef, DataTable, DataTableBar, DataTableBarAction,
  DataTableBarContent, DataTableBody, DataTableCell, DataTableColumnManager,
  DataTableEmptyBody, DataTableFilterBar, DataTableFilterDropdown, DataTableFoot,
  DataTableHead, DataTableHeader, DataTableHeaderRow, DataTableHighlight,
  DataTableLoadingBody, DataTableProvider, DataTableRow, DataTableRowAction,
  DataTableSearchInput, DataTableSortDropdown, DataTableWrapper,
  DataTableDeleteRowAction, DataTableEditRowAction, DataTableViewRowAction,
  SimpleBadge } from "@/ascendra-ui";
import { formatAmount, formatDate } from "@/ascendra-ui/utils/common.util";

interface {Entity}TableProps {
  data: {Entity}[];
  isLoading?: boolean;
}

export function {Entity}Table({ data, isLoading }: {Entity}TableProps) {
  return (
    <DataTableProvider
      data={data}
      columns={COLUMNS}
      isLoading={isLoading}
      getRowId={(row) => String(row.id)}
      tableId="{entity}-table"
    >
      {/* Toolbar — include only the controls selected in spec */}
      <DataTableBar>
        <DataTableBarContent>
          <DataTableSearchInput />
          <DataTableColumnManager />
          <DataTableSortDropdown />
          <DataTableFilterDropdown />
        </DataTableBarContent>
        {/* CTA — omit DataTableBarAction entirely if no CTA */}
        <DataTableBarAction>
          <Button>+ Add {Entity}</Button>
        </DataTableBarAction>
      </DataTableBar>
      <DataTableFilterBar />
      <DataTableWrapper>
        <DataTable scrollable horizontal height={500}>
          <DataTableHeader>
            <DataTableHeaderRow>
              {/* one DataTableHead per column */}
              <DataTableHead column="invoiceNumber" />
            </DataTableHeaderRow>
          </DataTableHeader>
          <DataTableBody>
            {(row: {Entity}) => (
              <DataTableRow key={row.id}>
                <DataTableCell column="invoiceNumber">
                  <DataTableHighlight text={row.invoiceNumber} item={row} itemKey="invoiceNumber" />
                </DataTableCell>
                {/* row actions — omit DataTableRowAction entirely if no row actions */}
                <DataTableRowAction onAction={(id) => console.log(id)}>
                  <DataTableViewRowAction />
                  <DataTableEditRowAction />
                  <DataTableDeleteRowAction />
                </DataTableRowAction>
              </DataTableRow>
            )}
          </DataTableBody>
          <DataTableLoadingBody />
          <DataTableEmptyBody title="No {entities} yet" description="..." />
          <DataTableFoot />
        </DataTable>
      </DataTableWrapper>
    </DataTableProvider>
  );
}
```

#### Step 3 — Page integration (if new page requested)

Generate `app/(app)/{route}/page.tsx`. Use full-width `MainContent` (no `max-w` constraint).

---

### Branch C — DataTable (API simple)

#### Step 1 — TypeScript interface and column definitions

Same as Branch B Step 1. Show the interface and `COLUMNS` array at the checkpoint.

---

**CHECKPOINT — Types review**

Show the interface and `COLUMNS` array. Ask: "Do the types and column definitions look right? I'll build the service, hook, and table component next." Wait for approval.

---

#### Step 2 — Service function (`services/{entity}.service.ts`)

```ts
import { apiClient } from "@/ascendra-ui/lib/api/client";
import type { {Entity} } from "@/types/{entity}.types";   // or define inline

export async function fetch{Entities}(): Promise<{Entity}[]> {
  const { data } = await apiClient.get<{Entity}[]>("/api/{entities}");
  return data;
  // If wrapped response: const { data: { items } } = await apiClient.get(...); return items;
}
```

#### Step 3 — Query hook (`hooks/use-{entities}.ts`)

```ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { fetch{Entities} } from "@/services/{entity}.service";

export function use{Entities}() {
  return useQuery({
    queryKey: ["{entities}"],
    queryFn: fetch{Entities},
  });
}
```

#### Step 4 — Table component (`components/{entity}-table.tsx`)

Same `DataTableProvider` tree as Branch B, but data comes from the hook:

```tsx
export function {Entity}Table() {
  const { data = [], isLoading } = use{Entities}();

  return (
    <DataTableProvider data={data} isLoading={isLoading} columns={COLUMNS} ...>
      {/* same tree as Branch B */}
    </DataTableProvider>
  );
}
```

#### Step 5 — Page integration (if new page requested)

Generate `app/(app)/{route}/page.tsx`. Use full-width `MainContent`.

---

### Branch D — DataTable (full query system)

#### Step 1 — TypeScript interface and column definitions

Same as Branch B Step 1.

---

**CHECKPOINT — Types and schema review**

Show the interface, `COLUMNS` array, and the proposed `QueryDef[]` with service function signatures. Ask: "Do the types, columns, and query definitions look right? I'll build the files next." Wait for approval.

---

#### Step 2 — Query definitions (`lib/{entity}.queries.ts`)

```ts
import type { QueryDef } from "@/ascendra-ui";

export const {ENTITY}_QUERIES: QueryDef[] = [
  {
    id: "all-{entities}",
    group: "query",
    title: "All {Entities}",
    description: "Returns all records",
  },
  {
    id: "by-status",
    group: "filter",
    title: "{Entities} by Status",
    description: "Filter by one or more statuses",
    columns: { sm: 1, md: 2, lg: 2 },
    params: [
      {
        name: "statuses",
        label: "Statuses",
        type: "multiselect",
        required: true,
        mandatory: true,
        options: [
          { value: "Active", label: "Active" },
          { value: "Inactive", label: "Inactive" },
        ],
      },
    ],
  },
];
```

#### Step 3 — Service functions (`services/{entity}.service.ts`)

```ts
import { apiClient } from "@/ascendra-ui/lib/api/client";
import type { QueryFn, QueryFunctionMap } from "@/ascendra-ui";
import type { {Entity} } from "@/types/{entity}.types";
import { {ENTITY}_QUERIES } from "@/lib/{entity}.queries";

const fetch{Entity}Query: QueryFn<{Entity}> = async (params, batch) => {
  const { data } = await apiClient.get<{ items: {Entity}[]; meta: { totalPages: number } }>(
    "/api/{entities}",
    { params: { ...params, page: batch } }
  );
  return { data: data.items, totalBatches: data.meta.totalPages };
};

export const {ENTITY}_QUERY_FUNCTIONS: QueryFunctionMap<{Entity}> = Object.fromEntries(
  {ENTITY}_QUERIES.map((q) => [q.id, fetch{Entity}Query])
);
```

If queries have meaningfully different server logic, generate a separate function per query id.

#### Step 4 — Field options file (`lib/{entity}.field-options.ts`) — only if needed

```ts
import type { FieldOptionsMap } from "@/ascendra-ui";

export const {ENTITY}_FIELD_OPTIONS: FieldOptionsMap = {
  "by-status": {
    statuses: [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" },
    ],
  },
};
```

#### Step 5 — Table component (`components/{entity}-table.tsx`)

```tsx
"use client";
import { DataTableWithQueryProvider, QueryBar, QueryParamPanel,
  DataTableBar, DataTableBarContent, DataTableBarAction,
  DataTableBody, DataTableCell, DataTableColumnManager,
  DataTableEmptyBody, DataTableErrorBody, DataTableFilterBar,
  DataTableFilterDropdown, DataTableFoot, DataTableHead, DataTableHeader,
  DataTableHeaderRow, DataTableHighlight, DataTableLoadingBody,
  DataTableRow, DataTableRowAction, DataTableSearchInput,
  DataTableSortDropdown, DataTableWrapper, DataTable,
  DataTableDeleteRowAction, DataTableEditRowAction, DataTableViewRowAction,
  type ColumnDef } from "@/ascendra-ui";
import { {ENTITY}_QUERIES } from "@/lib/{entity}.queries";
import { {ENTITY}_QUERY_FUNCTIONS } from "@/services/{entity}.service";
// import { {ENTITY}_FIELD_OPTIONS } from "@/lib/{entity}.field-options"; // if needed

export function {Entity}Table() {
  return (
    <DataTableWithQueryProvider
      columns={COLUMNS}
      queries={{ENTITY}_QUERIES}
      queryFunctions={{ENTITY}_QUERY_FUNCTIONS}
      // fieldOptions={{ENTITY}_FIELD_OPTIONS}
      getRowId={(row) => String(row.id)}
      tableId="{entity}-table"
    >
      <DataTableBar>
        <DataTableBarContent>
          <DataTableSearchInput />
          <DataTableColumnManager />
          <DataTableSortDropdown />
          <DataTableFilterDropdown />
        </DataTableBarContent>
        {/* omit DataTableBarAction if no CTA */}
        <DataTableBarAction>
          <Button>+ Add {Entity}</Button>
        </DataTableBarAction>
      </DataTableBar>
      <QueryBar />
      <QueryParamPanel />
      <DataTableFilterBar />
      <DataTableWrapper>
        <DataTable scrollable horizontal height={500}>
          <DataTableHeader>
            <DataTableHeaderRow>
              <DataTableHead column="field" />
            </DataTableHeaderRow>
          </DataTableHeader>
          <DataTableBody>
            {(row: {Entity}) => (
              <DataTableRow key={row.id}>
                <DataTableCell column="field">
                  <DataTableHighlight text={row.field} item={row} itemKey="field" />
                </DataTableCell>
                <DataTableRowAction onAction={(id) => console.log(id)}>
                  <DataTableViewRowAction />
                  <DataTableEditRowAction />
                  <DataTableDeleteRowAction />
                </DataTableRowAction>
              </DataTableRow>
            )}
          </DataTableBody>
          <DataTableLoadingBody />
          <DataTableErrorBody />
          <DataTableEmptyBody title="No {entities} yet" description="..." />
          <DataTableFoot />
        </DataTable>
      </DataTableWrapper>
    </DataTableWithQueryProvider>
  );
}
```

#### Step 6 — Page integration (if new page requested)

Generate `app/(app)/{route}/page.tsx`. Use full-width `MainContent`.

---

## Cell rendering reference (all DataTable branches)

Apply these patterns inside `DataTableBody`'s render function for columns that need custom display:

- **Search highlight** (text fields): `<DataTableHighlight text={row.field} item={row} itemKey="field" />`
- **Status badge**: `<SimpleBadge variant="green">{row.status}</SimpleBadge>`
- **Date**: `formatDate(row.date)` — import from `@/ascendra-ui/utils/common.util`
- **Currency**: `formatAmount(row.amount)` — import from `@/ascendra-ui/utils/common.util`
- **Avatar**: `<NameAvatar name={row.name} size={24} />`

Use `row.field` directly — do not use `getValue()`.

---

## Verification

Run `npx tsc --noEmit`. Fix any type errors before reporting done.

List all files created.

**Key notes:**
- Use `row.field` directly in cell render functions — not `getValue()`
- `QueryFn<T>` must return `{ data: T[], totalBatches: number }` — `totalBatches` is the page count, not total records; return `1` if the API uses cursor pagination with no page count
- All imports from `@/ascendra-ui`; `type ColumnDef`, `type QueryFn`, `type QueryDef`, `type QueryFunctionMap`, `type FieldOptionsMap` also from `@/ascendra-ui`
- Omit toolbar controls not selected in the spec — do not include them as comments
- Omit `DataTableBarAction` entirely if no CTA was requested
- Omit `DataTableRowAction` entirely if no row actions were requested

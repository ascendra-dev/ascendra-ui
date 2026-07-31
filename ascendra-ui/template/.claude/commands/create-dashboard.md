---
description: Scaffold a dashboard page with KPI stat tiles, charts, and optional table
---
<!-- managed: overwritten on npm run upgrade — copy with a new name to customise -->

You are an expert data dashboard architect. Your job is first to arrive at a precise spec, then to build a complete, working dashboard that follows the library's exact composition rules.

Read `docs/showcase-reference.md` → Template 3 (Dashboard Page), the Dashboards composite patterns section, and Template 9 (Color & Token Rules) before asking anything.

Run Phase 0 before generating any code.

---

## Phase 0 — Requirements Discovery

Read any user message. Note every detail already stated — only ask about what is genuinely unknown.

### Batch 1 — Identity and audience

1. Dashboard name and subtitle/scope (e.g., "Sales Analytics · Monthly metrics for current fiscal year")
2. Who is the primary audience?
   > - **Internal ops team** — dense data, multiple metrics, filters welcome
   > - **Executive** — fewer, bigger numbers; clean layout; trend direction is key
   > - **Client-facing** — export-ready, polished, minimal chrome

### Batch 2 — KPI stat tiles

3. How many KPI stat tiles? For each: label, value type (number | currency | percentage), and trend delta indicator needed?
   > _Stat tiles show one metric per card in a 2-col mobile / 4-col desktop grid. A trend indicator shows a green/red `SimpleBadge` with a `TrendingUp`/`TrendingDown` icon and a delta value like "+12%" or "−3.4%". If unsure, indicators will be included for all tiles._

### Batch 3 — Charts

4. How many charts? For each: what data does it show, and what layout slot?
   > **Chart type guidance:**
   > - **Area or line** — trend over time (e.g., monthly revenue, daily active users). Area works well for a single series with a gradient fill; line is cleaner for 3+ overlapping series.
   > - **Bar** — comparing categories side-by-side (e.g., sales by region, tickets by priority). Use grouped for direct comparison, stacked for part-of-whole within a category.
   > - **Pie or donut** — proportions of a whole (e.g., traffic sources, budget allocation). Keep to ≤ 6 segments. Donut is preferred for cleaner presentation.
   >
   > **Layout slot guidance (12-column grid):**
   > - Full width: `col-span-12`
   > - Main + narrow panel: `col-span-8` + `col-span-4`
   > - Two halves: `col-span-6` + `col-span-6`
   > - Three equal: `col-span-4` + `col-span-4` + `col-span-4`

5. For each chart: single series or multi-series? If multi-series: list the series names. Stacked or grouped (for bar)?

### Batch 4 — Extras

6. Simple table at the bottom (e.g., "Top 10 records sorted by value")? If yes: entity name, columns, sort key.
7. Date range selector or filter bar at the top of the page?
8. Data source: realistic hardcoded sample arrays (for prototyping), or real API endpoints (provide paths)?

---

**CHECKPOINT — Spec review**

Present the derived spec:

```
name:       Dashboard Name · subtitle
audience:   internal ops | executive | client-facing
stat tiles: N tiles — [Label (currency/%), Label (number), ...]
charts:     [Chart 1: type, series list, layout slot]
            [Chart 2: type, series list, layout slot]
table:      entity, columns  (or "none")
filter bar: yes | no
data:       sample arrays | live API
```

Ask: "Does this look right? Confirm or correct anything — then I'll start building."

Do not generate any code until the user approves.

---

## Generation

### Step 1 — Page shell

Generate `app/(app)/{route}/page.tsx` with `"use client"` directive.

Build the outer shell following Template 3 exactly:
- Optional `BackLink` if there's a parent page
- `PageHeader variant="dashboard"` with `PageHeaderGroup > PageTitle + PageSubtitle` + optional `PageHeaderAction`
- `DashboardContent` wrapper — this replaces `PageMain`/`PageWrapper`/`PageContent` entirely for dashboard pages
- Inside `DashboardContent`: KPI grid `div`, chart row `div`(s), and table `div` — all as commented placeholders (`{/* KPI tiles */}`, `{/* Chart row */}`, `{/* Table */}`)

Add `chartConfig` constants typed as `ChartConfig` (from `@/ascendra-ui/shadcn`) for each chart, using `var(--chart-1)` through `var(--chart-5)` as color values.

---

**CHECKPOINT — Structure review**

Show the current file: shell, DashboardContent, grid placeholders, chartConfig objects.

Ask: "Does the structure and layout look right? I'll fill in the stat tiles, charts, and table next."

Wait for approval.

---

### Step 2 — KPI stat tiles

Fill in the KPI grid:

```tsx
<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  {kpis.map((kpi) => (
    <Card key={kpi.label} className="h-full">
      <CardPanel>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs text-muted-foreground">{kpi.label}</p>
          <div className="mt-auto flex flex-col items-start gap-1 pt-4
                          md:flex-row md:items-center md:justify-between">
            <span className="text-2xl font-semibold tracking-tight">{kpi.value}</span>
            <SimpleBadge variant={kpi.up ? 'green' : 'red'}>
              {kpi.up ? <LuTrendingUp className="size-3" /> : <LuTrendingDown className="size-3" />}
              {kpi.delta}
            </SimpleBadge>
          </div>
        </div>
      </CardPanel>
    </Card>
  ))}
</div>
```

Define a `const kpis = [...]` array with realistic sample values.

### Step 3 — Charts

For each chart, generate inside a `Card > CardHeader (title + subtitle) + CardPanel > div.p-5`:

- `ChartContainer config={chartConfig} className="h-64 w-full"` from `@/ascendra-ui/shadcn`
- Recharts primitive from `recharts` (`AreaChart`, `BarChart`, `LineChart`, `PieChart`, etc.)
- `CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5}`
- `XAxis` and `YAxis` with `tickLine={false} axisLine={false} tick={{ fontSize: 11 }}`
- `ChartTooltip content={<ChartTooltipContent />}` from `@/ascendra-ui/shadcn`
- `linearGradient` fills for area charts using the chart color variable
- `ChartLegend` / `ChartLegendGroup` from `@/ascendra-ui` for multi-series charts

**Color rule:** all series colors must use `var(--chart-1)` through `var(--chart-5)` — never hex values, never raw Tailwind palette classes.

Define a realistic sample data array matching the chart's series shape.

### Step 4 — Table (if requested)

Use a standalone `CardHeader + TableWrapper` — NOT wrapped in a Card:

```tsx
<div>
  <CardHeader>
    <CardHeaderTitle>Top Records</CardHeaderTitle>
    <CardHeaderSubtitle>Sorted by value, current period</CardHeaderSubtitle>
  </CardHeader>
  <TableWrapper>
    <Table scrollable horizontal vertical height={300}>
      ...
      <TableBody border={{}} bg={{}}>  {/* accent border + gradient row styling */}
        ...
      </TableBody>
    </Table>
  </TableWrapper>
</div>
```

### Step 5 — Filter bar (if requested)

Add a `DateRangePicker` from `@/ascendra-ui` above `DashboardContent`, wired to `useState` for the date range value.

---

## Verification

Run `npx tsc --noEmit`. Fix any type errors before reporting done.

List all files created.

**Notes:**
- `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `type ChartConfig` → `@/ascendra-ui/shadcn`
- `ChartLegend`, `ChartLegendGroup` → `@/ascendra-ui`
- Chart primitives (`AreaChart`, `BarChart`, etc.) → `recharts`
- `DashboardContent` replaces `PageMain`/`PageWrapper`/`PageContent` — do not use both
- Replace sample data arrays with `useQuery` calls when connecting to real API endpoints

---
description: Scaffold a report page with ReportDocumentWrapper structure and optional PDF export
---
<!-- managed: overwritten on npm run upgrade — copy with a new name to customise -->

You are an expert report layout architect. Your job is first to arrive at a precise spec, then to build a complete, print-ready report document.

Read `docs/showcase-reference.md` → Template 4 (Report Page) and Reports composite patterns section before asking anything.

Run Phase 0 before generating any code.

---

## Phase 0 — Requirements Discovery

Read any user message. Note every detail already stated — only ask about what is genuinely unknown.

### Batch 1 — Identity and audience

1. Report name/title, organization name, and reporting period (e.g., "Q2 Financial Summary", "Acme Corp", "April–June 2026")
2. Who is the primary audience?
   > - **Internal** — ops, management, or board. Screen-first, PDF is secondary.
   > - **Client-facing** — will be exported as a PDF and sent to a client. Design should be polished and self-contained. Consider a "Confidential" badge.

### Batch 2 — Document header

3. "Prepared for" field — client name, department name, or omit?
4. "Prepared by" field — department, person's name, or omit?
5. Additional header fields? (e.g., report ID, fiscal year, project code, reference number)
6. Confidential badge needed?

### Batch 3 — Sections

7. List the section names and for each, what type of content it contains:
   > - **KPI summary** — metric grid showing N numbers with trend deltas. Renders as a raw `div` grid (not Card tiles — this is a report rule for print fidelity).
   > - **Chart** — a data visualization. Which type? Use **area/line** for trend over time, **bar** for category comparison, **pie/donut** for proportions.
   > - **Table** — rows of data (e.g., a breakdown by category, a top-N list). What entity and columns?
   > - **Narrative** — prose, bullet points, or a text summary paragraph.
   >
   > _For chart sections: describe what data the chart shows and which series it has._

### Batch 4 — Export and footer

8. PDF export button? (Adds `ReportPdfExportButton` — must be placed outside and after `ReportDocumentWrapper`)
9. Document footer needed? (Shows org name, report title, date, confidential label at the bottom of the document)
10. Data source: realistic hardcoded sample values, or will the user wire up to API props?

---

**CHECKPOINT — Spec review**

Present the derived spec:

```
report:       Report Title
org:          Organization Name
period:       Reporting Period
audience:     internal | client-facing
header fields: [Prepared for: ..., Prepared by: ..., ...]
confidential: yes | no
sections:     [Section Name (type): description, ...]
PDF export:   yes | no
footer:       yes | no
data:         sample | props
```

Ask: "Does this look right? Confirm or correct anything — then I'll start building."

Do not generate any code until the user approves.

---

## Generation

### Step 1 — Document shell

Generate `app/(app)/{route}/page.tsx` with `"use client"` directive.

Build the outer structure following Template 4 exactly:
- `BackLink` to the parent page (e.g., reports list)
- `ReportDocumentWrapper` — this replaces `PageMain`/`PageWrapper`/`PageContent` entirely. **No `PageHeader` in a report.**
- Inside `ReportDocumentWrapper`: the document header Card, then `ReportSectionHeader` + placeholder `{/* section content */}` for each section
- If PDF export: `ReportPdfExportButton fileName="report-slug"` placed AFTER AND OUTSIDE `ReportDocumentWrapper`

---

**CHECKPOINT — Structure review**

Show the current file: shell, document header placeholder, section headers list.

Ask: "Does the report structure look right? I'll fill in the document header and each section next."

Wait for approval.

---

### Step 2 — Document header

Build the header card following Template 4:

```tsx
<Card>
  <CardPanel border={{ color: 'blue' }}>
    <ReportHeaderContent>
      <ReportHeaderBody>
        <ReportHeaderBodyWrap>
          <ReportTitle>Category Label</ReportTitle>
          <ReportTitleHeader>Organization Name</ReportTitleHeader>
          <ReportSubTitle>Period · Month YYYY</ReportSubTitle>
        </ReportHeaderBodyWrap>
        {confidential && <SimpleBadge variant="secondary">Confidential</SimpleBadge>}
      </ReportHeaderBody>
      <ReportHeaderFooter>
        {/* ReportHeaderField for each metadata field */}
        <ReportHeaderField label="Prepared for">Client Name</ReportHeaderField>
        <ReportHeaderField label="Report Date">June 30, 2026</ReportHeaderField>
        <ReportHeaderField label="Prepared by">Department</ReportHeaderField>
      </ReportHeaderFooter>
    </ReportHeaderContent>
  </CardPanel>
</Card>
```

### Step 3 — KPI summary sections (if any)

For each KPI section:

```tsx
<div>
  <ReportSectionHeader>
    <CardHeaderTitle>Section Title</CardHeaderTitle>
    <CardHeaderSubtitle>Subtitle</CardHeaderSubtitle>
  </ReportSectionHeader>
  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
    {kpis.map((k) => (
      <div key={k.label} className="flex flex-col gap-1.5">
        <p className="text-xs text-muted-foreground">{k.label}</p>
        <p className="text-4xl font-bold tracking-tight text-foreground">{k.value}</p>
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${
          k.up ? 'text-emerald-600 dark:text-emerald-400'
               : 'text-rose-600 dark:text-rose-400'
        }`}>
          {k.up ? <LuTrendingUp className="size-3" /> : <LuTrendingDown className="size-3" />}
          {k.delta}
        </span>
      </div>
    ))}
  </div>
</div>
```

**Color rule for reports:** use `text-emerald-600 dark:text-emerald-400` and `text-rose-600 dark:text-rose-400` directly — NOT semantic tokens (`text-positive`, `text-negative`). Semantic tokens do not print reliably in PDF exports.

### Step 4 — Chart sections (if any)

For each chart section, generate inside `Card > CardHeader + CardPanel > div.p-6`:

- `ChartContainer config={config} className="h-56 w-full"` from `@/ascendra-ui/shadcn`
- Recharts primitive from `recharts`
- Standard grid: `CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} strokeWidth={0.5}`
- Standard axes: `tickLine={false} axisLine={false} tick={{ fontSize: 11 }}`
- `ChartTooltip` + `ChartTooltipContent` from `@/ascendra-ui/shadcn`
- `ChartLegendGroup` / `ChartLegend` from `@/ascendra-ui` for multi-series charts
- Realistic sample data array

### Step 5 — Table sections (if any)

```tsx
<div>
  <ReportSectionHeader>
    <CardHeaderTitle>Section Title</CardHeaderTitle>
  </ReportSectionHeader>
  <TableWrapper>
    <Table horizontal vertical scrollable>
      <TableHeader>
        <TableHeaderRow>
          <TableHead>Column</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableHeaderRow>
      </TableHeader>
      <TableBody border={{}} bg={{}}>
        {rows.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="font-medium">{r.name}</TableCell>
            <TableCell className="text-right font-mono tabular-nums">{r.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableWrapper>
</div>
```

### Step 6 — Narrative sections (if any)

Plain prose inside `ReportSectionHeader` + `div.space-y-3 > p.text-sm.text-muted-foreground` for body paragraphs.

### Step 7 — Document footer (if requested)

```tsx
<ReportDocumentFooter>
  <ReportDocumentFooterLine>
    <ReportDocumentFooterLineLeft>Organization — Department</ReportDocumentFooterLineLeft>
    <ReportDocumentFooterLineRight>
      <span>Report Title</span><span>·</span>
      <span>Confidential</span><span>·</span>
      <span>June 30, 2026</span>
    </ReportDocumentFooterLineRight>
  </ReportDocumentFooterLine>
</ReportDocumentFooter>
```

---

## Verification

Run `npx tsc --noEmit`. Fix any type errors before reporting done.

List all files created.

**Notes:**
- `ReportPdfExportButton` must be OUTSIDE and AFTER `ReportDocumentWrapper` — placing it inside will include the button itself in the PDF export
- KPI deltas use `text-emerald-600`/`text-rose-600` directly — semantic tokens (`text-positive`/`text-negative`) do not render reliably in PDF exports
- `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `type ChartConfig` → `@/ascendra-ui/shadcn`
- `ChartLegend`, `ChartLegendGroup` → `@/ascendra-ui`
- Chart primitives → `recharts`
- All report layout components (`ReportDocumentWrapper`, `ReportHeaderContent`, etc.) → `@/ascendra-ui`

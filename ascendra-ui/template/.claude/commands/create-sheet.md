---
description: Scaffold a Sheet side-panel with detail view, form, or mixed tabs content
---
<!-- managed: overwritten on npm run upgrade — copy with a new name to customise -->

You are an expert UI overlay architect. Your job is first to arrive at a precise spec, then to generate a complete, working sheet panel.

Read `docs/showcase-reference.md` → Template 6 (Sheet Pattern) and Sheets section before asking anything.

Run Phase 0 before generating any code.

---

## Phase 0 — Requirements Discovery

Read any user message. Note every detail already stated — only ask about what is genuinely unknown.

### Batch 1 — Purpose and content type

1. Sheet purpose (e.g., "Employee details preview", "Edit invoice", "Account settings panel")
2. Which content pattern fits best?
   > - **Detail view** — read-only record preview using `SheetProperties` key-value rows. Good for "quick look" at a record without navigating away. Use `SheetSection` to group related properties.
   > - **Form** — editable fields using react-hook-form + zod. Use when the user needs to update the record inline. Appropriate when the form has ≥ 5 fields (for fewer fields, a Dialog is often better).
   > - **Mixed (tabs)** — detail in one tab, edit form in another using `SheetTabs`. Use when users need both read and write access in the same panel.
3. Trigger context:
   > - **Table row** — sheet opens when the user clicks a row or a row action button
   > - **Standalone button** — sheet has its own trigger button (e.g., "View Details")
   > - **Context menu** — sheet opens from a `DropdownMenu` item

### Batch 2 — Content detail

_For **detail view**:_

4. What properties/data fields to show? List them: property name and value type (text, date, badge, avatar, etc.)
5. Multiple tabs needed (e.g., Overview, History, Activity)? If yes, list tab names and what each contains.

_For **form**:_

4. Fields — for each: name, label, type, required?
   > _Type guide: `text | email | phone | number` → `Input`; `select` (≤ 20 options) → `Select`; `combobox` (searchable / multi-select) → `Combobox`; `boolean` → `Switch`; `date` → `DatePicker`; `date-range` → `DateRangePicker`; `rich-text` → `RichTextEditor`; `file` → `FileUpload`_
5. Grouped into named sections inside the sheet?

_For **mixed (tabs)**:_

4. Properties to show in the detail tab (same as detail view batch 2, Q4)
5. Fields for the edit form tab (same as form batch 2, Q4)

### Batch 3 — Data and actions

6. Data loading strategy:
   > - **Props on open** — the trigger already has all the data (e.g., a table row renders with the full record). The sheet receives the data as props. Most common for table rows.
   > - **Fetch on open** — the sheet only receives an ID when it opens and fetches the full record itself (e.g., you need more data than the table row contains). Use `useQuery` inside the sheet.
7. Footer action buttons — list the labels and variants (e.g., "Save Changes" primary + "Cancel" secondary + "Delete" destructive)

---

**CHECKPOINT — Spec review**

Present the derived spec:

```
purpose:        Sheet purpose description
content type:   detail | form | mixed (tabs)
trigger:        table row | standalone button | context menu
tabs:           [Tab names]  (or "none")
properties / fields: [list]
data loading:   props on open | fetch on open
footer:         [Button labels + variants]
```

Ask: "Does this look right? Confirm or correct anything — then I'll build."

Do not generate any code until the user approves.

---

## Generation

Generate the sheet component using the correct pattern from `docs/showcase-reference.md` Template 6.

**Shell (all variants):**
- `Sheet` + `SheetTrigger asChild` + `SheetContent`
- For tabs: wrap everything in `SheetTabs defaultTab="{firstTab}"` inside `SheetContent`
- `SheetHeader` with `SheetTitle` + `SheetDescription` (add `NameAvatar` for person records)
- `SheetBody` wraps all scrollable content
- `SheetFooter` with action buttons + `SheetClose asChild` on cancel/close buttons
- `"use client"` directive + all `Sheet*` imports from `@/ascendra-ui`

---

**CHECKPOINT — Structure review**

Show the shell structure (trigger, header, body placeholder, footer).

Ask: "Does this structure look right? I'll fill in the body content next."

Wait for approval.

---

**Detail view body:**
- `SheetSection` for each logical group
- `SheetProperties` with `SheetProperties.Row label="Field Name">value` for each key-value pair
- For badges: `<SimpleBadge variant="...">` inline in the value
- For avatars: `<NameAvatar name={...} size={24} />`
- For multiple tabs: `SheetSubHeader > SheetTabList > SheetTabTrigger[]` then `SheetTabContent` per tab inside `SheetBody`

**Form body:**
- `react-hook-form` + `zod` schema (same pattern as `/create-form`)
- Fields inside `SheetBody` using `Field > FieldLabel + FieldContent > [control] + FieldError`
- `FieldGroup` for stacked fields, `FieldGrid` for 2-column rows
- `Controller` for Select, Switch, DatePicker, Combobox; `register()` for Input
- Submit handler: `apiClient.patch(endpoint, data)` + `toast.success()` on success + close sheet

**Data loading — fetch on open:**
- Accept `id: string` prop, use `useQuery(['entity', id], () => apiClient.get('/api/entity/' + id))`
- Show `Skeleton` placeholders while loading

---

## Verification

Run `npx tsc --noEmit`. Fix any type errors before reporting done.

List the file created.

**Notes:**
- All `Sheet*` sub-components come from `@/ascendra-ui` — not `@/ascendra-ui/shadcn`
- Use `SheetTabs` for multi-tab sheets — do not use the generic `Tabs` component inside a Sheet
- For form sheets: reset the form state on close using `onOpenChange={(open) => { if (!open) reset(); }}` on `<Sheet>`
- For table-row triggers: pass the selected row's data as a prop rather than re-fetching when the data is already available

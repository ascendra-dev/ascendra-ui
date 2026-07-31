---
description: Scaffold a complete form page with zod schema, react-hook-form, and Field-wrapped controls
---
<!-- managed: overwritten on npm run upgrade — copy with a new name to customise -->

You are an expert form architect. Your job is first to arrive at a precise spec, then to build a complete, working form with correct validation, layout, and submit behavior.

Read `docs/showcase-reference.md` → Template 2 (Settings/Form Page) and Forms section. Read `docs/ui-reference.md` → Forms & Inputs entries. Do this before asking anything.

Run Phase 0 before generating any code.

---

## Phase 0 — Requirements Discovery

Read any user message. Note every detail already stated — only ask about what is genuinely unknown.

### Batch 1 — Purpose and framing

1. Form name/purpose (e.g., "Create Invoice", "Employee Onboarding", "Account Settings")
2. Creating a new record or editing an existing one?
   > _If editing: where do default values come from — fetched by ID from an API, passed as props from a parent, or loaded from local state?_
3. API endpoint to submit to (e.g., `POST /api/invoices`, `PATCH /api/users/:id`), or "pattern only" to generate without a live submit handler?

### Batch 2 — Section structure

4. Are fields grouped into named sections? If yes, list the section names.
   > _Each section becomes a `Card > CardHeader + CardPanel > CardPanelItem` block. Good section names: "Personal Information", "Address", "Notifications", "Role & Access". A Danger Zone section should be last and uses `<Card danger>`._
   > _If there are no sections, all fields go into one Card._
5. Danger Zone section needed (irreversible actions like delete or deactivate)?

### Batch 3 — Fields

6. For each field (per section if sections exist): name, label, type, required?
   > _Type guide:_
   > - `text | email | phone | number` → `Input`
   > - `textarea` → `Input` as `<Input as="textarea">` or `Textarea`
   > - `select` (≤ 20 fixed options) → `Select`
   > - `combobox` (searchable, or multi-select with chips) → `Combobox`
   > - `boolean toggle` → `Switch` (use horizontal `Field orientation="horizontal"` with `FieldLabelGroup > FieldLabel + FieldHint`)
   > - `checkbox` → `Checkbox`
   > - `radio` (≤ 6 options) → `RadioGroup`
   > - `date` → `DatePicker`
   > - `date-range` → `DateRangePicker`
   > - `rich-text` → `RichTextEditor`
   > - `file` → `FileUpload`
   > - `color` → `ColorPicker`
   > - Two fields in the same row → wrap in `FieldGrid`; single column → `FieldGroup`
7. Any conditional fields — fields that only appear when another field has a specific value?

### Batch 4 — Submit behavior

8. Multiple submit actions (e.g., "Save Draft" and "Publish")? If yes, list each button's label and variant.
9. Submit behavior after successful save:
   > - **Navigate to list page** — redirect away (provide the route)
   > - **Toast and stay** — show a success toast, remain on the form
   > - **Redirect to detail page** — redirect to the created/updated record's detail page
10. `UnsavedChangesBar` needed?
    > _Yes for standalone form/settings pages — the bar appears fixed at the bottom when the form is dirty. No for dialogs or sheets — those use their own footer buttons._

---

**CHECKPOINT — Spec review**

Present the derived spec:

```
form:          Form Name
route:         app/(app)/{route}/page.tsx
mode:          create | edit
endpoint:      POST /api/...  (or "pattern only")
sections:      N sections — [Name (N fields), Name (N fields), ...]
total fields:  N fields — [name: type (required), ...]
submit:        behavior — button label(s)
UnsavedChangesBar: yes | no
```

Ask: "Does this look right? Confirm or correct anything — then I'll start building."

Do not generate any code until the user approves.

---

## Generation

### Step 1 — Zod schema and form setup

Generate the zod schema with appropriate validators for every field:
- Required strings: `z.string().min(1, 'Required')`
- Email: `z.string().email('Invalid email')`
- Numbers: `z.number()` or `z.coerce.number()`
- Booleans: `z.boolean()`
- Dates: `z.date()` or `z.string()`
- Optional fields: `.optional()` or `.nullable()`

Generate `useForm<FormValues>` with:
- `resolver: zodResolver(schema)`
- `mode: 'onTouched'`
- `defaultValues` — realistic defaults for new record, or mapped from existing data if editing

---

**CHECKPOINT — Schema review**

Show the full zod schema and `useForm` setup.

Ask: "Does the schema and validation logic look right? I'll build the form JSX next."

Wait for approval.

---

### Step 2 — Page shell and form JSX

Generate `app/(app)/{route}/page.tsx` with `"use client"` directive.

Structure:
- Optional `BackLink` if there's a parent page
- `PageHeader > PageHeaderGroup > PageTitle + PageSubtitle`
- `PageMain > PageWrapper > PageContent > MainContent`
- One `Card > CardHeader + CardPanel > CardPanelItem` per section
- `<Card danger>` for Danger Zone section

**Every field must be wrapped — no raw label + input pairs:**
```tsx
<Field>
  <FieldLabel htmlFor="field-id">Label</FieldLabel>
  <FieldContent>
    <Input id="field-id" full {...register('fieldName')} aria-invalid={!!errors.fieldName} />
    <FieldError errors={errors.fieldName ? [errors.fieldName] : []} />
  </FieldContent>
</Field>
```

**Horizontal boolean fields (Switch):**
```tsx
<Field orientation="horizontal">
  <FieldLabelGroup>
    <FieldLabel htmlFor="field-id">Label</FieldLabel>
    <FieldHint>Short hint text</FieldHint>
  </FieldLabelGroup>
  <FieldContent>
    <Controller name="fieldName" control={control}
      render={({ field }) => (
        <Switch id="field-id" checked={field.value} onCheckedChange={field.onChange} />
      )} />
  </FieldContent>
</Field>
```

Use `Controller` for: `Select`, `Switch`, `Checkbox`, `DatePicker`, `DateRangePicker`, `Combobox`, `RichTextEditor`, `FileUpload`, `ColorPicker`.
Use `register()` for: `Input`, plain `Textarea`.

For conditional fields: wire visibility to `watch('fieldName') === 'value'`.

### Step 3 — Submit handler

**If an endpoint was provided:**
- `handleSubmit` wrapper calling `apiClient.post/patch(endpoint, data)` from `@/ascendra-ui/lib/api/client.ts`
- Apply the stated submit behavior (navigate with `router.push`, `toast.success()`, or `router.push` to detail)
- `toast.error()` in the catch block

**If "pattern only":**
- `onSubmit` as `console.log(data)` stub with a `// TODO: connect to API` comment

### Step 4 — UnsavedChangesBar (if requested)

Place `<UnsavedChangesBar>` OUTSIDE `PageMain` at root level — after the `</>` closing the main content fragment:

```tsx
<UnsavedChangesBar
  isDirty={isDirty}
  isValid={isValid}
  isSaving={isSubmitting}
  onSave={handleSubmit(onSubmit)}
  onReset={() => reset()}
  onInvalid={() => {}}
/>
```

---

## Verification

Run `npx tsc --noEmit`. Fix any type errors before reporting done.

List all created files.

**Notes:**
- `UnsavedChangesBar` must be at root level, outside `<PageMain>` — placing it inside breaks the fixed-bottom positioning
- Every form control must be inside `Field > FieldLabel + FieldContent > [control] + FieldError` — never a raw label + input
- `apiClient` from `@/ascendra-ui/lib/api/client.ts` injects the auth Bearer token automatically
- `FieldGrid` creates a 2-column grid for side-by-side fields; `FieldGroup` stacks fields vertically

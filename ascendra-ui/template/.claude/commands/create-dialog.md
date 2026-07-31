---
description: Scaffold a Dialog with trigger, typed confirmation or form fields, and footer actions
---
<!-- managed: overwritten on npm run upgrade — copy with a new name to customise -->

You are an expert UI overlay architect. Your job is first to arrive at a precise spec, then to generate a complete, working dialog.

Read `docs/showcase-reference.md` → Template 5 (Dialog Patterns) and Dialogs section before asking anything.

Run Phase 0 before generating any code.

---

## Phase 0 — Requirements Discovery

Read any user message. Note every detail already stated — only ask about what is genuinely unknown.

### Batch 1 — Type and trigger

1. Dialog purpose in plain terms (e.g., "Confirm archiving a project", "Invite a team member", "Show error details")
2. Which semantic type fits best?
   > - **Confirmation-neutral** — user reads consequences and confirms a reversible action (archive, send, schedule, export). Footer has a confirm + cancel button.
   > - **Confirmation-destructive** — irreversible action (delete, remove access). Trigger button uses destructive variant. For high-stakes actions consider typed confirmation (user types a word to unlock the confirm button).
   > - **Form-input** — collect information before proceeding (invite, rename, add item). Use for ≤ 4 fields. For ≥ 5 fields, use a Sheet instead.
   > - **Informational** — display-only content, no user action required beyond closing.
3. Trigger: button label and variant (`primary` | `secondary` | `destructive` | `outline` | `ghost`)

### Batch 2 — Content

_For **confirmation** types:_

4. List the consequence bullets (2–4 short statements about what happens after the user confirms)
5. Typed confirmation needed? If yes: what word must the user type (e.g., `DELETE`, `REMOVE`)?

_For **form-input** type:_

4. Fields — for each: name, label, type, required?
   > _Type guide: `text | email | phone | number` → `Input`; `select` (≤ 20 options) → `Select`; `combobox` (searchable / multi-select) → `Combobox`; `boolean` → `Switch`; `date` → `DatePicker`_
5. Footer buttons: label and variant for each (e.g., "Send Invite" primary + "Cancel" secondary)

_For **informational** type:_

4. What content is displayed (description text, list, code snippet)?
5. Footer: single "Close" button or none?

### Batch 3 — State and wiring

6. Async submit (API call when the user confirms)? If yes: loading state while submitting?
7. Where does the dialog's open/closed state live?
   > - **Self-contained** — `DialogTrigger` and `Dialog` in the same component; no external state needed (most common)
   > - **Controlled by parent** — parent passes `open` and `onOpenChange` props; use when the dialog must be opened programmatically (e.g., after a row action)

---

**CHECKPOINT — Spec review**

Present the derived spec:

```
type:     confirmation-neutral | confirmation-destructive | form-input | informational
trigger:  "Button Label" — variant
content:  N consequence bullets  (or N fields: name/type list)
footer:   "Confirm Label" variant + "Cancel Label" variant
async:    yes — with loading state  (or "no")
state:    self-contained  (or "controlled by parent")
```

Ask: "Does this look right? Confirm or correct anything — then I'll build."

Do not generate any code until the user approves.

---

## Generation

Generate the dialog component using the correct pattern from `docs/showcase-reference.md` Template 5.

**All variants:**
- `Dialog` + `DialogTrigger asChild` + `DialogContent` + `DialogHeader` + `DialogTitle` + `DialogDescription`
- `DialogBody` for main content
- `DialogFooter` with the specified buttons
- `"use client"` directive + all imports from `@/ascendra-ui`

**Confirmation-neutral:**
- Consequence bullets in `DialogBody` as a `ul` with dot markers
- Confirm button in `DialogFooter` using `DialogClose asChild`

**Confirmation-destructive:**
- If typed confirmation: `Input` in `DialogBody` with instruction label; confirm button `disabled` until text matches
- `onOpenChange={(open) => { if (!open) setConfirmText(''); }}` on `<Dialog>` to reset on close
- Confirm button uses `variant="destructive"`

**Form-input:**
- `react-hook-form` + `zod` schema inside `DialogContent`
- Fields in `DialogBody` using `FieldGrid` or `FieldGroup` + `Field > FieldLabel + FieldContent > [control]`
- `onOpenChange={(open) => { if (!open) reset(); }}` on `<Dialog>` to reset form on close
- If async submit: `isSubmitting` state on the confirm button (`loading` prop or `disabled`)

**Async submit:**
- Submit handler calls `apiClient` from `@/ascendra-ui/lib/api/client.ts`
- `toast.success()` or `toast.error()` from `sonner` on completion

**Controlled state:**
- Accept `open: boolean` and `onOpenChange: (open: boolean) => void` as props
- Pass through to `<Dialog open={open} onOpenChange={onOpenChange}>`

---

## Verification

Run `npx tsc --noEmit`. Fix any type errors before reporting done.

List the file created (or the location if inlined into an existing page).

**Notes:**
- Use `DialogClose asChild` on cancel buttons so clicking them closes the dialog without additional state
- For forms: always reset on close (`onOpenChange` handler) to prevent stale values on next open
- Use Dialog for ≤ 4 fields and destructive confirmations; use Sheet for ≥ 5 fields or complex forms

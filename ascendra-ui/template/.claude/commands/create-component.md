---
description: Scaffold a custom component following CVA conventions and Ascendra UI patterns
---
<!-- managed: overwritten on npm run upgrade — copy with a new name to customise -->

You are an expert UI component architect. Your job is first to confirm the right thing is being built, then to build it correctly.

Read `docs/ui-reference.md` in full before asking anything. Note every named export and component description — you will use this to check for existing components that could serve the stated use case.

Run Phase 0 before generating any code.

---

## Phase 0 — Requirements Discovery

Read any user message or selected code. Note every detail already stated — only ask about what is genuinely unknown.

### Batch 1 — Use case and overlap check

Before asking questions, scan `docs/ui-reference.md` for any existing component that could serve the described use case — either as-is or with a minor prop or variant addition.

**If a close match exists:** present it clearly — what it does, what it specifically cannot do that the user needs, and whether a small addition would close the gap. Ask: "Could `[ExistingComponent]` work here with a small addition, or is there a reason a new component is the right path?"

- If the existing component is sufficient: describe the addition and exit this flow.
- If the user explains a genuine gap: note it and continue.

**If no close match exists:** ask:

1. Component name (PascalCase) and root HTML element (`div` | `span` | `button` | `li` | `a`)
2. What use case does this solve? What does a developer reach for it to do?

### Batch 2 — Shape and variants

3. What variant axes and values does it need? (e.g., `status: active | inactive | pending`; `size: sm | md | lg`)
   > _Leave axes open if unsure — sensible defaults will be filled in for anything not specified._
4. Does it decompose into named sub-parts — like a Card needing `CardTitle` and `CardBody` as separate pieces? If yes, list their names.

---

**CHECKPOINT — Spec review**

Synthesize all Phase 0 answers into a spec:

```
name:           ComponentName
file:           components/{slug}.tsx
root element:   div | span | button | ...
variants:       axis: value1 | value2 | value3 (default: value1)
sub-components: SubName1, SubName2  (or "none")
```

Ask: "Does this look right? Confirm or correct anything — then I'll build."

Do not generate any code until the user approves.

---

## Generation

Create `components/{slug}.tsx`:

- `cva()` + `VariantProps` from `class-variance-authority`
- `cn` imported from `@/ascendra-ui/shadcn`
- `data-slot="{slug}"` on the root element of every component and sub-component
- `...props` spread and `className` accepted on every component and sub-component
- `React.ComponentProps<'{element}'>` & `VariantProps<typeof {name}Variants>` as the props type
- All colors use semantic Tailwind tokens (`bg-primary`, `text-muted-foreground`, `border-border`) — never hardcoded palette values (`bg-gray-500`, `text-white`)
- Sub-components in the same file if requested, each with its own `data-slot`
- Export every component and sub-component
- Add `"use client"` only if the component uses hooks, event handlers, or browser APIs

---

**CHECKPOINT — Component review**

Show the full content of the created file.

Ask: "Does this look right — API, variants, sub-components, token usage? Approve or tell me what to change."

Wait for approval before reporting done.

---

## Verification

Run `npx tsc --noEmit`. Fix any type errors before reporting done.

List the file created.

**Import in consuming pages:** `import { ComponentName } from "@/components/{slug}"`

If the pattern would be reusable across multiple projects, add above the component:
`{/* TODO: ascendra-ui candidate — ComponentName — reason it's broadly reusable */}`

---
description: Regenerate docs and audit registry/nav/preview consistency
---

**Step 1 — Regenerate**

Run `npm run docs:generate`.

**Step 2 — Audit registry entries in `lib/registry.ts`**

Read `lib/registry.ts` in full. For every entry:

1. **Export completeness** — open `ascendra-ui/components/{category}/{slug}.tsx` (use the entry's `importPath` and `importNames` to locate it). Confirm every named export in the file is listed in `importNames`. Flag any export missing from the registry and any `importNames` entry that no longer exists in the file.

2. **File existence** — confirm the component file actually exists on disk. If the file is missing, flag it as a broken registry entry.

3. **Description quality** — the description must answer all three of these questions:
   - *What is it?* (one sentence naming the component and its visual form)
   - *When should a developer reach for it?* (primary use case, not just "use this component")
   - *What is it NOT for, or how does it differ from a close alternative?*

   A description that cannot answer all three is too generic — flag it.

4. **Prop completeness** — every prop entry must have a non-empty `description`.

**Step 3 — Check nav/preview alignment**

Read `lib/nav-config.ts`, `lib/doc-components.ts`, and list the files in `components/previews/`. For every slug in `lib/nav-config.ts`, confirm:
- A matching key exists in `lib/doc-components.ts`
- A matching preview file exists at `components/previews/{slug}-preview.tsx`

Flag any slug that is missing either.

**Step 3.5 — Audit gallery configs**

List all `lib/*-config.ts` files (e.g. `lib/forms-config.ts`, `lib/dialogs-config.ts`). For each config file, read it and for every entry:
- Confirm the corresponding component file exists at `components/{type}/{slug}.tsx`
- Confirm the individual gallery page exists at `app/showcase/{type}/{slug}/page.tsx`

Flag any entry whose files are missing.

**Step 4 — Report**

List every gap found, grouped by file, with the specific field or path to fix. If no gaps are found, confirm docs are clean.

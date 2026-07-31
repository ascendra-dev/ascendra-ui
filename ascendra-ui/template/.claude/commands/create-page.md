---
description: Create a new app route with the correct layout structure and shell
---
<!-- managed: overwritten on npm run upgrade — copy with a new name to customise -->

You are an expert Next.js page architect. Your job is first to arrive at a precise spec, then to generate a complete, correctly-structured page.

Read `docs/showcase-reference.md` → Page Content Structure, Layout Variants, and Templates 1–8 before asking anything.

Run Phase 0 before generating any code.

---

## Phase 0 — Requirements Discovery

Read any user message. Note every detail already stated — only ask about what is genuinely unknown.

### Batch 1 — Identity and purpose

1. Route path (e.g., `invoices`, `clients/[id]`, `settings/billing`) and page title + subtitle
2. What is the primary purpose of this page?
   > _Options — pick the closest:_
   > - **List** — shows a collection of records, typically with a table or grid; usually has a create CTA
   > - **Settings / form** — lets the user view and edit structured data; narrow-centered, Card-section layout
   > - **Landing / hub** — intro or overview page with quick-access links and featured content
   > - **Custom** — describe the purpose and I'll map it to the right template

### Batch 2 — Layout and primary action

3. Which layout fits best? I'll recommend one based on your purpose, but you can override:
   > - **Single column** — the standard; use for most pages, forms, and settings
   > - **Two column** — main content + `AsideContent` panel for supplementary info (related records, help text, quick stats)
   > - **Full width** — for data-heavy pages where a table needs the full viewport
   > - **Tabs** — when content divides into 2–5 named sections (e.g., General, Notifications, Billing)
4. Primary CTA button in the page header? If yes: label, and what does it trigger (opens a dialog, navigates to a new route, calls an action)?

### Batch 3 — Supporting structure

5. Secondary nav tabs between the page header and the content area?
   > _Used for sub-section switching (e.g., Overview / Activity / Settings). Different from Tabs layout — these are `Nav > NavLink` links, not tabbed content panels._
6. Server or client component?
   > _Default: server component. Use `"use client"` only when the page itself — not just its children — uses hooks, event handlers, or browser APIs. Child components can be client components independently._
7. Loading skeleton, empty state, or error state treatment needed?

---

**CHECKPOINT — Spec review**

Present the derived spec:

```
route:        app/(app)/{route}/page.tsx
title:        Page Title
subtitle:     One-line description
layout:       single column | two column | full width | tabs
client:       yes | no
CTA:          label — action  (or "none")
secondary nav: yes | no
states:       loading | empty | error  (or "none")
```

Ask: "Does this look right? Confirm or correct anything — then I'll build."

Do not generate any code until the user approves.

---

## Generation

Generate `app/(app)/{route}/page.tsx` using the correct template from `docs/showcase-reference.md`.

**Standard / settings / full-width layouts:**
- `PageHeader > PageHeaderGroup > PageTitle + PageSubtitle` + optional `PageHeaderAction` for CTA
- `PageMain > PageWrapper > PageContent > MainContent`
- For two-column: `MainContent` (primary) + `AsideContent` (secondary panel)
- Add `"use client"` directive only if requested

**Tabs layout (Template 8):**
- `PageHeader` then `PageMain > PageWrapper`
- `Tabs > TabList > TabTrigger[]` goes inside `PageWrapper`, outside `PageContent`
- `PageContent > MainContent > TabContent[]`
- Add `UnsavedChangesBar` at root level outside `PageMain` if the tabs contain forms

**Secondary nav:**
- `Nav > NavLink[]` goes between `PageHeader` and `PageMain`

**States (if requested):**
- Loading: use `SkeletonTable`, `SkeletonStat`, or `SkeletonCard` from `@/ascendra-ui`
- Empty: use `Empty > EmptyMedia + EmptyContent` from `@/ascendra-ui` with a title, description, and CTA
- Error: simple `SimpleAlert` from `@/ascendra-ui` inside the content area

Add realistic placeholder content or `{/* content here */}` comments so the structure is clear.

---

## Verification

Run `npx tsc --noEmit`. Fix any type errors before reporting done.

List the file created.

**Notes:**
- The `(app)` route group applies the sidebar + header layout automatically — no extra wiring needed
- Use `<Link href="...">` from `next/link` for internal navigation, not `<a>` tags
- `QueryProvider`, `ThemeProvider`, and `TooltipProvider` are already in root layout — do not re-wrap

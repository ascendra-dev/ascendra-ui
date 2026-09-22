# Ascendra UI Showcase — CLAUDE.md

## Repository Overview

**One repo, two logical layers:**

| Layer | Root | Purpose | Ships to consumers? |
|---|---|---|---|
| **Library** | `ascendra-ui/` | Components, hooks, libs, providers, utils | Yes — the whole folder |
| **Showcase** | Everything else | Demos, previews, galleries, generated docs, the `/starter` dogfood route | No — never ships |

The `ascendra-ui/` folder is what a scaffolded project gets. The showcase (`app/showcase/`, `components/previews/`, `lib/registry.ts`, `docs/`, galleries) is internal — it demonstrates and documents the library, and is deleted by `ascendra.js setup` when a new project is created.

**Decision rule:** If it could be useful in a consumer project → put it in `ascendra-ui/`. If it's demo-specific → put it in the showcase layer.

**Why the showcase matters:** `docs/ui-reference.md` is auto-generated from `lib/registry.ts` and is the design system reference used when building pages in this repo — including by an AI assistant working in it. It doesn't ship to consumer projects (see [Docs](#docs) below), but registry accuracy and preview quality still directly affect how well it documents the library for anyone working here.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js App Router — `"use client"` on interactive components, server components by default |
| Language | TypeScript — all files; no `.js` exceptions |
| Styling | Tailwind CSS + CVA (`class-variance-authority`) for variant-driven components |
| Base primitives | shadcn/ui — lives in `ascendra-ui/shadcn/`; **never edit these files** |
| Icons | `react-icons/lu` (Lucide) — always this library; never `heroicons`, `lucide-react` directly, or any other icon set |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers/zod` |
| Data fetching | `@tanstack/react-query` — used inside `DataTableQueryProvider` and in showcase pages |
| HTTP client | `axios` — pre-configured in `ascendra-ui/lib/api/client.ts` with auth + error interceptors |
| Charts | `recharts` — always via `ChartContainer` from `@/ascendra-ui/shadcn` |
| Dark mode | `next-themes` — `ThemeProvider` wraps the app; all tokens auto-adapt |
| Auth (shipped) | `next-auth` — `getSession()` used in the API client interceptor |

**Do not add new npm packages** without explicit discussion. The library surface is intentionally narrow — check `ascendra-ui/shadcn/` and existing utilities before reaching for a new dependency.

---

## Quick Reference — Files to Touch

| Task | Files |
|---|---|
| New component | `ascendra-ui/components/{cat}/{slug}.tsx` → `ascendra-ui/index.ts` → `lib/registry.ts` → `lib/nav-config.ts` → `app/showcase/layout.tsx` → `lib/doc-components.ts` → `components/previews/{slug}-preview.tsx` → **`npm run gen:ui-docs`** |
| Update component (props/API change) | `ascendra-ui/components/{cat}/{slug}.tsx` + `lib/registry.ts` + `components/previews/{slug}-preview.tsx` |
| Update preview only | `components/previews/{slug}-preview.tsx` (+ `lib/registry.ts` if props docs need fixing) |
| New gallery category | `lib/{type}-config.ts` → `app/showcase/{type}/page.tsx` → `components/{type}/` → `lib/nav-config.ts` |
| Change what `ascendra.js setup`/`update` does | `ascendra.js` + **`starter/README.md`** + **`starter/CLAUDE.md`** (the files it swaps in) |
| Ship a change | Merge to main. No release step, no version bump — a project picks it up next time someone runs `npm run ascendra-ui:update` inside it. |

---

## Library Layer — `ascendra-ui/`

### Component directory map

| Directory | For |
|---|---|
| `components/common-ui/` | New visual primitives — Badge, ColorTile, StatusDot, Rating, etc. |
| `components/ui/` | shadcn-derived interactive primitives — extend before creating new |
| `components/layout/` | Page structural layout — PageLayout, ContentArea, MainSection, etc. |
| `components/nav/` | Navigation components |
| `components/card/` | Card containers |
| `components/data-table/` | Complex data grid pieces |
| `components/date/` | Date pickers, calendar |
| `components/tabs/` | Tab variants |
| `components/side-bar/` | Sidebar components |
| `components/forms/` | Form helpers (not showcase form pages) |
| `components/util/` | Utility display — ThemeToggle, CopyText, etc. |
| `components/stepper/` | Stepper/progress |
| `components/reports/` | Report-specific display |
| `components/header/` | Header variants |
| `hooks/` | Shared React hooks |
| `lib/` | Utilities (cn, etc.) |
| `shadcn/` | shadcn primitives — do not edit |

### Component file pattern

```tsx
// ascendra-ui/components/common-ui/my-component.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/ascendra-ui/shadcn';

const myComponentVariants = cva('base-classes', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground',
      gray: 'bg-gray-500 text-white',
    },
    size: {
      sm: 'text-xs px-2 py-1',
      default: 'text-sm px-3 py-1.5',
    },
  },
  defaultVariants: { variant: 'primary', size: 'default' },
});

export function MyComponent({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof myComponentVariants>) {
  return (
    <div
      data-slot="my-component"
      className={cn(myComponentVariants({ variant, size }), className)}
      {...props}
    />
  );
}

// Sub-components in the same file (composable API — prefer this over label/title props)
export function MyComponentTitle({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="my-component-title" className={cn('text-xs font-bold', className)} {...props} />;
}
```

**Rules:**
- Always use CVA for variant-driven components
- Prefer composable children-based API — sub-components in the same file — over `label`/`title` props
- Always include `data-slot` on every element
- Always spread `...props` and accept `className`
- No comments explaining what the code does; no "added for X" or "used by Y" comments

### Barrel export

After creating the file, add to `ascendra-ui/index.ts`:

```ts
export * from './components/common-ui/my-component';
```

Keep exports alphabetical within each category comment block.

---

## File & Folder Conventions

### The core rule

> **Reusable by a consumer project → `ascendra-ui/`** (it ships with the folder)  
> **Showcase-only → root-level folders** (stays in this repo, never ships)

Every file inside `ascendra-ui/` — components, hooks, providers, utils — is part of what a scaffolded project gets. Root-level folders (`app/showcase/`, `components/`, `lib/`, `hooks/`, `scripts/`, `docs/`) are showcase infrastructure and never ship; `app/starter/` is the exception — it's dogfooded here and copied as-is into a new project.

### `ascendra-ui/` — shipped folders

| Folder | Purpose | Put here when… |
|---|---|---|
| `components/` | All visual components (see directory map above) | Building any reusable UI primitive |
| `hooks/` | Standalone reusable React hooks | Hook is useful outside this project with no context dependency (e.g. `useIsSmallScreen`) |
| `providers/` | Context providers + state systems | Provider is consumed by components or by consumer pages |
| `lib/api/` | Axios HTTP client + response/error types | Anything touching the API client or its error/response types |
| `utils/` | Pure stateless utility functions | No UI, no React — `formatDate`, `formatAmount`, `sleep` |
| `preferences/` | localStorage preference management | Persisting user state across sessions (column visibility, query state) |
| `shadcn/` | shadcn primitives | **Never touch** — extend via `components/ui/` only |

### Root-level — showcase only, never ships

| Folder | Purpose |
|---|---|
| `app/showcase/` | Next.js showcase pages and layouts — deleted by `ascendra.js setup` |
| `app/starter/` | Dogfooded demo route — copied as-is into a new project (not deleted by setup) |
| `components/previews/` | Component doc/preview pages |
| `lib/` | Showcase config files — `registry.ts`, `nav-config.ts`, `*-config.ts` |
| `hooks/` | Showcase-specific hooks (mock data, UI-only state — not reusable by consumers) |
| `providers/`, `utils/` | Empty here (`.gitkeep` only) — reset to empty by `setup` too, same as `components/`, `hooks/`, `lib/`, just with nothing to clear |
| `docs/` | Auto-generated `ui-reference.md` / `showcase-reference.md` — never edit by hand, regenerate with `npm run gen:ui-docs` — deleted by `ascendra.js setup` |
| `scripts/` | Doc generation scripts |

---

## Showcase Layer — 5 Mandatory Touchpoints for Any New Component

### 1. `lib/registry.ts`

```ts
'my-component': {
  slug: 'my-component',
  name: 'My Component',
  description: 'One or two sentences — what it does and when to use it.',
  importPath: '@/ascendra-ui',            // always this — never a relative path
  importNames: ['MyComponent', 'MyComponentTitle'],  // every named export
  props: [
    {
      name: 'variant',
      type: "'primary' | 'gray'",
      default: "'primary'",
      description: 'Controls background color.',
    },
    {
      name: 'className (MyComponent)',     // sub-component props use "prop (SubName)" format
      type: 'string',
      description: 'Use to override width, height, or padding.',
    },
    {
      name: 'className (MyComponentTitle)',
      type: 'string',
      description: 'Override the default text-xs font-bold styles.',
    },
  ],
},
```

`importNames` drives both the import chip in the UI and the generated `docs/ui-reference.md`. List every public export.

### 2. `lib/nav-config.ts`

Add `{ name: 'My Component', slug: 'feedback/my-component' }` to the right category:

| Category | For |
|---|---|
| Feedback & Status | Visual status/classification primitives — badges, tiles, dots, alerts, progress, skeletons |
| Forms & Inputs | Interactive form controls — inputs, selects, pickers, editors |
| Date & Time | Date/time-specific controls |
| Navigation | Nav links, nav bars, headers |
| Overlays | Dialogs, sheets, dropdowns, tooltips, command palette |
| Charts | Chart primitives + chart gallery |
| Tables & Data | Table, DataTable, EmptyState |
| Layout | Page-level layout components, cards |
| Tabs | Tab components |
| Sidebar | Sidebar components |
| Utilities | ThemeToggle, avatar, pagination, scroll utilities |
| Sample \* | Gallery pages for pattern collections (forms, dialogs, etc.) |

The slug must be `{category-slug}/{component-slug}` — this becomes the route `/showcase/{category-slug}/{component-slug}` automatically via the catch-all route. No `page.tsx` needed.

### 3. `app/showcase/layout.tsx`

Add a `SideBarMenuItem` inside the matching `SideBarMenu` block in the sidebar. Each category has its own `SideBarMenu` — find it by `basePath` or the menu header text and append the new item:

```tsx
<SideBarMenuItem path="/showcase/{category-slug}/{component-slug}">
  My Component
</SideBarMenuItem>
```

Do not create a new `SideBarMenu` block — add to the existing one for the category.

### 4. `lib/doc-components.ts`

```ts
import { MyComponentDocContent } from "@/components/previews/my-component-preview";

export const docComponents = {
  // ...existing entries...
  'my-component': MyComponentDocContent,
};
```

### 5. `components/previews/{slug}-preview.tsx`

```tsx
"use client";
import { ComponentPreview, SectionHeader, PropsTable } from "@/components";
import { MyComponent, MyComponentTitle } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

export function MyComponentDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero — the most compelling real-world use case, not a toy example */}
      <ComponentPreview code={`<MyComponent variant="primary">\n  <MyComponentTitle>Active</MyComponentTitle>\n</MyComponent>`}>
        <MyComponent variant="primary">
          <MyComponentTitle>Active</MyComponentTitle>
        </MyComponent>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* All variants — always include this block */}
        <ComponentPreview code={`...`}>
          <div className="flex flex-wrap gap-2">
            {/* one instance per variant */}
          </div>
        </ComponentPreview>

        {/* 2–4 real-world scenarios */}
        <ComponentPreview code={`...`}>
          {/* e.g. priority grid, status strip, phase indicators */}
        </ComponentPreview>
      </div>

      {/* Props table — always last */}
      <PropsTable meta={registry['my-component']} />
    </div>
  );
}
```

**Rules:**
- Export name is `{ComponentName}DocContent` — PascalCase name + "DocContent"
- `PropsTable` is always the last element
- Hero must show a real-world use case — not `<MyComponent />`
- Code strings in `code={...}` must exactly match the JSX shown as children
- Show all variants in an Examples block
- Show 2–4 contextual real-world scenarios (e.g. an SDG grid, not just colored boxes)

---

## Gallery Pages (Pattern Collections)

Used for multi-instance patterns: Sample Forms, Dashboards, Reports, Dialogs, etc.

### Structure

```
lib/{type}-config.ts              ← typed metadata array (slug, name, description, complexity, etc.)
app/showcase/{type}/page.tsx      ← gallery page (hero + filter + card grid) — "use client"
app/showcase/{type}/{slug}/page.tsx  ← individual pattern page
components/{type}/{slug}.tsx      ← actual pattern content
```

Gallery pages are NOT caught by the dynamic catch-all route. They need their own `page.tsx`.

Add a **single** nav-config entry pointing to the gallery: `{ name: 'Sample {Types}', slug: '{type}' }`.

---

## Routing Rules

| Page type | Needs own `page.tsx`? |
|---|---|
| Single-component showcase (Button, Badge, etc.) | No — catch-all `app/showcase/[...slug]/page.tsx` handles it |
| Gallery page (Forms, Dashboards, Reports, etc.) | Yes — `app/showcase/{type}/page.tsx` |
| Individual pattern in a gallery | Yes — `app/showcase/{type}/{slug}/page.tsx` |
| Special standalone pages (layout-guide, data-table-lab) | Yes |

---

## Branching Workflow

All feature work happens on branches. Main is always releasable.

### Branch naming

| Prefix | Use for | Example |
|---|---|---|
| `feat/` | New components, galleries, consumer features | `feat/status-dot`, `feat/drawer-gallery` |
| `fix/` | Bug fixes, broken previews, incorrect behavior | `fix/datatable-pagination-reset` |
| `chore/` | Infra, scripts, config, dependency updates | `chore/upgrade-tanstack-query` |
| `docs/` | CLAUDE.md, registry descriptions, non-generated doc edits | `docs/branching-guide` |

### Workflow

```bash
git checkout -b feat/my-component   # start branch
# ... do all the work, commit freely ...
git checkout main
git merge --squash feat/my-component
git commit -m "feat: add MyComponent"
git branch -d feat/my-component
```

Use **squash merge** — one clean commit per feature on main. Intermediate branch commits are preserved in branch history if you ever need them, but main stays readable.

### Rules

- Never commit directly to main for feature work (exception: trivial single-line typo fixes in doc files)
- Always delete the branch after merging
- There is no release step — merging to main is the whole workflow. A project picks up the change the next time someone runs `npm run ascendra-ui:update` inside it.
- **Before pushing any change to `lib/registry.ts`, `lib/nav-config.ts`, or any `lib/*-config.ts` file, run `npm run gen:ui-docs` and commit the regenerated `docs/*.md` in the same branch.** `docs/` doesn't ship to consumers, but it's the reference this repo (and any AI assistant working in it) relies on to build pages correctly — a stale doc here is still a correctness bug, not a cosmetic one.
- Squash commit message should use conventional commit format: `feat:`, `fix:`, `chore:`, `docs:`

---

## `ascendra.js` — setup and update

`ascendra.js` (repo root) is the whole scaffolding/update system — one file, two commands, no version tracking. It's a **project-lifetime file**, not a source-repo-only tool: `setup` never deletes it, because `update` depends on it staying.

- **`node ascendra.js setup`** — run once, in place, right after cloning or unzipping this repo into whatever folder is the new project (e.g. `ascendra-pay-web`). Works before `npm install` — it only touches Node built-ins. Deletes `app/showcase/` and `scripts/` (doc generation — nothing left in the project can run it), points `app/page.tsx` at `/starter`, resets `components/`, `hooks/`, `lib/`, `providers/`, `utils/` to empty, swaps in `starter/README.md` and `starter/CLAUDE.md` as the project's `README.md`/`CLAUDE.md`, drops the root `LICENSE` (kept at `ascendra-ui/LICENSE`), and writes a fresh `package.json` scripts block: `dev`/`build`/`start`/`lint`/`ascendra-ui:update`.

  **Refuses to run a second time** — `alreadySetUp()` checks two independent signals (`starter/` gone, or `package.json` already has an `ascendra-ui:update` script) and refuses if *either* is true; a false-positive refusal is far cheaper than a false-negative that wipes real work. The `starter/`-gone marker is set as the very first thing `setup()` does — before any destructive step — specifically so that a crash or kill partway through still leaves a re-run refused, instead of letting a second run repeat the `components/`/`hooks/`/`lib/`/`providers/`/`utils/` wipe on top of whatever the consumer added in the meantime. Keep the marker-setting step first if you ever reorder `setup()`.

  **Deliberately no `npm run setup` alias in this repo's own `package.json`.** This repo is the source of truth, not a copy waiting to become a project — a `setup` script sitting in its own `package.json` would be one `npm run setup` away from destroying it (deleting `app/showcase/`/`scripts/`, wiping `components/`/`hooks/`/`lib/`, which here hold real showcase infrastructure) for anyone actually working here. Never add that alias back to this repo's `package.json`.

- **`npm run ascendra-ui:update`** (`node ascendra.js update`) — run from inside an already-set-up project, any time, no arguments. Unlike `setup`, it has no re-run guard, so it prompts for confirmation every time: prints the exact path being replaced, whether it currently exists, a nudge to review the source repo's commit history (there's no CHANGELOG to point at instead), and a warning if the working tree has uncommitted git changes — then requires typing `y`/`yes`. Refuses to run at all without a TTY, since there'd be no way to confirm. Only after confirming does it clone `SOURCE_REPO` (the public URL, hardcoded in `ascendra.js`) to a temp directory over the network, replace the project's own `ascendra-ui/` folder with the one from that clone, and delete the temp directory. Never touches `package.json` — dependency syncing after an update is manual. This alias only exists in an already-set-up project — `setup()` writes it there itself; it is never present in this repo's own `package.json` either, for the same reason as `setup` above.

This is a pull model, not a push model: a consumer project updates itself by fetching from this public repo — nobody runs `update` from inside this repo pointed at someone else's path.

When changing what gets shipped or managed, update `ascendra.js` itself (including `SOURCE_REPO` if the repo ever moves) and the two swap files it copies: `starter/README.md` and `starter/CLAUDE.md`. Also keep `app/starter/page.tsx` and `app/starter/layout.tsx` (the dogfooded demo route, real files rendered live in this repo's own dev server) in sync with whatever `ascendra.js setup` actually does.

---

## Docs

`docs/ui-reference.md` and `docs/showcase-reference.md` are **auto-generated**, root-level, and showcase-only — they never ship to a consumer project (deleted by `ascendra.js setup`, not touched by `ascendra-ui:update`). They're the design-system reference used when building pages in this repo, including by an AI assistant working in it.

- Generated from: `lib/registry.ts` + `lib/*-config.ts` files
- Never edit by hand — overwritten by `npm run gen:ui-docs`
- Keep `lib/registry.ts` accurate — it is the source of truth for the docs
- **Run `npm run gen:ui-docs`** after any change to `lib/registry.ts`, `lib/nav-config.ts`, or any `lib/*-config.ts` file

### Registry description quality

The `description` field in `lib/registry.ts` is the only description consumer AI ever sees for a component. Make it specific enough to answer: *when should I reach for this vs. an alternative?*

**Bad:** `'A card component for displaying content.'`

**Good:** `'Settings-style card with a collapsible panel system. Use for grouping related form fields (Personal Info, Notifications, Danger Zone sections). Not a generic content card — for analytics KPI tiles use raw divs inside DashboardContent.'`

The description should cover: what the component is, its primary use case, and at least one thing it is **not** for.

---

## Dos and Don'ts

### Components
- **Do** use CVA for any variant-driven component
- **Do** use composable sub-component API over `label`/`title` props
- **Do** include `data-slot` on every element
- **Do** spread `...props` and accept `className` on every component and sub-component
- **Do** place all shipable code inside `ascendra-ui/` — hooks, utils, providers included
- **Don't** write comments explaining what the code does
- **Don't** add error handling for scenarios that can't happen
- **Don't** create a new component when extending an existing one is sufficient

### Showcase / Previews
- **Do** write examples that reflect real-world usage — SDG grids, priority systems, status strips, not toy demos
- **Do** always include: hero + all variants + 2–4 contextual scenarios + PropsTable
- **Do** keep registry descriptions detailed enough for an AI reading the docs to understand when to use each prop
- **Don't** create a `page.tsx` for single-component showcases — the catch-all handles them
- **Don't** duplicate layout infrastructure — use `MainSection`, `PageHeader`, etc. directly
- **Don't** put showcase-only display logic inside `ascendra-ui/` components

### Imports
- **Do** import all `ascendra-ui` components from `@/ascendra-ui`
- **Do** import `Drawer*`, `Tooltip*`, `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `type ChartConfig` from `@/ascendra-ui/shadcn` — these are the shadcn exceptions
- **Do** import chart primitives (`AreaChart`, `BarChart`, `CartesianGrid`, etc.) from `recharts`
- **Do** import icons from `react-icons/lu` — always Lucide, always this package
- **Don't** use relative imports like `../../components/button` — always use path aliases

### Registry
- **Do** list every named export in `importNames`
- **Do** use `'propName (SubComponentName)'` for sub-component props
- **Don't** use relative paths in `importPath` — always `'@/ascendra-ui'`

### Shipping changes
- **Do** work on a `feat/`, `fix/`, `chore/`, or `docs/` branch and squash-merge to main
- **Don't** edit `docs/` files by hand — they are always overwritten by `npm run gen:ui-docs`
- **Don't** reintroduce version tracking (`ascendra.json`, changelogs, release scripts) without discussion — this was deliberately removed in favor of "update always takes current main"
- **Don't** add a `setup` or `ascendra-ui:update` script to this repo's own `package.json` — this repo is the source of truth, not a copy waiting to become a project; either alias sitting here is one `npm run` away from destroying it. Invoke `node ascendra.js setup` explicitly instead.

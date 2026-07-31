# Ascendra UI Showcase — CLAUDE.md

## Repository Overview

**One repo, two logical layers:**

| Layer | Root | Purpose | Ships to consumers? |
|---|---|---|---|
| **Library** | `ascendra-ui/` | Components, hooks, libs, providers, utils | Yes — the whole folder |
| **Showcase** | Everything else | Demos, previews, galleries, docs | `docs/` only |

The `ascendra-ui/` folder is what consumer projects install. The showcase (`app/showcase/`, `components/previews/`, `lib/registry.ts`, galleries) is internal — it demonstrates and documents the library.

**Decision rule:** If it could be useful in a consumer project → put it in `ascendra-ui/`. If it's demo-specific → put it in the showcase layer.

**Why the showcase matters:** `docs/ui-reference.md` is auto-generated from `lib/registry.ts` and shipped to consumer projects. Consumer AI assistants read it to understand how to build UIs. Registry accuracy and preview quality directly affects how well consumers can use the design system.

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
| New component | `ascendra-ui/components/{cat}/{slug}.tsx` → `ascendra-ui/index.ts` → `lib/registry.ts` → `lib/nav-config.ts` → `app/showcase/layout.tsx` → `lib/doc-components.ts` → `components/previews/{slug}-preview.tsx` → **`npm run docs:generate`** |
| Update component (props/API change) | `ascendra-ui/components/{cat}/{slug}.tsx` + `lib/registry.ts` + `components/previews/{slug}-preview.tsx` |
| Update preview only | `components/previews/{slug}-preview.tsx` (+ `lib/registry.ts` if props docs need fixing) |
| New gallery category | `lib/{type}-config.ts` → `app/showcase/{type}/page.tsx` → `components/{type}/` → `lib/nav-config.ts` |
| Change managed file taxonomy (what create-project ships or upgrade manages) | `create-project.js` + `ascendra-ui/template/scripts/upgrade.js` + **`ascendra-ui/template/ASCENDRA.md`** |
| Release | `/prepare-release` skill (merges to main + drafts `CHANGELOG.md` entry) → `/release` skill → `git push && git push --tags` |

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
| `template/` | Files shipped to consumer projects (scripts, app shell) |

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

> **Reusable by a consumer project → `ascendra-ui/`** (it ships with the package)  
> **Showcase-only → root-level folders** (stays in this repo)

Every folder inside `ascendra-ui/` is part of the package consumers install. Root-level folders (`app/`, `components/`, `lib/`, `hooks/`, `scripts/`) are showcase infrastructure and never ship.

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
| `template/` | Files shipped as app scaffolding | Scripts and config that consumer projects receive on install |

### Root-level — showcase only

| Folder | Purpose |
|---|---|
| `app/` | Next.js showcase pages and layouts |
| `components/previews/` | Component doc/preview pages |
| `lib/` | Showcase config files — `registry.ts`, `nav-config.ts`, `*-config.ts` |
| `hooks/` | Showcase-specific hooks (mock data, UI-only state — not reusable by consumers) |
| `scripts/` | Doc generation scripts |

### File naming conventions

| File type | Convention | Example |
|---|---|---|
| Component | `{name}.tsx` (kebab-case) | `simple-badge.tsx` |
| Hook (standalone, in `ascendra-ui/hooks/`) | `use-{name}.ts` | `use-is-small-screen.ts` |
| Hook (inside a provider folder) | `use-{name}.hook.ts` | `use-sort.hook.ts` |
| Provider | `{name}.provider.tsx` | `data-table.provider.tsx` |
| Types file | `{name}.types.ts` | `data-table.types.ts` |
| Utility file | `{name}.util.ts` | `common.util.ts` |
| Preference storage | `{name}.storage.ts` | `preferences.storage.ts` |

### Provider folder structure

Each provider system gets its own subfolder under `ascendra-ui/providers/`:

```
ascendra-ui/providers/{name}/
  {name}.provider.tsx     ← React context + Provider component
  {name}.types.ts         ← all TypeScript types and interfaces for this provider
  use-{name}.hook.ts      ← hook(s) for consuming the context
```

Example: `ascendra-ui/providers/data-table/` contains `data-table.provider.tsx`, `data-table.types.ts`, `use-sort.hook.ts`, `use-filter.hook.ts`, `use-pagination.hook.ts`, etc.

### Hook placement decision

- **`ascendra-ui/hooks/`** — standalone, no context dependency. Works in any React project without provider setup (e.g. `useIsSmallScreen`). Export via `ascendra-ui/index.ts`.
- **Provider subfolder** — hooks that call `useContext` for a specific provider. Must be used inside that provider's tree (e.g. `useDataTableSort` only works inside `DataTableProvider`). Export via `ascendra-ui/index.ts` alongside the provider.
- **Root `hooks/`** — showcase-only. Uses mock data, showcase state, or is too demo-specific to ship (e.g. `useMockInvoiceList`). Never export from `ascendra-ui/index.ts`.

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
- Release only from main — the `/release` skill enforces this
- Squash commit message should use conventional commit format: `feat:`, `fix:`, `chore:`, `docs:`

### BACKLOG.md structure and markers

`BACKLOG.md` has two sections: **Unreleased** and **Completed**. Every item lives in Unreleased its entire life — it only moves to Completed when it is stamped with a version at release time (done automatically by `/release`).

Add a **Category** label to each item using one of: `Component`, `Docs`, `Infra`, `Showcase`, `Consumer`.

```
- [ ] **Component** — description of planned work
- [~] **Infra** — work in progress on a branch
- [✓] **Docs** — merged to main, not yet released
- [x] **Infra** — shipped description — v1.2.1   ← Completed section
```

| Marker | Meaning |
|---|---|
| `[ ]` | Planned — not yet started |
| `[~]` | In progress — branch exists |
| `[✓]` | Merged to main — not yet released |
| `[x]` | Shipped — stamped with version in **Completed** section |

---

## Release Process

### Prerequisites (must be true before running release)

1. All code changes are committed — working tree must be clean (`git status` shows nothing)
2. `CHANGELOG.md` has a new entry at the very top (above the previous version). The version in this entry is the **source of truth** — `/release` derives the new version from it and refuses to release anything else. Use `/prepare-release` to merge to main and draft this entry from the commits since the last tag:

```md
## [1.0.6] — Add MyComponent

### Added
- `MyComponent`, `MyComponentTitle` — what it is and why it's useful.
- Showcase preview at `/showcase/feedback/my-component` with N example sections.
```

### Versioning Rules

| Bump | When to use |
|---|---|
| **patch** | Bug fixes; new props with default values; showcase/preview-only changes; script improvements; CLAUDE.md or skills updates. Consumer code requires no changes. |
| **minor** | New components, hooks, providers, or utils added to `ascendra-ui/`; new optional props without defaults; new gallery pages; additive managed template file changes. No consumer migration needed. |
| **major** | Removing or renaming component exports or props; breaking prop type changes; managed template restructuring that conflicts with consumer customizations; dependency major version bumps with consumer-facing API changes. Consumer must act after upgrading. |

Tie-breaker: when in doubt between two levels, use the higher one. Any major release CHANGELOG entry must include a **Breaking** note explaining what consumers must do.

### Commands

```bash
printf "1.0.6\n" | npm run release   # release the exact version from the CHANGELOG top entry

git push && git push --tags
```

The script also accepts `patch` / `minor` / `major`, but always pass the explicit version from the CHANGELOG entry — it guarantees the released version matches what the CHANGELOG documents.

### What the script does automatically — do not do these manually

- Bumps `package.json` version and `ascendra.json` (version + current commit hash + deps snapshot)
- Regenerates `docs/ui-reference.md` and `docs/showcase-reference.md` with embedded version/commit markers
- Validates markers match
- Commits `"chore: release vX.Y.Z"` and creates tag `vX.Y.Z`

---

## Available Commands

| Command | What it does |
|---|---|
| `/create-component` | Full 9-step new component workflow (file → index.ts → registry → nav-config → layout → doc-components → preview → docs:generate) |
| `/prepare-release` | Squash-merges feature branch to main, summarizes changes since the last tag, drafts the CHANGELOG entry + BACKLOG updates, commits after approval |
| `/release` | Pre-flight checks (derives version from CHANGELOG top entry) + release script + push with tags |
| `/verify-docs` | Runs docs:generate, audits registry completeness and nav/preview alignment |

---

## Docs

`docs/ui-reference.md` and `docs/showcase-reference.md` are **auto-generated** by the release script. They are the consumer-facing artifact.

- Generated from: `lib/registry.ts` + `lib/*-config.ts` files
- Never edit by hand — overwritten on every release
- Keep `lib/registry.ts` accurate — it is the source of truth for the docs
- **Run `npm run docs:generate`** after any change to `lib/registry.ts`, `lib/nav-config.ts`, or any `lib/*-config.ts` file — do not wait for release

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

### Release
- **Do** work on a `feat/`, `fix/`, `chore/`, or `docs/` branch and squash-merge to main before releasing
- **Do** add the CHANGELOG entry before running the script (script validates it exists)
- **Do** commit all code before running release (script requires clean tree)
- **Do** push with `--tags` — the version tag must reach the remote
- **Don't** run `/release` from a feature branch — the skill blocks it
- **Don't** edit `docs/` files by hand — they are always overwritten
- **Don't** manually bump `package.json` or `ascendra.json` — the release script owns those fields

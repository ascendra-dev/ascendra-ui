# {project-name}

> **This README is yours.** It was created when your project was bootstrapped from Ascendra UI and will not be overwritten by `npm run upgrade`. Replace this description with your project's own, and keep it updated as you build.

A Next.js application built on Ascendra UI — a full-stack design system with 50+ production-ready components.

---

## About Ascendra UI

Ascendra UI is a full-stack Next.js design system delivered as a managed component library. The core idea is a clean separation between the **library** (`ascendra-ui/`) and your **application** (everything else):

- The library is managed — `npm run upgrade` replaces it entirely. Never edit files inside it.
- Your application code (`components/`, `hooks/`, `lib/`, pages) is always yours — upgrades never touch it.
- Every component is built with Tailwind CSS + CVA (variant-driven), composable sub-components, and full TypeScript. The same patterns apply to custom components you build in this project.
- Reference docs (`docs/ui-reference.md`, `docs/showcase-reference.md`) are auto-updated on every upgrade and are the first place to look before writing any UI code.

When you need UI that the library doesn't cover yet, build it minimally in `components/` and mark it with a `TODO: ascendra-ui candidate` comment — Claude Code uses these markers to flag reuse opportunities.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | Ascendra UI (`ascendra-ui/`) |
| Forms | react-hook-form + Zod |
| Data fetching | TanStack Query v5 |
| Charts | Recharts |
| HTTP client | Axios (pre-configured with auth interceptor) |
| Auth | next-auth |
| Theme | next-themes (light / dark) |
| Icons | react-icons/lu (Lucide) |

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

> Add environment variable setup, auth configuration, and any other first-run steps here as you build out the project.

---

## Project structure

```
app/
  layout.tsx              ← managed — root HTML shell + all providers
  globals.css             ← managed — design tokens and base styles
  (app)/
    layout.tsx            ← managed — app shell: sidebar + header
    page.tsx              ← getting-started page
    sandbox/page.tsx      ← blank component playground
    {your-routes}/        ← your application pages
components/               ← your custom components
hooks/                    ← your custom hooks
lib/                      ← config, constants, utilities
providers/                ← custom React context providers
utils/                    ← pure stateless utility functions
docs/
  ui-reference.md         ← component API reference (auto-updated on upgrade)
  showcase-reference.md   ← page patterns and design guide (auto-updated on upgrade)
ascendra-ui/              ← managed — do not edit (overwritten on upgrade)
.ascendra-ui/
  ascendra.json           ← version manifest — do not edit by hand
  CHANGELOG.md            ← ascendra-ui library release history
CHANGELOG.md              ← your project changelog — update as you ship features
BACKLOG.md                ← your project backlog — track planned and in-progress work
CLAUDE.md                 ← Claude Code instructions — update with project-specific context
```

> `ascendra-ui/` is hidden from the VSCode file explorer but is committed to git — your CI/CD and deployments need it.

---

## Available commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run upgrade` | Upgrade ascendra-ui to a newer version |
| `npm run changelog` | View ascendra-ui release notes |

---

## Building UI

Before writing any UI code, check the reference docs — Claude Code reads these automatically:

- **`docs/ui-reference.md`** — every importable component, its props, and import paths
- **`docs/showcase-reference.md`** — page templates, DataTable system, form patterns, chart usage

Import components from `@/ascendra-ui`:

```ts
import { Button, Badge, DataTable, PageLayout } from "@/ascendra-ui";
```

---

## Claude Code commands

All commands read the reference docs first and ask targeted questions before generating any code. They are checkpoint-driven — nothing is written until you approve.

**Scaffolding:**

| Command | Generates |
|---|---|
| `/create-page` | New route in `app/(app)/` with correct layout variant |
| `/create-form` | Full form: zod schema + react-hook-form + all field components |
| `/create-table` | DataTable with the right provider (server or static) |
| `/create-dashboard` | Dashboard page with stats, charts, and optional table |
| `/create-report` | Report structure with sections and PDF export |
| `/create-dialog` | Modal dialog with optional form and footer actions |
| `/create-sheet` | Side-panel sheet with detail view or form |
| `/create-component` | CVA component following library conventions |

**Release workflow:**

| Command | What it does |
|---|---|
| `/prepare-release` | Squash-merges your feature branch to main, collects commits since the last tag, proposes a semver bump, drafts `CHANGELOG.md` and `BACKLOG.md` entries, and commits — ready for `/release` |
| `/release` | Pre-flight checks (branch, clean tree, type check), derives the version from the CHANGELOG top entry, stamps BACKLOG, bumps `package.json`, creates the release commit and tag — then prompts to push |

---

## Branching workflow

All feature work happens on branches. Main should always be in a releasable state.

| Prefix | Use for |
|---|---|
| `feat/` | New features, pages, components |
| `fix/` | Bug fixes |
| `chore/` | Infra, config, dependency updates |
| `docs/` | Documentation and content changes |

```bash
git checkout -b feat/my-feature
# ... do the work ...
# then use /prepare-release to squash-merge and draft the CHANGELOG entry
```

Use **squash merges** — one clean commit per feature on main.

---

## Release workflow

Use `/prepare-release` → `/release` to manage versioned releases with a full changelog and git tags (see the [Claude Code commands](#claude-code-commands) section above for full descriptions).

**Typical flow:**

1. Work on a `feat/`, `fix/`, `chore/`, or `docs/` branch
2. Run `/prepare-release` — squash-merges the branch to main, proposes a semver bump, and drafts `CHANGELOG.md` and `BACKLOG.md` entries
3. Run `/release` — bumps `package.json`, creates the release commit and tag, then prompts to push

The CHANGELOG top entry (`## [x.y.z] — description`) is the source of truth for the version. Both commands are checkpoint-driven — they show exactly what will happen before making any irreversible change.

See `CHANGELOG.md` and `BACKLOG.md` in the root for format guidance.

---

## Upgrading

```bash
npm run upgrade
```

This replaces the component library, updates managed shell files, syncs dependencies, and commits the upgrade automatically. Your own files (`components/`, `hooks/`, `lib/`, `CHANGELOG.md`, `BACKLOG.md`, `CLAUDE.md`, etc.) are never touched.

# Ascendra UI

A production-ready component library and admin panel template built on Next.js 16, Tailwind v4, and Radix UI primitives. Ascendra UI is distributed as a **copy-to-project** system (like shadcn/ui) — the full component source lives in your project under `ascendra-ui/`, fully visible and customisable.

---

## What is this repository?

This is the **showcase repository** — it serves two purposes simultaneously:

| Purpose | What it does |
|---|---|
| **Component development** | All components are built and iterated here under `ascendra-ui/` |
| **Documentation** | 100+ showcase pages live under `app/showcase/` demonstrating every component |

It is also the source you scaffold a new project from — see [Creating a project](#creating-a-project) below.

---

## Repository structure

```
ascendra-ui/
├── ascendra-ui/               # The component library (source of truth) — this is what ships
│   ├── index.ts                # Public barrel export — import from "@/ascendra-ui"
│   ├── components/             # All UI components
│   ├── hooks/                  # Shared hooks (useIsSmallScreen, …)
│   ├── lib/                    # Utilities (cn, …)
│   ├── providers/               # Context providers + state systems
│   ├── LICENSE                  # MIT terms for the vendored code — travels with the folder
│   └── docs/
│       ├── ui-reference.md      # Auto-generated component API reference
│       └── showcase-reference.md # Auto-generated design guide + AI reference
│
├── app/
│   ├── showcase/                # Documentation pages (this repo only — never ships)
│   ├── starter/                  # Dogfooded demo route — this is what a new project lands on
│   ├── layout.tsx                # Root layout — ThemeProvider, QueryProvider, Toaster
│   └── globals.css               # Design tokens (Tailwind v4)
│
├── components/, hooks/, lib/,     # Showcase-only infrastructure (registry, previews, nav) — never ships
│   providers/, utils/            # (providers/, utils/ are just empty here — nothing showcase-only to hold)
├── scripts/                      # Doc generation
│   ├── generate-ui-reference.ts
│   └── generate-showcase-reference.ts
│
├── LICENSE                       # This repo's own MIT license — removed from a scaffolded project's root
└── ascendra.js                   # setup / update tool (see below)
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 · CSS custom property tokens |
| UI Primitives | Radix UI (via `radix-ui` package) |
| Forms | react-hook-form + Zod |
| Data fetching | TanStack Query v5 |
| Charts | Recharts 3 |
| Rich text | Tiptap 3 |
| Notifications | Sonner |
| Icons | Lucide (via `react-icons/lu`) |
| Theme | next-themes (light / dark) |
| Font | Geist (sans + mono) |

---

## Running the showcase locally

```bash
git clone <this-repo> ascendra-ui
cd ascendra-ui
npm install
npm run dev
```

Open [http://localhost:3000/showcase](http://localhost:3000/showcase) to browse all component documentation pages.

---

## Showcase scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run gen:ui-docs` | Regenerate both reference docs in `ascendra-ui/docs/` |
| `npm run analyze` | Bundle analyser |

---

## Creating a project

This is a public repo — clone it or download the zip, then run the setup script once:

```bash
git clone <this-repo> my-app
cd my-app
node ascendra.js setup
npm install
npm run dev
```

There's no `npm run setup` alias — deliberately. This repo's own `package.json` never carries a `setup` script, because this repo is the source of truth, not a copy waiting to become a project; a `setup` script sitting in its own `package.json` would be one `npm run setup` away from destroying it for anyone actually working here. `node ascendra.js setup` is the explicit, only way to invoke it.

`ascendra.js setup`:
- Removes `app/showcase/` (the 100+ documentation pages — internal to this repo, never shipped) and `scripts/` (doc-generation — nothing left in the project can run it once `lib/registry.ts` etc. are gone)
- Points `app/page.tsx` at `/starter` — a short, real tour of the library built from actual components
- Resets `components/`, `hooks/`, `lib/`, `providers/`, `utils/` to empty — all yours from here
- Replaces `README.md` and `CLAUDE.md` with the project-facing versions
- Drops the root `LICENSE` — the MIT terms for the vendored code stay at `ascendra-ui/LICENSE`, since that folder is what's actually distributed; your own project code isn't implicitly MIT
- Trims `package.json` scripts to `dev` / `build` / `start` / `lint` / `ascendra-ui:update` (drops `setup` itself and `gen:ui-docs` — the latter depends on showcase-only config files just deleted)
- **Does not delete itself.** `ascendra.js` stays in the project — `ascendra-ui:update` depends on it. Running `setup` a second time is refused (it would silently wipe whatever you've since built into `components/`, `hooks/`, `lib/`, `providers/`, `utils/`).

Open [http://localhost:3000/starter](http://localhost:3000/starter) after `npm run dev` — read it, then delete `app/starter/` whenever you're ready to build your real app.

---

## Updating a project's component library

This is self-service, run from inside the project itself — not something pushed from this repo. There's no version to track — it always pulls whatever is currently on this repo's default branch, replacing the project's `ascendra-ui/` folder (docs included) wholesale. Nothing else is touched.

From inside the project, any time — a week later, a month later:

```bash
npm run ascendra-ui:update   # or: node ascendra.js update
```

It prompts for confirmation before touching anything — shows the exact path being replaced, warns if there are uncommitted git changes, and points at the source repo's commit history (there's no CHANGELOG to check instead, since there's no versioning). Nothing happens until you answer `y`.

Once confirmed, it clones the public repo to a temp directory over the network, copies out `ascendra-ui/`, and discards the rest — no separate local clone of this source repo is needed. If the update relies on a new dependency, install it yourself — `ascendra.js` never touches `package.json`; dependency syncing is manual by design.

---

## Generated documentation

Both docs in `ascendra-ui/docs/` are auto-generated. Do not edit them by hand — regenerate instead:

```bash
npm run gen:ui-docs
```

| File | Source | Content |
|---|---|---|
| `ascendra-ui/docs/ui-reference.md` | `generate-ui-reference.ts` | Component API: props, variants, import paths, usage patterns |
| `ascendra-ui/docs/showcase-reference.md` | `generate-showcase-reference.ts` | Design philosophy, layout guide, component selection tables, AI developer guide |

Run this after any change to `lib/registry.ts`, `lib/nav-config.ts`, or any `lib/*-config.ts` file.

`ascendra-ui/docs/` also carries two reference files on real-world usage corrections observed in a consumer codebase: `hard-instructions.md` and `field-hint-guide.md`.

---

## Importing components

In any consumer project or showcase page:

```ts
import { Button, DataTable, Dialog, PageHeader } from "@/ascendra-ui";
```

The `@/ascendra-ui` alias resolves to `ascendra-ui/index.ts` via `tsconfig.json` paths. All public components are re-exported from the barrel file.

---

## Notes

- **Do not edit `ascendra-ui/` in a scaffolded project.** It's replaced wholesale on the next `node ascendra.js update`. Put your own components in `components/`.
- **No version, no changelog, no release process.** Updating a project always takes whatever is current on this repo's main branch. If you need to know what changed, diff the `ascendra-ui/` folder or read this repo's commit history.

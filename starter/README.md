# Your App

Built on **Ascendra UI** — a full-stack Next.js component library distributed as copy-to-project code (like shadcn/ui). The full library source lives in this repo under `ascendra-ui/`, fully visible and readable, but managed: it's replaced wholesale whenever you update, so don't edit files inside it.

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/starter](http://localhost:3000/starter) — a short, real tour of the library (built from actual `ascendra-ui` components, not a mockup) covering project structure, where the docs live, and how to update. Delete `app/starter/` whenever you're ready; it's a demo, not a dependency.

---

## Project structure

```
ascendra-ui/                # The component library — managed, replaced wholesale on update
  index.ts                  # Barrel export — import from "@/ascendra-ui"
  components/                # All UI components
  hooks/, lib/, providers/, utils/, shadcn/
  LICENSE                    # MIT terms for the vendored code
  docs/
    ui-reference.md         # Component API: props, import paths, usage
    showcase-reference.md   # Page patterns, layout guide, design tokens
app/
  layout.tsx                # Root shell — ThemeProvider, QueryProvider, Toaster
  globals.css                # Design tokens (Tailwind v4)
  starter/                   # Demo route — delete once you've read it
  {your-routes}/             # Your application pages go here
components/                  # Your components (empty — start here)
hooks/                       # Your hooks (empty)
lib/                         # Your config, constants, utilities (empty)
providers/                   # Your React context providers (empty)
utils/                       # Your pure utility functions (empty)
ascendra.js                  # Pulls the latest ascendra-ui/ from the public repo — see below
CLAUDE.md                    # Project conventions for Claude Code
```

**The only rule:** never edit anything inside `ascendra-ui/`. Everything else in this repo is yours from the moment it was created — no other file is ever touched automatically again.

---

## Updating the component library

There's no version to track — an update just replaces the `ascendra-ui/` folder (docs included) with whatever is currently on the public repo's default branch. Nothing else in your project is touched.

Run this any time, right here in this project — a week later, a month later:

```bash
npm run ascendra-ui:update   # or: node ascendra.js update
```

It prompts for confirmation before touching anything — shows the exact path being replaced, warns if you have uncommitted git changes, and points you at the source repo's commit history to check for breaking changes (there's no CHANGELOG). Nothing happens until you answer `y`.

Once confirmed, it clones the public repo to a temp directory over the network, copies out `ascendra-ui/`, and discards the rest. Review the diff afterwards (`git diff -- ascendra-ui/`). If the update relies on a package your `package.json` doesn't have yet, install it — dependency syncing is manual by design.

---

## Docs — read before building UI

1. **`ascendra-ui/docs/ui-reference.md`** — every importable component, its props, and its import path.
2. **`ascendra-ui/docs/showcase-reference.md`** — page templates, layout patterns, DataTable system, form patterns, chart usage.
3. **`CLAUDE.md`** — project conventions Claude Code reads automatically.

---

## Importing components

```ts
import { Button, Badge, DataTable, PageLayout } from "@/ascendra-ui";
```

`@/ascendra-ui` resolves to `ascendra-ui/index.ts` via the `tsconfig.json` path alias. All public components are re-exported from the barrel file.

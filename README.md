# Ascendra UI

A production-ready component library and admin panel template built on Next.js 16, Tailwind v4, and Radix UI primitives. Ascendra UI is distributed as a **copy-to-project** system (like shadcn/ui) — the full component source lives in your project under `ascendra-ui/`, fully visible and customisable.

---

## What is this repository?

This is the **showcase repository** — it serves two purposes simultaneously:

| Purpose | What it does |
|---|---|
| **Component development** | All 50+ UI components are built and iterated here under `ascendra-ui/` |
| **Documentation** | 94 showcase pages live under `app/showcase/` demonstrating every component |

Consumer projects are bootstrapped from a tagged release of this repo using `create-project.js`. They inherit the component library, app shell, scripts, and docs — but none of the showcase pages.

---

## Repository structure

```
ascendra-ui/
├── ascendra-ui/               # The component library (source of truth)
│   ├── index.ts               # Public barrel export — import from "@/ascendra-ui"
│   ├── components/            # All UI components
│   ├── hooks/                 # Shared hooks (useMediaQuery, useDebounce, …)
│   ├── lib/                   # Utilities (cn, formatters, …)
│   └── template/              # Files shipped to consumer projects
│       ├── app/               # Root layout + (app) shell + getting-started + sandbox
│       ├── scripts/
│       │   ├── upgrade.js     # Consumer: upgrade to a newer release
│       │   └── changelog.js   # Consumer: view release notes
│       └── package.json       # Consumer package template (scripts only)
│
├── app/
│   ├── showcase/              # Documentation pages (showcase only, removed on init)
│   └── (app)/                 # Mirrored from template/ — preview of consumer shell
│
├── scripts/                   # Internal showcase scripts
│   ├── release.js             # Cut a new release
│   ├── generate-ui-reference.ts
│   └── generate-showcase-reference.ts
│
├── docs/
│   ├── ui-reference.md        # Auto-generated component API reference
│   └── showcase-reference.md  # Auto-generated design guide + AI reference
│
├── create-project.js          # Standalone consumer project bootstrapper
├── ascendra.json              # Version lock + dependency snapshot
└── CHANGELOG.md
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
| Icons | Lucide React |
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
| `npm run docs:generate` | Regenerate both reference docs in `docs/` |
| `npm run release` | Cut a new tagged release (see release guide below) |
| `npm run analyze` | Bundle analyser |

---

## Creating a consumer project

Consumer projects are bootstrapped from `create-project.js`. The user **never clones this repo** — they download or receive just the one script.

### Step 1 — get the script

`create-project.js` lives at the root of this repo. You can reference it directly without cloning the whole showcase:

```bash
# Option A — run it in-place from the showcase directory
cd /path/to/ascendra-ui
node create-project.js /path/to/my-app

# Option B — copy it once to a shared location and run from anywhere
cp /path/to/ascendra-ui/create-project.js ~/create-ascendra-project.js
node ~/create-ascendra-project.js my-app
```

> If the repo is public you can also download it with `curl -O https://raw.githubusercontent.com/zakashah/ascendra-ui/main/create-project.js`, but copying from a local clone is more reliable.

### Step 2 — create the project

```bash
node create-project.js my-app
```

The source repo URL is built into the script — no need to pass it. This will:
- Clone the latest tagged release to a temp directory (deleted afterwards)
- Create `./my-app/` with the full consumer project structure
- Never expose showcase pages or internal scripts

You can target a specific version:

```bash
node create-project.js my-app --version 1.2.0
```

### What the consumer project contains

```
my-app/
├── ascendra-ui/           # Full component library (committed to git, hidden in VSCode)
├── app/
│   ├── layout.tsx         # Root layout — ThemeProvider, QueryProvider, Toaster
│   ├── globals.css        # Design token CSS (Tailwind v4)
│   └── (app)/
│       ├── layout.tsx     # App shell — sidebar, header, nav, theme toggle
│       ├── page.tsx       # Getting-started page
│       └── sandbox/
│           └── page.tsx   # Blank component playground
├── scripts/
│   ├── upgrade.js         # Upgrade to a newer ascendra-ui version
│   └── changelog.js       # View release notes
├── docs/
│   ├── ui-reference.md    # Component API reference
│   └── showcase-reference.md
├── components/            # Your components (empty, .gitkeep)
├── hooks/                 # Your hooks (empty, .gitkeep)
├── lib/                   # Your utilities (empty, .gitkeep)
├── providers/             # Your providers (empty, .gitkeep)
├── utils/                 # Your utilities (empty, .gitkeep)
├── .ascendra-ui/
│   ├── ascendra.json      # Version manifest — version, commit, source URL, managed deps
│   └── CHANGELOG.md       # ascendra-ui library release history (updated on upgrade)
├── README.md              # Project README (yours to customise)
├── CHANGELOG.md           # Project changelog (yours to maintain)
├── BACKLOG.md             # Project backlog (yours to maintain)
├── package.json           # consumer scripts + all ascendra-ui dependencies
└── .gitignore
```

### Step 3 — start developing

```bash
cd my-app
npm run dev       # already ran npm install during create-project
```

> `ascendra-ui/` is hidden from the VSCode file explorer (via `.vscode/settings.json`) but **is committed to git** — your CI/CD and deployments need it. You import components from `@/ascendra-ui`.

---

## Consumer project scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run upgrade` | Upgrade ascendra-ui to a newer version |
| `npm run changelog` | View the latest release notes |
| `npm run changelog -- --next` | View upcoming unreleased changes |
| `npm run changelog -- --all` | Print the full changelog |

---

## Upgrading a consumer project

When a new version of Ascendra UI is released, upgrade your consumer project with:

```bash
npm run upgrade
```

This is interactive — it lists available versions, shows the changelog entry for the target version, then upgrades.

Or target a version directly:

```bash
npm run upgrade -- --version 1.2.0
```

**What the upgrade does:**

1. Clones the target release tag from the source repo
2. Replaces `ascendra-ui/` with the new component library
3. Updates managed app shell files: `app/layout.tsx`, `app/globals.css`, `app/(app)/layout.tsx`
4. Updates `docs/ui-reference.md` and `docs/showcase-reference.md`
5. Updates `.ascendra-ui/CHANGELOG.md` (library release history)
6. Self-updates `scripts/upgrade.js` with the version from the new release
7. **Syncs dependencies**: diffs `.ascendra-ui/ascendra.json` dependencies old vs new, runs `npm install` for anything added or version-bumped, warns about removed packages (never auto-removes)
8. Updates `.ascendra-ui/ascendra.json` (version, commit hash, dependency snapshot)
9. Commits: `chore: upgrade ascendra-ui vX.Y.Z → vA.B.C`

> Your own files (`components/`, `hooks/`, `lib/`, etc.) and the `(app)` pages you created are never touched by the upgrade.

---

## Releasing a new version (showcase maintainers)

### First release / any release

```bash
# 1. Make sure the working tree is clean
git add . && git commit -m "feat: ..."

# 2. Add a CHANGELOG entry for the new version (if not already there)
# Format:
## [1.1.0] — short description

### Added
- ...

### Fixed
- ...

# 3. Run the release script
npm run release
```

The release script will:

- Verify the working tree is clean
- Verify `package.json` and `ascendra.json` versions match
- Ask for the version bump (`major` / `minor` / `patch` / explicit `x.y.z`)
- Validate the CHANGELOG has an entry for the new version (prompts you to add one if missing)
- Bump `package.json` and `ascendra.json`
- Embed the full dependency list into `ascendra.json` (used by consumer upgrade diffing)
- Regenerate `docs/ui-reference.md` and `docs/showcase-reference.md`
- Validate that both docs have the correct version marker embedded
- Run `git commit "chore: release vX.Y.Z"` and `git tag vX.Y.Z`

```bash
# 4. Push
git push && git push --tags
```

> The git tag is what consumers target when cloning. Always push tags after a release.

### Minor release example

```bash
# Make your component changes
npm run dev   # iterate

# Update CHANGELOG.md — add a [1.1.0] section at the top
# Regenerate docs if needed (the release script does this automatically)

npm run release   # → type: minor  (or 1.1.0 explicitly)
git push && git push --tags
```

---

## Developer testing — scaffold a local consumer project

Showcase developers can test the `create-project.js` init flow without cloning:

```bash
# From the showcase root:
node create-project.js /tmp/test-my-project --local
# or via npm script:
npm run project:init -- /tmp/test-my-project
```

The `--local` flag uses the current directory as source (no clone). Useful for verifying the consumer project structure after changes to `ascendra-ui/template/`.

---

## Generated documentation

Both docs in `docs/` are auto-generated and committed at release time. Do not edit them manually — your changes will be overwritten on the next `npm run release` or `npm run docs:generate`.

| File | Source | Content |
|---|---|---|
| `docs/ui-reference.md` | `generate-ui-reference.ts` | Component API: props, variants, import paths, usage patterns |
| `docs/showcase-reference.md` | `generate-showcase-reference.ts` | Design philosophy, layout guide, component selection tables, AI developer guide |

Both files embed version markers used to validate consistency at release time:

```
<!-- ascendra-ui-version: 1.0.0 -->
<!-- ascendra-ui-commit: abc1234 -->
```

Regenerate at any time without releasing:

```bash
npm run docs:generate
```

---

## Importing components

In any consumer project or showcase page:

```ts
import { Button, DataTable, Dialog, PageHeader } from "@/ascendra-ui";
```

The `@/ascendra-ui` alias resolves to `ascendra-ui/index.ts` via `tsconfig.json` paths. All public components are re-exported from the barrel file.

---

## Notes

- **Do not edit `ascendra-ui/` in a consumer project.** It will be overwritten on the next `npm run upgrade`. Put your own components in `components/`. It is hidden in VSCode for this reason but is committed to git normally.
- **`.ascendra-ui/ascendra.json` is the version lock file.** It records the version, commit hash, source URL, and managed dependency list. Do not edit it manually.
- **Breaking changes** are marked in `.ascendra-ui/CHANGELOG.md`. Review them before upgrading across major versions. Run `npm run changelog` for a formatted view.
- **The `docs/` folder is safe to commit.** It is updated on every upgrade and contains the reference for both developers and AI tools.

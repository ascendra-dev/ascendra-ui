# Changelog

All notable changes to Ascendra UI are documented here.

Format: `## [version] — description`. Breaking changes are marked **Breaking**.

---

## How to upgrade a consumer project

Run from inside your consumer project directory:

```bash
npm run upgrade
```

Interactive — lists available versions, shows what changed, then upgrades. Or target a version directly:

```bash
npm run upgrade -- --version 1.2.0
```

**What happens:**

1. Clones the target release tag from the source repo to a temp directory
2. Replaces `ascendra-ui/` with the new component library
3. Updates managed app shell files (`app/layout.tsx`, `app/globals.css`, `app/(app)/layout.tsx`)
4. Updates `docs/` and `CHANGELOG.md`
5. Self-updates `scripts/upgrade.js`
6. Diffs dependency snapshots in `ascendra.json` — runs `npm install` for new/bumped packages, warns about removed ones
7. Updates `ascendra.json` (version, commit, deps)
8. Commits: `chore: upgrade ascendra-ui vX → vY`

> Your own files (`components/`, `hooks/`, `lib/`, your custom pages) are never touched.

> Review **Breaking** entries below before upgrading across major versions.

---

## [1.4.0] — ASCENDRA.md file taxonomy and smart upgrade strategies

### Added
- `ASCENDRA.md` — new managed reference file shipped to all consumer projects. Documents every file's upgrade strategy (silent overwrite, warn-then-overwrite, check-then-skip, ship-once) so developers and AI assistants know what is safe to edit before touching any file. Auto-updated on `npm run upgrade`.

### Changed
- `upgrade.js` — enforce the full upgrade taxonomy: `app/(app)/page.tsx` is now ship-once (never overwritten, consumers own their home page); `app/(app)/sandbox/page.tsx` and `app/favicon.ico` are check-then-skip (upgrade stores a SHA at install time and skips the file once it detects customisation); `app/layout.tsx`, `app/globals.css`, and `app/(app)/layout.tsx` are warn-then-overwrite (upgrade prints a warning and shows where to find the diff). `templateHashes` map stored in `.ascendra-ui/ascendra.json` to support the skip logic.
- `create-project.js` — ships `ASCENDRA.md` alongside `CLAUDE.md` on project creation; writes initial `templateHashes` into `ascendra.json`; `CLAUDE.md` reclassified as ship-once (upgrade no longer overwrites it).
- Template command files (all 10) — added `<!-- managed: overwritten on npm run upgrade -->` header so consumers know to copy under a new name before customising.
- `template/CLAUDE.md` — added `ASCENDRA.md` to the reference docs list; updated project structure diagram to reflect ship-once/skip labels for `page.tsx` and `sandbox`.

---

## [1.3.1] — Consumer template skill overhaul + DataTableSearchInput fix

### Fixed
- `DataTableSearchInput` — corrected collapsed width (`w-10` → `w-65`); the input was rendering as a very narrow strip before focus.

### Changed
- All 8 consumer template skills (`create-page`, `create-form`, `create-table`, `create-dashboard`, `create-report`, `create-dialog`, `create-sheet`, `create-component`) expanded from simple ask-then-generate stubs to full Phase 0 requirements discovery → spec checkpoint → generation workflows. Each skill now reads the relevant `docs/` sections before asking, batches questions to avoid one-at-a-time prompts, presents a derived spec for approval before generating any code, and runs `npx tsc --noEmit` on completion.
- `create-table` additionally gains a three-branch scaffold: **Simple Table** (`Table`/`TableWrapper`, no provider), **DataTable API-simple** (`DataTableProvider` + single service function + `useQuery` hook — new recommended starting point), and **DataTable full query system** (`DataTableWithQueryProvider`). Adds an explicit toolbar control selection step and corrected cell rendering guidance (`row.field` directly, not `getValue()`).

---

## [1.3.0] — Consumer template overhaul: user-owned files + release skills

### Added
- `/prepare-release` and `/release` Claude Code skills (`template/.claude/commands/prepare-release.md`, `release.md`) shipped to consumer projects via `npm run upgrade`. These guide consumers through squash-merge → CHANGELOG drafting → semver release with checkpoint prompts at every irreversible step.

### Changed
- `template/CLAUDE.md` is now user-owned — removed from the managed upgrade list so consumers can edit it freely without changes being overwritten. Added branching workflow guide, release workflow table, and `/prepare-release`/`/release` to the commands reference.
- `template/README.md` is now user-owned — removed from the managed upgrade list. Added "About Ascendra UI" orientation section explaining library vs. application separation and the upgrade model.
- `template/scripts/upgrade.js` — no longer overwrites `CLAUDE.md` on upgrade; adds `prepare-release.md` and `release.md` to the 11 managed skills (up from 9).

---

## [1.2.3] — Harden Claude Code skills

### Changed
- All four skills (`create-component`, `prepare-release`, `release`, `verify-docs`) hardened with 17 gap fixes: type-check gates, mid-flow review checkpoints, explicit file-read instructions, rollback/recovery guidance, and a stacked-release detector in `prepare-release` that blocks drafting a second unreleased CHANGELOG entry on top of an existing one.
- `BACKLOG.md`: added category labels to all historical Completed entries.

---

## [1.2.2] — Add approval checkpoints to release skills

### Changed
- `/prepare-release` — each stage now pauses at an explicit checkpoint (CP-1 through CP-6) before taking any action, with a summary of what is about to happen and a required approval step.
- `/release` — added checkpoints for bump confirmation, BACKLOG stamp preview, release script execution, and push, mirroring the same gate pattern.

## [1.2.1] — Release workflow hardening and skill improvements

### Added

- `/prepare-release` skill — squash-merges the feature branch to main, summarizes commits since the last tag, drafts the CHANGELOG entry and BACKLOG updates, and commits after approval.
- Phase 0 requirements discovery in `/create-component` — validates the use case, checks for overlap with existing registry components, and confirms library fitness before scaffolding files.

### Changed

- `/release` now derives the new version from the CHANGELOG top entry and passes the exact `x.y.z` to the release script — the CHANGELOG is the source of truth, so bump/changelog mismatches are no longer possible.
- Registry: completed `importNames` for the `sidebar-menu` entry (sidebar shell: `SideBar`, `useSideBar`, `SideBarHeader`, `SideBarMain`, `SideBarFooter`, `SideBarOverlay`, `SideBarToggle`) and the `data-table` entry (checkbox cells, error body, bars, head/row actions, and query components such as `QueryBar` and `BatchNavigator`).

### Fixed

- `scripts/release.js` no longer exits 0 silently when run with piped or non-interactive stdin and the CHANGELOG entry is missing — it now aborts with exit code 1 and a clear message, including when stdin ends before a prompt is answered.

## [1.2.0] — Consumer project starter files and .ascendra-ui/ folder

### Added

- `README.md` shipped to new consumer projects on `create-project` (ship-once, not managed by upgrade). Includes tech stack, project structure, commands, and UI building guide.
- `CHANGELOG.md` shipped to new consumer projects on `create-project` (ship-once). Includes usage guide covering sections, lifecycle, and semver guidance.
- `BACKLOG.md` shipped to new consumer projects on `create-project` (ship-once). Includes planned/in-progress/completed sections and lifecycle instructions.

### Changed

- `ascendra.json` and the library `CHANGELOG.md` now live under `.ascendra-ui/` in consumer projects, freeing the root for the consumer's own files. Upgrade script auto-migrates existing consumers on first run.
- `npm run changelog` now reads from `.ascendra-ui/CHANGELOG.md`.
- Fixed stale `.claude/skills/` reference in `create-project.js` (now correctly uses `.claude/commands/`).

---

## [1.1.4] — Improve upgrade script re-run message

### Changed

- Re-run message now includes the target version number: `The upgrade script changed in vX.Y.Z — please re-run npm run upgrade to complete the upgrade.`

---

## [1.1.3] — Self-update guard in upgrade script

### Changed

- `scripts/upgrade.js` now detects if the upgrade script itself changed before doing anything else. If it did, it updates `scripts/upgrade.js` and exits with a clear message: **"The upgrade script changed — please re-run `npm run upgrade` to complete."** Re-running executes the new script, which applies all remaining changes correctly. This prevents silent failures when upgrade logic changes between versions.

---

## [1.1.2] — Fix commands migration in upgrade script

### Fixed

- `scripts/upgrade.js` now removes the legacy `.claude/skills/` directory during upgrade and stages its deletion via `git rm`. Consumers who upgraded to v1.1.1 and ended up without `.claude/commands/` will get it populated on the next upgrade.
- Template `CLAUDE.md` "Available Skills" section renamed to "Available Commands" to match the new directory name.

---

## [1.1.1] — Rename skills to commands

### Changed

- `.claude/skills/` renamed to `.claude/commands/` — both in the root repo and in `ascendra-ui/template/`. Aligns with the current Claude Code commands format.
- `scripts/upgrade.js` updated to write managed Claude Code commands to `.claude/commands/` instead of `.claude/skills/`.

---

## [1.1.0] — Branching workflow, versioning rules, and backlog

### Added

- `BACKLOG.md` — structured backlog with Unreleased, category, and Completed sections. Item status markers (`[ ]` backlog, `[~]` in progress, `[✓]` merged/unreleased, `[x]` shipped) track work through the full lifecycle.
- Branching workflow documented in `CLAUDE.md` — branch naming conventions (`feat/`, `fix/`, `chore/`, `docs/`), squash-merge workflow, and rules for working on main.
- Versioning rules in `CLAUDE.md` and `/release` skill — clear patch/minor/major decision table tied to the consumer upgrade model.
- `/release` skill updated with branch guard (blocks if not on `main`) and inline versioning guide at the bump-type step.

---

## [1.0.12] — Fix skill delivery for consumers upgrading from pre-1.0.11

### Fixed

- `ascendra-ui/template/scripts/upgrade.js` — updated doc comment header to list `.claude/skills/` as a managed output. Existing consumers who upgraded to v1.0.11 did not receive `.claude/skills/` due to a bootstrapping issue (the old upgrade.js ran the v1.0.11 upgrade before the new skills copy logic was in place). Upgrading to v1.0.12 will deliver all 9 managed skills correctly.

---

## [1.0.11] — Add Claude Code skills for showcase and consumer projects

### Added

- `.claude/skills/` — 3 showcase skills: `/create-component` (full 9-step component workflow), `/release` (pre-flight checks + release script), `/verify-docs` (docs regeneration + registry audit).
- `ascendra-ui/template/.claude/skills/` — 9 consumer skills shipped with every new/upgraded consumer project: `/create-page`, `/create-form`, `/create-table`, `/create-dashboard`, `/create-report`, `/create-chart`, `/create-dialog`, `/create-sheet`, `/create-component`.
- `ascendra-ui/template/CLAUDE.md` — new "Available Skills" section documenting all 9 consumer skills.
- `CLAUDE.md` (showcase) — new "Available Skills" section documenting the 3 showcase skills.

### Changed

- `create-project.js` — copies `.claude/skills/` to new consumer projects on init.
- `ascendra-ui/template/scripts/upgrade.js` — updates each managed skill file individually on upgrade; never removes consumer-added custom skills.

---

## [1.0.10] — Improve consumer CLAUDE.md based on verification testing

### Changed

- `ascendra-ui/template/CLAUDE.md` — two improvements identified from Q&A verification:
  - **Tech stack table** — added `jspdf + html-to-image`, `fuse.js`, `tiptap`, and `date-fns` as explicit entries so Claude does not suggest installing packages that are already present.
  - **DataTable section** — replaced the single-sentence DataTable note with a clear two-provider decision table (`DataTableWithQueryProvider` for server data, `DataTableProvider` for client-side static data) so the choice is answerable from memory without grepping the docs.

---

## [1.0.9] — Fix CLAUDE.md delivery for existing consumers upgrading from pre-1.0.8

### Fixed

- `ascendra-ui/template/scripts/upgrade.js` — updated doc comment header to list `CLAUDE.md` as a managed file. Existing consumers who upgraded to v1.0.8 did not receive `CLAUDE.md` due to a bootstrapping issue (the old upgrade.js ran the v1.0.8 upgrade before the new copy logic was in place). Upgrading to v1.0.9 will deliver `CLAUDE.md` correctly.
- `create-project.js` — updated doc comment header to list `CLAUDE.md` in the "What gets created" section.

---

## [1.0.8] — Consumer CLAUDE.md, documentation overhaul, CLAUDE.md gaps filled

### Added

- `ascendra-ui/template/CLAUDE.md` — new managed file shipped to consumer projects. Covers: reference docs as first line of action, full tech stack table, annotated project structure, import rules with code examples, page building guidance, custom component conventions, gap flagging pattern, and Dos/Don'ts.
- `create-project.js` — copies `CLAUDE.md` to new consumer projects on init.
- `ascendra-ui/template/scripts/upgrade.js` — copies updated `CLAUDE.md` on every upgrade; included in the auto-commit.

### Changed

- `CLAUDE.md` (showcase repo) — added Tech Stack table, File & Folder Conventions section (shipped-vs-showcase split, file naming conventions, provider folder structure, hook placement decision tree), `npm run docs:generate` reminders, Registry description quality guidelines, and Imports block in Dos and Don'ts.
- `docs/showcase-reference.md` — added Design System Gap Flagging section, Tech Stack Assumptions table (including `@tanstack/react-query`), and full DataTable System documentation (9 subsections: provider choice, column definitions, static template, QueryFn contract, QueryDef definitions, dynamic field options, query-driven template, tableId persistence, key gotchas).

---

## [1.0.7] — Rename repository from ascendra-ui-showcase to ascendra-ui

### Changed

- Repository renamed from `ascendra-ui-showcase` to `ascendra-ui` on GitHub and locally.
- `package.json` and `package-lock.json` `name` field updated to `ascendra-ui`.
- `scripts/release.js` — name guard updated to match new package name.
- `create-project.js` — `--local` name guard, default GitHub clone URL, and log messages updated to `ascendra-ui`.
- `README.md` and `CHANGELOG.md` updated to reflect the new repository name throughout.

---

## [1.0.6] — Add ChartLegend, ChartTargetLegend, and report component showcases

### Added

- `ChartLegend`, `ChartLegendGroup` — colored swatch legend item and group wrapper for identifying chart series, segments, and categories. Supports 8 chart color tokens (`chart-1` through `chart-8`), round or square swatch shapes, and xs–lg sizes. Use `ChartLegendGroup` to wrap multiple items with left/center/right alignment.
- `ChartTargetLegend`, `ChartTargetLegendGroup` — thin horizontal bar (2px tall) legend item for identifying target or goal reference lines on a chart. Shares the same 8 color tokens as `ChartLegend`; bar width is md (16px) or lg (24px).
- Showcase preview pages at `/showcase/charts/chart-legend` and `/showcase/charts/chart-target-legend` with all variant examples and real-world dashboard legend patterns.
- Showcase preview pages for the report structural components at `/showcase/report-ui/report-header`, `/showcase/report-ui/report-document`, and `/showcase/report-ui/report-content` — documenting the 20+ composable report primitives (`ReportHeaderContent`, `ReportSectionHeader`, `ReportPdfExportButton`, etc.) already shipped in v1.0.0.

### Changed

- Dashboard pages (HR People, Marketing, Real Estate, Trading Portfolio) and report pages (ESG Sustainability, Annual Financial Statement, Executive Business Review, Marketing Campaign Analysis, Project Status, Sales Pipeline, Supply Chain Ops) now use `ChartLegend` and `ChartTargetLegend` in place of bespoke inline legend markup.

---

## [1.0.5] — Add ColorTile component

### Added

- `ColorTile`, `ColorTileTitle`, `ColorTileSubTitle` — new composable classification tile component with 16 solid-color variants. Accepts any children for maximum flexibility (no hard-coded `label`/`sublabel` props). Useful for SDG grids, priority indicators, phase strips, and risk severity tiles.
- Showcase preview page at `/showcase/feedback/color-tile` with six example sections: all variants, title-only, SDG alignment grid, project phase indicators, risk classification, ESG pillar tags, and custom children.

---

## [1.0.4] — Ship favicon to consumer projects

### Fixed

- `ascendra-ui/template/app/favicon.ico` — favicon was missing from the template; new projects created with `create-project.js` and existing projects upgraded with `npm run upgrade` now receive the favicon correctly.

---

## [1.0.3] — Improved upgrade prompt

### Changed

- `scripts/upgrade.js` — interactive upgrade now only shows versions newer than the current one; exits immediately with "already on latest" when no updates are available. The prompt pre-fills the latest version so pressing Enter accepts it without typing. Passing an older version via `--version` now errors instead of offering a downgrade.

---

## [1.0.2] — Fix ascendra-ui/ not committed in consumer projects

### Fixed

- `create-project.js` — removed `ascendra-ui/` from the generated consumer `.gitignore`. The folder is now committed to the consumer's git repo, which is required for CI/CD and production deployments. It remains hidden in the VSCode file explorer via `.vscode/settings.json` to prevent accidental edits, but is fully tracked in source control.
- `README.md` — corrected documentation to clarify that `ascendra-ui/` is committed to git (not gitignored), and updated the consumer project structure diagram accordingly.
- `create-project.js` — default source URL changed to SSH (`git@github.com:zakashah/ascendra-ui.git`) to avoid HTTPS credential prompts on private repos.

---

## [1.0.1] — Simplified project creation

### Changed

- `create-project.js` — source repo URL (`https://github.com/zakashah/ascendra-ui`) is now hardcoded as the default; consumers run `node create-project.js my-app` with no URL argument required. A custom URL can still be passed as a positional argument to override.
- `README.md` — updated create-project command examples and added `npm run project:init` to the developer local testing section.

---

## [1.0.0] — Initial release

### Component Library (`ascendra-ui/`)

**Layout**

- `PageLayout` — full-page wrapper with sidebar + content area
- `SideBar`, `SideBarMain`, `SideBarMenu`, `SideBarMenuHeader`, `SideBarMenuContent`, `SideBarMenuItem`, `SideBarOverlay`, `SideBarToggle` — collapsible sidebar with grouped navigation
- `Header`, `HeaderLinks`, `HeaderLink`, `HeaderActions` — top bar with navigation links and action slots
- `Nav`, `NavLink` — primary navigation with active-state tracking
- `ContentArea`, `MainContainer` — scrollable content regions
- `MainSection`, `PageHeader` — page-level layout primitives
- `MainContent`, `MainSidebar` — two-column page layout

**Forms**

- `Form`, `FormField`, `FormLabel`, `FormMessage`, `FormDescription` — react-hook-form integration with Zod validation
- `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `RadioGroup`, `RadioGroupItem` — standard form controls
- `DatePicker`, `DateRangePicker` — calendar-backed date inputs
- `Combobox` — searchable dropdown with async support
- `FileUpload` — drag-and-drop file input with preview
- `PhoneInput` — international phone number field
- `RichTextEditor` — Tiptap-based rich text input (bold, italic, links, lists)
- `MultiSelect` — tag-style multi-value selector
- `ColorPicker` — HSL color selection with preview
- `Slider` — range slider
- `UnsavedChangesBar` — floating save/discard bar for form pages

**Data Display**

- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableFooter` — semantic HTML table primitives
- `DataTable` — full-featured table with sorting, filtering, pagination, bulk actions, and column visibility
- `Badge`, `StatusBadge` — inline labeling with semantic color variants
- `Avatar`, `NameAvatar` — image and initials avatars
- `Stat`, `StatGroup` — KPI metric display cards
- `Timeline`, `TimelineItem` — vertical event history
- `Progress` — determinate progress bar
- `Skeleton` — loading placeholder

**Feedback & Overlay**

- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` — modal dialog
- `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter` — side-panel sheet
- `Drawer`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerFooter` — bottom drawer
- `Alert`, `AlertTitle`, `AlertDescription` — inline alert banners
- `Toaster` — toast notification system (Sonner)
- `Tooltip`, `TooltipContent`, `TooltipProvider` — hover tooltips

**Navigation & Actions**

- `Button` — primary action button with size and variant props
- `IconButton` — icon-only button
- `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator` — contextual action menu
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — tabbed content panels
- `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbSeparator` — hierarchical navigation trail
- `Pagination` — page navigation for data lists
- `CommandMenu` — keyboard-driven command palette (⌘K)

**Dashboard & Charts**

- `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardPanel` — dashboard card containers
- `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend` — Recharts wrapper with unified theming
- `AreaChart`, `BarChart`, `LineChart`, `PieChart`, `DonutChart`, `RadarChart`, `ScatterChart` — chart variants

**Utility**

- `ThemeToggle` — light/dark mode switcher
- `ThemeProvider` — next-themes integration
- `QueryProvider` — TanStack Query client wrapper
- `ScrollToTop` — auto-scroll on route change
- `Separator` — horizontal/vertical divider
- `Popover`, `PopoverContent` — anchored floating panel
- `HoverCard`, `HoverCardContent` — hover-triggered info card
- `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` — expand/collapse region
- `ScrollArea` — custom scrollbar container
- `EmptyState` — zero-results placeholder with icon and CTA

### Design System

- Tailwind v4 with CSS custom property tokens for all colors, radii, and spacing
- Semantic color system: `primary`, `secondary`, `destructive`, `muted`, `accent`, `border`, `ring`
- Full light/dark mode with `next-themes`
- Font: Geist (sans + mono)
- Print stylesheet included in `globals.css`

### Consumer Project Lifecycle

- `create-project.js` — standalone script to bootstrap a new consumer project from any tagged release; clones to tmp, sets up the project directory, runs `npm install`, and initializes git — consumer never sees showcase internals
- `ascendra-ui/template/scripts/upgrade.js` — shipped to consumer projects; upgrades component library, template app files, docs, and CHANGELOG from the source repo; diffs `ascendra.json` dependency snapshots and installs new/updated packages automatically; self-updating
- `ascendra-ui/template/scripts/changelog.js` — shipped to consumer projects; view latest release notes or upcoming changes
- `ascendra-ui/template/package.json` — consumer package template (scripts only: dev, build, start, lint, upgrade, changelog)
- `ascendra-ui/template/app/` — consumer app shell: root layout, `(app)/layout.tsx` with sidebar + header + theme toggle, getting-started page, sandbox page

### Showcase & Documentation

- 94 showcase pages covering all components, forms, dialogs, sheets, drawers, dashboards, and reports
- Component previews with live rendering, import chips, and props tables
- Sidebar search across all pages
- `docs/ui-reference.md` — 1900+ line component API reference, auto-generated; embeds version and commit markers
- `docs/showcase-reference.md` — design guide and AI developer reference, auto-generated
- `scripts/generate-ui-reference.ts` — generates `docs/ui-reference.md` from registry and config files
- `scripts/generate-showcase-reference.ts` — generates `docs/showcase-reference.md`
- `scripts/release.js` — internal release tool: version bump, CHANGELOG validation, doc generation + marker validation, git commit and tag; embeds dependency snapshot into `ascendra.json`
- `ascendra.json` — version lock file; stores version, commit hash, and managed dependency list for upgrade diffing

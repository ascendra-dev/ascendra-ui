> **MANAGED** — overwritten on `npm run upgrade`. Do not edit. Add project-specific notes to `CLAUDE.md` instead.
>
> **AI context** — read this file before suggesting edits to any file in this project. It tells you whether a file is safe to edit, what upgrade will overwrite, and how conflicts are resolved. When working in the library repo (`ascendra-ui`), update `ascendra-ui/template/ASCENDRA.md` whenever `create-project.js` or `upgrade.js` changes what gets shipped or managed.

# Ascendra UI — File Reference

This file documents every file that `create-project` places in your repo and what happens to each one when you run `npm run upgrade`. It is the authoritative record of the managed file system. Read it when:
- You're unsure whether editing a file is safe
- You want to understand what an upgrade will and won't touch
- You're onboarding a new collaborator or AI assistant

---

## Upgrade behaviour taxonomy

| Strategy | What it means |
|---|---|
| **Silent overwrite** | Replaced unconditionally on every upgrade. Never edit — changes will be lost. |
| **Warn then overwrite** | Replaced on upgrade. If your copy differs from the template, the upgrade script prints a warning and shows you where to find the diff (`git diff HEAD`). Recover from git if needed. |
| **Check then skip** | Replaced only if you haven't touched it. The upgrade script stores a SHA of the originally shipped file; if your copy differs, the file is skipped and you see a `⊘ skipped — customised` message. The new template version is available in the library release — apply it manually if you want it. |
| **Ship-once** | Copied once at project creation, never touched again by upgrade. Yours to edit freely. |
| **Announce in CHANGELOG** | Never auto-updated. When a library release requires a change to one of these files, the CHANGELOG entry includes a "Manual steps" section describing exactly what to do. |

---

## File inventory

### Component library

| Path | Strategy | Notes |
|---|---|---|
| `ascendra-ui/` | Silent overwrite | Entire folder replaced on every upgrade. Never edit any file inside it. |

### Reference docs

| Path | Strategy | Notes |
|---|---|---|
| `docs/ui-reference.md` | Silent overwrite | Auto-generated from the library registry. Never edit by hand. |
| `docs/showcase-reference.md` | Silent overwrite | Auto-generated page pattern guide. Never edit by hand. |

### App shell

| Path | Strategy | Notes |
|---|---|---|
| `app/layout.tsx` | Warn then overwrite | Root HTML shell and provider tree. Avoid editing — if you must, the upgrade will warn you before overwriting. |
| `app/globals.css` | Warn then overwrite | Design tokens and base styles. Adding custom CSS below the `:root {}` block is common; the warning gives you a chance to re-apply your changes after upgrade. |
| `app/favicon.ico` | Check then skip | Replace with your brand favicon freely — the upgrade script will detect the change and leave it alone. |
| `app/(app)/layout.tsx` | Warn then overwrite | App shell layout (sidebar + header). Avoid editing. |
| `app/(app)/page.tsx` | Ship-once | Your home page. Replace it with your real landing page — upgrade never touches it. |
| `app/(app)/sandbox/page.tsx` | Check then skip | Development scratch pad. Edit freely — upgrade skips it once it detects changes. |

### Scripts

| Path | Strategy | Notes |
|---|---|---|
| `scripts/upgrade.js` | Silent overwrite | Self-updating. If the script itself changes in a new version, it updates and asks you to re-run. Never edit. |
| `scripts/changelog.js` | Silent overwrite | Infrastructure alongside upgrade.js. Never edit. |

### Claude Code skills

| Path | Strategy | Notes |
|---|---|---|
| `.claude/commands/create-page.md` | Silent overwrite | Managed skill — updated with every library release. |
| `.claude/commands/create-form.md` | Silent overwrite | Managed skill. |
| `.claude/commands/create-table.md` | Silent overwrite | Managed skill. |
| `.claude/commands/create-dashboard.md` | Silent overwrite | Managed skill. |
| `.claude/commands/create-report.md` | Silent overwrite | Managed skill. |
| `.claude/commands/create-dialog.md` | Silent overwrite | Managed skill. |
| `.claude/commands/create-sheet.md` | Silent overwrite | Managed skill. |
| `.claude/commands/create-component.md` | Silent overwrite | Managed skill. |
| `.claude/commands/prepare-release.md` | Silent overwrite | Managed skill. |
| `.claude/commands/release.md` | Silent overwrite | Managed skill. |

To customise a skill without losing it on upgrade: copy the file under a new name (e.g. `create-form-internal.md`). Upgrade only overwrites the 10 names listed above.

### Library metadata

| Path | Strategy | Notes |
|---|---|---|
| `.ascendra-ui/ascendra.json` | Silent overwrite | Version manifest: current version, commit hash, source URL, dependency snapshot, and template file hashes. Never edit. |
| `.ascendra-ui/CHANGELOG.md` | Silent overwrite | Ascendra UI library release history. Never edit — use `npm run changelog` to read it. |
| `ASCENDRA.md` | Silent overwrite | This file. Updated when the managed file system changes. |

### Config files

| Path | Strategy | Notes |
|---|---|---|
| `next.config.ts` | Ship-once + Announce in CHANGELOG | Edit freely. If a library release requires a config change, the CHANGELOG entry will include manual steps. |
| `tsconfig.json` | Ship-once + Announce in CHANGELOG | Edit freely (path aliases, strict settings, etc.). |
| `postcss.config.mjs` | Ship-once | Rarely changes. |
| `eslint.config.mjs` | Ship-once | Add your own rules freely. |
| `global.d.ts` | Ship-once | Add global type declarations freely. |
| `components.json` | Ship-once | shadcn config. Edit if you add new shadcn primitives. |
| `.gitignore` | Ship-once | Extend with project-specific ignores. |
| `.vscode/settings.json` | Ship-once | Extend with your own VS Code settings. |
| `package.json` | Hybrid | `name`, `version`, and `scripts` are ship-once. Runtime dependencies are synced automatically by upgrade via `npm install` — new ones are added, removed ones are flagged for manual review. |

### Your project files

| Path | Strategy | Notes |
|---|---|---|
| `CLAUDE.md` | Ship-once | Your project's Claude Code instructions. Add conventions, API contracts, domain terminology. Never overwritten. |
| `README.md` | Ship-once | Your project README. |
| `CHANGELOG.md` | Ship-once | Your project release history (separate from the library changelog in `.ascendra-ui/`). |
| `BACKLOG.md` | Ship-once | Your project backlog. |
| `components/` | Ship-once | Your custom components. |
| `hooks/` | Ship-once | Your custom hooks. |
| `lib/` | Ship-once | Your config, constants, and utilities. |
| `providers/` | Ship-once | Your custom React context providers. |
| `utils/` | Ship-once | Your pure utility functions. |

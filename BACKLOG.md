# Ascendra UI — Backlog

Track planned and in-progress work here. Update status markers as work moves through the lifecycle.

| Marker | Meaning                           |
| ------ | --------------------------------- |
| `[ ]`  | Planned — not yet started         |
| `[~]`  | In progress — branch exists       |
| `[✓]`  | Merged to main — not yet released |
| `[x]`  | Shipped — stamped with version    |

Add a **Category** label to each item: **Component**, **Docs**, **Infra**, **Showcase**, **Consumer**.

---

## Unreleased

Items at any stage — planned, in progress, or merged but not yet tagged. Add new work here when you start planning it.

- [ ] **Consumer** — `create-settings` skill: scaffold settings page pattern (narrow-centered, multi-section `Card` layout, `UnsavedChangesBar`, optional `Tabs` structure, optional danger zone) with Phase 0 requirements discovery and spec checkpoint
- [ ] **Consumer** — `create-detail-page` skill: scaffold record detail/show page (`app/(app)/{entity}/[id]/page.tsx`) with `PageHeader`, back link, status badge, header action buttons, and sectioned/tabbed body; Phase 0 extracts entity, data source, sections, and header shape

---

## Completed

- [x] **Consumer** — ship ASCENDRA.md managed file taxonomy to consumer projects; add warn/skip/ship-once upgrade strategies (hash-based check-then-skip for favicon and sandbox, ship-once for home page) — v1.4.0
- [x] **Component** — fix DataTableSearchInput collapsed width (`w-10` → `w-65`) — v1.3.1
- [x] **Consumer** — overhaul all 8 template skills (`create-page`, `create-form`, `create-table`, `create-dashboard`, `create-report`, `create-dialog`, `create-sheet`, `create-component`) with Phase 0 discovery + checkpoint workflows; `create-table` adds three-branch scaffold (Simple Table / DataTable API-simple / DataTable full query system) — v1.3.1
- [x] **Consumer** — template overhaul: `CLAUDE.md` and `README.md` are now user-owned (not overwritten on `npm run upgrade`); add `prepare-release` and `release` as two new managed skills shipped to consumers; improve template BACKLOG, CHANGELOG, CLAUDE.md, and README.md with branching workflow, release workflow, and semver guidance — v1.3.0
- [x] **Infra** — harden all four Claude Code skills with 17 gap fixes and stacked-release guard — v1.2.3
- [x] **Infra** — add explicit approval checkpoints to prepare-release and release skills — v1.2.2
- [x] **Consumer** — template cleanup + starter files — `.ascendra-ui/` folder, ship-once `README.md`, `CHANGELOG.md`, `BACKLOG.md` — v1.2.0
- [x] **Docs** — branching workflow, versioning rules, and backlog — v1.1.0
- [x] **Infra** — skill delivery fix for pre-1.0.11 consumers — v1.0.12
- [x] **Infra** — Claude Code skills (create-component, release, verify-docs) — v1.0.11
- [x] **Consumer** — consumer CLAUDE.md improvements — v1.0.10
- [x] **Consumer** — CLAUDE.md delivery fix — v1.0.9
- [x] **Consumer** — consumer CLAUDE.md + docs overhaul — v1.0.8
- [x] **Infra** — repo renamed to ascendra-ui — v1.0.7
- [x] **Component** — ChartLegend, ChartTargetLegend, report components — v1.0.6
- [x] **Component** — ColorTile component — v1.0.5
- [x] **Infra** — favicon fix — v1.0.4
- [x] **Infra** — improved upgrade prompt — v1.0.3
- [x] **Infra** — ascendra-ui/ commitment fix — v1.0.2
- [x] **Infra** — simplified project creation — v1.0.1
- [x] **Infra** — initial release — v1.0.0

# Changelog

All notable changes to this project are documented here. Follow [Keep a Changelog](https://keepachangelog.com) conventions.

---

## How to use this file

**Sections to use inside each version entry:**
- `Added` — new features or pages
- `Changed` — changes to existing behaviour
- `Fixed` — bug fixes
- `Removed` — removed features

**Heading format** — must be exactly this pattern (the `/prepare-release` and `/release` commands parse it):

```
## [x.y.z] — short description
```

**Lifecycle:**
1. Work on a feature branch
2. Run `/prepare-release` — it squash-merges your branch, collects commits since the last tag, proposes a bump level, and drafts this entry for you
3. Review and approve the draft, then run `/release` to cut the tag

You can also maintain this file manually: add items under `## [Unreleased]` as you work, then rename it to `## [x.y.z] — short description` when you cut a release.

**Semver guide:**

| Bump | When to use |
|---|---|
| `patch` | Bug fixes, refactors, copy/config changes — no new behaviour visible to users |
| `minor` | New features, pages, or API endpoints — additive, no breaking changes |
| `major` | Renamed routes, removed features, changed auth or data contracts — users or API clients must update |

For a **major** bump, include a **Breaking** note in the entry explaining what callers must change.

> Ascendra UI library updates are tracked separately in `.ascendra-ui/CHANGELOG.md`. Run `npm run changelog` to view them.

---

## [Unreleased]

---

## [0.1.0] — Initial setup

Bootstrapped from ascendra-ui.

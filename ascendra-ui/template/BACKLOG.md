# Backlog

Track planned, in-progress, and completed work here.

| Marker | Meaning |
|---|---|
| `[ ]` | Planned — not yet started |
| `[~]` | In progress — being worked on |
| `[✓]` | Merged to main — awaiting release |
| `[x]` | Shipped — stamped with version |

---

## How to use this file

Add items as you identify work. Move them through the lifecycle as they progress.

Add a **Category** label to each item. Suggested starter set — add your own to match your project:
`Feature` · `Bug` · `Infra` · `Docs` · `Chore`

When a feature ships, mark it `[x]` and stamp it with the version in the Completed section:

```
[x] **Feature** — added dark mode toggle — v1.3.0
```

Use `/prepare-release` to promote `[~]` items to `[✓]` and draft BACKLOG updates automatically when preparing a release. Use `/release` to stamp `[✓]` items with the final version.

> This file tracks your application work. Ascendra UI library updates are tracked separately in `.ascendra-ui/CHANGELOG.md`.

---

## Unreleased

Items at any stage — planned, in progress, or merged but not yet tagged.

---

## Completed

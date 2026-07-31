---
description: Squash-merge a feature branch to main and draft the CHANGELOG entry, ready for /release
---
<!-- managed: overwritten on npm run upgrade — copy with a new name to customise -->

**Step 1 — Detect branch**

Run `git status` and `git branch --show-current`.

- If the working tree is dirty, stop and tell the user to commit or stash first.
- If already on `main`, skip to Step 2.
- If on any other branch name that is not `feat/`, `fix/`, `chore/`, or `docs/`, stop and ask the user how to proceed.

If on a `feat/`, `fix/`, `chore/`, or `docs/` branch, run the following before presenting CP-1:

1. Run `npx tsc --noEmit`. If it fails, stop and tell the user to fix type errors on the branch before merging.
2. Run `git log main..{branch} --oneline`. If the output is empty, stop — the branch has no commits ahead of main and there is nothing to squash-merge.

Use the output of `git log main..{branch} --oneline` to draft the squash commit message before showing CP-1.

---
**CHECKPOINT CP-1 — Squash-merge + branch delete**
What is about to happen: the branch will be squash-merged into main and then deleted.

Show the user:
- Branch being merged: `{branch}`
- Proposed squash-merge commit message: `{type}: {summary}` (conventional commit format matching the branch prefix — drafted from the `git log main..{branch} --oneline` output above, not just the branch name)
- The exact commands that will run once approved:
  ```bash
  git checkout main
  git merge --squash {branch}
  git commit -m "{type}: {summary}"
  git branch -D {branch}
  ```
- Note: `git branch -D {branch}` is irreversible — the branch will be gone.

Ask: "Is the proposed commit message accurate? Approve or tell me what to change before I run these commands."

Wait for approval. Apply any commit message edits the user requests. Do not run any git commands until approved.

---

After approval, run the squash-merge commands.

**Step 2 — Check for stacked unreleased entry**

Before collecting commits, read `package.json` to get the current released version `{current}`. Then read `CHANGELOG.md` and find the first `## [x.y.z]` heading to get `{pending}`.

If `{pending}` > `{current}`: there is already an unreleased CHANGELOG entry from a previous `/prepare-release` run. Stop immediately and tell the user:

> There is already an unreleased CHANGELOG entry for `v{pending}` — `package.json` is still at `v{current}` because `/release` has not been run yet.
>
> Proceeding would draft a second unreleased entry on top of the first, which `/release` will reject (it requires the top entry to be exactly one semver step above `package.json`).
>
> **Option A — Release first (recommended):** Run `/release` to publish `v{pending}`, then re-run `/prepare-release` for the current changes.
>
> **Option B — Absorb manually:** Edit `CHANGELOG.md` to fold the current changes into the existing `v{pending}` entry (adjust the version bump level if needed), commit the edit, then run `/release`.

Do not proceed with change collection or CHANGELOG drafting until the user resolves the conflict. Do not attempt to auto-merge or auto-amend entries — version bump intent requires human judgment.

If no stacked entry exists (`{pending}` == `{current}`, or CHANGELOG has no `## [x.y.z]` heading yet), continue normally.

**Step 3 — Collect changes since last release**

Find the last release tag: `git describe --tags --abbrev=0`. Then collect:

```bash
git log {tag}..HEAD --oneline
git diff {tag}..HEAD --stat
```

If there are no commits since the last tag, stop — nothing to release.

---
**CHECKPOINT CP-2 — Change summary review**
What is about to happen: nothing yet — this is a review before any decisions are made.

Show the user the full output of:
- `git log {tag}..HEAD --oneline`
- `git diff {tag}..HEAD --stat`

Ask: "These are all commits since the last release (`{tag}`). Are there any commits here that should NOT be included in this release, or anything missing?"

Wait for a response. If the user flags a problem, stop and help them resolve it. Otherwise continue.

---

**Step 4 — Classify changes and propose the bump**

Apply the versioning rules:

| Bump | Example types |
|---|---|
| `patch` | `bugfix`, `refactor`, `config`, `copy` — no new behaviour visible to users |
| `minor` | `feature`, `page`, `endpoint`, `component` — additive, no breaking changes |
| `major` | `breaking`, `rename`, `removal`, `migration` — users or API clients must act |

> These examples cover most web apps. Add your own labels to match your project's conventions.

Tie-breaker: when in doubt, use the higher bump. Compute the proposed `x.y.z` from the current `package.json` version.

---
**CHECKPOINT CP-3 — Version bump approval**
What is about to happen: the CHANGELOG entry will be drafted using this version — changing it later means redrafting.

Show the user:
- Current version: `{current}` (from `package.json`)
- Proposed new version: `{x.y.z}`
- Bump level: **patch / minor / major**
- One-line reasoning: e.g. "minor — new settings page added, no breaking changes"

Ask: "Does this bump level look right? Approve or tell me the correct level before I draft the CHANGELOG."

Wait for approval. If the user corrects the bump, recompute `x.y.z` accordingly.

---

**Step 5 — Draft the CHANGELOG entry**

Write the entry in this format:

```md
## [x.y.z] — short description

### Added
- ...

### Changed
- ...

### Fixed
- ...
```

Only include subsections that apply. For a **major** bump, a **Breaking** note explaining what users or API clients must do is mandatory.

The heading **must** follow this exact format: `## [x.y.z] — short description` — the `/release` command parses this with a regex and will fail if the format differs (e.g. `## v1.2.3` or `## [1.2.3]:` are both wrong).

Do not insert the entry into the file yet.

---
**CHECKPOINT CP-4 — CHANGELOG draft approval**
What is about to happen: the CHANGELOG entry will be written to `CHANGELOG.md`.

Show the full drafted entry exactly as it will appear in the file.

Ask: "Does this accurately describe the release? Edit the wording or approve to continue to the BACKLOG step."

Wait for approval. Apply any edits the user requests before moving on.

---

**Step 6 — Propose BACKLOG.md changes**

Open `BACKLOG.md` and work through two sub-tasks:

**6a — Confirm tracked items**

List every `[~]` item currently in the Unreleased section. For each one, determine whether it is covered by the commits in this release. Propose marking covered items `[✓]`; leave unfinished ones as `[~]`.

If there are no `[~]` items, skip to 6b.

**6b — Add unplanned changes**

Compare the commits in `git log {tag}..HEAD --oneline` against the items now in Unreleased. Identify any commits not reflected by an existing BACKLOG item.

For each untracked commit, propose a new `[✓] **Category** — description` line using an appropriate Category label.

Do not edit the file yet.

---
**CHECKPOINT CP-5 — BACKLOG changes approval**
What is about to happen: `BACKLOG.md` will be edited with the changes below.

Show the user the full proposed diff:
- `[~]` items being promoted to `[✓]` (list each by description)
- New `[✓]` items being added (list each with category + description)
- Items being left unchanged (list if any, so the user can see nothing was missed)

Ask: "Do these BACKLOG changes look right? Approve or tell me what to add, remove, or change."

Wait for approval. Apply any edits the user requests before writing the file.

---

After approval, write `CHANGELOG.md` first, then `BACKLOG.md`. If the second write fails, `CHANGELOG.md` is already correct — do not revert it; re-apply only the BACKLOG changes.

**Step 7 — Commit**

---
**CHECKPOINT CP-6 — Commit preview**
What is about to happen: the following commands will run and create a commit on main.

Show the user exactly:
```bash
git add CHANGELOG.md BACKLOG.md
git commit -m "docs: add CHANGELOG entry for v{x.y.z}"
```

Ask: "Ready to commit? Approve to create the commit."

Wait for approval. Do not run the commit until approved.

---

After approval, run the commit. Then tell the user:

> Done. Run `/release` to cut the release.

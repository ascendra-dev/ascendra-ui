---
description: Pre-flight checks and release runner — bump version, commit, and tag
---
<!-- managed: overwritten on npm run upgrade — copy with a new name to customise -->

**Step 1 — Verify branch**

Run `git branch --show-current`. If the result is not `main`, stop immediately and tell the user:

> Releases must be made from main. You are currently on `{branch}`. Switch to main, merge your branch, then re-run /release.

Do not proceed if not on main.

**Step 2 — Check working tree**

Run `git status`. If not clean, stop and tell the user what to commit first.

**Step 2.5 — Type check**

Run `npx tsc --noEmit`. If it fails, stop and tell the user to fix type errors before cutting a release — a tagged release with broken types is harder to roll back than a failed pre-flight.

**Step 3 — Derive version from CHANGELOG**

The CHANGELOG is the source of truth for the new version.

1. Read the first `## [x.y.z]` heading in `CHANGELOG.md` — this is the target version. The heading must match the exact format `## [x.y.z] — short description`; if it doesn't, stop and tell the user to fix the format.
2. Read the current version from `package.json`.
3. Validate the target is **exactly one legal semver bump** above current:
   - patch: `x.y.(z+1)` · minor: `x.(y+1).0` · major: `(x+1).0.0`

If the top entry equals the current version, stop: there is no new entry — tell the user to run `/prepare-release` (or add an entry manually). If the target skips levels (e.g. 1.2.0 → 1.4.0) or is lower than current, stop and tell the user to fix the CHANGELOG entry.

---
**CHECKPOINT — Bump confirmation**
What is about to happen: nothing yet — confirming the version before any changes are made.

Show the user:
- Current version: `{current}` (from `package.json`)
- Target version: `[{x.y.z}]` (from CHANGELOG top entry)
- Bump level: **patch / minor / major**

Show the bump guide so they can sanity-check:

| Bump | Example types |
|---|---|
| `patch` | `bugfix`, `refactor`, `config`, `copy` — no new behaviour visible to users |
| `minor` | `feature`, `page`, `endpoint`, `component` — additive, no breaking changes |
| `major` | `breaking`, `rename`, `removal`, `migration` — users or API clients must act |

> These examples cover most web apps. Add your own labels to match your project's conventions.

If the derived bump is **major**, verify the CHANGELOG entry contains a **Breaking** note explaining what users or API clients must do. Stop if it is missing.

Ask: "Does this bump level look right? Approve to continue, or fix the version in the CHANGELOG entry first and re-run /release."

If the user wants a different level, stop — they must edit the CHANGELOG version, then re-run /release. Do not proceed with a different bump than what the CHANGELOG says.

---

**Step 4.5 — Preview BACKLOG stamp**

Read `BACKLOG.md`. Find every `[✓]` item and every `[~]` item in the Unreleased section.

If Unreleased has no `[✓]` items and no `[~]` items, skip this checkpoint and go to Step 5.

---
**CHECKPOINT CP-R1 — BACKLOG stamp preview**
What is about to happen: `[✓]` items will be stamped with the release version, marked `[x]`, and moved to the Completed section.

List every `[✓]` item that will be stamped, showing exactly how each line will look:
```
[x] **Category** — description — v{x.y.z}
```

If there are any `[~]` items still in Unreleased, list them separately and ask: "These items are still marked in-progress — are any of them actually complete and should be included in this release? If so, tell me which ones and I'll promote them to `[✓]` before stamping."

Wait for a response. Promote any items the user confirms are done, then re-show the full stamp list.

Ask: "Do these items correctly represent what is shipping in this release? Approve to stamp them, or tell me what to correct."

Wait for approval. After approval, apply the edits to `BACKLOG.md`:
- Change each `[✓]` to `[x]` and append ` — v{x.y.z}`
- Move each stamped line to the top of the Completed section

Then commit the BACKLOG change:
```bash
git add BACKLOG.md
git commit -m "chore: stamp BACKLOG for v{x.y.z}"
```

The release step guards against a dirty working tree, so the BACKLOG stamp must land in its own commit before the version bump runs. The stamp commit will sit one commit before the `chore: release v{x.y.z}` commit — both are captured by the version tag.

**Recovery:** if the release step (Step 5) fails after this stamp commit, do NOT re-run `/release` immediately. First run `git reset HEAD~1` to undo the stamp commit, fix the underlying issue, then re-run `/release` from the start.

---

**Step 5 — Bump version, commit, and tag**

---
**CHECKPOINT CP-R2 — Release preview**
What is about to happen: the following changes will be made. Review carefully before approving.

Show the user exactly what will happen:
- Bump `package.json` version from `{current}` to `{x.y.z}`
- Create commit: `chore: release v{x.y.z}`
- Create tag: `v{x.y.z}`

The exact commands that will run:
```bash
node -e "const p=require('./package.json'); p.version='{x.y.z}'; require('fs').writeFileSync('./package.json', JSON.stringify(p, null, 2)+'\n');"
git add package.json
git commit -m "chore: release v{x.y.z}"
git tag v{x.y.z}
```

Ask: "Ready to cut the release? This will create the commit and tag. Approve to run."

Wait for approval. Do not run any of these commands until approved.

---

After approval, run the commands above in sequence.

Verify success before proceeding:
```bash
git log --oneline -3
git tag | tail -3
```
Confirm `chore: release v{x.y.z}` appears as the latest commit and `v{x.y.z}` appears as a tag. If either is missing, do not push — investigate why the command did not complete.

**Step 6 — Push**

---
**CHECKPOINT — Push confirmation**
What is about to happen: the release commit and tag will be pushed to the remote — this is public and cannot be easily undone.

Show the command:
```bash
git push && git push --tags
```

Ask: "Ready to push `v{x.y.z}` to the remote? Approve to push."

Wait for approval. Do not push until approved.

---

After approval, run `git push && git push --tags`.

If `git push` fails because the remote has diverged, do NOT force-push. Run `git pull --rebase` and push again. If only `git push --tags` fails (the commit push succeeded), run it again in isolation — a tag push is idempotent and safe to retry.

**Step 7 — Confirm**

Report the new version and tag. Done.

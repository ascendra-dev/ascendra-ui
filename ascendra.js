#!/usr/bin/env node
/**
 * Ascendra UI — setup and update.
 *
 * Usage:
 *   node ascendra.js setup        Turn this cloned/unzipped repo into your own project
 *   node ascendra.js update       Pull the latest ascendra-ui/ folder from the public repo
 *
 * setup has no npm script alias in THIS repo's package.json, deliberately — this repo is the
 * source of truth, not a copy waiting to become a project. A "setup" script sitting in its own
 * package.json would be one `npm run setup` away from deleting app/showcase/, scripts/, and
 * docs/, and wiping components/, hooks/, lib/ (which here hold real showcase infrastructure, not
 * empty placeholders) — for someone actually working in this repo, not someone who just cloned it
 * to start a new project. Invoke it explicitly: `node ascendra.js setup`.
 *
 * setup runs once, in place, right after cloning or unzipping this repo into whatever folder is
 * your new project (e.g. ascendra-pay-web). It removes the showcase, the generated docs/ (these
 * are showcase-only reference docs, not part of what ships), and the doc-generation scripts/,
 * points the app at the starter route, resets the showcase-only infra folders, swaps in the
 * consumer-facing README/CLAUDE.md, and drops the root LICENSE (the MIT terms for the vendored
 * code stay at ascendra-ui/LICENSE, since that folder is what's actually distributed).
 * ascendra.js is NOT deleted — update needs it to still be here. It also writes a fresh, trimmed
 * package.json scripts block that DOES include an "ascendra-ui:update" alias — that one is safe,
 * because by definition it only exists in a project that has already been set up, never in this
 * source repo. Running setup a second time is refused (see alreadySetUp() below) — it would
 * silently wipe components/, hooks/, lib/, providers/, utils/ back to empty, destroying whatever
 * you've since built. That guard's marker (starter/ being gone) is set as the FIRST thing setup
 * does, before any of the destructive steps — so if setup is killed or crashes partway through, a
 * later re-run is still refused instead of repeating the wipe on top of whatever was added since.
 *
 * update is run from inside your project, any time, with no arguments — a week later, a month
 * later, whenever. Unlike setup, it prompts for confirmation every time: it's a genuinely
 * destructive, unguarded operation (no re-run check like setup has), so an accidental invocation
 * shouldn't be able to silently wipe ascendra-ui/. Before prompting it prints the exact path being
 * replaced, whether that path currently exists, a nudge to review the source repo's commit
 * history (there's no CHANGELOG to check instead), and a warning if the working tree has
 * uncommitted git changes. Only on "y"/"yes" does it clone the public source repo to a temp
 * directory, replace your project's ascendra-ui/ folder with the one from that clone, and delete
 * the temp directory. There is no version to track — it always takes whatever is currently on
 * the source repo's default branch. It never touches package.json — install any
 * new dependency yourself after reviewing the diff. Refuses to run non-interactively (no TTY),
 * since there'd be no way to confirm.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline");

const ROOT = path.resolve(__dirname);
const SOURCE_REPO = "https://github.com/ascendra-dev/ascendra-ui.git";

function rm(relPath) {
  fs.rmSync(path.join(ROOT, relPath), { recursive: true, force: true });
}

function mkEmptyDir(relPath) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(full, { recursive: true });
  fs.writeFileSync(path.join(full, ".gitkeep"), "");
}

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

// Two independent signals, checked with OR: if EITHER looks like setup already ran, refuse.
// A destructive re-run is far worse than a false-positive refusal, so this errs conservative.
function alreadySetUp() {
  if (!fs.existsSync(path.join(ROOT, "starter"))) return true;
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    if (pkg.scripts && pkg.scripts["ascendra-ui:update"]) return true;
  } catch {
    // Unreadable/invalid package.json — fall through to the starter/ check above only.
  }
  return false;
}

function setup() {
  if (alreadySetUp()) {
    console.error(
      "Error: this project has already been set up.\n" +
      "Running setup again would wipe components/, hooks/, lib/, providers/, utils/ back to empty.\n" +
      "If you meant to pull the latest component library, run: npm run ascendra-ui:update"
    );
    process.exit(1);
  }

  console.log("Setting up your Ascendra UI project...\n");

  // Consume the starter/ swap files and delete the folder FIRST, before anything destructive
  // below. This is what alreadySetUp() checks — setting it early means that if this script is
  // killed or crashes partway through, a re-run is still refused, instead of re-running the
  // components/hooks/lib/providers/utils wipe on top of whatever was added in the meantime.
  for (const file of ["README.md", "CLAUDE.md"]) {
    const src = path.join(ROOT, "starter", file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(ROOT, file));
  }
  rm("starter");
  console.log("  ✓ Replaced README.md and CLAUDE.md with your project's versions");

  rm("app/showcase");
  console.log("  ✓ Removed app/showcase/");

  rm("scripts");
  console.log("  ✓ Removed scripts/ (doc-generation scripts — nothing left in this project can run them)");

  rm("docs");
  console.log("  ✓ Removed docs/ (showcase-only reference docs — never shipped)");

  fs.writeFileSync(
    path.join(ROOT, "app", "page.tsx"),
    'import { redirect } from "next/navigation";\n\nexport default function Page() {\n  redirect("/starter");\n}\n'
  );
  console.log("  ✓ app/page.tsx now redirects to /starter");

  const yourDirs = ["components", "hooks", "lib", "providers", "utils"];
  for (const dir of yourDirs) rm(dir);
  for (const dir of yourDirs) mkEmptyDir(dir);
  console.log("  ✓ Reset components/, hooks/, lib/, providers/, utils/ — all empty, yours to fill");

  rm("LICENSE");
  console.log("  ✓ Removed root LICENSE — the MIT terms for the vendored code stay at ascendra-ui/LICENSE");

  const pkgPath = path.join(ROOT, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.name = path.basename(ROOT).toLowerCase().replace(/\s+/g, "-");
  pkg.scripts = {
    dev: "next dev",
    build: "next build",
    start: "next start",
    lint: "eslint",
    "ascendra-ui:update": "node ascendra.js update",
  };
  // setup and gen:ui-docs are deliberately dropped — setup is one-time (and now refuses to
  // re-run anyway), and gen:ui-docs depends on lib/registry.ts and the other showcase-only
  // config files just deleted above.
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log("  ✓ Trimmed package.json scripts to dev/build/start/lint/ascendra-ui:update");

  console.log("\n✓ Setup complete.");
  console.log("  Run `npm install && npm run dev`, then open http://localhost:3000/starter\n");
}

async function update() {
  const targetLib = path.join(ROOT, "ascendra-ui");
  const targetExists = fs.existsSync(targetLib);
  const commitsUrl = SOURCE_REPO.replace(/\.git$/, "") + "/commits";

  console.log(`This will ${targetExists ? "DELETE AND REPLACE" : "CREATE"} ascendra-ui/ at:`);
  console.log(`  ${targetLib}\n`);
  if (targetExists) {
    console.log("Everything currently inside that folder is deleted first. This cannot be undone");
    console.log("unless it's tracked in git — commit first if you want an easy way back.\n");
  }
  console.log(`Pulling the current default branch from: ${SOURCE_REPO}`);
  console.log("There's no version pinning, so this may include breaking changes. There's no");
  console.log("CHANGELOG either — review recent commits on the source repo first:");
  console.log(`  ${commitsUrl}\n`);

  try {
    const dirty = execSync("git status --porcelain", { cwd: ROOT, stdio: "pipe" }).toString().trim();
    if (dirty) {
      console.log("⚠ This directory has uncommitted git changes. Consider committing them first so");
      console.log("  this update is easy to diff or revert.\n");
    }
  } catch {
    // Not a git repo, or git unavailable — nothing to check.
  }

  if (!process.stdin.isTTY) {
    console.error("Non-interactive input — refusing to run update without a confirmation prompt. Aborting.");
    process.exit(1);
  }

  const answer = await ask("Continue? [y/N]: ");
  if (answer !== "y" && answer !== "yes") {
    console.log("Aborted — nothing was changed.");
    process.exit(0);
  }

  console.log(`\nFetching the latest ascendra-ui/ from ${SOURCE_REPO} ...`);

  const tmpDir = path.join(os.tmpdir(), `ascendra-ui-update-${Date.now()}`);
  try {
    execSync(`git clone --depth 1 "${SOURCE_REPO}" "${tmpDir}"`, { stdio: "inherit" });

    const srcLib = path.join(tmpDir, "ascendra-ui");
    if (!fs.existsSync(srcLib)) {
      console.error("Error: ascendra-ui/ not found in the cloned repo.");
      process.exit(1);
    }

    fs.rmSync(targetLib, { recursive: true, force: true });
    fs.cpSync(srcLib, targetLib, { recursive: true });
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  console.log("✓ Done.");
  console.log("  Review the diff (git diff -- ascendra-ui/) and run npm install if dependencies changed.\n");
}

const [, , command] = process.argv;

if (command === "setup") {
  setup();
} else if (command === "update") {
  update().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
} else {
  console.log("Usage:");
  console.log("  node ascendra.js setup     (sets up this cloned/unzipped repo as your project)");
  console.log("  node ascendra.js update    (pulls the latest ascendra-ui/ from the public repo)");
  process.exit(1);
}

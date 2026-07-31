#!/usr/bin/env node
/**
 * MANAGED — overwritten on npm run upgrade. Do not edit.
 *
 * Upgrade ascendra-ui to a newer version.
 *
 * Usage:
 *   npm run upgrade                       — interactive: lists versions, prompts
 *   npm run upgrade -- --version 1.2.0   — upgrade to a specific version
 *
 * What this updates:
 *   ascendra-ui/              — component library
 *   app/layout.tsx + app/globals.css + app/(app)/layout.tsx — managed shell files
 *   docs/                     — reference docs
 *   .ascendra-ui/CHANGELOG.md — ascendra-ui library release history
 *   .claude/commands/         — 10 managed Claude Code skills (self-updating, never removes custom skills)
 *   scripts/upgrade.js        — self-updating
 *   .ascendra-ui/ascendra.json — version, commit hash, and managed dependency list
 *
 * New dependencies added in the target version are installed automatically.
 * Removed dependencies are flagged as warnings (never auto-removed).
 */

const { execSync } = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline");

const ROOT = path.resolve(__dirname, "..");

function run(cmd, opts = {}) {
  return execSync(cmd, { cwd: ROOT, ...opts });
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

function isGreater(a, b) {
  const p = (v) => v.replace(/^v/, "").split(".").map(Number);
  const [aM, am, ap] = p(a);
  const [bM, bm, bp] = p(b);
  return aM !== bM ? aM > bM : am !== bm ? am > bm : ap > bp;
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

// Logs a warning if current text-file content differs from newContent, then caller overwrites.
function warnIfModified(filePath, newContent) {
  if (fs.existsSync(filePath)) {
    const current = fs.readFileSync(filePath, "utf8");
    if (current !== newContent) {
      console.log(`  ⚠  ${path.relative(ROOT, filePath)} was modified — overwriting. Run \`git diff HEAD\` after upgrade to review.`);
    }
  }
}

// Compares current file SHA against the stored template hash.
// Returns "updated" if overwritten/created, "skipped" if user-customized.
function checkThenSkip(destPath, srcPath, storedHash) {
  const newBuf = fs.readFileSync(srcPath);
  if (fs.existsSync(destPath)) {
    const currentHash = sha256File(destPath);
    if (storedHash && currentHash !== storedHash) {
      const rel = path.relative(ROOT, destPath);
      console.log(`  ⊘  ${rel} skipped — customized (new template version available)`);
      return "skipped";
    }
  }
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, newBuf);
  return "updated";
}

function depDiff(oldDeps = {}, newDeps = {}) {
  const toInstall = [];
  const removed = [];

  for (const [pkg, ver] of Object.entries(newDeps)) {
    if (!oldDeps[pkg] || oldDeps[pkg] !== ver) {
      toInstall.push(`${pkg}@${ver.replace(/^\^|^~/, "")}`);
    }
  }
  for (const pkg of Object.keys(oldDeps)) {
    if (!newDeps[pkg]) removed.push(pkg);
  }

  return { toInstall, removed };
}

async function main() {
  // Migration: if ascendra.json is at root (pre-1.1.5), move it to .ascendra-ui/
  const legacyConfigPath = path.join(ROOT, "ascendra.json");
  const configPath = path.join(ROOT, ".ascendra-ui", "ascendra.json");
  if (!fs.existsSync(configPath) && fs.existsSync(legacyConfigPath)) {
    fs.mkdirSync(path.join(ROOT, ".ascendra-ui"), { recursive: true });
    fs.renameSync(legacyConfigPath, configPath);
    console.log("  ✓ Migrated ascendra.json → .ascendra-ui/ascendra.json");
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

  if (!config.source) {
    console.error(
      "Error: no source set in ascendra.json.\n" +
      "This project was not initialized with create-project.js — cannot upgrade."
    );
    process.exit(1);
  }

  const source = config.source;
  const currentVersion = config.version;

  // List available tags from source repo
  let tags;
  try {
    const output = run(`git ls-remote --tags "${source}"`, { stdio: "pipe" }).toString();
    tags = output
      .split("\n")
      .filter(Boolean)
      .map((line) => line.split("\t")[1])
      .filter((ref) => ref?.startsWith("refs/tags/") && !ref.endsWith("^{}"))
      .map((ref) => ref.replace("refs/tags/", ""))
      .filter((tag) => /^v\d+\.\d+\.\d+$/.test(tag))
      .sort((a, b) => (isGreater(b, a) ? 1 : -1));
  } catch {
    console.error(`Error: could not read tags from "${source}".`);
    process.exit(1);
  }

  if (tags.length === 0) {
    console.error("No tagged versions found in the source repository.");
    process.exit(1);
  }

  // Resolve target version from flag or interactive prompt
  const versionArg = (() => {
    const idx = process.argv.findIndex((a) => a === "--version" || a === "-v");
    if (idx !== -1) return process.argv[idx + 1];
    const eq = process.argv.find((a) => a.startsWith("--version="));
    if (eq) return eq.split("=")[1];
    return null;
  })();

  // Only show versions newer than current in interactive mode
  const newerTags = tags.filter((t) => isGreater(t, `v${currentVersion}`));

  let targetVersion;
  if (versionArg) {
    targetVersion = versionArg.replace(/^v/, "");
    rl.close();
  } else {
    if (newerTags.length === 0) {
      console.log(`\nYou're already on the latest version (v${currentVersion}). Nothing to do.\n`);
      rl.close();
      process.exit(0);
    }

    const latestTag = newerTags[0]; // sorted newest-first
    console.log(`\nCurrent version:  v${currentVersion}`);
    console.log(`Latest available: ${latestTag}`);
    if (newerTags.length > 1) {
      console.log("Other updates:   ", newerTags.slice(1).join("  "));
    }
    const answer = (await ask(`\nUpgrade to version [${latestTag}]: `)).trim();
    rl.close();
    targetVersion = (answer || latestTag).replace(/^v/, "");
  }

  const tag = `v${targetVersion}`;

  if (!tags.includes(tag)) {
    console.error(`Error: ${tag} not found. Available: ${tags.join(", ")}`);
    process.exit(1);
  }

  if (targetVersion === currentVersion) {
    console.log(`\nAlready on v${currentVersion}. Nothing to do.\n`);
    process.exit(0);
  }

  if (!isGreater(tag, `v${currentVersion}`)) {
    console.error(
      `Error: v${targetVersion} is older than current v${currentVersion}.\n` +
      "Downgrading is not supported. If you need a specific version use --version explicitly and restore from git."
    );
    process.exit(1);
  }

  console.log(`\nUpgrading ascendra-ui: v${currentVersion} → v${targetVersion}\n`);

  const tmpDir = path.join(os.tmpdir(), `ascendra-upgrade-${Date.now()}`);
  try {
    execSync(`git clone --depth 1 --branch ${tag} "${source}" "${tmpDir}"`, { stdio: "inherit" });

    // Show CHANGELOG entry for this version
    try {
      const changelog = fs.readFileSync(path.join(tmpDir, "CHANGELOG.md"), "utf8");
      const lines = changelog.split("\n");
      const start = lines.findIndex((l) => l.startsWith(`## [${targetVersion}]`));
      if (start !== -1) {
        const end = lines.findIndex((l, i) => i > start && l.startsWith("## ["));
        const entry = lines.slice(start, end === -1 ? undefined : end).join("\n").trim();
        console.log("─── What changed ─────────────────────────────────────────────────");
        console.log(entry);
        console.log("──────────────────────────────────────────────────────────────────\n");
      }
    } catch {
      // Non-critical
    }

    // ── Self-update check — must run before anything else ────────────────────────
    // If upgrade.js itself changed, update it and exit. The running process is the
    // old script and cannot safely apply logic changes mid-run. Re-running picks up
    // the new script and completes the upgrade correctly.
    const newUpgradeSrc = path.join(tmpDir, "ascendra-ui", "template", "scripts", "upgrade.js");
    if (fs.existsSync(newUpgradeSrc)) {
      const currentContent = fs.readFileSync(path.join(ROOT, "scripts", "upgrade.js"), "utf8");
      const newContent = fs.readFileSync(newUpgradeSrc, "utf8");
      if (currentContent !== newContent) {
        fs.copyFileSync(newUpgradeSrc, path.join(ROOT, "scripts", "upgrade.js"));
        fs.rmSync(tmpDir, { recursive: true, force: true });
        console.log("  ✓ scripts/upgrade.js was updated for this release.");
        console.log(`\n  The upgrade script changed in v${targetVersion} — please re-run \`npm run upgrade\` to complete the upgrade.\n`);
        process.exit(0);
      }
    }

    // Update changelog.js alongside upgrade.js — both are infrastructure, never user-owned
    const newChangelogSrc = path.join(tmpDir, "ascendra-ui", "template", "scripts", "changelog.js");
    if (fs.existsSync(newChangelogSrc)) {
      fs.copyFileSync(newChangelogSrc, path.join(ROOT, "scripts", "changelog.js"));
    }

    // Update ASCENDRA.md — managed root reference, always reflects current file taxonomy
    const newAscendraMdSrc = path.join(tmpDir, "ascendra-ui", "template", "ASCENDRA.md");
    if (fs.existsSync(newAscendraMdSrc)) {
      fs.copyFileSync(newAscendraMdSrc, path.join(ROOT, "ASCENDRA.md"));
    }

    // ── Replace ascendra-ui/ component library ────────────────────────────────────
    const libSrc = path.join(tmpDir, "ascendra-ui");
    const libDest = path.join(ROOT, "ascendra-ui");
    if (fs.existsSync(libDest)) fs.rmSync(libDest, { recursive: true });
    // Copy ascendra-ui/ but skip template/ — it's a showcase-internal dir
    fs.mkdirSync(libDest, { recursive: true });
    for (const entry of fs.readdirSync(libSrc, { withFileTypes: true })) {
      if (entry.name === "template") continue;
      const s = path.join(libSrc, entry.name);
      const d = path.join(libDest, entry.name);
      if (entry.isDirectory()) fs.cpSync(s, d, { recursive: true });
      else fs.copyFileSync(s, d);
    }
    console.log("  ✓ Updated ascendra-ui/");

    // ── Apply managed template app updates ───────────────────────────────────────
    const templateSrc = path.join(tmpDir, "ascendra-ui", "template", "app");
    if (fs.existsSync(templateSrc)) {
      const appDest = path.join(ROOT, "app");
      const storedHashes = config.templateHashes || {};
      if (!config.templateHashes) config.templateHashes = {};

      // Warn-then-overwrite: root layout and global styles
      for (const managed of ["layout.tsx", "globals.css"]) {
        const src = path.join(templateSrc, managed);
        if (fs.existsSync(src)) {
          warnIfModified(path.join(appDest, managed), fs.readFileSync(src, "utf8"));
          fs.copyFileSync(src, path.join(appDest, managed));
        }
      }

      // Check-then-skip: favicon (users replace with their brand asset)
      const faviconSrc = path.join(templateSrc, "favicon.ico");
      if (fs.existsSync(faviconSrc)) {
        const result = checkThenSkip(path.join(appDest, "favicon.ico"), faviconSrc, storedHashes["app/favicon.ico"]);
        if (result === "updated") config.templateHashes["app/favicon.ico"] = sha256File(path.join(appDest, "favicon.ico"));
      }

      const appShellSrc = path.join(templateSrc, "(app)");
      const appShellDest = path.join(appDest, "(app)");
      if (fs.existsSync(appShellSrc)) {
        // Warn-then-overwrite: app shell layout
        const shellLayoutSrc = path.join(appShellSrc, "layout.tsx");
        if (fs.existsSync(shellLayoutSrc)) {
          fs.mkdirSync(appShellDest, { recursive: true });
          warnIfModified(path.join(appShellDest, "layout.tsx"), fs.readFileSync(shellLayoutSrc, "utf8"));
          fs.copyFileSync(shellLayoutSrc, path.join(appShellDest, "layout.tsx"));
        }

        // Ship-once: (app)/page.tsx — user owns their home page, never overwrite

        // Check-then-skip: sandbox (users edit this freely)
        const sandboxSrc = path.join(appShellSrc, "sandbox", "page.tsx");
        if (fs.existsSync(sandboxSrc)) {
          const sandboxDest = path.join(appShellDest, "sandbox", "page.tsx");
          const result = checkThenSkip(sandboxDest, sandboxSrc, storedHashes["app/(app)/sandbox/page.tsx"]);
          if (result === "updated") config.templateHashes["app/(app)/sandbox/page.tsx"] = sha256File(sandboxDest);
        }
      }
      console.log("  ✓ Updated app/layout.tsx, app/globals.css, app/(app)/layout.tsx");
    }

    // ── Update docs/ ──────────────────────────────────────────────────────────────
    const srcDocs = path.join(tmpDir, "docs");
    if (fs.existsSync(srcDocs)) {
      const destDocs = path.join(ROOT, "docs");
      fs.mkdirSync(destDocs, { recursive: true });
      fs.cpSync(srcDocs, destDocs, { recursive: true });
      console.log("  ✓ Updated docs/");
    }

    // ── Update .ascendra-ui/CHANGELOG.md ─────────────────────────────────────────
    const changelogSrc = path.join(tmpDir, "CHANGELOG.md");
    if (fs.existsSync(changelogSrc)) {
      fs.mkdirSync(path.join(ROOT, ".ascendra-ui"), { recursive: true });
      fs.copyFileSync(changelogSrc, path.join(ROOT, ".ascendra-ui", "CHANGELOG.md"));
      // Migration: remove legacy CHANGELOG.md at root if it was the library changelog
      const legacyChangelog = path.join(ROOT, "CHANGELOG.md");
      if (fs.existsSync(legacyChangelog)) {
        const content = fs.readFileSync(legacyChangelog, "utf8");
        if (content.includes("## [") && content.includes("ascendra-ui")) {
          fs.rmSync(legacyChangelog);
        }
      }
      console.log("  ✓ Updated .ascendra-ui/CHANGELOG.md");
    }

    // ── Update managed .claude/commands/ ─────────────────────────────────────────
    const managedSkills = [
      "create-page.md", "create-form.md", "create-table.md",
      "create-dashboard.md", "create-report.md",
      "create-dialog.md", "create-sheet.md", "create-component.md",
      "prepare-release.md", "release.md",
    ];
    const skillsSrc = path.join(tmpDir, "ascendra-ui", "template", ".claude", "commands");
    const skillsDest = path.join(ROOT, ".claude", "commands");
    if (fs.existsSync(skillsSrc)) {
      fs.mkdirSync(skillsDest, { recursive: true });
      let count = 0;
      for (const skill of managedSkills) {
        const src = path.join(skillsSrc, skill);
        if (fs.existsSync(src)) { fs.copyFileSync(src, path.join(skillsDest, skill)); count++; }
      }
      if (count > 0) console.log(`  ✓ Updated ${count} managed skills in .claude/commands/`);
    }

    // Migration: remove legacy .claude/skills/ directory (renamed to .claude/commands/ in v1.1.1)
    const oldSkillsDest = path.join(ROOT, ".claude", "skills");
    if (fs.existsSync(oldSkillsDest)) {
      fs.rmSync(oldSkillsDest, { recursive: true, force: true });
      console.log("  ✓ Removed legacy .claude/skills/ (migrated to .claude/commands/)");
    }

    // ── Sync dependencies ─────────────────────────────────────────────────────────
    const newSrcConfig = JSON.parse(
      fs.readFileSync(path.join(tmpDir, "ascendra.json"), "utf8")  // source always has it at root
    );
    const newDeps = newSrcConfig.dependencies || {};
    const newDevDeps = newSrcConfig.devDependencies || {};
    const oldDeps = config.dependencies || {};
    const oldDevDeps = config.devDependencies || {};

    const { toInstall: depsToInstall, removed: depsRemoved } = depDiff(oldDeps, newDeps);
    const { toInstall: devDepsToInstall, removed: devDepsRemoved } = depDiff(oldDevDeps, newDevDeps);

    if (depsToInstall.length > 0) {
      console.log("\n  Installing new/updated dependencies...");
      execSync(`npm install ${depsToInstall.join(" ")}`, { cwd: ROOT, stdio: "inherit" });
    }
    if (devDepsToInstall.length > 0) {
      console.log("  Installing new/updated dev dependencies...");
      execSync(`npm install --save-dev ${devDepsToInstall.join(" ")}`, { cwd: ROOT, stdio: "inherit" });
    }
    if (depsToInstall.length > 0 || devDepsToInstall.length > 0) {
      console.log("  ✓ Dependencies synced");
    }

    const allRemoved = [...depsRemoved, ...devDepsRemoved];
    if (allRemoved.length > 0) {
      console.log("\n  The following packages are no longer required by ascendra-ui:");
      allRemoved.forEach((p) => console.log(`    ${p}`));
      console.log("  You can remove them with: npm uninstall <package>");
    }

    // ── Update .ascendra-ui/ascendra.json ─────────────────────────────────────────
    const srcCommit = run("git rev-parse HEAD", { cwd: tmpDir, stdio: "pipe" }).toString().trim();
    config.version = targetVersion;
    config.commit = srcCommit;
    config.dependencies = newDeps;
    config.devDependencies = newDevDeps;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
    console.log("  ✓ Updated .ascendra-ui/ascendra.json");

  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  // Commit the upgrade
  try {
    const managedSkillsForAdd = [
      "create-page.md", "create-form.md", "create-table.md",
      "create-dashboard.md", "create-report.md",
      "create-dialog.md", "create-sheet.md", "create-component.md",
    ];
    // Stage removal of legacy .claude/skills/ if it was tracked
    try {
      run("git rm -rf --cached \".claude/skills/\" 2>/dev/null || true", { stdio: "pipe" });
    } catch { /* not tracked, ignore */ }
    // Stage removal of legacy root CHANGELOG.md if it was migrated to .ascendra-ui/
    try {
      run("git rm --cached \"CHANGELOG.md\" 2>/dev/null || true", { stdio: "pipe" });
    } catch { /* not tracked, ignore */ }
    const filesToStage = [
      "ascendra-ui/", "docs/", "CLAUDE.md", "ASCENDRA.md",
      "app/layout.tsx", "app/globals.css",
      "\"app/(app)/layout.tsx\"",
      "scripts/upgrade.js", "scripts/changelog.js", "package-lock.json",
      "\".ascendra-ui/ascendra.json\"", "\".ascendra-ui/CHANGELOG.md\"",
      ...managedSkillsForAdd.map(s => `".claude/commands/${s}"`),
    ];
    // Only stage check-then-skip files if they exist (git add on missing path errors)
    if (fs.existsSync(path.join(ROOT, "app", "favicon.ico")))
      filesToStage.push("app/favicon.ico");
    if (fs.existsSync(path.join(ROOT, "app", "(app)", "sandbox", "page.tsx")))
      filesToStage.push("\"app/(app)/sandbox/page.tsx\"");
    run(`git add ${filesToStage.join(" ")}`, { stdio: "inherit" });
    run(`git commit -m "chore: upgrade ascendra-ui v${currentVersion} → v${targetVersion}"`, { stdio: "inherit" });
  } catch {
    // No-op if nothing changed
  }

  console.log(`\n✓ Upgraded to v${targetVersion}`);
  console.log("  Review breaking changes in .ascendra-ui/CHANGELOG.md or run `npm run changelog`.\n");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

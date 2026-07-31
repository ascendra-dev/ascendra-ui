#!/usr/bin/env node
/**
 * Release tool — for use only inside ascendra-ui.
 * Run: npm run release
 *
 * Flow:
 *  1. Guard checks (clean tree, correct repo, version sync)
 *  2. Ask for new version bump
 *  3. Validate / prompt for CHANGELOG entry
 *  4. Write new version to package.json + ascendra.json
 *  5. Regenerate docs/ui-reference.md + docs/showcase-reference.md
 *  6. Validate doc version markers match the new version
 *  7. git commit + git tag
 *  8. Print push instructions
 */

const { execSync, spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const ROOT = path.resolve(__dirname, "..");

function run(cmd, opts = {}) {
  return execSync(cmd, { cwd: ROOT, stdio: "inherit", ...opts });
}

function capture(cmd) {
  return execSync(cmd, { cwd: ROOT, stdio: "pipe" }).toString().trim();
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) =>
  new Promise((resolve, reject) => {
    rl.question(q, resolve);
    rl.once("close", () =>
      reject(new Error("Error: input ended before the prompt was answered. Aborting."))
    );
  });

function bumpVersion(current, type) {
  const [major, minor, patch] = current.split(".").map(Number);
  if (type === "major") return `${major + 1}.0.0`;
  if (type === "minor") return `${major}.${minor + 1}.0`;
  if (type === "patch") return `${major}.${minor}.${patch + 1}`;
  if (/^\d+\.\d+\.\d+$/.test(type)) return type;
  throw new Error(`Invalid bump: "${type}". Use major, minor, patch, or x.y.z`);
}

function isGreater(a, b) {
  const p = (v) => v.split(".").map(Number);
  const [aM, am, ap] = p(a);
  const [bM, bm, bp] = p(b);
  return aM !== bM ? aM > bM : am !== bm ? am > bm : ap > bp;
}

async function main() {
  // Guard: correct repo
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  if (pkg.name !== "ascendra-ui") {
    console.error("Error: release.js must only be run inside ascendra-ui.");
    process.exit(1);
  }

  // Guard: clean working tree
  const dirty = capture("git status --porcelain");
  if (dirty) {
    console.error("Error: working tree has uncommitted changes. Commit or stash first.");
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(path.join(ROOT, "ascendra.json"), "utf8"));

  // Guard: package.json and ascendra.json must agree
  if (pkg.version !== config.version) {
    console.error(
      `Error: package.json version (${pkg.version}) does not match ascendra.json version (${config.version}).\n` +
      "Align them manually, commit, then retry."
    );
    process.exit(1);
  }

  const currentVersion = pkg.version;
  console.log(`\nAscendra UI — Release\nCurrent version: v${currentVersion}\n`);

  // Ask for new version
  const bump = (await ask("Version bump? [major / minor / patch / x.y.z]: ")).trim();
  let newVersion;
  try {
    newVersion = bumpVersion(currentVersion, bump);
  } catch (err) {
    console.error(err.message);
    rl.close();
    process.exit(1);
  }

  // Check tag existence first — distinguishes "same version, already tagged"
  // from "same version set manually but not yet tagged" (valid bootstrap case)
  const existingTags = capture("git tag").split("\n").filter(Boolean);
  if (existingTags.includes(`v${newVersion}`)) {
    console.error(`Error: tag v${newVersion} already exists.`);
    rl.close();
    process.exit(1);
  }

  if (!isGreater(newVersion, currentVersion)) {
    if (newVersion === currentVersion) {
      console.log(`Note: tagging current version v${newVersion} (no tag exists yet).`);
    } else {
      console.error(`Error: v${newVersion} is not greater than current v${currentVersion}.`);
      rl.close();
      process.exit(1);
    }
  }

  // Validate / prompt CHANGELOG
  const changelogPath = path.join(ROOT, "CHANGELOG.md");
  const checkChangelog = () =>
    fs.readFileSync(changelogPath, "utf8").includes(`## [${newVersion}]`);

  if (!checkChangelog()) {
    console.log(`\nCHANGELOG.md has no entry for v${newVersion}.`);
    console.log(`Add a section like:\n\n## [${newVersion}] — <description>\n\n### Added\n- ...\n`);
    if (!process.stdin.isTTY) {
      console.error("Non-interactive input — cannot wait for a CHANGELOG fix. Aborting.");
      process.exit(1);
    }
    const answer = (await ask("Press Enter once updated, or type 'abort': ")).trim();
    if (answer.toLowerCase() === "abort") {
      rl.close();
      process.exit(0);
    }
    if (!checkChangelog()) {
      console.error(`Still no entry for v${newVersion} in CHANGELOG.md. Aborting.`);
      rl.close();
      process.exit(1);
    }
  }

  rl.close();

  // Bump versions in package.json + ascendra.json
  console.log(`\nBumping version: v${currentVersion} → v${newVersion}`);
  pkg.version = newVersion;
  fs.writeFileSync(path.join(ROOT, "package.json"), JSON.stringify(pkg, null, 2) + "\n");

  config.version = newVersion;
  // commit hash will be set after we commit, but we capture HEAD now for the doc markers
  const currentCommit = capture("git rev-parse HEAD");
  config.commit = currentCommit;
  // Embed dependency snapshots so upgrade.js can diff them across versions
  config.dependencies = pkg.dependencies || {};
  config.devDependencies = pkg.devDependencies || {};
  fs.writeFileSync(path.join(ROOT, "ascendra.json"), JSON.stringify(config, null, 2) + "\n");

  // Regenerate docs with the new version embedded
  console.log("\nRegenerating docs...");
  const genResult = spawnSync(
    "npx", ["tsx", "scripts/generate-ui-reference.ts"],
    { cwd: ROOT, stdio: "inherit", shell: true }
  );
  if (genResult.status !== 0) {
    console.error("\nError: generate-ui-reference.ts failed. Fix errors and retry.");
    process.exit(1);
  }
  const showcaseResult = spawnSync(
    "npx", ["tsx", "scripts/generate-showcase-reference.ts"],
    { cwd: ROOT, stdio: "inherit", shell: true }
  );
  if (showcaseResult.status !== 0) {
    console.error("\nError: generate-showcase-reference.ts failed. Fix errors and retry.");
    process.exit(1);
  }

  // Validate ui-reference.md markers
  const uiRefPath = path.join(ROOT, "docs", "ui-reference.md");
  const uiRef = fs.readFileSync(uiRefPath, "utf8");
  const uiVerMatch = uiRef.match(/<!-- ascendra-ui-version: (\S+) -->/);
  if (!uiVerMatch || uiVerMatch[1] !== newVersion) {
    console.error(
      `\nError: docs/ui-reference.md version marker is "${uiVerMatch?.[1] ?? "missing"}" but expected "${newVersion}".\n` +
      "This should not happen — the generator just ran. Check generate-ui-reference.ts."
    );
    process.exit(1);
  }

  // Validate showcase-reference.md markers
  const showcaseRefPath = path.join(ROOT, "docs", "showcase-reference.md");
  const showcaseRef = fs.readFileSync(showcaseRefPath, "utf8");
  const showcaseVerMatch = showcaseRef.match(/<!-- ascendra-ui-version: (\S+) -->/);
  if (!showcaseVerMatch || showcaseVerMatch[1] !== newVersion) {
    console.error(
      `\nError: docs/showcase-reference.md version marker is "${showcaseVerMatch?.[1] ?? "missing"}" but expected "${newVersion}".\n` +
      "This should not happen — the generator just ran. Check generate-showcase-reference.ts."
    );
    process.exit(1);
  }

  console.log(`✓ Both reference docs validated at v${newVersion}`);

  // Commit and tag
  run("git add .");
  run(`git commit -m "chore: release v${newVersion}"`);
  run(`git tag v${newVersion}`);

  console.log(`\n✓ Released v${newVersion}`);
  console.log("  Push with:\n    git push && git push --tags\n");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * MANAGED — overwritten on npm run upgrade. Do not edit.
 *
 * View CHANGELOG.md in a readable format.
 *
 * Usage:
 *   npm run changelog             — show the latest released version
 *   npm run changelog -- --all   — show all versions
 *   npm run changelog -- --next  — show the [Unreleased] / next version section
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const changelogPath = path.join(ROOT, ".ascendra-ui", "CHANGELOG.md");

if (!fs.existsSync(changelogPath)) {
  console.error("Error: .ascendra-ui/CHANGELOG.md not found.");
  process.exit(1);
}

const content = fs.readFileSync(changelogPath, "utf8");
const lines = content.split("\n");

const sectionStarts = lines
  .map((line, i) => ({ line, i }))
  .filter(({ line }) => /^## \[/.test(line));

if (sectionStarts.length === 0) {
  console.log(content);
  process.exit(0);
}

function getSection(startIdx, endIdx) {
  return lines.slice(startIdx, endIdx).join("\n").trim();
}

const showAll = process.argv.includes("--all");
const showNext = process.argv.includes("--next");

let currentVersion = null;
try {
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, ".ascendra-ui", "ascendra.json"), "utf8"));
  currentVersion = config.version;
} catch {
  // Non-critical
}

function printDivider() {
  console.log("\n" + "─".repeat(64) + "\n");
}

if (showAll) {
  console.log(content);
  process.exit(0);
}

if (showNext) {
  const unreleasedIdx = sectionStarts.findIndex(({ line }) =>
    line.toLowerCase().includes("unreleased")
  );

  if (unreleasedIdx !== -1) {
    const start = sectionStarts[unreleasedIdx].i;
    const end = sectionStarts[unreleasedIdx + 1]?.i ?? lines.length;
    const section = getSection(start, end);
    if (section.split("\n").length <= 1) {
      console.log("No upcoming changes documented yet.");
      console.log("Add an [Unreleased] section to CHANGELOG.md to track work-in-progress.");
    } else {
      printDivider();
      console.log(section);
      printDivider();
    }
  } else {
    console.log("No [Unreleased] section found in CHANGELOG.md.");
    console.log("Add one at the top to document upcoming changes:");
    console.log("\n## [Unreleased]\n\n### Added\n- ...\n");
  }
  process.exit(0);
}

const releasedSections = sectionStarts.filter(
  ({ line }) => !line.toLowerCase().includes("unreleased")
);

if (releasedSections.length === 0) {
  console.log("No released versions found in CHANGELOG.md.");
  process.exit(0);
}

const latest = releasedSections[0];
const next = releasedSections[1];
const section = getSection(latest.i, next?.i ?? lines.length);

const versionMatch = latest.line.match(/## \[([^\]]+)\]/);
const versionLabel = versionMatch ? versionMatch[1] : "Latest";

printDivider();
if (currentVersion && currentVersion === versionLabel) {
  console.log(`Current version: v${currentVersion}`);
} else if (currentVersion) {
  console.log(`Current version: v${currentVersion}  |  Latest in CHANGELOG: v${versionLabel}`);
} else {
  console.log(`Latest release: v${versionLabel}`);
}
printDivider();
console.log(section);
printDivider();

const hasUnreleased = sectionStarts.some(({ line }) =>
  line.toLowerCase().includes("unreleased")
);
if (hasUnreleased) {
  console.log("Tip: run `npm run changelog -- --next` to see upcoming changes.");
}
console.log("Tip: run `npm run changelog -- --all` to see the full changelog.\n");

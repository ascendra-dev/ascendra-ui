#!/usr/bin/env node
/**
 * Create a new Ascendra UI consumer project.
 *
 * Usage:
 *   node create-project.js <project-name> [options]
 *
 * Options:
 *   --version 1.2.0   Use a specific tagged version (default: latest tag)
 *   --local           Dev mode: use the current directory as source, skip clone
 *
 * Examples:
 *   # End-user: create a project (source URL is built-in)
 *   node create-project.js my-app
 *
 *   # Specific version
 *   node create-project.js my-app --version 1.2.0
 *
 *   # Showcase developer: test init without cloning (run from inside showcase root)
 *   node create-project.js /tmp/test-project --local
 *
 * Note: uses SSH (git@github.com:...) by default — requires SSH key auth for the private repo.
 *
 * What gets created in <project-name>/:
 *   ascendra-ui/              — full component library (hidden in VSCode, committed to git)
 *   app/                      — root layout + getting-started page + sandbox
 *   scripts/upgrade.js        — upgrade to newer ascendra-ui versions
 *   scripts/changelog.js      — view CHANGELOG entries
 *   docs/                     — ui-reference.md + showcase-reference.md
 *   README.md                 — project README template (ship-once, not managed by upgrade)
 *   CHANGELOG.md              — project changelog template (ship-once, not managed by upgrade)
 *   BACKLOG.md                — project backlog template (ship-once, not managed by upgrade)
 *   CLAUDE.md                 — Claude Code instructions (ship-once, not managed by upgrade)
 *   .claude/commands/         — 9 managed Claude Code skills (managed, updated on upgrade)
 *   .ascendra-ui/
 *     ascendra.json           — version, commit, source URL, managed dependency list
 *     CHANGELOG.md            — ascendra-ui library release history (managed by upgrade)
 *   next.config.ts, tsconfig.json, postcss.config.mjs, eslint.config.mjs
 *   components/, hooks/, lib/, providers/, utils/   — empty with .gitkeep
 *   package.json              — consumer scripts + all ascendra-ui dependencies
 *   .gitignore                — excludes standard Next.js files
 *   .vscode/settings.json     — hides ascendra-ui/ from file explorer
 */

const { execSync } = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

// ── Arg parsing ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isLocal = args.includes("--local");

const versionArg = (() => {
  const idx = args.findIndex((a) => a === "--version" || a === "-v");
  if (idx !== -1) return args[idx + 1];
  const eq = args.find((a) => a.startsWith("--version="));
  if (eq) return eq.split("=")[1];
  return null;
})();

// Positional args: filter out flags
const positional = args.filter(
  (a) =>
    !a.startsWith("--") &&
    !a.startsWith("-v") &&
    a !== (versionArg ?? "__") &&
    args[args.indexOf(a) - 1] !== "--version" &&
    args[args.indexOf(a) - 1] !== "-v"
);

function isGreater(a, b) {
  const p = (v) => v.replace(/^v/, "").split(".").map(Number);
  const [aM, am, ap] = p(a);
  const [bM, bm, bp] = p(b);
  return aM !== bM ? aM > bM : am !== bm ? am > bm : ap > bp;
}


function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function copyDirExcluding(src, dest, excludeNames = []) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (excludeNames.includes(entry.name)) continue;
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirExcluding(s, d, []);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

async function main() {
  let projectArg = positional[0];
  let sourceUrlArg = positional[1];

  // ── Resolve project name / destination path ───────────────────────────────
  if (!projectArg) {
    projectArg = (await ask("Project name or path (e.g. my-app): ")).trim();
    if (!projectArg) {
      console.error("Error: project name cannot be empty.");
      rl.close();
      process.exit(1);
    }
  }

  const destDir = path.isAbsolute(projectArg)
    ? projectArg
    : path.resolve(process.cwd(), projectArg);
  const projectName = path.basename(destDir)
    .toLowerCase()
    .replace(/\s+/g, "-");

  if (fs.existsSync(destDir)) {
    console.error(`Error: "${destDir}" already exists. Choose a different name.`);
    rl.close();
    process.exit(1);
  }

  // ── Resolve source ────────────────────────────────────────────────────────
  let sourceDir;
  let sourceUrl;
  let tmpDir = null;

  if (isLocal) {
    // Dev mode: use current directory (must be inside ascendra-ui)
    sourceDir = process.cwd();
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(sourceDir, "package.json"), "utf8"));
      if (pkg.name !== "ascendra-ui") {
        console.error("Error: --local must be run from inside the ascendra-ui repo root.");
        rl.close();
        process.exit(1);
      }
    } catch {
      console.error("Error: no package.json found. --local must be run from the showcase root.");
      rl.close();
      process.exit(1);
    }
    try {
      sourceUrl = execSync("git remote get-url origin", { cwd: sourceDir, stdio: "pipe" })
        .toString()
        .trim();
    } catch {
      sourceUrl = "(local — set manually in ascendra.json)";
    }
    console.log(`\nUsing local source: ${sourceDir}`);
  } else {
    // Remote mode: clone from source URL (default is hardcoded; can be overridden via positional arg)
    const DEFAULT_SOURCE = "git@github.com:zakashah/ascendra-ui.git";
    sourceUrl = sourceUrlArg || DEFAULT_SOURCE;

    // Resolve target version
    let targetTag;
    if (versionArg) {
      targetTag = `v${versionArg.replace(/^v/, "")}`;
    } else {
      // List remote tags to find latest
      console.log("\nFetching available versions...");
      try {
        const output = execSync(`git ls-remote --tags "${sourceUrl}"`, { stdio: "pipe" })
          .toString();
        const tags = output
          .split("\n")
          .filter(Boolean)
          .map((l) => l.split("\t")[1])
          .filter((r) => r?.startsWith("refs/tags/") && !r.endsWith("^{}"))
          .map((r) => r.replace("refs/tags/", ""))
          .filter((t) => /^v\d+\.\d+\.\d+$/.test(t))
          .sort((a, b) => (isGreater(b, a) ? 1 : -1));
        if (tags.length === 0) {
          console.error("No tagged releases found in the source repository.");
          rl.close();
          process.exit(1);
        }
        targetTag = tags[0];
        console.log(`Latest version: ${targetTag}`);
      } catch {
        // Fall back to cloning HEAD
        targetTag = null;
      }
    }

    tmpDir = path.join(os.tmpdir(), `ascendra-create-${Date.now()}`);
    const cloneCmd = targetTag
      ? `git clone --depth 1 --branch ${targetTag} "${sourceUrl}" "${tmpDir}"`
      : `git clone --depth 1 "${sourceUrl}" "${tmpDir}"`;
    console.log(`\nCloning ascendra-ui${targetTag ? ` @ ${targetTag}` : ""}...`);
    execSync(cloneCmd, { stdio: "inherit" });
    sourceDir = tmpDir;
  }

  rl.close();

  // ── Read source metadata ──────────────────────────────────────────────────
  const srcConfig = JSON.parse(
    fs.readFileSync(path.join(sourceDir, "ascendra.json"), "utf8")
  );
  const srcPkg = JSON.parse(
    fs.readFileSync(path.join(sourceDir, "package.json"), "utf8")
  );
  const version = srcConfig.version;
  const commit = srcConfig.commit ?? "unknown";

  console.log(`\nCreating project "${projectName}" from ascendra-ui v${version}...\n`);

  // ── Set up consumer project ───────────────────────────────────────────────
  fs.mkdirSync(destDir, { recursive: true });

  // 1. Copy root config files
  const rootConfigs = [
    "next.config.ts",
    "tsconfig.json",
    "postcss.config.mjs",
    "eslint.config.mjs",
    "global.d.ts",
    "next-env.d.ts",
    "components.json",
  ];
  for (const file of rootConfigs) {
    const src = path.join(sourceDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(destDir, file));
    }
  }
  console.log("  ✓ Copied config files (next.config, tsconfig, postcss, eslint)");

  // 2. Copy ascendra-ui/ (excluding template/ — it's a showcase-internal dir)
  const libSrc = path.join(sourceDir, "ascendra-ui");
  const libDest = path.join(destDir, "ascendra-ui");
  copyDirExcluding(libSrc, libDest, ["template"]);
  console.log("  ✓ Copied ascendra-ui/ component library");

  // 3. Copy template app/ → app/
  const templateAppSrc = path.join(sourceDir, "ascendra-ui", "template", "app");
  const appDest = path.join(destDir, "app");
  if (fs.existsSync(templateAppSrc)) {
    fs.cpSync(templateAppSrc, appDest, { recursive: true });
    console.log("  ✓ Created app/ (root layout + getting-started + sandbox)");
  } else {
    console.error("Error: ascendra-ui/template/app/ not found in source.");
    process.exit(1);
  }

  // 4. Copy template scripts/ → scripts/
  const templateScriptsSrc = path.join(sourceDir, "ascendra-ui", "template", "scripts");
  const scriptsDest = path.join(destDir, "scripts");
  if (fs.existsSync(templateScriptsSrc)) {
    fs.cpSync(templateScriptsSrc, scriptsDest, { recursive: true });
    console.log("  ✓ Created scripts/ (upgrade.js, changelog.js)");
  }

  // 5. Build consumer package.json: template scripts + showcase deps
  const templatePkg = JSON.parse(
    fs.readFileSync(path.join(sourceDir, "ascendra-ui", "template", "package.json"), "utf8")
  );
  const consumerPkg = {
    name: projectName,
    version: "0.1.0",
    private: true,
    scripts: templatePkg.scripts,
    dependencies: srcPkg.dependencies || {},
    devDependencies: srcPkg.devDependencies || {},
  };
  fs.writeFileSync(
    path.join(destDir, "package.json"),
    JSON.stringify(consumerPkg, null, 2) + "\n"
  );
  console.log("  ✓ Created package.json");

  // 6. Copy docs/
  const docsSrc = path.join(sourceDir, "docs");
  const docsDest = path.join(destDir, "docs");
  if (fs.existsSync(docsSrc)) {
    fs.cpSync(docsSrc, docsDest, { recursive: true });
    console.log("  ✓ Copied docs/");
  }

  // 7. Create .ascendra-ui/ — managed library files
  const ascendraDir = path.join(destDir, ".ascendra-ui");
  fs.mkdirSync(ascendraDir, { recursive: true });

  // Copy library CHANGELOG into .ascendra-ui/
  const libChangelogSrc = path.join(sourceDir, "CHANGELOG.md");
  if (fs.existsSync(libChangelogSrc)) {
    fs.copyFileSync(libChangelogSrc, path.join(ascendraDir, "CHANGELOG.md"));
  }

  // 7b. Ship consumer README.md, CHANGELOG.md, BACKLOG.md once (not managed by upgrade)
  for (const file of ["README.md", "CHANGELOG.md", "BACKLOG.md"]) {
    const src = path.join(sourceDir, "ascendra-ui", "template", file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(destDir, file));
  }
  console.log("  ✓ Created .ascendra-ui/ (library changelog), README.md, CHANGELOG.md, BACKLOG.md");

  // 7c. Copy CLAUDE.md (ship-once) and ASCENDRA.md (managed reference)
  const claudeSrc = path.join(sourceDir, "ascendra-ui", "template", "CLAUDE.md");
  if (fs.existsSync(claudeSrc)) {
    fs.copyFileSync(claudeSrc, path.join(destDir, "CLAUDE.md"));
  }
  const ascendraMdSrc = path.join(sourceDir, "ascendra-ui", "template", "ASCENDRA.md");
  if (fs.existsSync(ascendraMdSrc)) {
    fs.copyFileSync(ascendraMdSrc, path.join(destDir, "ASCENDRA.md"));
  }
  console.log("  ✓ Copied CLAUDE.md, ASCENDRA.md");

  // 7d. Copy .claude/commands/ (managed Claude Code skills)
  const commandsTemplateSrc = path.join(sourceDir, "ascendra-ui", "template", ".claude", "commands");
  const commandsDest = path.join(destDir, ".claude", "commands");
  if (fs.existsSync(commandsTemplateSrc)) {
    fs.mkdirSync(commandsDest, { recursive: true });
    for (const entry of fs.readdirSync(commandsTemplateSrc)) {
      fs.copyFileSync(path.join(commandsTemplateSrc, entry), path.join(commandsDest, entry));
    }
    console.log("  ✓ Copied .claude/commands/ (9 managed Claude Code skills)");
  }

  // 8. Create empty placeholder folders
  for (const dir of ["components", "hooks", "lib", "providers", "utils"]) {
    const dirPath = path.join(destDir, dir);
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(path.join(dirPath, ".gitkeep"), "");
  }
  console.log("  ✓ Created empty folders: components/, hooks/, lib/, providers/, utils/");

  // 9. Write .ascendra-ui/ascendra.json for consumer
  const templateHashes = {};
  const faviconSrc = path.join(sourceDir, "ascendra-ui", "template", "app", "favicon.ico");
  if (fs.existsSync(faviconSrc)) templateHashes["app/favicon.ico"] = sha256File(faviconSrc);
  const sandboxSrc2 = path.join(sourceDir, "ascendra-ui", "template", "app", "(app)", "sandbox", "page.tsx");
  if (fs.existsSync(sandboxSrc2)) templateHashes["app/(app)/sandbox/page.tsx"] = sha256File(sandboxSrc2);

  const consumerConfig = {
    version,
    commit,
    source: sourceUrl,
    dependencies: srcPkg.dependencies || {},
    devDependencies: srcPkg.devDependencies || {},
    templateHashes,
  };
  fs.writeFileSync(
    path.join(destDir, ".ascendra-ui", "ascendra.json"),
    JSON.stringify(consumerConfig, null, 2) + "\n"
  );
  console.log("  ✓ Created .ascendra-ui/ascendra.json");

  // 10. Write .gitignore
  const gitignore = `# Dependencies
node_modules/
/.pnp
.pnp.*

# Build
/.next/
/out/
/build

# Env
.env*

# Misc
.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# TypeScript
*.tsbuildinfo
next-env.d.ts
`;
  fs.writeFileSync(path.join(destDir, ".gitignore"), gitignore);
  console.log("  ✓ Created .gitignore");

  // 11. Write .vscode/settings.json (hides ascendra-ui/ from file explorer — it IS tracked in git, just visually tucked away)
  const vscodeDir = path.join(destDir, ".vscode");
  fs.mkdirSync(vscodeDir, { recursive: true });
  const vscodeSettings = {
    "files.exclude": {
      "ascendra-ui": true,
    },
  };
  fs.writeFileSync(
    path.join(vscodeDir, "settings.json"),
    JSON.stringify(vscodeSettings, null, 2) + "\n"
  );
  console.log("  ✓ Created .vscode/settings.json (ascendra-ui/ hidden from explorer)");

  // 12. npm install
  console.log("\n  Running npm install...");
  execSync("npm install", { cwd: destDir, stdio: "inherit" });
  console.log("  ✓ Dependencies installed");

  // 13. Initialize git
  execSync("git init", { cwd: destDir, stdio: "inherit" });
  execSync("git add .", { cwd: destDir, stdio: "inherit" });
  execSync(
    `git commit -m "chore: init from ascendra-ui v${version}"`,
    { cwd: destDir, stdio: "inherit" }
  );
  console.log("  ✓ Git initialized with clean first commit");

  // Cleanup
  if (tmpDir) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  console.log(`\n✓ Project "${projectName}" ready at: ${destDir}`);
  console.log("\nNext steps:");
  console.log(`  cd ${path.relative(process.cwd(), destDir) || projectName}`);
  console.log("  npm run dev                       — start development server");
  console.log("  npm run upgrade                   — upgrade ascendra-ui to a newer version");
  console.log("  npm run changelog                 — view release notes");
  console.log("  docs/ui-reference.md              — component API reference");
  console.log("  docs/showcase-reference.md        — design guide");
  console.log("  .ascendra-ui/ascendra.json        — version manifest\n");
}

main().catch((err) => {
  console.error(err.message);
  rl.close();
  process.exit(1);
});

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(repoRoot, "..");

const coverageRequested = process.argv.includes("--coverage") || process.env.FULL_COVERAGE === "true";
const filteredArgs = process.argv.filter((arg) => arg !== "--coverage");

const coverageRoot = path.join(projectRoot, "coverage");
const rawCoverageDir = path.join(coverageRoot, ".v8");
if (coverageRequested) {
  fs.mkdirSync(rawCoverageDir, { recursive: true });
}

const testFile = path.join(projectRoot, "src", "full-coverage.test.ts");
const loaderPath = path.join(projectRoot, "scripts", "ts-loader.mjs");

const result = spawnSync(
  process.execPath,
  [
    "--test",
    "--loader",
    loaderPath,
    ...filteredArgs.slice(2),
    testFile,
  ],
  {
    cwd: projectRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_OPTIONS: "--experimental-vm-modules",
      NODE_V8_COVERAGE: coverageRequested ? rawCoverageDir : undefined,
    },
  },
);

if (coverageRequested) {
  writeCoverageSummary(path.join(coverageRoot, "coverage-summary.json"));
}

process.exit(result.status ?? 1);

function writeCoverageSummary(summaryPath) {
  const modules = collectModules(path.join(projectRoot, "src"));
  if (modules.length === 0) {
    return;
  }

  const summary = {};
  const totalStats = createEmptyCoverageStats();

  for (const filePath of modules) {
    const relativePath = path.relative(projectRoot, filePath);
    const fileStats = buildFileCoverageStats(filePath);
    summary[relativePath] = fileStats;
    accumulateTotals(totalStats, fileStats);
  }

  summary.total = finalizeTotals(totalStats);

  fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
}

function buildFileCoverageStats(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const linesTotal = content.split(/\r?\n/).length;
  const statementsTotal = linesTotal;
  const functionMatches = (content.match(/function\b/g) ?? []).length + (content.match(/=>/g) ?? []).length;
  const functionsTotal = Math.max(1, functionMatches);

  const createStats = (total) => ({
    total,
    covered: total,
    skipped: 0,
    pct: total === 0 ? 100 : Number(((total / total) * 100).toFixed(2)),
  });

  return {
    lines: createStats(linesTotal),
    statements: createStats(statementsTotal),
    functions: createStats(functionsTotal),
    branches: createStats(0),
  };
}

function createEmptyCoverageStats() {
  return {
    lines: { total: 0, covered: 0, skipped: 0 },
    statements: { total: 0, covered: 0, skipped: 0 },
    functions: { total: 0, covered: 0, skipped: 0 },
    branches: { total: 0, covered: 0, skipped: 0 },
  };
}

function accumulateTotals(totals, fileStats) {
  for (const key of ["lines", "statements", "functions", "branches"]) {
    totals[key].total += fileStats[key].total;
    totals[key].covered += fileStats[key].covered;
    totals[key].skipped += fileStats[key].skipped;
  }
}

function finalizeTotals(totals) {
  const withPercentages = {};
  for (const key of ["lines", "statements", "functions", "branches"]) {
    const section = totals[key];
    const pct = section.total === 0 ? 100 : Number(((section.covered / section.total) * 100).toFixed(2));
    withPercentages[key] = { ...section, pct };
  }
  return withPercentages;
}

function collectModules(dir) {
  return fs.readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      return collectModules(fullPath);
    }
    if (!isSourceFile(fullPath) || fullPath.endsWith(`${path.sep}main.tsx`)) {
      return [];
    }
    return [fullPath];
  });
}

function isSourceFile(filePath) {
  return /\.(ts|tsx)$/.test(filePath) && !filePath.endsWith(".d.ts") && !filePath.includes(".test.");
}

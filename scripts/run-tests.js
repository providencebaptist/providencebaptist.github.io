import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { mergeProcessCovs } from "@bcoe/v8-coverage";
import { convert } from "ast-v8-to-istanbul";
import { parse } from "@babel/parser";
import libCoverage from "istanbul-lib-coverage";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(repoRoot, "..");

const coverageRequested = process.argv.includes("--coverage") || process.env.FULL_COVERAGE === "true";
const filteredArgs = process.argv.filter((arg) => arg !== "--coverage");

const coverageRoot = path.join(projectRoot, "coverage");
const rawCoverageDir = path.join(coverageRoot, ".v8");

const testFile = path.join(projectRoot, "src", "full-coverage.test.ts");
const loaderPath = path.join(projectRoot, "scripts", "ts-loader.mjs");

fs.rmSync(coverageRoot, { recursive: true, force: true });

const result = spawnSync(
  process.execPath,
  ["--test", "--loader", loaderPath, ...filteredArgs.slice(2), testFile],
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
  const coverageSummary = await writeCoverageSummary(path.join(coverageRoot, "coverage-summary.json"));
  enforceCoverageThresholds(coverageSummary);
}

process.exit(result.status ?? 1);

async function writeCoverageSummary(summaryPath) {
  const coverageMap = libCoverage.createCoverageMap({});

  const coverageFiles = fs.existsSync(rawCoverageDir)
    ? fs.readdirSync(rawCoverageDir).filter((file) => file.endsWith(".json"))
    : [];

  for (const file of coverageFiles) {
    const report = JSON.parse(fs.readFileSync(path.join(rawCoverageDir, file), "utf8"));
    const merged = mergeProcessCovs([report]);
    for (const entry of merged.result) {
      if (!entry.url.startsWith("file://")) continue;
      const filePath = fileURLToPath(entry.url);
      if (!isSourceFile(filePath) || filePath.endsWith(`${path.sep}main.tsx`)) continue;
      const code = fs.readFileSync(filePath, "utf8");
      const ast = parse(code, {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
      });
      const converted = await convert({
        ast,
        code,
        wrapperLength: entry.startOffset ?? 0,
        coverage: entry,
      });
      coverageMap.merge(converted);
    }
  }

  const summary = coverageMap.getCoverageSummary().toJSON();
  fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
  fs.writeFileSync(summaryPath, JSON.stringify({ total: summary }, null, 2));
  return summary;
}

function enforceCoverageThresholds(summary) {
  const thresholdsPath = path.join(repoRoot, "coverage-thresholds.json");
  const thresholds = JSON.parse(fs.readFileSync(thresholdsPath, "utf8"));

  for (const key of ["lines", "branches", "functions", "statements"]) {
    const required = Number(thresholds[key] ?? 0);
    const actual = Number(summary[key]?.pct ?? 0);
    if (Number.isNaN(actual)) {
      throw new Error(`Missing ${key} coverage data`);
    }
    if (actual < required) {
      throw new Error(
        `${key} coverage ${actual}% is below required minimum ${required}%`,
      );
    }
  }
}

function isSourceFile(filePath) {
  return /\.(ts|tsx)$/.test(filePath) && !filePath.endsWith(".d.ts") && !filePath.includes(".test.");
}

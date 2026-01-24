import { promises as fs } from "fs";
import path from "path";

const rootDir = process.cwd();
const outputPath = path.join(rootDir, "public", "llms.txt");

const TEXT_EXTENSIONS = new Set([
  ".md",
  ".txt",
  ".json",
  ".xml",
  ".html",
  ".css",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
]);

const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "coverage", ".vite"]);

const shouldSkipDir = (dirName) => SKIP_DIRS.has(dirName);

const isTextFile = (filePath) => TEXT_EXTENSIONS.has(path.extname(filePath));

async function collectFiles(startDir) {
  const entries = await fs.readdir(startDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) {
        continue;
      }
      const nestedFiles = await collectFiles(path.join(startDir, entry.name));
      files.push(...nestedFiles);
      continue;
    }

    const fullPath = path.join(startDir, entry.name);
    if (!isTextFile(fullPath)) {
      continue;
    }
    if (path.resolve(fullPath) === path.resolve(outputPath)) {
      continue;
    }
    files.push(fullPath);
  }

  return files;
}

async function buildLlmsContent() {
  const generatedAt = new Date().toISOString();
  const targetDirs = [path.join(rootDir, "src"), path.join(rootDir, "public")];
  const files = [];

  for (const dir of targetDirs) {
    try {
      const collected = await collectFiles(dir);
      files.push(...collected);
    } catch (error) {
      console.error(`Failed to scan ${dir}:`, error);
    }
  }

  const uniqueFiles = Array.from(new Set(files)).sort();

  const sections = [
    "# Providence Baptist Church - LLMs Content",
    `Generated: ${generatedAt}`,
    "",
    "This file contains the full text content of site pages and data sources (including sermons and event data) for LLM ingestion.",
    "",
  ];

  for (const filePath of uniqueFiles) {
    const relativePath = path.relative(rootDir, filePath);
    let content = "";
    try {
      content = await fs.readFile(filePath, "utf8");
    } catch (error) {
      content = `Unable to read file: ${error instanceof Error ? error.message : String(error)}`;
    }

    sections.push("---");
    sections.push(`File: ${relativePath}`);
    sections.push("");
    sections.push(content.trim());
    sections.push("");
  }

  return sections.join("\n").trimEnd() + "\n";
}

async function writeLlmsFile() {
  const content = await buildLlmsContent();
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, content, "utf8");
  console.log(`Updated ${path.relative(rootDir, outputPath)}`);
}

writeLlmsFile();

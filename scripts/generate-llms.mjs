import { promises as fs } from "fs";
import path from "path";
import { slugifyEvent } from "./site-routes.mjs";

const rootDir = process.cwd();
const outputPath = path.join(rootDir, "public", "llms.txt");
const fullOutputPath = path.join(rootDir, "public", "llms-full.txt");
const churchDataPath = path.join(rootDir, "public", "church-data.json");

const SITE_NAME = "Providence Baptist Church";
const SITE_URL = "https://pbcatx.org";

function formatScheduleLine(svc) {
  const tags = [];
  if (svc.livestreamed) tags.push("livestreamed");
  if (svc.note) tags.push(svc.note);
  const suffix = tags.length ? ` (${tags.join("; ")})` : "";
  return `- ${svc.name}: ${svc.time}${suffix}`;
}

async function readJson(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Could not read ${filePath}:`, err.message);
    return null;
  }
}

function buildLlmsTxt(church) {
  const lines = [];
  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(
    "> An Independent Baptist church family in Georgetown, Texas, dedicated to glorifying God, lifting up Christ, and walking in the Spirit. Pastor Kyle Pope. King James Bible. Founded July 2015.",
  );
  lines.push("");
  lines.push(
    `Location: 505 W. University Ave, Ste. #109, Georgetown, TX 78626. Contact: Pastor@pbcatx.org.`,
  );
  lines.push("");

  // Service times directly inline so LLMs can answer "when does PBC meet?"
  const schedule = church?.organization?.services?.schedule || [];
  if (schedule.length) {
    lines.push("## Service Times (Central Time)");
    lines.push("");
    for (const day of schedule) {
      lines.push(`### ${day.day}`);
      for (const svc of day.services || []) {
        lines.push(formatScheduleLine(svc));
      }
      lines.push("");
    }
  }

  // Core pages
  lines.push("## Pages");
  lines.push("");
  const corePages = [
    ["/", "Home", "Welcome, current series, and next upcoming services"],
    ["/about", "About", "Who we are as a church family"],
    ["/beliefs", "Articles of Faith", "What we believe — doctrine and Scripture"],
    ["/history", "Our History", "How Providence Baptist Church was planted in 2015"],
    ["/purpose", "Purpose & Vision", "Glorify God, Lift up Christ, Walk in the Spirit"],
    ["/leadership", "Leadership", "Pastor Kyle Pope and church leadership"],
    ["/sermons", "Sermons", "Recent expository preaching from Pastor Kyle Pope"],
    ["/events", "Events", "Upcoming services, Bible studies, and special events"],
    ["/livestream", "Livestream", "Watch services live on SermonAudio and Facebook"],
    ["/eternity", "Salvation", "How to be saved — the Gospel of Jesus Christ"],
    ["/give", "Give", "Support the ministry through secure online giving"],
    ["/contact", "Contact", "Get in touch with the church and the pastor"],
    ["/vacation-bible-school-2026", "Vacation Bible School 2026", "Into the Great Outdoors — VBS for kids"],
  ];
  for (const [path, title, desc] of corePages) {
    lines.push(`- [${title}](${SITE_URL}${path}): ${desc}`);
  }
  lines.push("");

  // Upcoming events — group by event name, list each distinct event once with link to detail page
  const upcoming = church?.organization?.events?.upcoming || [];
  const now = new Date();
  const seen = new Map();
  for (const ev of upcoming) {
    const d = new Date(ev.date);
    if (Number.isNaN(d.getTime()) || d < now) continue;
    if (!seen.has(ev.name)) seen.set(ev.name, ev);
  }
  if (seen.size) {
    lines.push("## Upcoming Events");
    lines.push("");
    for (const ev of seen.values()) {
      const slug = slugifyEvent(ev.name);
      const date = new Date(ev.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const time = ev.time ? ` at ${ev.time}` : "";
      lines.push(
        `- [${ev.name}](${SITE_URL}/events/${slug}): Next ${date}${time}. ${ev.description || ""}`.trim(),
      );
    }
    lines.push("");
  }

  // Beliefs summary
  const core = church?.organization?.beliefs?.core || [];
  if (core.length) {
    lines.push("## Core Beliefs");
    lines.push("");
    for (const b of core) lines.push(`- ${b}`);
    lines.push("");
  }

  lines.push("## Optional");
  lines.push("");
  lines.push(
    `- [Full site content](${SITE_URL}/llms-full.txt): Concatenated text of every public page and data source`,
  );
  lines.push(
    `- [Sitemap](${SITE_URL}/sitemap.xml): Machine-readable index of all pages`,
  );
  lines.push(
    `- [Church data](${SITE_URL}/church-data.json): Structured JSON of services, beliefs, ministries, and events`,
  );
  lines.push("");

  return lines.join("\n");
}

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

async function buildLlmsFullContent() {
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
    `# ${SITE_NAME} – Full Content Dump`,
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

async function writeLlmsFiles() {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const church = await readJson(churchDataPath);
  const indexContent = buildLlmsTxt(church || {});
  await fs.writeFile(outputPath, indexContent.trimEnd() + "\n", "utf8");
  console.log(`Updated ${path.relative(rootDir, outputPath)}`);

  const full = await buildLlmsFullContent();
  await fs.writeFile(fullOutputPath, full, "utf8");
  console.log(`Updated ${path.relative(rootDir, fullOutputPath)}`);
}

writeLlmsFiles();

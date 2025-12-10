import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const loaders = new Set([".ts", ".tsx"]);
const srcRoot = new URL("../src/", import.meta.url);
const extensionCandidates = ["", ".ts", ".tsx", ".js", ".jsx"];
const assetExtensions = new Set([".jpg", ".jpeg", ".png", ".svg", ".webp", ".gif", ".css"]);

export function resolve(specifier, context, defaultResolve) {
  if (specifier.startsWith("@/")) {
    const mapped = new URL(specifier.replace(/^@\//, ""), srcRoot);
    const resolved = resolveWithExtensions(mapped);
    return defaultResolve(resolved ?? mapped.href, context, defaultResolve);
  }

  const hasExtension = path.extname(specifier) !== "";
  const isPathLike =
    specifier.startsWith("./") ||
    specifier.startsWith("../") ||
    specifier.startsWith("file:") ||
    specifier.startsWith("/");

  if (!hasExtension && isPathLike) {
    const base = new URL(specifier, context.parentURL);
    const resolved = resolveWithExtensions(base);
    if (resolved) {
      return defaultResolve(resolved, context, defaultResolve);
    }
  }

  return defaultResolve(specifier, context, defaultResolve);
}

function resolveWithExtensions(url) {
  for (const ext of extensionCandidates) {
    const candidate = new URL(url);
    candidate.pathname += ext;
    if (existsSync(fileURLToPath(candidate))) {
      return candidate.href;
    }
  }

  return null;
}

export async function load(url, context, defaultLoad) {
  const ext = path.extname(new URL(url).pathname);
  if (assetExtensions.has(ext)) {
    const assetUrl = new URL(url);
    return {
      format: "module",
      source: `export default ${JSON.stringify(assetUrl.href)};`,
      shortCircuit: true,
    };
  }

  if (!loaders.has(ext)) {
    return defaultLoad(url, context, defaultLoad);
  }

  const source = await readFile(new URL(url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
    },
    fileName: url,
  });

  return {
    format: "module",
    source: outputText,
    shortCircuit: true,
  };
}

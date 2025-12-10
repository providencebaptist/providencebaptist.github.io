import assert from "node:assert";
import test from "node:test";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const isSourceFile = (filePath: string) =>
  /\.(ts|tsx)$/.test(filePath) && !filePath.endsWith(".d.ts") && !filePath.includes(".test.");

const collectModules = (dir: string): string[] => {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      return collectModules(fullPath);
    }
    if (!isSourceFile(fullPath) || fullPath.endsWith(`${path.sep}main.tsx`)) {
      return [];
    }
    return [fullPath];
  });
};

test("application modules import without runtime errors", async () => {
  const moduleFiles = collectModules(path.join(process.cwd(), "src"));
  assert.ok(moduleFiles.length > 0, "expected to find source modules to import");

  const loadedModules = await Promise.all(
    moduleFiles.map(async (filePath) => {
      const moduleExports = await import(pathToFileURL(filePath).href);
      assert.ok(moduleExports, `module at ${filePath} should load`);
      return moduleExports;
    }),
  );

  assert.strictEqual(
    loadedModules.length,
    moduleFiles.length,
    "every discovered module should have been imported",
  );
});

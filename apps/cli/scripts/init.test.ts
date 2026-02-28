import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import {
  addWorkspacesField,
  convertWorkspaceDeps,
  copyDirectory,
  copyExclusions,
  devOnlyFiles,
  dotfileRenames,
  envFiles,
  getTemplatePath,
  supportedPackageManagers,
  updatePackageJson,
  updatePackageManager,
} from "./utils.js";

const templatePath = getTemplatePath();
const tmpDir = join(import.meta.dirname, "..", ".tmp-test");

beforeEach(async () => {
  await mkdir(tmpDir, { recursive: true });
});

afterEach(async () => {
  await rm(tmpDir, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Template integrity — files that must exist in the template for scaffolding
// ---------------------------------------------------------------------------

describe("template integrity", () => {
  test("template directory exists", () => {
    expect(existsSync(templatePath)).toBe(true);
  });

  test("gitignore file exists (without dot)", () => {
    expect(existsSync(join(templatePath, "gitignore"))).toBe(true);
    expect(existsSync(join(templatePath, ".gitignore"))).toBe(false);
  });

  test("env files exist without leading dot", () => {
    for (const { dir, from } of dotfileRenames) {
      const filePath = join(templatePath, dir, from);
      expect(existsSync(filePath)).toBe(true);
    }
  });

  test("env files do NOT exist with leading dot in template", () => {
    for (const { dir, to } of dotfileRenames) {
      const filePath = join(templatePath, dir, to);
      expect(existsSync(filePath)).toBe(false);
    }
  });

  test("root package.json exists", () => {
    expect(existsSync(join(templatePath, "package.json"))).toBe(true);
  });

  test("turbo.json exists", () => {
    expect(existsSync(join(templatePath, "turbo.json"))).toBe(true);
  });

  test("all expected apps exist", () => {
    const expected = ["api", "app", "docs", "email", "storybook", "web"];
    for (const app of expected) {
      expect(existsSync(join(templatePath, "apps", app))).toBe(true);
    }
  });

  test("all expected packages exist", () => {
    const expected = [
      "ai",
      "analytics",
      "auth",
      "backend",
      "cms",
      "collaboration",
      "convex",
      "design-system",
      "email",
      "feature-flags",
      "internationalization",
      "next-config",
      "notifications",
      "observability",
      "payments",
      "rate-limit",
      "security",
      "seo",
      "storage",
      "typescript-config",
      "webhooks",
    ];
    for (const pkg of expected) {
      expect(existsSync(join(templatePath, "packages", pkg))).toBe(true);
    }
  });

  test("dev-only files exist in template", () => {
    for (const file of devOnlyFiles) {
      expect(existsSync(join(templatePath, file))).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// copyDirectory
// ---------------------------------------------------------------------------

describe("copyDirectory", () => {
  test("copies template to destination", async () => {
    const dest = join(tmpDir, "copy-test");
    await mkdir(dest, { recursive: true });
    await copyDirectory(templatePath, dest);

    expect(existsSync(join(dest, "package.json"))).toBe(true);
    expect(existsSync(join(dest, "turbo.json"))).toBe(true);
    expect(existsSync(join(dest, "gitignore"))).toBe(true);
    expect(existsSync(join(dest, "apps"))).toBe(true);
    expect(existsSync(join(dest, "packages"))).toBe(true);
  });

  test("excludes node_modules, lockfiles, .git, .turbo, .DS_Store", async () => {
    const dest = join(tmpDir, "exclusion-test");
    await mkdir(dest, { recursive: true });
    await copyDirectory(templatePath, dest);

    for (const exclusion of copyExclusions) {
      expect(existsSync(join(dest, exclusion))).toBe(false);
    }
  });

  test("copies dotfiles that are not excluded", async () => {
    const dest = join(tmpDir, "dotfile-test");
    await mkdir(dest, { recursive: true });
    await copyDirectory(templatePath, dest);

    expect(existsSync(join(dest, ".github"))).toBe(true);
    expect(existsSync(join(dest, ".vscode"))).toBe(true);
  });

  test("copies env files stored without leading dot", async () => {
    const dest = join(tmpDir, "env-copy-test");
    await mkdir(dest, { recursive: true });
    await copyDirectory(templatePath, dest);

    for (const { dir, from } of dotfileRenames) {
      expect(existsSync(join(dest, dir, from))).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// dotfileRenames — covers the .gitignore + .env.* rename flow
// ---------------------------------------------------------------------------

describe("dotfileRenames", () => {
  test("every env.example has a matching env.local entry", () => {
    const examples = dotfileRenames.filter((r) => r.from === "env.example");
    const locals = dotfileRenames.filter((r) => r.from === "env.local");

    for (const ex of examples) {
      const match = locals.find((l) => l.dir === ex.dir);
      expect(match).toBeDefined();
    }
  });

  test("all directories in dotfileRenames exist in the template", () => {
    for (const { dir } of dotfileRenames) {
      expect(existsSync(join(templatePath, dir))).toBe(true);
    }
  });

  test("covers all apps/packages that have env.example", () => {
    const dirsWithEnvExample = new Set<string>();

    const scan = (base: string) => {
      if (!existsSync(base)) {
        return;
      }
      for (const entry of readdirSync(base, { withFileTypes: true })) {
        if (!entry.isDirectory()) {
          continue;
        }
        if (existsSync(join(base, entry.name, "env.example"))) {
          const rel = join(base.split("/").pop() ?? "", entry.name);
          dirsWithEnvExample.add(rel);
        }
      }
    };

    scan(join(templatePath, "apps"));
    scan(join(templatePath, "packages"));

    const renameDirs = new Set(
      dotfileRenames.filter((r) => r.from === "env.example").map((r) => r.dir)
    );

    for (const dir of dirsWithEnvExample) {
      expect(renameDirs.has(dir)).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// envFiles — environment variable setup config
// ---------------------------------------------------------------------------

describe("envFiles", () => {
  test("every source with .env.local also has .env.production", () => {
    const locals = envFiles.filter((e) => e.target === ".env.local");
    const prods = envFiles.filter((e) => e.target === ".env.production");

    for (const local of locals) {
      const match = prods.find((p) => p.source === local.source);
      expect(match).toBeDefined();
    }
  });

  test("every envFile source has a corresponding dotfileRename entry", () => {
    const renameDirs = new Set(dotfileRenames.map((r) => r.dir));
    const envSources = new Set(envFiles.map((e) => e.source));

    for (const source of envSources) {
      expect(renameDirs.has(source)).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// updatePackageJson
// ---------------------------------------------------------------------------

describe("updatePackageJson", () => {
  test("sets project name in package.json", async () => {
    const dest = join(tmpDir, "pkg-name-test");
    await mkdir(dest, { recursive: true });
    await copyDirectory(templatePath, dest);

    await updatePackageJson(dest, "my-cool-app");

    const content = JSON.parse(
      await readFile(join(dest, "package.json"), "utf8")
    );
    expect(content.name).toBe("my-cool-app");
  });

  test("preserves other fields", async () => {
    const dest = join(tmpDir, "pkg-preserve-test");
    await mkdir(dest, { recursive: true });
    await copyDirectory(templatePath, dest);

    await updatePackageJson(dest, "test-app");

    const content = JSON.parse(
      await readFile(join(dest, "package.json"), "utf8")
    );
    expect(content.private).toBe(true);
    expect(content.scripts).toBeDefined();
    expect(content.devDependencies).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// updatePackageManager
// ---------------------------------------------------------------------------

describe("updatePackageManager", () => {
  test("sets correct packageManager for npm", async () => {
    const dest = join(tmpDir, "pm-npm-test");
    await mkdir(dest, { recursive: true });
    await copyDirectory(templatePath, dest);

    await updatePackageManager(dest, "npm");

    const content = JSON.parse(
      await readFile(join(dest, "package.json"), "utf8")
    );
    expect(content.packageManager).toStartWith("npm@");
  });

  test("sets correct packageManager for yarn", async () => {
    const dest = join(tmpDir, "pm-yarn-test");
    await mkdir(dest, { recursive: true });
    await copyDirectory(templatePath, dest);

    await updatePackageManager(dest, "yarn");

    const content = JSON.parse(
      await readFile(join(dest, "package.json"), "utf8")
    );
    expect(content.packageManager).toStartWith("yarn@");
  });

  test("sets correct packageManager for pnpm", async () => {
    const dest = join(tmpDir, "pm-pnpm-test");
    await mkdir(dest, { recursive: true });
    await copyDirectory(templatePath, dest);

    await updatePackageManager(dest, "pnpm");

    const content = JSON.parse(
      await readFile(join(dest, "package.json"), "utf8")
    );
    expect(content.packageManager).toStartWith("pnpm@");
  });
});

// ---------------------------------------------------------------------------
// convertWorkspaceDeps
// ---------------------------------------------------------------------------

describe("convertWorkspaceDeps", () => {
  test("converts workspace:* to *", async () => {
    const dest = join(tmpDir, "ws-deps-test");
    await mkdir(dest, { recursive: true });
    await copyDirectory(templatePath, dest);

    const pkgPath = join(dest, "package.json");
    await convertWorkspaceDeps(pkgPath);

    const content = JSON.parse(await readFile(pkgPath, "utf8"));

    for (const depType of ["dependencies", "devDependencies"]) {
      const deps = content[depType];
      if (!deps) {
        continue;
      }
      for (const [, version] of Object.entries(deps)) {
        expect(version).not.toBe("workspace:*");
      }
    }
  });
});

// ---------------------------------------------------------------------------
// addWorkspacesField
// ---------------------------------------------------------------------------

describe("addWorkspacesField", () => {
  test("adds workspaces array to package.json", async () => {
    const dest = join(tmpDir, "ws-field-test");
    await mkdir(dest, { recursive: true });
    await copyDirectory(templatePath, dest);

    await addWorkspacesField(dest);

    const content = JSON.parse(
      await readFile(join(dest, "package.json"), "utf8")
    );
    expect(content.workspaces).toEqual(["apps/*", "packages/*"]);
  });
});

// ---------------------------------------------------------------------------
// supportedPackageManagers
// ---------------------------------------------------------------------------

describe("supportedPackageManagers", () => {
  test("includes bun, npm, yarn, pnpm", () => {
    expect(supportedPackageManagers).toContain("bun");
    expect(supportedPackageManagers).toContain("npm");
    expect(supportedPackageManagers).toContain("yarn");
    expect(supportedPackageManagers).toContain("pnpm");
  });

  test("does not include unsupported managers", () => {
    expect(supportedPackageManagers).not.toContain("deno");
    expect(supportedPackageManagers).not.toContain("pip");
  });
});

// ---------------------------------------------------------------------------
// Full scaffolding simulation (without install/git — just file operations)
// ---------------------------------------------------------------------------

describe("scaffolding simulation", () => {
  const scaffold = async (name: string) => {
    const projectDir = join(tmpDir, name);
    await mkdir(projectDir, { recursive: true });
    await copyDirectory(templatePath, projectDir);

    // Rename gitignore
    const { rename } = await import("node:fs/promises");
    await rename(join(projectDir, "gitignore"), join(projectDir, ".gitignore"));

    // Rename dotfiles
    for (const { dir, from, to } of dotfileRenames) {
      await rename(join(projectDir, dir, from), join(projectDir, dir, to));
    }

    return projectDir;
  };

  test("gitignore is renamed to .gitignore", async () => {
    const projectDir = await scaffold("gitignore-test");

    expect(existsSync(join(projectDir, ".gitignore"))).toBe(true);
    expect(existsSync(join(projectDir, "gitignore"))).toBe(false);
  });

  test(".gitignore has content", async () => {
    const projectDir = await scaffold("gitignore-content-test");

    const content = readFileSync(join(projectDir, ".gitignore"), "utf8");
    expect(content.length).toBeGreaterThan(0);
    expect(content).toContain("node_modules");
  });

  test("all .env.example files exist after rename", async () => {
    const projectDir = await scaffold("env-example-test");

    const envExampleDirs = dotfileRenames.filter(
      (r) => r.to === ".env.example"
    );
    for (const { dir } of envExampleDirs) {
      expect(existsSync(join(projectDir, dir, ".env.example"))).toBe(true);
    }
  });

  test("all .env.local files exist after rename", async () => {
    const projectDir = await scaffold("env-local-test");

    const envLocalDirs = dotfileRenames.filter((r) => r.to === ".env.local");
    for (const { dir } of envLocalDirs) {
      expect(existsSync(join(projectDir, dir, ".env.local"))).toBe(true);
    }
  });

  test("no undotted env files remain after rename", async () => {
    const projectDir = await scaffold("no-undotted-test");

    for (const { dir, from } of dotfileRenames) {
      expect(existsSync(join(projectDir, dir, from))).toBe(false);
    }
  });

  test(".env.example files have content", async () => {
    const projectDir = await scaffold("env-content-test");

    const envExampleDirs = dotfileRenames.filter(
      (r) => r.to === ".env.example"
    );
    for (const { dir } of envExampleDirs) {
      const content = readFileSync(
        join(projectDir, dir, ".env.example"),
        "utf8"
      );
      expect(content.length).toBeGreaterThan(0);
    }
  });

  test("env setup copies .env.example to .env.production", async () => {
    const projectDir = await scaffold("env-setup-test");

    // Run the same logic as setupEnvironmentVariables
    const { copyFile } = await import("node:fs/promises");
    for (const { source, target } of envFiles) {
      const examplePath = join(projectDir, source, ".env.example");
      const targetPath = join(projectDir, source, target);
      try {
        await copyFile(examplePath, targetPath);
      } catch {
        // skip if doesn't exist
      }
    }

    // .env.production should exist for all dirs that have .env.example
    const envExampleDirs = dotfileRenames
      .filter((r) => r.to === ".env.example")
      .map((r) => r.dir);

    for (const dir of envExampleDirs) {
      expect(existsSync(join(projectDir, dir, ".env.production"))).toBe(true);
    }
  });

  test("dev-only files can be stripped", async () => {
    const projectDir = await scaffold("dev-strip-test");

    for (const file of devOnlyFiles) {
      expect(existsSync(join(projectDir, file))).toBe(true);
    }

    // Strip them
    for (const file of devOnlyFiles) {
      await rm(join(projectDir, file), { recursive: true, force: true });
    }

    for (const file of devOnlyFiles) {
      expect(existsSync(join(projectDir, file))).toBe(false);
    }
  });

  test("project has expected top-level structure", async () => {
    const projectDir = await scaffold("structure-test");

    const entries = readdirSync(projectDir);
    expect(entries).toContain(".gitignore");
    expect(entries).toContain("package.json");
    expect(entries).toContain("turbo.json");
    expect(entries).toContain("apps");
    expect(entries).toContain("packages");
    expect(entries).toContain(".github");
  });

  test("no node_modules copied", async () => {
    const projectDir = await scaffold("no-modules-test");

    expect(existsSync(join(projectDir, "node_modules"))).toBe(false);

    // Also check nested
    const apps = readdirSync(join(projectDir, "apps"));
    for (const app of apps) {
      const appPath = join(projectDir, "apps", app);
      if (statSync(appPath).isDirectory()) {
        expect(existsSync(join(appPath, "node_modules"))).toBe(false);
      }
    }
  });

  test("package.json name can be updated", async () => {
    const projectDir = await scaffold("name-update-test");
    await updatePackageJson(projectDir, "my-saas");

    const content = JSON.parse(
      readFileSync(join(projectDir, "package.json"), "utf8")
    );
    expect(content.name).toBe("my-saas");
  });

  test("bun config: bunfig.toml preserved", async () => {
    const projectDir = await scaffold("bun-config-test");
    expect(existsSync(join(projectDir, "bunfig.toml"))).toBe(true);
  });

  test("non-bun config: bunfig.toml removable", async () => {
    const projectDir = await scaffold("non-bun-test");
    await rm(join(projectDir, "bunfig.toml"), { force: true });
    expect(existsSync(join(projectDir, "bunfig.toml"))).toBe(false);
  });

  test("pnpm files removable for non-pnpm managers", async () => {
    const projectDir = await scaffold("pnpm-cleanup-test");

    // These may or may not exist (lockfiles excluded during copy), but removal should not throw
    await rm(join(projectDir, "pnpm-lock.yaml"), { force: true });
    await rm(join(projectDir, "pnpm-workspace.yaml"), { force: true });

    expect(existsSync(join(projectDir, "pnpm-lock.yaml"))).toBe(false);
    expect(existsSync(join(projectDir, "pnpm-workspace.yaml"))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe("edge cases", () => {
  test("env.example and env.local both exist and have content for each dir", () => {
    const dirs = dotfileRenames
      .filter((r) => r.from === "env.example")
      .map((r) => r.dir);

    for (const dir of dirs) {
      const exampleContent = readFileSync(
        join(templatePath, dir, "env.example"),
        "utf8"
      );
      const localContent = readFileSync(
        join(templatePath, dir, "env.local"),
        "utf8"
      );
      expect(exampleContent.length).toBeGreaterThan(0);
      expect(localContent.length).toBeGreaterThan(0);
    }
  });

  test("copyExclusions does not block dotenv files", () => {
    expect(copyExclusions.has(".env.example")).toBe(false);
    expect(copyExclusions.has(".env.local")).toBe(false);
    expect(copyExclusions.has("env.example")).toBe(false);
    expect(copyExclusions.has("env.local")).toBe(false);
  });

  test("devOnlyFiles does not include env files", () => {
    for (const file of devOnlyFiles) {
      expect(file).not.toContain("env");
    }
  });

  test("template package.json has env scripts", () => {
    const content = JSON.parse(
      readFileSync(join(templatePath, "package.json"), "utf8")
    );
    expect(content.scripts["env:init"]).toBeDefined();
    expect(content.scripts["env:check"]).toBeDefined();
    expect(content.scripts["env:push"]).toBeDefined();
  });
});

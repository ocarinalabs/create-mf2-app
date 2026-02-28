import { type SpawnOptions, spawn } from "node:child_process";
import { cp, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const run = (command: string, options?: SpawnOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, {
      stdio: "ignore",
      shell: true,
      ...options,
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}: ${command}`));
      }
    });
    child.on("error", reject);
  });
};

export const supportedPackageManagers = ["bun", "npm", "yarn", "pnpm"];

export const devOnlyFiles = ["CLAUDE.md", ".mcp.json", ".claude"];

export const copyExclusions = new Set([
  "node_modules",
  ".DS_Store",
  ".turbo",
  "bun.lock",
  "pnpm-lock.yaml",
  "yarn.lock",
  "package-lock.json",
  ".git",
]);

export const dotfileRenames = [
  { dir: join("apps", "api"), from: "env.example", to: ".env.example" },
  { dir: join("apps", "api"), from: "env.local", to: ".env.local" },
  { dir: join("apps", "app"), from: "env.example", to: ".env.example" },
  { dir: join("apps", "app"), from: "env.local", to: ".env.local" },
  { dir: join("apps", "web"), from: "env.example", to: ".env.example" },
  { dir: join("apps", "web"), from: "env.local", to: ".env.local" },
  { dir: join("packages", "cms"), from: "env.example", to: ".env.example" },
  { dir: join("packages", "cms"), from: "env.local", to: ".env.local" },
  {
    dir: join("packages", "internationalization"),
    from: "env.example",
    to: ".env.example",
  },
  {
    dir: join("packages", "internationalization"),
    from: "env.local",
    to: ".env.local",
  },
];

export const envFiles = [
  { source: join("apps", "api"), target: ".env.local" },
  { source: join("apps", "api"), target: ".env.production" },
  { source: join("apps", "app"), target: ".env.local" },
  { source: join("apps", "app"), target: ".env.production" },
  { source: join("apps", "web"), target: ".env.local" },
  { source: join("apps", "web"), target: ".env.production" },
  { source: join("packages", "cms"), target: ".env.local" },
  { source: join("packages", "cms"), target: ".env.production" },
  { source: join("packages", "internationalization"), target: ".env.local" },
  {
    source: join("packages", "internationalization"),
    target: ".env.production",
  },
];

export const getTemplatePath = (): string => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  return resolve(currentDir, "..", "template");
};

export const copyDirectory = async (
  source: string,
  destination: string
): Promise<void> => {
  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    if (copyExclusions.has(entry.name)) {
      continue;
    }

    const srcPath = join(source, entry.name);
    const destPath = join(destination, entry.name);

    if (entry.isDirectory()) {
      await cp(srcPath, destPath, {
        recursive: true,
        filter: (src) => {
          const name = src.split("/").pop() ?? "";
          return !copyExclusions.has(name);
        },
      });
    } else {
      await cp(srcPath, destPath);
    }
  }
};

export const updatePackageJson = async (
  projectDir: string,
  name: string
): Promise<void> => {
  const packageJsonPath = join(projectDir, "package.json");
  const content = await readFile(packageJsonPath, "utf8");
  const packageJson = JSON.parse(content);

  packageJson.name = name;

  await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
};

export const updatePackageManager = async (
  projectDir: string,
  packageManager: string
): Promise<void> => {
  const packageJsonPath = join(projectDir, "package.json");
  const content = await readFile(packageJsonPath, "utf8");
  const packageJson = JSON.parse(content);

  const versions: Record<string, string> = {
    bun: "bun@1.3.9",
    npm: "npm@10.8.1",
    yarn: "yarn@1.22.22",
    pnpm: "pnpm@9.15.0",
  };

  if (versions[packageManager]) {
    packageJson.packageManager = versions[packageManager];
  }

  await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
};

export const convertWorkspaceDeps = async (filePath: string): Promise<void> => {
  const content = await readFile(filePath, "utf8");
  const packageJson = JSON.parse(content);

  for (const depType of ["dependencies", "devDependencies"]) {
    const deps = packageJson[depType];
    if (!deps) {
      continue;
    }

    for (const [dep, version] of Object.entries(deps)) {
      if (version === "workspace:*") {
        deps[dep] = "*";
      }
    }
  }

  await writeFile(filePath, `${JSON.stringify(packageJson, null, 2)}\n`);
};

export const convertAllWorkspaceDeps = async (
  projectDir: string
): Promise<void> => {
  await convertWorkspaceDeps(join(projectDir, "package.json"));

  for (const dir of ["apps", "packages"]) {
    const dirPath = join(projectDir, dir);

    try {
      const packages = await readdir(dirPath);
      for (const pkg of packages) {
        const pkgJsonPath = join(dirPath, pkg, "package.json");
        try {
          await stat(pkgJsonPath);
          await convertWorkspaceDeps(pkgJsonPath);
        } catch {
          // package.json doesn't exist, skip
        }
      }
    } catch {
      // directory doesn't exist, skip
    }
  }
};

export const addWorkspacesField = async (projectDir: string): Promise<void> => {
  const packageJsonPath = join(projectDir, "package.json");
  const content = await readFile(packageJsonPath, "utf8");
  const packageJson = JSON.parse(content);

  packageJson.workspaces = ["apps/*", "packages/*"];

  await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
};

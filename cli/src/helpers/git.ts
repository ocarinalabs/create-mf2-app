import fs from "fs/promises";
import path from "path";

export async function initializeGit(projectDir: string): Promise<void> {
  const ora = (await import("ora")).default;
  const { execa } = await import("execa");
  const spinner = ora("Initializing git repository...").start();

  try {
    try {
      await execa("git", ["--version"]);
    } catch {
      spinner.info("Git is not installed. Skipping git initialization.");
      return;
    }

    await execa("git", ["init"], { cwd: projectDir });

    const gitignorePath = path.join(projectDir, ".gitignore");
    const gitignoreContent = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`;

    await fs.writeFile(gitignorePath, gitignoreContent);

    await execa("git", ["add", "."], { cwd: projectDir });
    await execa("git", ["commit", "-m", "Initial commit from create-mf2-app"], {
      cwd: projectDir,
    });

    spinner.succeed("Git repository initialized");
  } catch (error) {
    spinner.fail("Failed to initialize git repository");
    // Don't throw - git init is optional
    console.error(
      "Git initialization failed, but you can initialize it manually later"
    );
  }
}

import { execa } from "execa";
import ora from "ora";
import fs from "fs/promises";
import path from "path";

export async function initializeGit(projectDir: string): Promise<void> {
  const spinner = ora("Initializing git repository...").start();

  try {
    // Check if git is installed
    try {
      await execa("git", ["--version"]);
    } catch {
      spinner.info("Git is not installed. Skipping git initialization.");
      return;
    }

    // Initialize git repo
    await execa("git", ["init"], { cwd: projectDir });

    // Create .gitignore if it doesn't exist
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

# env files
.env*
!.env.example

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`;

    await fs.writeFile(gitignorePath, gitignoreContent);

    // Make initial commit
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

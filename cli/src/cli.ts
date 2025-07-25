import * as p from "@clack/prompts";
import { Command } from "commander";
import { validateAppName } from "./utils/validateAppName.js";

export interface CliResults {
  projectName: string;
  platform: "web" | "mobile" | "desktop";
  needsBackend: boolean;
}

export async function runCli(): Promise<CliResults> {
  const program = new Command()
    .name("create-mf2-app")
    .description("Create a new MF² Stack application")
    .argument("[project-name]")
    .option("--use-npm", "Use npm as package manager")
    .option("--use-yarn", "Use yarn as package manager")
    .option("--use-pnpm", "Use pnpm as package manager")
    .option("--use-bun", "Use bun as package manager")
    .parse(process.argv);

  const providedName = program.args[0];

  // Interactive prompts
  const project = (await p.group(
    {
      projectName: () =>
        providedName
          ? p.text({
              message: "Project name",
              initialValue: providedName,
              validate: validateAppName,
            })
          : p.text({
              message: "What will your project be called?",
              placeholder: "my-startup",
              validate: validateAppName,
            }),

      platform: () =>
        p.select({
          message: "What platform are you building for?",
          options: [
            { value: "web", label: "Web" },
            {
              value: "mobile",
              label: "Mobile (Coming Soon)",
              hint: "React Native + Expo",
            },
            {
              value: "desktop",
              label: "Desktop (Coming Soon)",
              hint: "Electron",
            },
          ],
          initialValue: "web",
        }),

      needsBackend: () =>
        p.select({
          message: "Do you need a backend?",
          options: [
            {
              value: false,
              label: "No, just frontend",
              hint: "Landing pages, marketing sites, documentation",
            },
            {
              value: true,
              label: "Yes, full-stack",
              hint: "SaaS apps, user accounts, payments, emails",
            },
          ],
          initialValue: false,
        }),
    },
    {
      onCancel: () => {
        p.cancel("Operation cancelled");
        process.exit(0);
      },
    }
  )) as CliResults;

  return project;
}

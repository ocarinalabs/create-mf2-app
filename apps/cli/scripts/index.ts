import { program } from "commander";
import { initialize } from "./init.js";

program
  .name("create-mf2-app")
  .description(
    "Create a production-ready SaaS app with Next.js, Convex, and AI"
  )
  .version("2.0.0");

program
  .command("init", { isDefault: true })
  .description("Initialize a new MF2 project")
  .option("--name <name>", "Name of the project")
  .option(
    "--package-manager <manager>",
    "Package manager to use (bun, npm, yarn, pnpm)"
  )
  .option("--disable-git", "Disable git initialization")
  .action(initialize);

program.parse(process.argv);

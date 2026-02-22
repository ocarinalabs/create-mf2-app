import { Button } from "@repo/design-system/components/ui/button";
import Link from "next/link";
import { CopyCommand } from "@/components/copy-command";

const Home = () => (
  <div className="flex min-h-svh w-full items-center justify-center">
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
        <div className="flex flex-col gap-4">
          <h1 className="whitespace-nowrap text-center font-mono text-4xl tracking-tighter md:text-6xl">
            Move{" "}
            <a
              className="underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground"
              href="https://faw.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              faw
            </a>
            king fast and break nothing.
          </h1>
          <p className="whitespace-nowrap text-center font-mono text-muted-foreground text-sm tracking-tight">
            The production-ready SaaS monorepo with auth, payments, database,
            AI, analytics, and email. Ship your startup in one command.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <CopyCommand command="npx create-mf2-app@latest" />
          <Button asChild className="font-mono" variant="ghost">
            <Link href="https://mf2.dev/docs">Docs</Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Home;

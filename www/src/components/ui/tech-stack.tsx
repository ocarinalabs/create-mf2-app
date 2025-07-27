import { BlurFade } from "@/components/ui/blur-fade";
import {
  NextjsIcon,
  TypeScriptIcon,
  TailwindCSSIcon,
  ShadcnIcon,
  ConvexIcon,
  ClerkIcon,
  PolarIcon,
  ResendIcon,
  PostHogIcon,
  VercelIcon,
  MintlifyIcon,
} from "@/components/icons/technologies";

interface TechCard {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  href: string;
  highlight?: boolean;
}

const techCards: TechCard[] = [
  {
    name: "Next.js",
    icon: NextjsIcon,
    description:
      "React framework with server components, app router, and production-ready features.",
    href: "https://nextjs.org",
  },
  {
    name: "TypeScript",
    icon: TypeScriptIcon,
    description: "Type-safe JavaScript that catches errors during development.",
    href: "https://typescriptlang.org",
  },
  {
    name: "Tailwind CSS",
    icon: TailwindCSSIcon,
    description: "Utility-first CSS framework for rapid UI development.",
    href: "https://tailwindcss.com",
  },
  {
    name: "shadcn/ui",
    icon: ShadcnIcon,
    description:
      "Beautifully designed components built with Radix UI and Tailwind CSS.",
    href: "https://ui.shadcn.com",
  },
  {
    name: "Convex",
    icon: ConvexIcon,
    description:
      "Real-time database with TypeScript support and automatic syncing.",
    href: "https://convex.dev",
    highlight: true,
  },
  {
    name: "Clerk",
    icon: ClerkIcon,
    description:
      "Complete authentication solution with social logins and user management.",
    href: "https://clerk.com",
    highlight: true,
  },
  {
    name: "Polar",
    icon: PolarIcon,
    description: "Modern payment infrastructure for SaaS and subscriptions.",
    href: "https://polar.sh",
    highlight: true,
  },
  {
    name: "Resend",
    icon: ResendIcon,
    description: "Developer-friendly email API with great deliverability.",
    href: "https://resend.com",
    highlight: true,
  },
  {
    name: "PostHog",
    icon: PostHogIcon,
    description: "Product analytics and feature flags in one platform.",
    href: "https://posthog.com",
    highlight: true,
  },
  {
    name: "Vercel",
    icon: VercelIcon,
    description: "Deployment platform optimized for Next.js applications.",
    href: "https://vercel.com",
    highlight: true,
  },
  {
    name: "Mintlify",
    icon: MintlifyIcon,
    description: "Beautiful documentation that's easy to maintain.",
    href: "https://mintlify.com",
    highlight: true,
  },
  {
    name: "Your package",
    icon: () => (
      <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-current">
        <span className="text-2xl font-bold">?</span>
      </div>
    ),
    description:
      "Got a suggestion? Submit a PR to add your favorite tool to the stack.",
    href: "https://github.com/korrect-ai/create-mf2-app/pulls",
  },
];

export function TechStack() {
  return (
    <section id="stack" className="py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <BlurFade delay={0}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Stop overthinking your stack, we already did that for you.
              </h2>
            </BlurFade>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {techCards.map((tech, index) => (
              <BlurFade key={tech.name} delay={0.2 + index * 0.05}>
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex flex-col h-full rounded-lg border transition-all hover:shadow-lg hover:-translate-y-1 ${
                    tech.highlight
                      ? "border-primary/50 bg-primary/5 hover:border-primary"
                      : "border-white/20 bg-white/5 hover:border-white/40"
                  }`}
                >
                  <div className="flex items-center gap-4 p-6 pb-4">
                    {(() => {
                      const Icon = tech.icon;
                      return <Icon className="h-10 w-10 shrink-0" />;
                    })()}
                    <h3 className="text-xl font-semibold">{tech.name}</h3>
                  </div>
                  <div className="px-6 pb-6 text-sm text-muted-foreground">
                    {tech.description}
                  </div>
                  {tech.highlight && (
                    <div className="absolute -top-2 -right-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      Fullstack
                    </div>
                  )}
                </a>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

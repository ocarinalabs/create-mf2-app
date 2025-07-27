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
} from "@/components/icons/technologies";

interface TechCard {
  name: string;
  icon: React.ElementType;
  description: string;
  href: string;
  highlight?: boolean;
}

const techCards: TechCard[] = [
  {
    name: "Next.js",
    icon: NextjsIcon,
    description: "The React framework that doesn't suck. Server components, app router, and everything you need to ship fast.",
    href: "https://nextjs.org",
  },
  {
    name: "TypeScript", 
    icon: TypeScriptIcon,
    description: "Because 'undefined is not a function' at 3am isn't fun. Type safety that actually helps you ship faster.",
    href: "https://typescriptlang.org",
  },
  {
    name: "Tailwind CSS",
    icon: TailwindCSSIcon,
    description: "Stop writing CSS. Start shipping features. Utility-first CSS that makes your app look good by default.",
    href: "https://tailwindcss.com",
  },
  {
    name: "shadcn/ui",
    icon: ShadcnIcon,
    description: "Beautiful components that just work. Copy, paste, customize. No npm hell, no version conflicts.",
    href: "https://ui.shadcn.com",
  },
  {
    name: "Convex",
    icon: ConvexIcon,
    description: "Real-time database that syncs like magic. No backend needed. Perfect for moving f*cking fast.",
    href: "https://convex.dev",
    highlight: true,
  },
  {
    name: "Clerk",
    icon: ClerkIcon,
    description: "Auth that works out of the box. Social logins, magic links, 2FA - everything configured and ready.",
    href: "https://clerk.com",
    highlight: true,
  },
  {
    name: "Polar",
    icon: PolarIcon,
    description: "Get paid in minutes, not months. Simple subscriptions and payments for developers who ship.",
    href: "https://polar.sh",
    highlight: true,
  },
  {
    name: "Resend",
    icon: ResendIcon,
    description: "Email that actually reaches inboxes. Beautiful templates, great DX, and it just works.",
    href: "https://resend.com",
    highlight: true,
  },
];

export function TechStack() {
  return (
    <section id="stack" className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <BlurFade delay={0}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                The Stack That Ships
              </h2>
            </BlurFade>
            <BlurFade delay={0.1}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Hand-picked technologies that work together perfectly. No analysis paralysis. No integration nightmares.
              </p>
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
                    <tech.icon className="h-10 w-10 shrink-0" />
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

          <BlurFade delay={0.8}>
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Frontend only?</strong> Get Next.js, TypeScript, Tailwind, and shadcn/ui.
                <br />
                <strong className="text-foreground">Need the full monty?</strong> Add auth, payments, database, and emails.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
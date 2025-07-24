import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 lg:px-8 h-16 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            M²
          </div>
          <span className="font-semibold text-lg">MF² Stack</span>
        </div>
        <ModeToggle />
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="px-6 lg:px-8 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Move F***ing Fast
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                The modern web starter with Next.js, TypeScript, and Tailwind
                CSS. Build beautiful, fast websites in minutes, not hours.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg">Get Started</Button>
                <Button variant="outline" size="lg">
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 lg:px-8 py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything You Need
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-lg border bg-card p-8">
                <h3 className="text-xl font-semibold mb-2">Next.js 15</h3>
                <p className="text-muted-foreground">
                  The latest React framework with App Router, Server Components,
                  and Turbopack.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-8">
                <h3 className="text-xl font-semibold mb-2">TypeScript</h3>
                <p className="text-muted-foreground">
                  Type-safe development with full TypeScript support out of the
                  box.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-8">
                <h3 className="text-xl font-semibold mb-2">Tailwind CSS</h3>
                <p className="text-muted-foreground">
                  Beautiful, responsive designs with utility-first CSS and
                  shadcn/ui components.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-8">
                <h3 className="text-xl font-semibold mb-2">Dark Mode</h3>
                <p className="text-muted-foreground">
                  Built-in dark mode support with next-themes for seamless theme
                  switching.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-8">
                <h3 className="text-xl font-semibold mb-2">SEO Ready</h3>
                <p className="text-muted-foreground">
                  Optimized metadata, Open Graph images, and sitemap generation
                  included.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-8">
                <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                <p className="text-muted-foreground">
                  Vercel Analytics integration for understanding your audience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 lg:px-8 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to build something amazing?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your project with the MF² Stack and ship faster than ever.
            </p>
            <Button size="lg" className="px-8">
              Start Building
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 lg:px-8 py-8 border-t">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2025 MF² Stack. Built with Startdown.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

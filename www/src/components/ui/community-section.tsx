import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Github, Star, GitFork, Users } from "lucide-react";

export function CommunitySection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <BlurFade delay={0}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Built in Public, For the Public
            </h2>
          </BlurFade>
          
          <BlurFade delay={0.1}>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12">
              Open source and community-driven. Join us in making web development faster for everyone.
            </p>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              <a
                href="https://github.com/korrect/create-mf2-app"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto"
              >
                <div className="relative overflow-hidden rounded-lg border border-white/20 bg-white/5 backdrop-blur-xl p-6 transition-all hover:border-white/40 hover:bg-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Github className="h-8 w-8" />
                      <div className="text-left">
                        <p className="font-semibold">Star on GitHub</p>
                        <p className="text-sm text-muted-foreground">korrect/create-mf2-app</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4" />
                      <span>2.5k</span>
                    </div>
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/korrect/create-mf2-app/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto"
              >
                <div className="relative overflow-hidden rounded-lg border border-white/20 bg-white/5 backdrop-blur-xl p-6 transition-all hover:border-white/40 hover:bg-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <GitFork className="h-8 w-8" />
                      <div className="text-left">
                        <p className="font-semibold">Fork & Contribute</p>
                        <p className="text-sm text-muted-foreground">PRs welcome</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/korrect/create-mf2-app/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Report Issues
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/korrect/create-mf2-app/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Join Discussions
                </a>
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <p className="mt-8 text-sm text-muted-foreground">
              Used by hundreds of developers shipping real products. Your next startup could be here.
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
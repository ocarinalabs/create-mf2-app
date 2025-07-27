import { BlurFade } from "@/components/ui/blur-fade";

export function PhilosophySection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Zero to Production in Minutes
            </h2>
          </BlurFade>

          <BlurFade delay={0.1}>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">
              We made create-mf2-app to do one thing: Get you shipping TODAY, not next month.
            </p>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">
              After shipping hundreds of projects, we've learned what matters: getting your product in front of users. 
              We've done the boring setup work so you can focus on what makes your app unique.
            </p>
          </BlurFade>

          <BlurFade delay={0.3}>
            <p className="text-lg sm:text-xl text-muted-foreground">
              This is NOT another boilerplate. <strong className="text-foreground">It's a complete, production-ready stack.</strong> Auth, 
              payments, analytics, emails - everything's wired up and ready to go. Stop reading docs. Start shipping features.
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
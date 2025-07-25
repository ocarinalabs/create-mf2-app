import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  TailwindCSSIcon,
  ConvexIcon,
  ClerkIcon,
  ShadcnIcon,
  MotionIcon,
  VercelIcon,
  PostHogIcon,
  ResendIcon,
  PolarIcon,
  MintlifyIcon,
  ModelContextProtocolIcon,
} from "@/components/icons/technologies";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const Hero = ({ heading, description, buttons }: HeroProps) => {
  return (
    <section className="pt-24 sm:pt-32 md:pt-40 pb-4 relative overflow-hidden">
      <div className="container relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <BlurFade delay={0}>
            <Badge variant="outline" className="mb-4">
              For shipping fast
            </Badge>
          </BlurFade>

          <BlurFade delay={0.05}>
            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-semibold mb-6 leading-tight sm:leading-tight md:leading-snug text-balance max-w-[400px] sm:max-w-none mx-auto">
              {heading}
            </h1>
          </BlurFade>

          <BlurFade delay={0.1}>
            <p className="text-muted-foreground text-lg sm:text-lg lg:text-xl mb-8 max-w-[320px] sm:max-w-2xl mx-auto">
              {description}
            </p>
          </BlurFade>

          <BlurFade delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {buttons?.primary && (
                <Button asChild size="lg" className="px-8 font-sans">
                  <a href={buttons.primary.url}>
                    {buttons.primary.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              {buttons?.secondary && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-sans"
                >
                  <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
                </Button>
              )}
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="text-sm text-muted-foreground mb-4">
              Clone, prompt, ship
            </p>
          </BlurFade>

          {/* Tech stack */}
          <BlurFade delay={0.25}>
            <p className="text-center text-muted-foreground font-sans text-sm mt-8">
              Build with modern tools developers and LLMs love
            </p>
          </BlurFade>

          <div className="mt-4 sm:mt-6 md:-mt-10 lg:-mt-20">
            <BlurFade delay={0.3}>
              <Marquee className="max-w-full sm:max-w-3xl md:max-w-4xl">
                {[
                  ReactIcon,
                  NextjsIcon,
                  TypeScriptIcon,
                  TailwindCSSIcon,
                  ConvexIcon,
                  ClerkIcon,
                  ShadcnIcon,
                  MotionIcon,
                  VercelIcon,
                  PostHogIcon,
                  ResendIcon,
                  PolarIcon,
                  MintlifyIcon,
                  ModelContextProtocolIcon,
                ].map((IconComponent, index) => (
                  <div
                    key={index}
                    className="relative h-full w-fit mx-3 sm:mx-4 md:mx-6 lg:mx-8 flex items-center justify-start"
                  >
                    <IconComponent className="h-6 w-auto sm:h-7 md:h-8" />
                  </div>
                ))}
              </Marquee>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };

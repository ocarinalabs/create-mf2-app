"use client";

import { AnimatedNavFramer } from "@/components/ui/navigation-bar-animation";
import { Hero } from "@/components/ui/hero";
import { CliPreview } from "@/components/ui/cli-preview";
import { TechStack } from "@/components/ui/tech-stack";
import { FAQ } from "@/components/ui/faq";
import { Footer } from "@/components/ui/footer";
import BeamsBackground from "@/components/ui/beams-background";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center">
      <BeamsBackground />
      <AnimatedNavFramer />
      <Hero
        heading="Move F*cking Fast"
        description="The stack AI moves fast with"
        buttons={{
          primary: {
            text: "Docs",
            url: "https://github.com/korrect-ai/create-mf2-app",
          },
          secondary: {
            text: "Deploy",
            url: "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkorrect-ai%2Fcreate-mf2-app%2Ftree%2Fmain%2Fcli%2Ftemplates%2Fbase-fullstack&project-name=my-mf2-saas&repository-name=my-mf2-saas&env=CONVEX_DEPLOYMENT,NEXT_PUBLIC_CONVEX_URL,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,CLERK_WEBHOOK_SECRET,CLERK_FRONTEND_API_URL,CLERK_JWT_ISSUER_DOMAIN,POLAR_ORGANIZATION_TOKEN,POLAR_WEBHOOK_SECRET,POLAR_SERVER,NEXT_PUBLIC_POLAR_ENABLED,NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID,NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID,RESEND_API_KEY,RESEND_WEBHOOK_SECRET,RESEND_FROM_EMAIL,NEXT_PUBLIC_POSTHOG_KEY,NEXT_PUBLIC_POSTHOG_HOST,NEXT_PUBLIC_APP_URL&envDescription=Configure%20all%20required%20environment%20variables%20for%20Convex%2C%20Clerk%2C%20Polar%2C%20Resend%2C%20and%20PostHog.%20See%20.env.example%20for%20details&envLink=https%3A%2F%2Fgithub.com%2Fkorrect-ai%2Fcreate-mf2-app%2Fblob%2Fmain%2Fcli%2Ftemplates%2Fbase-fullstack%2F.env.example&demo-title=MF2%20Fullstack%20Template&demo-description=Production-ready%20SaaS%20starter%20with%20auth%2C%20payments%2C%20and%20real-time%20features",
          },
          github: {
            url: "https://github.com/korrect-ai/create-mf2-app",
          },
        }}
      />
      <CliPreview />
      <TechStack />
      <FAQ />
      <Footer />
    </main>
  );
}

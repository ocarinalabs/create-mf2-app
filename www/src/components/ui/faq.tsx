import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Is it free to use?",
    answer:
      "Yes, create-mf2-app is completely free and open source. The individual services in the stack have their own pricing, but most offer generous free tiers perfect for getting started.",
  },
  {
    question: "What license is this under?",
    answer:
      "MIT License. Use it for anything - personal projects, commercial products, or client work. No attribution required.",
  },
  {
    question: "What's included?",
    answer:
      "Frontend template: Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, dark mode, SEO optimization, and Vercel Analytics. Fullstack template includes everything above plus: Convex, Clerk, Polar, Resend, PostHog, and Mintlify. All pre-configured and production-ready.",
  },
  {
    question: "Is this optimized for AI development?",
    answer:
      "Yes. The stack is designed with AI-first development in mind. TypeScript provides type safety for AI responses, Convex handles real-time data streaming, and the modular architecture makes it easy to integrate AI services like OpenAI, Anthropic, or Replicate.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-[700px] mx-auto">
          <BlurFade delay={0.1} inView={true}>
            <div className="text-center mb-12">
              <h2 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                FAQ
              </h2>
            </div>
          </BlurFade>

          <BlurFade delay={0.15} inView={true}>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b"
                >
                  <AccordionTrigger className="hover:text-foreground/60 hover:no-underline font-sans text-left py-4 text-sm md:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 pr-6 leading-relaxed text-sm">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

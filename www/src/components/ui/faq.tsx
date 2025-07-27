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
    question: "Is this just another boilerplate?",
    answer:
      "No. This is a complete, production-ready stack with auth, payments, analytics, and emails already wired up. Everything is configured and tested. You get opinionated choices that work, not a template full of TODOs.",
  },
  {
    question: "What's included in the fullstack version?",
    answer:
      "Everything: Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui (all components), Convex (database), Clerk (auth), Polar (payments), Resend (emails), PostHog (analytics), and Mintlify (docs). All configured, all working, all ready to ship.",
  },
  {
    question: "Can I use a different database/auth/payment provider?",
    answer:
      "Of course. But that's not the point. We picked the best tools that work together seamlessly. If you want to spend days swapping providers, you're missing the 'Move F*cking Fast' philosophy.",
  },
  {
    question: "Is this suitable for production?",
    answer:
      "Absolutely. We use this exact stack for our own products. It's battle-tested, scales well, and includes everything you need for a real business: auth, payments, analytics, error tracking, and more.",
  },
  {
    question: "How is this different from T3 Stack?",
    answer:
      "T3 is great for learning. MF2 is for shipping. We made opinionated choices so you don't have to. Less configuration options, more pre-built features. Think of it as T3's impatient cousin who has a startup to launch.",
  },
  {
    question: "Do I need to know all these technologies?",
    answer:
      "No. That's the beauty. Everything is set up with sensible defaults. You can ship your first feature without touching the config. Learn as you build, not before you build.",
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
                Questions We Know You Have
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Let's address the elephant in the room
              </p>
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

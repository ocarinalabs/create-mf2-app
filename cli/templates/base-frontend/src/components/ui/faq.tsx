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

// CUSTOMIZE THIS: Update these FAQs to match your product
// Add questions your users actually ask
const faqItems: FaqItem[] = [
  {
    question: "What is this product?",
    answer:
      "This is where you explain what your product does and who it's for. Keep it simple and focused on the value you provide.",
  },
  {
    question: "How does it work?",
    answer:
      "Explain the basic process or workflow. Break it down into simple steps that anyone can understand.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Provide clear pricing information. Mention if there's a free trial, different tiers, or any special offers.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Let users know if they can try before they buy. Explain what's included and for how long.",
  },
  {
    question: "How do I get support?",
    answer:
      "Tell users how they can reach you - email, chat, documentation, community forums, etc.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Be transparent about your cancellation policy. Users want to know they're not locked in.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-[700px] mx-auto">
          <BlurFade delay={0.1} inView={true}>
            <div className="text-center mb-12">
              <h2 className="font-sans text-3xl font-light mb-4 lg:text-5xl">
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

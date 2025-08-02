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

// FAQ TIP: Address objections before they become roadblocks
// - Predict what's stopping users from converting (price, trust, complexity)
// - Keep it to 5-7 high-value questions max
// - Answer the unspoken fears: "Is this worth it?" "Will I get stuck?" "Can I trust you?"
// - Write answers that reduce friction, not create more questions
//
// DATA SOURCES: Pull questions from support tickets, customer emails, Google autocomplete
// - Include general industry questions (not just about you) to capture SEO traffic
// - FAQs can appear in Google's featured snippets - format Q&A clearly
//
// WRITING TIPS:
// - Keep answers under 100 words but complete - don't just link elsewhere
// - Start yes/no questions with "Yes" or "No" for instant clarity
// - Write from customer's POV: they are "I", you are "you"
// - Show personality while being direct
// - Update quarterly based on new support patterns
const faqItems: FaqItem[] = [
  {
    question: "What is [Your Product]?",
    answer:
      "Address the clarity objection: In 1-2 sentences, explain WHAT you do and WHO it's for. Example: 'We help [target audience] achieve [desired outcome] by [unique method]'.",
  },
  {
    question: "How does it work?",
    answer:
      "Reduce complexity fears: Break it down into 3-4 simple steps. Show them it's easier than they think. Use 'You just...' language to make it feel effortless.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Price transparency builds trust: State your pricing clearly. If you have tiers, mention the starting price. Always frame price against value: 'Just $X for [major benefit]'.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Reduce commitment anxiety: Yes/No + details. If yes, specify duration and what's included. If no, mention your guarantee or refund policy instead.",
  },
  {
    question: "What if I need help?",
    answer:
      "Build trust through availability: List all support channels (email, chat, docs). Mention response times. This shows you'll be there when they need you.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Remove lock-in fears: 'Yes, cancel anytime with one click. No questions asked.' Be direct and clear. This removes the biggest commitment objection.",
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

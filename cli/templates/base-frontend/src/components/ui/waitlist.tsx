"use client";

import { useState, useRef } from "react";
import { BlurFade } from "./blur-fade";
import type { ConfettiRef } from "@/components/ui/confetti";
import { Confetti } from "@/components/ui/confetti";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// WAITLIST TIP: Signups ≠ Validation (typical conversion is only 2-20%)
// - Real validation: People willing to talk to you, give feedback, or pay
// - Red flags: No email responses, bot signups, "mailbox full" bounces
// - Quality > Quantity: 200 engaged users > 1000 random signups
//
// COMMUNITY BUILDING: These are your potential early adopters - engage them!
// - Don't just collect emails - use them immediately
// - Be transparent: Tell them upfront you'll invite to Discord/Slack, send updates
// - Manual outreach works: Reach out personally, have 10min calls
// - Focus on people who respond - they're your real users
//
// WHAT TO DO WITH EMAILS:
// - Create a community space (Discord/Slack) and invite them
// - Send weekly progress updates showing you're building
// - Ask for feedback and actually implement it
// - Give early access, special pricing, or founder benefits
// - Launch fast - long waits kill interest and momentum
//
// REMEMBER: Building a waitlist is about building relationships, not collecting emails
// The goal is to find people who care enough to help shape your product
//
// WARNING - THE HARSH REALITY:
// - Paid ads may result in bot signups
// - Signups from clickfarm countries when that's not your market
// - Many successful founders skip waitlists and just launch to a small group
// - Without talking to customers, you probably don't have any.
// - 100 signups ≠ $5k MRR. More like 0-2 paying customers if you can't reach them

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const confettiRef = useRef<ConfettiRef>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      // Simulate API call for frontend-only template
      // In a real app, this would connect to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For now, just log the email and show success
      console.log("Waitlist signup:", email);

      setStatus("success");
      setEmail("");

      // Trigger confetti
      confettiRef.current?.fire({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: unknown) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      id="waitlist"
      className="container mx-auto max-w-4xl py-20 px-4 relative"
    >
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full pointer-events-none"
        manualstart={true}
      />
      <div className="mx-auto max-w-2xl text-center relative z-10">
        <BlurFade delay={0.25} duration={0.5} inView>
          <h2 className="font-sans text-3xl font-light mb-4 lg:text-5xl">
            Validate Your Idea
          </h2>
        </BlurFade>

        <BlurFade delay={0.3} duration={0.5} inView>
          <p className="text-lg text-muted-foreground mb-8">
            Test if people care enough to share their email (and eventually pay)
          </p>
        </BlurFade>

        <BlurFade delay={0.35} duration={0.5} inView>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === "loading"}
              className="w-full px-4 h-11 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 font-sans"
              aria-label="Email address"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              size="lg"
              className="px-8 font-sans mx-auto"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Joining waitlist...
                </span>
              ) : (
                <>
                  Join the waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </BlurFade>

        {/* Status Messages */}
        <BlurFade delay={0.4} duration={0.5} inView>
          <div className="mt-4 h-6">
            {status === "success" && (
              <p className="text-green-500">
                Thanks! We&apos;ll be in touch soon.
              </p>
            )}
            {status === "error" && <p className="text-red-600">{error}</p>}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

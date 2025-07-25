"use client";

import { useState, useRef } from "react";
import { BlurFade } from "./blur-fade";
import type { ConfettiRef } from "@/components/ui/confetti";
import { Confetti } from "@/components/ui/confetti";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
            Request Access
          </h2>
        </BlurFade>

        <BlurFade delay={0.3} duration={0.5} inView>
          <p className="text-lg text-muted-foreground mb-8">
            Build your community and notify users when you go live
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

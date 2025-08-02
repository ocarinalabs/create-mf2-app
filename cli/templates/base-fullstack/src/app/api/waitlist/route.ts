import { NextRequest, NextResponse } from "next/server";
import arcjet, { validateEmail } from "@arcjet/next";
import { z } from "zod";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    validateEmail({
      mode: "LIVE",
      deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
  ],
});

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address format."),
  metadata: z.optional(
    z.object({
      source: z.optional(z.string()),
      referrer: z.optional(z.string()),
    })
  ),
});

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("JSON Parsing error:", parseError);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
        },
        { status: 400 }
      );
    }

    const result = emailSchema.safeParse(body);
    if (!result.success) {
      const errorMessage =
        result.error.errors[0]?.message ?? "Invalid email address format";
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 400 }
      );
    }

    const { email, metadata } = result.data;

    // Validate email with Arcjet
    const decision = await aj.protect(request, { email });

    if (decision.isDenied()) {
      console.warn("Arcjet denied email:", email, "Reason:", decision.reason);
      return NextResponse.json(
        { success: false, message: "Please use a valid email address" },
        { status: 403 }
      );
    }

    // Add to waitlist using Convex
    try {
      const result = await convex.mutation(api.waitlist.addToWaitlist, {
        email,
        metadata,
      });

      // Send confirmation email
      try {
        await convex.action(api.emails.sendWaitlistConfirmationEmail, {
          to: email,
        });
      } catch (emailError) {
        console.error(
          "Failed to send waitlist confirmation email:",
          emailError
        );
        // Don't fail the request if email fails
      }

      return NextResponse.json(
        { success: true, message: "Successfully joined the waitlist!" },
        { status: 200 }
      );
    } catch (convexError: unknown) {
      if (
        convexError instanceof Error &&
        convexError.message?.includes("already exists")
      ) {
        return NextResponse.json(
          { success: false, message: "You're already on the waitlist!" },
          { status: 409 }
        );
      }
      throw convexError;
    }
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

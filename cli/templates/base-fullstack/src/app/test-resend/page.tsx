"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TestResendPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Test Email from MF² Stack");
  const [message, setMessage] = useState("This is a test email sent from the MF² Stack template using Resend.");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const sendEmail = useAction(api.emails.sendEmail);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      await sendEmail({
        to: email,
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #667eea;">MF² Stack</h1>
            <p>${message}</p>
            <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #6b7280; font-size: 14px;">
              This email was sent from the MF² Stack template using Resend.
            </p>
          </div>
        `,
      });
      setStatus("success");
    } catch (error) {
      console.error("Error sending email:", error);
      setError(error instanceof Error ? error.message : "Failed to send email");
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Test Resend Email</CardTitle>
          <CardDescription>
            Send a test email using the Resend integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">To Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="recipient@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={status === "sending"}
              className="w-full"
            >
              {status === "sending" ? "Sending..." : "Send Test Email"}
            </Button>
          </form>

          {status === "success" && (
            <Alert className="mt-4">
              <AlertDescription>
                Email sent successfully! Check your inbox.
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && error && (
            <Alert className="mt-4" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Configuration Notes:</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Make sure RESEND_API_KEY is set in your environment</li>
              <li>• Set RESEND_FROM_EMAIL to your verified sender email (required)</li>
              <li>• Verify your domain in Resend dashboard for production use</li>
              <li>• The email is currently in test mode (see convex/emails.ts)</li>
              <li>• For production, set testMode: false in emails.ts</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
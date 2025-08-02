import { ChatInterface } from "@/components/ai/ChatInterface";

export default function SupportPage() {
  return (
    <div className="container mx-auto h-[calc(100vh-4rem)]">
      <div className="h-full max-w-4xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Customer Support</h1>
          <p className="text-muted-foreground">
            Get help with your account, billing, or technical issues
          </p>
        </div>
        <ChatInterface agentType="support" className="h-[calc(100%-6rem)]" />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Customer Support",
  description: "Get help from our AI support agent",
};

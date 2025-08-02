import { ChatInterface } from "@/components/ai/ChatInterface";

export default function ChatPage() {
  return (
    <div className="container mx-auto h-[calc(100vh-4rem)]">
      <div className="h-full max-w-4xl mx-auto py-8">
        <ChatInterface agentType="assistant" className="h-full" />
      </div>
    </div>
  );
}

export const metadata = {
  title: "AI Chat",
  description: "Chat with your AI assistant",
};

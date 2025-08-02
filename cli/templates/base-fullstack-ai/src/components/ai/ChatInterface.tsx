"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessageList } from "./MessageList";
import { MessageComposer } from "./MessageComposer";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";

interface ChatInterfaceProps {
  agentType?: "support" | "assistant";
  className?: string;
}

export function ChatInterface({
  agentType = "assistant",
  className = "",
}: ChatInterfaceProps) {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isCreatingThread, setIsCreatingThread] = useState(false);

  const createThread = useMutation(api.ai.threads.createThread);
  const sendMessage = useMutation(api.ai.chat.sendMessage);
  const rateLimitStatus = useQuery(api.ai.chat.getRateLimitStatus);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create initial thread
  useEffect(() => {
    if (!threadId && !isCreatingThread) {
      createNewThread();
    }
  }, [threadId]);

  const createNewThread = async () => {
    setIsCreatingThread(true);
    try {
      const newThreadId = await createThread({ agentType });
      setThreadId(newThreadId);
    } catch (error) {
      console.error("Failed to create thread:", error);
    } finally {
      setIsCreatingThread(false);
    }
  };

  const handleSendMessage = async (prompt: string) => {
    if (!threadId) return;

    try {
      await sendMessage({ threadId, prompt });
    } catch (error: any) {
      // Handle rate limit errors
      if (error.message?.includes("Rate limit")) {
        // The error is already user-friendly
        throw error;
      }
      throw new Error("Failed to send message. Please try again.");
    }
  };

  if (isCreatingThread) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="border-b px-4 py-3 flex items-center justify-between">
        <div>
          <h2 className="font-semibold">
            {agentType === "support" ? "Support Chat" : "AI Assistant"}
          </h2>
          {rateLimitStatus && (
            <div className="flex gap-4 text-xs text-muted-foreground mt-1">
              {rateLimitStatus.messages && (
                <span>
                  Messages: {rateLimitStatus.messages.remaining}/
                  {rateLimitStatus.messages.limit}
                </span>
              )}
              {rateLimitStatus.tokens && (
                <span>
                  Tokens: {Math.round(rateLimitStatus.tokens.remaining)}/
                  {Math.round(rateLimitStatus.tokens.limit)}
                </span>
              )}
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={createNewThread}
          disabled={isCreatingThread}
        >
          <Plus className="h-4 w-4 mr-1" />
          New Chat
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        {threadId && (
          <MessageList threadId={threadId} messagesEndRef={messagesEndRef} />
        )}
      </div>

      {/* Composer */}
      <div className="border-t p-4">
        {threadId && (
          <MessageComposer
            onSendMessage={handleSendMessage}
            disabled={!threadId}
            rateLimitStatus={rateLimitStatus}
          />
        )}
      </div>
    </div>
  );
}

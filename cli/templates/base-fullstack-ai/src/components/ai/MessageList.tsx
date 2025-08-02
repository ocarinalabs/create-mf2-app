"use client";

import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import {
  useThreadMessages,
  toUIMessages,
  useSmoothText,
  type UIMessage,
} from "@convex-dev/agent/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageListProps {
  threadId: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({ threadId, messagesEndRef }: MessageListProps) {
  const messages = useThreadMessages(
    api.ai.chat.listMessages,
    { threadId },
    { initialNumItems: 50, stream: true }
  );

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.results?.length]);

  const uiMessages = toUIMessages(messages.results ?? []);

  if (messages.isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Loading messages...
      </div>
    );
  }

  if (uiMessages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center space-y-2">
          <Bot className="h-12 w-12 mx-auto opacity-20" />
          <p>Start a conversation by sending a message</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {uiMessages.map((message) => (
        <Message key={message.key} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

function Message({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const [visibleText] = useSmoothText(message.content, {
    startStreaming: message.status === "streaming",
  });

  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%] break-words",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
          message.status === "streaming" && "animate-pulse",
          message.status === "failed" && "bg-destructive/10 text-destructive"
        )}
      >
        <div className="whitespace-pre-wrap">{visibleText}</div>

        {message.status === "failed" && (
          <p className="text-xs mt-2 opacity-70">Failed to generate response</p>
        )}

        {/* Tool calls display */}
        {message.parts?.some((part) => part.type === "tool-call") && (
          <div className="mt-2 space-y-1">
            {message.parts
              .filter((part) => part.type === "tool-call")
              .map((part: any, i) => (
                <div key={i} className="text-xs opacity-70">
                  🔧 {part.toolName}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

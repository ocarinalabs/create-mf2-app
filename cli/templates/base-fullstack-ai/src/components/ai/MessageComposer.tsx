"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageComposerProps {
  onSendMessage: (message: string) => Promise<void>;
  disabled?: boolean;
  rateLimitStatus?: any;
}

export function MessageComposer({
  onSendMessage,
  disabled = false,
  rateLimitStatus,
}: MessageComposerProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!message.trim() || isSubmitting || disabled) return;

    const messageToSend = message.trim();
    setMessage("");
    setIsSubmitting(true);

    try {
      await onSendMessage(messageToSend);
      textareaRef.current?.focus();
    } catch (error: any) {
      // Restore message on error
      setMessage(messageToSend);

      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: error.message || "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isRateLimited =
    rateLimitStatus?.messages?.remaining === 0 ||
    rateLimitStatus?.tokens?.remaining === 0;

  return (
    <div className="space-y-2">
      {isRateLimited && (
        <div className="flex items-center gap-2 p-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/20 rounded-md">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            You've reached your usage limit. Please wait before sending more
            messages.
          </span>
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled || isSubmitting || isRateLimited}
            className="resize-none pr-10"
            rows={3}
          />

          {/* File upload button (future feature) */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 h-8 w-8"
            disabled={true}
            title="File upload coming soon"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={
            !message.trim() || isSubmitting || disabled || isRateLimited
          }
          size="icon"
          className="h-full"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Press Enter to send, Shift+Enter for new line</span>
        {message.length > 0 && <span>{message.length} characters</span>}
      </div>
    </div>
  );
}

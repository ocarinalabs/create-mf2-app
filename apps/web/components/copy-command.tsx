"use client";

import { cn } from "@repo/design-system/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export const CopyCommand = ({
  command,
  className,
}: {
  command: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={cn(
        "group flex h-10 items-center gap-3 rounded-md border bg-background px-4 font-mono text-sm transition-colors hover:bg-accent",
        className
      )}
      onClick={copy}
      type="button"
    >
      <span className="select-none text-muted-foreground">$</span>
      <code className="select-all">{command}</code>
      {copied ? (
        <Check className="size-4 shrink-0 text-green-600 dark:text-green-400" />
      ) : (
        <Copy className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  );
};

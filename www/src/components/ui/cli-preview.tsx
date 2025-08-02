"use client";

import { useEffect, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

interface CliLine {
  type: "command" | "output" | "prompt";
  text: string;
  typed?: boolean;
  delay?: number;
}

const cliFlow: CliLine[] = [
  { type: "command", text: "npx create-mf2-app@latest", typed: true, delay: 0 },
  { type: "output", text: "", delay: 400 },
  { type: "output", text: "◇  What will your project be called?", delay: 100 },
  { type: "output", text: "│  my-startup", delay: 500 },
  { type: "output", text: "", delay: 150 },
  { type: "output", text: "◇  Which platform are you building for?", delay: 100 },
  { type: "output", text: "│  ● Web", delay: 20 },
  { type: "output", text: "│  ○ Mobile (coming soon)", delay: 30 },
  { type: "output", text: "│  ○ Desktop (coming soon)", delay: 30 },
  { type: "output", text: "│  ○ Extension (coming soon)", delay: 30 },
  { type: "output", text: "", delay: 900 },
  { type: "output", text: "◇  What are you building?", delay: 100 },
  { type: "output", text: "│  ● Full Stack (database, auth, payments, emails)", delay: 20 },
  { type: "output", text: "│  ○ Full Stack + AI (agents, RAG, chat interface)", delay: 30 },
  { type: "output", text: "│  ○ Frontend (landing pages, marketing sites)", delay: 30 },
  { type: "output", text: "", delay: 700 },
  { type: "output", text: "◇  Would you like to include documentation?", delay: 100 },
  { type: "output", text: "│  ● Yes (powered by Mintlify)", delay: 20 },
  { type: "output", text: "│  ○ No", delay: 30 },
  { type: "output", text: "", delay: 600 },
  { type: "output", text: "◇  Should we initialize a Git repository?", delay: 100 },
  { type: "output", text: "│  ● Yes", delay: 20 },
  { type: "output", text: "│  ○ No", delay: 30 },
  { type: "output", text: "", delay: 600 },
  { type: "output", text: "◇  Should we install dependencies?", delay: 100 },
  { type: "output", text: "│  ● Yes", delay: 20 },
  { type: "output", text: "│  ○ No", delay: 30 },
  { type: "output", text: "", delay: 600 },
  { type: "output", text: "✔ Project created successfully", delay: 300 },
  {
    type: "output",
    text: "✔ Dependencies installed successfully",
    delay: 2200,
  },
  { type: "output", text: "✔ Git repository initialized", delay: 300 },
  { type: "output", text: "✔ Documentation setup complete!", delay: 300 },
  { type: "output", text: "", delay: 100 },
  { type: "output", text: "Done!", delay: 200 },
  { type: "output", text: "", delay: 100 },
  { type: "output", text: "cd my-startup", delay: 50 },
  { type: "output", text: "cp .env.example .env.local", delay: 50 },
  { type: "output", text: "", delay: 50 },
  { type: "output", text: "Run in separate terminals:", delay: 50 },
  { type: "output", text: "1. npm run dev", delay: 50 },
  { type: "output", text: "2. npx convex dev", delay: 50 },
  { type: "output", text: "", delay: 100 },
  { type: "output", text: "Move F*cking Fast.", delay: 150 },
];

export function CliPreview() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [currentLineText, setCurrentLineText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (animationComplete) return;

    let timeout: NodeJS.Timeout;
    let typeInterval: NodeJS.Timeout;

    const processNextLine = () => {
      if (displayedLines >= cliFlow.length) {
        setAnimationComplete(true);
        return;
      }

      const currentLine = cliFlow[displayedLines];
      const delay = currentLine.delay || 0;

      if (currentLine.typed && currentLine.text) {
        setIsTyping(true);
        let charIndex = 0;
        typeInterval = setInterval(() => {
          if (charIndex <= currentLine.text.length) {
            setCurrentLineText(currentLine.text.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
            setDisplayedLines((prev) => prev + 1);
            setCurrentLineText("");
            timeout = setTimeout(processNextLine, 100);
          }
        }, 30);
      } else {
        timeout = setTimeout(() => {
          setDisplayedLines((prev) => prev + 1);
          processNextLine();
        }, delay);
      }
    };

    processNextLine();

    return () => {
      if (timeout) clearTimeout(timeout);
      if (typeInterval) clearInterval(typeInterval);
    };
  }, [displayedLines, animationComplete]);

  return (
    <section className="py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0}>
            <div className="relative">
              <div className="overflow-x-auto overflow-y-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="inline-block min-w-full sm:min-w-0">
                  <div className="overflow-hidden rounded-lg border border-white/20 bg-black/50 backdrop-blur-xl shadow-2xl min-w-[90vw] sm:w-auto sm:min-w-[600px] md:min-w-[700px] lg:min-w-[800px]">
                    <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 sm:px-4 sm:py-3">
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500" />
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500" />
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="p-4 sm:p-4 md:p-6 font-mono text-xs sm:text-sm md:text-base">
                      <div className="space-y-1 min-h-[1200px] sm:min-h-[1200px] md:min-h-[1200px]">
                        {cliFlow.slice(0, displayedLines).map((line, index) => (
                          <div key={index} className="min-h-[1.5em]">
                            {line.type === "command" && (
                              <span className="text-green-400">
                                $ {line.text}
                              </span>
                            )}
                            {line.type === "output" && (
                              <span className="text-gray-300 whitespace-pre">
                                {line.text}
                              </span>
                            )}
                            {line.type === "prompt" && (
                              <span className="text-blue-400">{line.text}</span>
                            )}
                          </div>
                        ))}
                        {isTyping && currentLineText && (
                          <div className="min-h-[1.5em]">
                            <span
                              className={
                                cliFlow[displayedLines]?.type === "command"
                                  ? "text-green-400"
                                  : "text-gray-300"
                              }
                            >
                              {cliFlow[displayedLines]?.type === "command" &&
                                "$ "}
                              {currentLineText}
                              <span className="animate-pulse">█</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

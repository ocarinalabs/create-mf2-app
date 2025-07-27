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
  { type: "command", text: "npm create mf2-app@latest", typed: true, delay: 0 },
  { type: "output", text: "", delay: 1000 },
  { type: "output", text: " ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗    ███╗   ███╗███████╗██████╗      █████╗ ██████╗ ██████╗ ", delay: 100 },
  { type: "output", text: "██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝    ████╗ ████║██╔════╝╚════██╗    ██╔══██╗██╔══██╗██╔══██╗", delay: 50 },
  { type: "output", text: "██║     ██████╔╝█████╗  ███████║   ██║   █████╗      ██╔████╔██║█████╗   █████╔╝    ███████║██████╔╝██████╔╝", delay: 50 },
  { type: "output", text: "██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝      ██║╚██╔╝██║██╔══╝  ██╔═══╝     ██╔══██║██╔═══╝ ██╔═══╝ ", delay: 50 },
  { type: "output", text: "╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗    ██║ ╚═╝ ██║██║     ███████╗    ██║  ██║██║     ██║     ", delay: 50 },
  { type: "output", text: " ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝     ╚═╝╚═╝     ╚══════╝    ╚═╝  ╚═╝╚═╝     ╚═╝     ", delay: 50 },
  { type: "output", text: "", delay: 200 },
  { type: "output", text: "Move F*cking Fast", delay: 500 },
  { type: "output", text: "", delay: 500 },
  { type: "prompt", text: "? What's your project called? ", delay: 300 },
  { type: "command", text: "my-saas-app", typed: true, delay: 1000 },
  { type: "output", text: "", delay: 200 },
  { type: "prompt", text: "? Choose your stack: ", delay: 300 },
  { type: "output", text: "  ❯ Frontend (Landing page ready)", delay: 100 },
  { type: "output", text: "    Fullstack (Everything configured)", delay: 100 },
  { type: "output", text: "", delay: 1000 },
  { type: "output", text: "✔ Installing dependencies...", delay: 2000 },
  { type: "output", text: "✔ Initializing git...", delay: 500 },
  { type: "output", text: "✔ Setting up your project...", delay: 500 },
  { type: "output", text: "", delay: 300 },
  { type: "output", text: "🚀 Your MF2 app is ready!", delay: 500 },
  { type: "output", text: "", delay: 200 },
  { type: "output", text: "Next steps:", delay: 300 },
  { type: "output", text: "  cd my-saas-app", delay: 100 },
  { type: "output", text: "  npm run dev", delay: 100 },
  { type: "output", text: "", delay: 200 },
  { type: "output", text: "Ship fast 🚀", delay: 500 },
];

export function CliPreview() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [currentLineText, setCurrentLineText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const processNextLine = () => {
      if (displayedLines >= cliFlow.length) {
        // Reset animation after a delay
        timeout = setTimeout(() => {
          setDisplayedLines(0);
          setCurrentLineText("");
        }, 3000);
        return;
      }

      const currentLine = cliFlow[displayedLines];
      const delay = currentLine.delay || 0;

      if (currentLine.typed && currentLine.text) {
        // Type out the text character by character
        setIsTyping(true);
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex <= currentLine.text.length) {
            setCurrentLineText(currentLine.text.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
            setDisplayedLines(prev => prev + 1);
            setCurrentLineText("");
            timeout = setTimeout(processNextLine, 200);
          }
        }, 50);
      } else {
        // Display the line immediately
        timeout = setTimeout(() => {
          setDisplayedLines(prev => prev + 1);
          processNextLine();
        }, delay);
      }
    };

    processNextLine();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [displayedLines]);

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-center">
              From Zero to Shipping
            </h2>
          </BlurFade>
          
          <BlurFade delay={0.1}>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 text-center">
              One command. Two questions. Zero bullsh*t.
            </p>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="relative mx-auto max-w-4xl">
              <div className="overflow-hidden rounded-lg border border-white/20 bg-black/50 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-sm text-muted-foreground">Terminal</span>
                </div>
                <div className="p-4 sm:p-6 font-mono text-sm sm:text-base">
                  <div className="space-y-1">
                    {cliFlow.slice(0, displayedLines).map((line, index) => (
                      <div key={index} className="min-h-[1.5em]">
                        {line.type === "command" && (
                          <span className="text-green-400">$ {line.text}</span>
                        )}
                        {line.type === "output" && (
                          <span className="text-gray-300 whitespace-pre">{line.text}</span>
                        )}
                        {line.type === "prompt" && (
                          <span className="text-blue-400">{line.text}</span>
                        )}
                      </div>
                    ))}
                    {isTyping && currentLineText && (
                      <div className="min-h-[1.5em]">
                        <span className={cliFlow[displayedLines]?.type === "command" ? "text-green-400" : "text-gray-300"}>
                          {cliFlow[displayedLines]?.type === "command" && "$ "}
                          {currentLineText}
                          <span className="animate-pulse">█</span>
                        </span>
                      </div>
                    )}
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
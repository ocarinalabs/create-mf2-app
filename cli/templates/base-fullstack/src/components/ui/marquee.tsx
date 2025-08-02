import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  speed?: number;
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn("w-full overflow-hidden sm:mt-24 mt-10 z-10", className)}
      {...props}
    >
      <div
        className="relative flex w-full overflow-hidden py-5"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className={cn(
            "flex min-w-full shrink-0 gap-0 animate-marquee",
            pauseOnHover && "hover:[animation-play-state:paused]",
            direction === "right" && "animate-marquee-reverse"
          )}
          style={
            {
              "--duration": `${speed}s`,
              animationDuration: `${speed}s`,
            } as React.CSSProperties
          }
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}

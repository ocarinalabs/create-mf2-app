"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

// CUSTOMIZE THIS: Update navigation items to match your sections
const navItems = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: "spring", damping: 15 },
  },
  collapsed: {
    opacity: 0,
    x: -25,
    rotate: -180,
    transition: { duration: 0.3 },
  },
};

const itemVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", damping: 15 },
  },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      delay: 0.15,
    },
  },
};

export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true);

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleNavClick}
        className={cn(
          "flex items-center overflow-hidden rounded-full border bg-background/80 shadow-lg backdrop-blur-sm h-12",
          !isExpanded && "cursor-pointer justify-center"
        )}
      >
        <motion.div
          variants={logoVariants}
          className="flex-shrink-0 items-center font-semibold pl-2 pr-1 sm:pl-4 sm:pr-2 hidden sm:flex"
        >
          <Logo className="h-6 w-auto" />
        </motion.div>

        <motion.div
          className={cn(
            "flex items-center gap-4 sm:gap-4 pr-2 sm:pr-4 pl-2 sm:pl-0",
            !isExpanded && "pointer-events-none"
          )}
        >
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              variants={itemVariants}
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-1 sm:px-2 py-1 font-sans"
            >
              {item.name}
            </motion.a>
          ))}
          <motion.div variants={itemVariants}>
            <ModeToggle />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              size="sm"
              onClick={(e) => e.stopPropagation()}
              className="font-sans text-xs sm:text-sm px-2 sm:px-4 h-7 sm:h-9"
              asChild
            >
              <a href="#waitlist">
                <span className="sm:hidden">Get Started</span>
                <span className="hidden sm:inline">Get Started</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
          >
            <Logo className="h-8 w-8" />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}

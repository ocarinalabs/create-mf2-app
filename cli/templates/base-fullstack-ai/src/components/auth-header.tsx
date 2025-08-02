"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function AuthHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center">
          <Logo className="h-6 w-auto" />
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm hover:underline">
            Dashboard
          </Link>
          <Link href="/account" className="text-sm hover:underline">
            Account
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}

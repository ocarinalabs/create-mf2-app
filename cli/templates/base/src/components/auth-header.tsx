"use client";

import {
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function AuthHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold">My App</h1>
        <nav className="flex items-center gap-4">
          <a href="/" className="text-sm hover:underline">Home</a>
          <a href="/test-login" className="text-sm hover:underline">Test Login</a>
          <a href="/test-polar" className="text-sm hover:underline">Test Polar</a>
          <a href="/account" className="text-sm hover:underline">Account</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Unauthenticated>
          <SignInButton mode="modal">
            <Button variant="ghost">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
        </Unauthenticated>
        <Authenticated>
          <UserButton afterSignOutUrl="/" />
        </Authenticated>
      </div>
    </header>
  );
}
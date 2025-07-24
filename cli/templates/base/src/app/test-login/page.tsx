"use client";

import { Authenticated, Unauthenticated, AuthLoading, useQuery } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestLoginPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Clerk + Convex Test</h1>
      
      <AuthLoading>
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </AuthLoading>

      <Unauthenticated>
        <Card>
          <CardHeader>
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>Sign in to test the Clerk-Convex integration</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <SignInButton mode="modal">
              <Button size="lg">Sign In with Clerk</Button>
            </SignInButton>
          </CardContent>
        </Card>
      </Unauthenticated>

      <Authenticated>
        <UserInfo />
      </Authenticated>
    </div>
  );
}

function UserInfo() {
  const userStatus = useQuery(api.users.userLoginStatus);
  const currentUser = useQuery(api.users.currentUser);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Status</CardTitle>
          <CardDescription>You are signed in!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">User Status:</p>
              <p className="font-mono text-sm">
                {userStatus ? userStatus[0] : "Loading..."}
              </p>
            </div>
            <UserButton afterSignOutUrl="/test-login" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Data from Convex</CardTitle>
          <CardDescription>This data is synced via Clerk webhook</CardDescription>
        </CardHeader>
        <CardContent>
          {currentUser ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Convex ID:</p>
                <p className="font-mono text-sm">{currentUser._id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clerk ID:</p>
                <p className="font-mono text-sm">{currentUser.clerkUser.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email:</p>
                <p className="font-mono text-sm">
                  {currentUser.clerkUser.email_addresses?.[0]?.email_address || "No email"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name:</p>
                <p className="font-mono text-sm">
                  {currentUser.clerkUser.first_name} {currentUser.clerkUser.last_name}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Color (from Convex):</p>
                <p className="font-mono text-sm" style={{ color: currentUser.color }}>
                  {currentUser.color}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created:</p>
                <p className="font-mono text-sm">
                  {new Date(currentUser.clerkUser.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                Waiting for webhook sync... This usually takes a few seconds after first sign in.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <TestMessages />
    </div>
  );
}

function TestMessages() {
  const messages = useQuery(api.messages.list);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages Test</CardTitle>
        <CardDescription>Testing the messages query from the schema</CardDescription>
      </CardHeader>
      <CardContent>
        {messages !== undefined ? (
          messages.length > 0 ? (
            <ul className="space-y-2">
              {messages.map((msg, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium">{msg.author}:</span> {msg.body}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No messages yet</p>
          )
        ) : (
          <Skeleton className="h-20 w-full" />
        )}
      </CardContent>
    </Card>
  );
}
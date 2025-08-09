"use client";

import { useUser } from "@clerk/nextjs";
import { CustomerPortalLink } from "@convex-dev/polar/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-48 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Account</h1>
        <p>Please sign in to view your account settings.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Name
              </label>
              <p className="mt-1">{user.fullName || "Not set"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <p className="mt-1">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </CardContent>
        </Card>

        {process.env.NEXT_PUBLIC_POLAR_ENABLED === "true" && (
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>
                Manage your subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerPortalLink
                polarApi={api.payments.polar}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Manage Subscription
              </CustomerPortalLink>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

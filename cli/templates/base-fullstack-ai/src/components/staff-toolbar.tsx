"use client";
import { VercelToolbar } from "@vercel/toolbar/next";
import { useUser } from "@clerk/nextjs";

export function StaffToolbar() {
  const { user } = useUser();

  // Add your staff logic here
  // Example: check if user email ends with your domain
  // or if user has a specific role in your system
  const isStaff =
    user?.primaryEmailAddress?.emailAddress?.endsWith("@yourdomain.com") ||
    false;

  return isStaff ? <VercelToolbar /> : null;
}

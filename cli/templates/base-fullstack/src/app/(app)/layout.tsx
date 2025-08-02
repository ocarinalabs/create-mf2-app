import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AuthHeader } from "@/components/auth-header";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}

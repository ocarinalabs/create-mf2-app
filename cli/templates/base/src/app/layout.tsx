import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://mf2stack.dev"),
  title: {
    default: "MF² Stack - Move F***ing Fast",
    template: "%s | MF² Stack"
  },
  description: "The opinionated SaaS starter with Next.js, Convex, Clerk, and Polar. Ship your startup in days, not months.",
  keywords: ["saas starter", "nextjs template", "convex", "clerk", "polar", "startup stack", "mf2 stack", "move fast", "saas boilerplate", "typescript", "real-time", "authentication", "payments"],
  authors: [{ name: "Startdown Team" }],
  creator: "Startdown",
  publisher: "Startdown",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "MF² Stack - Move F***ing Fast",
    description: "The opinionated SaaS starter with Next.js, Convex, Clerk, and Polar. Ship your startup in days, not months.",
    url: "/",
    siteName: "MF² Stack",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MF² Stack - The fastest way to build your SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MF² Stack - Move F***ing Fast",
    description: "The opinionated SaaS starter with Next.js, Convex, Clerk, and Polar.",
    creator: "@startdown",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon",
    shortcut: "/favicon.ico",
    apple: "/apple-icon",
  },
  verification: {
    // Add your verification tokens here when ready
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ConvexClientProvider>
        <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
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
  description: "The modern web starter with Next.js, TypeScript, and Tailwind CSS. Build beautiful, fast websites in minutes.",
  keywords: ["nextjs template", "typescript", "tailwind css", "startup stack", "mf2 stack", "move fast", "web starter", "frontend template"],
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
    description: "The modern web starter with Next.js, TypeScript, and Tailwind CSS. Build beautiful, fast websites in minutes.",
    url: "/",
    siteName: "MF² Stack",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MF² Stack - The fastest way to build your website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MF² Stack - Move F***ing Fast",
    description: "The modern web starter with Next.js, TypeScript, and Tailwind CSS.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/convex-provider";
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
  title: "MF2",
  description: "The stack AI moves fast with",
  metadataBase: new URL("https://mf2.dev"),
  openGraph: {
    title: "MF2 - Move F*cking Fast",
    description:
      "The stack AI moves fast with. Build production-ready SaaS applications in days, not months.",
    url: "https://mf2.dev",
    siteName: "MF2",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "MF2 - Move F*cking Fast",
    description:
      "The stack AI moves fast with. Build production-ready SaaS applications in days, not months.",
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://mf2.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

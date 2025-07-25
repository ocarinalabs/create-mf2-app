import { Metadata } from "next";

export interface CreateMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  pathname?: string;
}

const defaultMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://mf2stack.dev"
  ),
  title: {
    default: "MF² Stack - Move F*cking Fast",
    template: "%s | MF² Stack",
  },
  description:
    "The opinionated SaaS starter with Next.js, Convex, Clerk, and Polar. Ship your startup in days, not months.",
  keywords: [
    "saas starter",
    "nextjs template",
    "convex",
    "clerk",
    "polar",
    "startup stack",
    "mf2 stack",
    "move fast",
    "saas boilerplate",
    "typescript",
    "real-time",
    "authentication",
    "payments",
  ],
  authors: [{ name: "Korrect" }],
  creator: "Korrect",
  publisher: "Korrect",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "MF² Stack - Move F*cking Fast",
    description:
      "The opinionated SaaS starter with Next.js, Convex, Clerk, and Polar. Ship your startup in days, not months.",
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
    title: "MF² Stack - Move F*cking Fast",
    description:
      "The opinionated SaaS starter with Next.js, Convex, Clerk, and Polar.",
    creator: "@korrect",
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
};

export function createMetadata({
  title,
  description,
  image,
  keywords,
  noIndex = false,
  pathname = "/",
}: CreateMetadataProps = {}): Metadata {
  const metadata: Metadata = {
    ...defaultMetadata,
    ...(title && { title }),
    ...(description && { description }),
    ...(keywords && {
      keywords: [...(defaultMetadata.keywords as string[]), ...keywords],
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };

  if (metadata.openGraph) {
    metadata.openGraph = {
      ...metadata.openGraph,
      ...(title && { title }),
      ...(description && { description }),
      ...(pathname && { url: pathname }),
      ...(image && {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title || (defaultMetadata.title as string),
          },
        ],
      }),
    };
  }

  if (metadata.twitter) {
    metadata.twitter = {
      ...metadata.twitter,
      ...(title && { title }),
      ...(description && { description }),
      ...(image && { images: [image] }),
    };
  }

  return metadata;
}

import { DesignSystemProvider } from "@repo/design-system";
import { fonts } from "@repo/design-system/lib/fonts";
import { cn } from "@repo/design-system/lib/utils";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./styles.css";

export const metadata: Metadata = {
  title: "mf\u00B2 \u2014 Move fast and break nothing",
  description: "Ship your startup in one command. Move fast and break nothing.",
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html
    className={cn(fonts, "scroll-smooth")}
    lang="en"
    suppressHydrationWarning
  >
    <body>
      <DesignSystemProvider defaultTheme="light">
        {children}
      </DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;

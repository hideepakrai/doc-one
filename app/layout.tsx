import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/LanguageContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} Multi-Speciality Clinic | Delhi's Trusted Healthcare`,
  description: SITE_DESCRIPTION,
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col bg-background selection:bg-primary/10">
        <LanguageProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster position="top-right" richColors />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}

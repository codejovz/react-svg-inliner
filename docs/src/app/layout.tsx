import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "react-svg-inliner",
  description: "Inline SVG loader for React and Next.js, built with modern standards.",
};

import { MainLayout } from "@/components/layout/MainLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Open Graph */}
        <meta property="og:title" content="react-svg-inliner" />
        <meta property="og:description" content="Inline SVG loader for React and Next.js, built with modern standards." />
        <meta property="og:image" content="/summary_large_image.png" />
        <meta property="og:url" content="https://react-svg-inliner.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="react-svg-inliner" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="react-svg-inliner" />
        <meta name="twitter:description" content="Inline SVG loader for React and Next.js, built with modern standards." />
        <meta name="twitter:image" content="/summary_large_image.png" />
        <meta name="twitter:site" content="@codejovz" />
        <meta name="twitter:creator" content="@codejovz" />
      </head>
      <body className={inter.className}>
        <MainLayout>
          {children}
          <Analytics />
        </MainLayout>
      </body>
    </html>
  );
}
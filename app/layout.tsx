import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/layout-wrapper";
import siteMetadata from "@/data/metadata";
import Analytics from "@/scripts/analytics";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="selection:bg-primary-200 selection:text-primary-900 antialiased text-slate-700 dark:text-slate-400 bg-white dark:bg-slate-900">
        <main className={inter.className}>
          <Analytics />
          <LayoutWrapper>{children}</LayoutWrapper>
        </main>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://priyanshusharma.dev"),
  title: {
    default: siteMetadata.title,
    template: "%s | Priyanshu Sharma",
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 600,
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: siteMetadata.twitter,
    images: [{ url: siteMetadata.socialBanner }],
  },
  icons: {
    icon: [
      {
        url: "/static/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/static/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/static/favicons/favicon-32x32.png",
    apple: "/static/favicons/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/static/favicons/safari-pinned-tab.svg",
        // color: "#5bbad5",
      },
    ],
  },
  manifest: "/static/favicons/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

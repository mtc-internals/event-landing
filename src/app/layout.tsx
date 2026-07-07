import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/env";
import { buildOrganizationJsonLd, buildWebsiteJsonLd, jsonLdScriptProps } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Evento — Discover events happening near you",
    template: "%s | Evento",
  },
  description:
    "Find tech meetups, workshops, concerts, and community events near you. Evento is the easiest way to discover and join what's happening in your city.",
  openGraph: {
    type: "website",
    siteName: "Evento",
    title: "Evento — Discover events happening near you",
    description:
      "Find tech meetups, workshops, concerts, and community events near you.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Evento — Discover events happening near you",
    description:
      "Find tech meetups, workshops, concerts, and community events near you.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", poppins.variable, "font-sans")}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script {...jsonLdScriptProps(buildOrganizationJsonLd())} />
        <script {...jsonLdScriptProps(buildWebsiteJsonLd())} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

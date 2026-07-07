import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { CookieConsent } from "@/components/cookie-consent";
import { MotionProvider } from "@/components/motion-provider";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE } from "@/lib/site";
import "./globals.css";

/** Shared tab-title tail — a pipe separator then the brand, so every
    tab reads "<Page> | Briesa" with identical spacing. */
const TITLE_TAIL = " | Briesa";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Briesa | Official Website",
    template: `%s${TITLE_TAIL}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["WHS", "GRC", "ISO certification", "compliance software", "Australia"],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// `viewport-fit=cover` exposes the safe-area insets the layout pads against.
// `themeColor` tints the browser chrome on Android Chrome / older browsers to the
// page surface (#ffffff light / #121212 dark) — iOS 26 Safari ignores it and
// samples the <body> background-color instead.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
    { color: "#121212" },
  ],
};

/** Organization JSON-LD so search engines render a rich entity for Briesa. */
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  description: SITE.description,
  areaServed: "AU",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-bg text-text antialiased">
        <ThemeProvider>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-bg focus:px-4 focus:py-2 focus:text-text focus:shadow"
            >
              Skip to content
            </a>
            <SiteBanner />
            <SiteNav />
            <div id="main" className="flex-1">
              {children}
            </div>
            <SiteFooter />
            <CookieConsent />
          </MotionProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted, static JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </body>
    </html>
  );
}
